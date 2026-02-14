import { useEffect, useRef, useState } from "react";
// ✅ استيراد المكون الجديد
import { PixelStreamComponent, PixelStreamComponentHandles } from '@convai/experience-embed';
import { ConvaiClient } from "convai-web-sdk";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import type { SessionConfig, SessionResult, Turn } from "../../LivePractice";

interface Props {
  config: SessionConfig;
  onComplete: (result: SessionResult) => void;
}

export function SpeakingLiveSession({ config, onComplete }: Props) {
  // ✅ Ref للتحكم في مكون الـ Pixel Streaming
  const pixelStreamRef = useRef<PixelStreamComponentHandles>(null);
  
  // Ref للعميل القديم (للحصول على النصوص فقط)
  const clientRef = useRef<any>(null);

  const [turns, setTurns] = useState<Turn[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [npcText, setNpcText] = useState("");
  const [userText, setUserText] = useState("");

  // البيئة
  const apiKey = import.meta.env.VITE_CONVAI_API_KEY;
  const characterId = import.meta.env.VITE_CONVAI_CHARACTER_ID;
  const xpid = import.meta.env.VITE_CONVAI_XPID;

  // إعداد Convai Client فقط لاستلام النصوص (Transcript)
  useEffect(() => {
    if (!apiKey || !characterId) return;

    const client = new ConvaiClient({ apiKey, characterId, enableAudio: false }); // نوقف الصوت هنا لنعتمد على الستريم
    clientRef.current = client;

    client.setResponseCallback((res: any) => {
      // استلام نص المستخدم
      if (res?.hasUserQuery?.()) {
        const text = res.getUserQuery().getTextData();
        if (text) setUserText(text);
        if (res.getUserQuery().getIsFinal()) {
          setTurns(prev => [...prev, { id: Date.now().toString(), who: "user", text, ts: Date.now() }]);
        }
      }
      // استلام نص الافتار
      if (res?.hasAudioResponse?.()) {
        const text = res.getAudioResponse().getTextData();
        if (text) setNpcText(prev => prev + " " + text);
      }
    });

    // عند انتهاء الافتار من الكلام (من خلال العميل)
    client.onAudioStop?.(() => {
      if (npcText.trim()) {
        setTurns(prev => [...prev, { id: Date.now().toString(), who: "npc", text: npcText, ts: Date.now() }]);
        setNpcText("");
        setQuestionCount(prev => prev + 1);
      }
    });

    return () => {
      try { clientRef.current?.resetSession?.(); } catch (e) {}
    };
  }, []);

  // دوال التحكم (اختيارية حسب الحاجة)
  const enableCam = async () => {
     await pixelStreamRef.current?.enableCamera();
  };
  
  const disableCam = async () => {
     await pixelStreamRef.current?.disableCamera();
  };

  const handleEnd = () => {
    const result: SessionResult = {
      id: Date.now().toString(),
      config,
      score: 0,
      totalQuestions: config.numberOfQuestions,
      answers: turns,
      timestamp: new Date(),
      feedback: "Session completed"
    };
    onComplete(result);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* منطقة الفيديو الجديدة باستخدام PixelStreamComponent */}
      <Card className="overflow-hidden bg-black relative aspect-video rounded-xl border border-gray-800 shadow-2xl">
        {xpid ? (
          <PixelStreamComponent
            ref={pixelStreamRef}
            expId={xpid}
            InitialScreen={
              <div className="w-full h-full flex flex-col items-center justify-center text-white bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p>Loading Experience...</p>
              </div>
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Error: Missing VITE_CONVAI_XPID
          </div>
        )}
      </Card>

      {/* أزرار التحكم */}
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex gap-2">
            <Button variant="secondary" onClick={enableCam}>Enable Camera</Button>
            <Button variant="secondary" onClick={disableCam}>Disable Camera</Button>
        </div>
        <Button variant="destructive" onClick={handleEnd} className="px-8">
          End Session
        </Button>
      </div>

      {/* النصوص الحية (Transcript) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
        <div className="p-4 bg-white border rounded-lg shadow-sm min-h-[80px]">
          <span className="text-xs font-bold text-gray-400 uppercase mb-1 block">You Said</span>
          <p className="text-gray-800">{userText || "..."}</p>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg shadow-sm min-h-[80px]">
          <span className="text-xs font-bold text-blue-400 uppercase mb-1 block">Examiner Said</span>
          <p className="text-blue-900">{npcText || "..."}</p>
        </div>
      </div>

      <Progress value={(questionCount / config.numberOfQuestions) * 100} className="h-2" />
    </div>
  );
}