import { useEffect, useMemo, useRef, useState } from "react";
import { ConvaiClient } from "convai-web-sdk";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import type { SessionConfig, SessionResult } from "../../LivePractice";

type Turn = { id: string; who: "user" | "npc"; text: string; ts: number };
interface Props { config: SessionConfig; onComplete: (result: SessionResult) => void; }

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

const extractName = (text?: string) => {
  if (!text) return "Student";
  const m = text.match(/my name is\s+([a-zA-Z]+)/i);
  return (m?.[1] || "Student").trim();
};

const buildSystemPrompt = (config: SessionConfig) => {
  const name = extractName(config.userProfileText);
  const topic = config.topics?.[0] || "General Conversation";
  const n = config.numberOfQuestions || 5;
  const target = typeof config.targetBand === "number" ? config.targetBand : "not specified";
  const profile = config.userProfileText?.trim() || "(not provided)";

  return `
You are an experienced IELTS Coach and Certified Examiner.

Student Name: ${name}
Student Current Level: ${config.level}
Target Band: ${target}
Topic (strict): ${topic}
Number of Questions: ${n}
Additional Information: ${profile}

Instructions:
- Greet using the student's name.
- Ask exactly ${n} questions, one at a time.
- Stay strictly within topic: ${topic}.
- After each response: short improvement + 1-2 sentence model answer at target band.
- After ${n} questions say: "This is the end of the practice session." then give brief overall feedback.
`.trim();
};

export function SpeakingLiveSessionConvai({ config, onComplete }: Props) {
  const apiKey = import.meta.env.VITE_CONVAI_API_KEY as string | undefined;
  const characterId = import.meta.env.VITE_CONVAI_CHARACTER_ID as string | undefined;
  const xpid = import.meta.env.VITE_CONVAI_XPID as string | undefined;
  const xpidType = (import.meta.env.VITE_CONVAI_XPID_TYPE as string | undefined) || "unlisted";

  const systemPrompt = useMemo(() => buildSystemPrompt(config), [config]);

  const clientRef = useRef<any>(null);
  const turnsRef = useRef<Turn[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [status, setStatus] = useState<"idle" | "ready" | "listening" | "npc_talking" | "error">("idle");
  const [userLiveText, setUserLiveText] = useState("");
  const [npcLiveText, setNpcLiveText] = useState("");
  const [textInput, setTextInput] = useState("");
  const [questionCountHint, setQuestionCountHint] = useState(0);
  const progress = Math.min(100, (questionCountHint / Math.max(1, config.numberOfQuestions)) * 100);

  const pushTurn = (who: "user" | "npc", text: string) => {
    const t: Turn = { id: uid(), who, text, ts: Date.now() };
    turnsRef.current = [...turnsRef.current, t];
    setTurns(turnsRef.current);
  };

  const embedUrl = useMemo(() => {
    if (!xpid) return "";
    return `https://x.convai.com/?xpid=${encodeURIComponent(xpid)}&type=${encodeURIComponent(xpidType)}`;
  }, [xpid, xpidType]);

  useEffect(() => {
    if (!apiKey || !characterId) {
      setStatus("error");
      return;
    }

    try {
      const client = new ConvaiClient({ apiKey, characterId, enableAudio: true });
      clientRef.current = client;

      client.setResponseCallback((response: any) => {
        // user transcript
        if (response?.hasUserQuery?.()) {
          const transcript = response.getUserQuery();
          const text = transcript?.getTextData?.() || "";
          if (text) setUserLiveText(text);
        }

        // npc response text
        if (response?.hasAudioResponse?.()) {
          const audioResponse = response.getAudioResponse?.();
          const text = audioResponse?.getTextData?.() || "";
          if (text) {
            setNpcLiveText(text);
            pushTurn("npc", text);

            // heuristic question count
            const qCount = (text.match(/\?/g) || []).length;
            if (qCount > 0) {
              setQuestionCountHint((prev) => Math.min(config.numberOfQuestions, prev + qCount));
            }
          }
        }
      });

      client.onAudioPlay?.(() => setStatus("npc_talking"));
      client.onAudioStop?.(() => setStatus("ready"));

      setStatus("ready");

      // ✅ send system prompt automatically (no copy/paste)
      client.sendTextChunk?.(systemPrompt);
    } catch {
      setStatus("error");
    }

    return () => {
      try {
        clientRef.current?.endAudioChunk?.();
        clientRef.current?.resetSession?.();
      } catch {}
      clientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    if (!clientRef.current) return;
    setUserLiveText("");
    setNpcLiveText("");
    setStatus("listening");
    clientRef.current.startAudioChunk?.();
  };

  const stopListening = () => {
    if (!clientRef.current) return;
    clientRef.current.endAudioChunk?.();
    setStatus("ready");

    const finalUser = userLiveText.trim();
    if (finalUser) pushTurn("user", finalUser);
  };

  const sendText = () => {
    if (!clientRef.current) return;
    const t = textInput.trim();
    if (!t) return;
    pushTurn("user", t);
    setUserLiveText(t);
    setNpcLiveText("");
    clientRef.current.sendTextChunk?.(t);
    setTextInput("");
  };

  const endSessionNow = () => {
    const result: SessionResult = {
      id: `session-${Date.now()}`,
      config,
      score: 0,
      totalQuestions: config.numberOfQuestions,
      answers: turnsRef.current,
      timestamp: new Date(),
      bandScore: undefined,
      feedback: "Session ended.",
      suggestedLevel: config.level,
      nextTopics: ["Debate", "Interview Skills"],
    };
    onComplete(result);
  };

  return (
    <div className="space-y-6">
      {/* ✅ VIDEO AVATAR */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">
              Speaking • {config.level}
              {typeof config.targetBand === "number" ? ` • Target ${config.targetBand}` : ""}
            </div>
            <div className="text-xs text-gray-600">{status}</div>
          </div>

          {embedUrl ? (
            <div className="rounded-lg overflow-hidden border">
              <iframe
                src={embedUrl}
                className="w-full h-[520px]"
                allow="microphone; autoplay"
              />
            </div>
          ) : (
            <div className="text-sm text-red-600">
              Missing XPID. Please set VITE_CONVAI_XPID in .env
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Controls + transcript */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Progress value={progress} className="h-2" />

          <div className="space-y-2">
            <div className="text-xs text-gray-500">You</div>
            <div className="rounded-md border p-3 text-sm min-h-[48px]">
              {userLiveText || <span className="text-gray-400">—</span>}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">Teacher</div>
            <div className="rounded-md border p-3 text-sm min-h-[48px]">
              {npcLiveText || <span className="text-gray-400">—</span>}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onMouseLeave={() => status === "listening" && stopListening()}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
              disabled={status === "error" || status === "npc_talking"}
            >
              Hold to Talk
            </Button>

            <Button variant="outline" onClick={endSessionNow}>
              End Session
            </Button>
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 rounded-md border px-3 py-2 text-sm"
              placeholder="Type instead of speaking…"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendText();
              }}
              disabled={status === "error"}
            />
            <Button onClick={sendText} disabled={status === "error"}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium mb-3">Conversation log</div>
          <div className="space-y-2 max-h-[260px] overflow-auto">
            {turns.length === 0 ? (
              <div className="text-sm text-gray-500">No messages yet.</div>
            ) : (
              turns.map((t) => (
                <div key={t.id} className="text-sm">
                  <span className={`font-semibold ${t.who === "user" ? "text-blue-700" : "text-purple-700"}`}>
                    {t.who === "user" ? "You" : "Teacher"}:
                  </span>{" "}
                  <span>{t.text}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
