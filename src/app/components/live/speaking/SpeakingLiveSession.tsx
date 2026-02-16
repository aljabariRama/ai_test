import { useEffect, useRef, useState } from "react";
import { PixelStreamComponent, PixelStreamComponentHandles } from "@convai/experience-embed";
import { ConvaiClient } from "convai-web-sdk";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Mic, MicOff } from "lucide-react";
import type { SessionConfig, Turn } from "../../LivePractice";
import { saveTurn } from "../../../lib/api";

type Props = {
  config: SessionConfig;
  sessionId: string;
  systemPrompt: string;
  onEnd: () => void;
};

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

export function SpeakingLiveSession({ config, sessionId, systemPrompt, onEnd }: Props) {
  const pixelRef = useRef<PixelStreamComponentHandles>(null);
  const clientRef = useRef<any>(null);

  const [isListening, setIsListening] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [userLive, setUserLive] = useState("");
  const [npcLive, setNpcLive] = useState("");
  const [questionCountHint, setQuestionCountHint] = useState(0);

  const apiKey = import.meta.env.VITE_CONVAI_API_KEY;
  const characterId = import.meta.env.VITE_CONVAI_CHARACTER_ID;
  const xpid = import.meta.env.VITE_CONVAI_XPID;

  const pushTurn = async (who: "user" | "npc", text: string) => {
    const clean = (text || "").trim();
    if (!clean) return;

    const t: Turn = { id: uid(), who, text: clean, ts: Date.now() };
    setTurns((prev) => [...prev, t]);

    // حفظه بالباك
    await saveTurn(sessionId, { who, text: clean, ts: t.ts });
  };

  // شغل الفيديو فورًا (بس لاحظي: autoplay أحيانًا يحتاج click بسبب المتصفح)
  useEffect(() => {
    if (pixelRef.current) {
      pixelRef.current.initializeExperience?.();
    }
  }, [xpid]);

  // Initialize ConvaiClient + send system prompt تلقائي
  useEffect(() => {
    if (!apiKey || !characterId) return;

    const client = new ConvaiClient({
      apiKey,
      characterId,
      enableAudio: true, // لإدخال المايك + استلام ردود
    });

    clientRef.current = client;

    // ردود Convai (transcripts + npc text)
    client.setResponseCallback((res: any) => {
      // user transcript
      if (res?.hasUserQuery?.()) {
        const q = res.getUserQuery();
        const txt = q?.getTextData?.() || "";
        const isFinal = typeof q?.getIsFinal === "function" ? q.getIsFinal() : false;

        if (txt) {
          setUserLive(txt);
          if (isFinal) {
            pushTurn("user", txt);
            setUserLive("");
          }
        }
      }

      // npc response text
      if (res?.hasAudioResponse?.()) {
        const a = res.getAudioResponse?.();
        const txt = a?.getTextData?.() || "";
        if (txt) {
          setNpcLive((prev) => (prev ? prev + " " + txt : txt));

          // heuristic count
          const qCount = ((prevText) => (prevText.match(/\?/g) || []).length)(txt);
          if (qCount > 0) setQuestionCountHint((p) => Math.min(config.numberOfQuestions, p + qCount));
        }
      }
    });

    // عندما ينتهي صوت الكوتش → خزّني الرسالة مرة واحدة
    client.onAudioStop?.(() => {
      setNpcLive((full) => {
        const final = (full || "").trim();
        if (final) pushTurn("npc", final);
        return "";
      });
    });

    // ✅ send system prompt (أول ما تفتح الجلسة)
    client.sendTextChunk?.(systemPrompt);

    return () => {
      try {
        clientRef.current?.endAudioChunk?.();
        clientRef.current?.resetSession?.();
      } catch {}
      clientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, characterId, systemPrompt, sessionId]);

  const startMic = () => {
    if (!clientRef.current) return;
    setIsListening(true);
    clientRef.current.startAudioChunk?.(); // هذا هو الصحيح (مش startListening)
  };

  const stopMic = () => {
    if (!clientRef.current) return;
    setIsListening(false);
    clientRef.current.endAudioChunk?.();
  };

  const progress = Math.min(100, (questionCountHint / Math.max(1, config.numberOfQuestions)) * 100);

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto">
      {/* VIDEO */}
      <Card className="overflow-hidden bg-black rounded-2xl border shadow-xl">
        {!xpid ? (
          <div className="p-6 text-white">Missing VITE_CONVAI_XPID (Experience ID)</div>
        ) : (
          <PixelStreamComponent
            ref={pixelRef}
            expId={xpid}
            InitialScreen={
              <div className="w-full h-[520px] flex items-center justify-center text-white bg-slate-900">
                Loading IELTS Coach Experience...
              </div>
            }
          />
        )}
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <Button
          size="lg"
          variant={isListening ? "destructive" : "default"}
          onClick={() => (isListening ? stopMic() : startMic())}
          className="rounded-full px-8 flex gap-3 items-center"
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          {isListening ? "Stop Talking" : "Start Speaking"}
        </Button>

        <div className="text-sm text-slate-600">
          Progress: <b>{questionCountHint}</b> / {config.numberOfQuestions}
        </div>

        <Button variant="outline" onClick={onEnd}>
          End Session
        </Button>
      </div>

      <Progress value={progress} className="h-2" />

      {/* Your own chat UI */}
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 border rounded-lg">
            <div className="text-xs text-gray-500 mb-1">You (live)</div>
            {userLive || <span className="text-gray-400">—</span>}
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Coach (live)</div>
            {npcLive || <span className="text-gray-400">—</span>}
          </div>
        </div>

        <div className="text-sm font-semibold">Transcript</div>
        <div className="max-h-[280px] overflow-auto space-y-2">
          {turns.map((t) => (
            <div key={t.id} className="text-sm">
              <b className={t.who === "user" ? "text-blue-700" : "text-purple-700"}>
                {t.who === "user" ? "You" : "Coach"}:
              </b>{" "}
              {t.text}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
