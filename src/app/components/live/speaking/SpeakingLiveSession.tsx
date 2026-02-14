import { useEffect, useMemo, useRef, useState } from "react";
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
  const clientRef = useRef<any>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [status, setStatus] = useState<string>("Initializing...");
  const [npcText, setNpcText] = useState("");
  const [userText, setUserText] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  // تأكد من وجود هذه القيم في ملف .env
  const apiKey = import.meta.env.VITE_CONVAI_API_KEY;
  const characterId = import.meta.env.VITE_CONVAI_CHARACTER_ID;
  const xpid = import.meta.env.VITE_CONVAI_XPID; 

  const systemPrompt = useMemo(() => {
    return `
    Role: IELTS Examiner named Sarah.
    User Info: Name is ${config.studentName || "Student"}.
    Topic: ${config.topics[0] || "General"}.
    Task: Ask exactly ${config.numberOfQuestions} questions.
    `.trim();
  }, [config]);

  useEffect(() => {
    if (!apiKey || !characterId || !xpid) {
      setStatus("Error: Missing Config (Check .env)");
      return;
    }

    const client = new ConvaiClient({ apiKey, characterId, enableAudio: true });
    clientRef.current = client;

    client.setResponseCallback((res: any) => {
        if (res?.hasUserQuery?.()) {
            const text = res.getUserQuery().getTextData();
            if (text) setUserText(text);
            if (res.getUserQuery().getIsFinal()) {
                setTurns(prev => [...prev, { id: Date.now().toString(), who: "user", text, ts: Date.now() }]);
            }
        }
        if (res?.hasAudioResponse?.()) {
            const text = res.getAudioResponse().getTextData();
            if (text) setNpcText(prev => prev + " " + text);
        }
    });

    client.onAudioPlay?.(() => setStatus("Speaking..."));
    client.onAudioStop?.(() => {
        setStatus("Ready");
        if (npcText.trim()) {
            setTurns(prev => [...prev, { id: Date.now().toString(), who: "npc", text: npcText, ts: Date.now() }]);
            setNpcText(""); 
            setQuestionCount(prev => prev + 1);
        }
    });

    setStatus("Ready");
    setTimeout(() => {
        client.sendTextChunk?.(systemPrompt);
        client.sendTextChunk?.("Hello, let's start.");
    }, 1500);

    return () => { try { clientRef.current?.resetSession?.(); } catch(e){} };
  }, []);

  const handleEnd = () => {
      clientRef.current?.endAudioChunk?.();
      const result: SessionResult = {
          id: Date.now().toString(),
          config,
          score: 0,
          totalQuestions: config.numberOfQuestions,
          answers: turns,
          timestamp: new Date(),
          feedback: "Completed"
      };
      onComplete(result);
  };

  const toggleMic = (active: boolean) => {
      if(active) {
          setStatus("Listening...");
          setUserText("");
          clientRef.current?.startAudioChunk?.();
      } else {
          setStatus("Processing...");
          clientRef.current?.endAudioChunk?.();
      }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
        <Card className="overflow-hidden bg-black relative aspect-video rounded-xl">
            {/* حل مشكلة الـ 403 والـ 404: تأكد من الرابط هنا */}
            {xpid ? (
                <iframe 
    // نستخدم /embed هنا لكي تكون الشاشة نظيفة
    src={`https://x.convai.com/embed?xpid=${xpid}&type=public&toggle_environment=true`} 
    className="w-full h-full border-0"
    title="Convai Avatar"
    allow="microphone; camera; autoplay; clipboard-write; encrypted-media; fullscreen"
/>
            ) : (
                <div className="flex items-center justify-center h-full text-white">
                    Check VITE_CONVAI_XPID in .env
                </div>
            )}
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm">
                Status: {status}
            </div>
        </Card>

        <div className="flex gap-4">
            <Button 
                className={`flex-1 h-14 ${status === "Listening..." ? "bg-red-500" : "bg-blue-600"}`}
                onMouseDown={() => toggleMic(true)}
                onMouseUp={() => toggleMic(false)}
            >
                {status === "Listening..." ? "Release to Send" : "Hold to Speak"}
            </Button>
            <Button variant="outline" className="h-14" onClick={handleEnd}>End Test</Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 border rounded">You: {userText}</div>
            <div className="p-3 border rounded bg-blue-50">AI: {npcText}</div>
        </div>
        <Progress value={(questionCount / config.numberOfQuestions) * 100} className="h-2" />
    </div>
  );
}