import { useEffect, useRef, useState } from "react";
// استيراد المكون الجديد والمقابض للتحكم فيه
import { PixelStreamComponent, PixelStreamComponentHandles } from '@convai/experience-embed';
import { ConvaiClient } from "convai-web-sdk";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Mic, MicOff, User, Bot } from "lucide-react";
import type { SessionConfig, SessionResult, Turn } from "../../LivePractice";

interface Props {
  config: SessionConfig;
  onComplete: (result: SessionResult) => void;
}

export function SpeakingLiveSession({ config, onComplete }: Props) {
  // Refs للتحكم في المكونات
  const pixelStreamRef = useRef<PixelStreamComponentHandles>(null);
  const clientRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // حالات الصفحة (State)
  const [isListening, setIsListening] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [npcText, setNpcText] = useState("");
  const [userText, setUserText] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  // جلب المتغيرات (تأكدي من وجود VITE_ في البداية في Vercel)
  const apiKey = import.meta.env.VITE_CONVAI_API_KEY;
  const characterId = import.meta.env.VITE_CONVAI_CHARACTER_ID;
  const xpid = import.meta.env.VITE_CONVAI_XPID;

  // 1. تثبيت النزول التلقائي في الشات
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [turns, npcText, userText]);

  // 2. تشغيل الشخصية فور الدخول
  useEffect(() => {
    if (pixelStreamRef.current) {
      pixelStreamRef.current.initializeExperience();
    }
  }, [xpid]);

  // 3. إعداد Convai Client لمعالجة النصوص (بدون صوت تلقائي)
  useEffect(() => {
    if (!apiKey || !characterId) return;

    const client = new ConvaiClient({ 
      apiKey, 
      characterId, 
      enableAudio: false // الصوت يأتي من الـ Stream
    });
    clientRef.current = client;

    client.setResponseCallback((res: any) => {
      if (res?.hasUserQuery?.()) {
        const text = res.getUserQuery().getTextData();
        if (text) setUserText(text);
        if (res.getUserQuery().getIsFinal()) {
          setTurns(prev => [...prev, { id: Date.now().toString(), who: "user", text, ts: Date.now() }]);
          setUserText("");
        }
      }
      if (res?.hasAudioResponse?.()) {
        const text = res.getAudioResponse().getTextData();
        if (text) setNpcText(prev => prev + " " + text);
      }
    });

    client.onAudioStop?.(() => {
      if (npcText.trim()) {
        setTurns(prev => [...prev, { id: Date.now().toString(), who: "npc", text: npcText, ts: Date.now() }]);
        setNpcText("");
        setQuestionCount(prev => prev + 1);
      }
    });

    return () => { clientRef.current?.resetSession?.(); };
  }, [apiKey, characterId, npcText]);

  // دالة التحكم في الميكروفون
  const toggleListening = () => {
    if (!isListening) {
      clientRef.current?.startListening();
      setIsListening(true);
    } else {
      clientRef.current?.stopListening();
      setIsListening(false);
    }
  };

  const handleEnd = () => {
    onComplete({
      id: Date.now().toString(),
      config,
      score: 0,
      totalQuestions: config.numberOfQuestions,
      answers: turns,
      timestamp: new Date(),
      feedback: "IELTS Practice Completed"
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto h-[85vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
        
        {/* شاشة العرض - ثابتة وبدون UI خارجي */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Card className="flex-1 overflow-hidden bg-black relative rounded-2xl border-none shadow-xl">
            <PixelStreamComponent
              ref={pixelStreamRef}
              expId={xpid}
              type="public"
              hideUi={true}           // ✅ إخفاء شات وأزرار Convai
              isMovementEnabled={false} // ✅ منع حركة الكاميرا (ثبات المستخدم)
              isRotationEnabled={false} // ✅ منع دوران الكاميرا بالماوس
              InitialScreen={
                <div className="flex items-center justify-center h-full text-white bg-slate-900">
                  Connecting to IELTS Coach...
                </div>
              }
            />
          </Card>
          
          {/* شريط التحكم السفلي */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border">
            <Button 
              size="lg"
              variant={isListening ? "destructive" : "default"} 
              onClick={toggleListening}
              className="rounded-full px-8 flex gap-3 items-center transition-all scale-105 active:scale-95"
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              {isListening ? "Stop Talking" : "Start Speaking"}
            </Button>
            
            <div className="hidden md:flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                <span className="text-lg font-bold text-slate-700">{questionCount} / {config.numberOfQuestions}</span>
            </div>

            <Button variant="outline" onClick={handleEnd} className="text-slate-500 border-slate-200">
              End Session
            </Button>
          </div>
        </div>

        {/* سجل المحادثة الجانبي الخاص بكِ */}
        <Card className="flex flex-col bg-slate-50 rounded-2xl shadow-inner border-none overflow-hidden">
          <div className="p-4 border-b bg-white/50 backdrop-blur-sm">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
              IELTS Transcript
            </h3>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {turns.length === 0 && !userText && !npcText && (
              <p className="text-center text-slate-400 text-xs mt-10">Start the conversation to see the transcript</p>
            )}
            
            {turns.map((turn) => (
              <div key={turn.id} className={`flex flex-col ${turn.who === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] text-slate-400 mb-1 px-1 uppercase">{turn.who === 'user' ? 'You' : 'Coach'}</span>
                <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${
                  turn.who === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm' 
                  : 'bg-white text-slate-800 rounded-tl-none border shadow-sm'
                }`}>
                  {turn.text}
                </div>
              </div>
            ))}
            
            {/* عرض النص المباشر قبل الاعتماد */}
            {userText && (
              <div className="flex flex-col items-end">
                <div className="max-w-[90%] p-3 rounded-2xl rounded-tr-none bg-indigo-50 text-indigo-400 text-sm italic border border-indigo-100">
                  {userText}...
                </div>
              </div>
            )}
            {npcText && (
              <div className="flex flex-col items-start">
                <div className="max-w-[90%] p-3 rounded-2xl rounded-tl-none bg-white text-slate-400 text-sm italic border border-dashed">
                  {npcText}...
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <Progress value={(questionCount / config.numberOfQuestions) * 100} className="h-1.5 bg-slate-100" />
    </div>
  );
}