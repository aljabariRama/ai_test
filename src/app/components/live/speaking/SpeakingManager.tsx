import { useState } from "react";
import { ConfigurationPanel } from "../ConfigurationPanel";
import { SpeakingLiveSession } from "./SpeakingLiveSession";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import type { SessionConfig, SessionResult } from "../../LivePractice";
import { startSpeakingSession, endSession } from "../../../lib/api";

export default function SpeakingManager() {
  const [step, setStep] = useState<"setup" | "session" | "result">("setup");
  const [config, setConfig] = useState<SessionConfig | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string>("");
  const [result, setResult] = useState<SessionResult | null>(null);

  const handleConfigDone = async (cfg: SessionConfig) => {
    setConfig(cfg);

    const topic = cfg.topics?.[0] || "Work & Career";
    const resp = await startSpeakingSession({
      studentName: (cfg as any).studentName || "Student",
      currentLevel: cfg.level,
      targetBand: (cfg as any).targetBand ?? 6.5,
      topic,
      numQuestions: cfg.numberOfQuestions,
      studentInfo: cfg.userProfileText || "",
    });

    setSessionId(resp.sessionId);
    setSystemPrompt(resp.systemPrompt);
    setStep("session");
  };

  const handleSessionDone = async () => {
    if (!sessionId || !config) return;

    const ended = await endSession(sessionId);

    const res: SessionResult = {
      id: sessionId,
      config,
      score: ended.score,
      totalQuestions: config.numberOfQuestions,
      answers: ended.turns,
      timestamp: new Date(),
      feedback: "Session completed.",
    };

    setResult(res);
    setStep("result");
  };

  const reset = () => {
    setStep("setup");
    setConfig(null);
    setSessionId(null);
    setSystemPrompt("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      {step === "setup" && (
        <ConfigurationPanel skill="speaking" onComplete={handleConfigDone} onBack={() => {}} />
      )}

      {step === "session" && config && sessionId && (
        <SpeakingLiveSession
          config={config}
          sessionId={sessionId}
          systemPrompt={systemPrompt}
          onEnd={handleSessionDone}
        />
      )}

      {step === "result" && result && (
        <Card className="text-center p-8">
          <CardContent className="space-y-3">
            <h2 className="text-2xl font-bold">Practice Completed!</h2>
            <div className="text-lg">Score: <b>{result.score}</b>/100</div>
            <Button onClick={reset}>Start New Session</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
