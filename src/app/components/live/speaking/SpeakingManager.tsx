import { useState } from "react";
// نعود للخلف خطوة واحدة لاستيراد لوحة الإعدادات المشتركة
import { ConfigurationPanel } from "../ConfigurationPanel";
import { SpeakingLiveSession } from "./SpeakingLiveSession";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import type { SessionConfig, SessionResult } from "../../LivePractice";

export default function SpeakingManager() {
  const [step, setStep] = useState<"setup" | "session" | "result">("setup");
  const [config, setConfig] = useState<SessionConfig | null>(null);
  const [result, setResult] = useState<SessionResult | null>(null);

  const handleConfigDone = (cfg: SessionConfig) => {
    setConfig(cfg);
    setStep("session");
  };

  const handleSessionDone = (res: SessionResult) => {
    setResult(res);
    setStep("result");
  };

  const reset = () => {
    setStep("setup");
    setConfig(null);
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      {step === "setup" && (
        <ConfigurationPanel 
            skill="speaking" 
            onComplete={handleConfigDone} 
            onBack={() => {}} 
        />
      )}

      {step === "session" && config && (
        <SpeakingLiveSession 
            config={config} 
            onComplete={handleSessionDone} 
        />
      )}

      {step === "result" && result && (
        <Card className="text-center p-8">
            <CardContent>
                <h2 className="text-2xl font-bold mb-4">Practice Completed!</h2>
                <Button onClick={reset}>Start New Session</Button>
            </CardContent>
        </Card>
      )}
    </div>
  );
}