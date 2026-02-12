import { useEffect, useMemo, useRef, useState } from "react";
import { ConvaiClient } from "convai-web-sdk";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import type { SessionConfig, SessionResult } from "../../LivePractice";

type Turn = { id: string; who: "user" | "npc"; text: string; ts: number };
type Status = "idle" | "ready" | "listening" | "npc_talking" | "error";

interface Props {
  config: SessionConfig;
  onComplete: (result: SessionResult) => void;
}

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

const extractName = (text?: string) => {
  if (!text) return "Student";
  const m = text.match(/my name is\s+([a-zA-Z]+)/i);
  return (m?.[1] || "Student").trim();
};

const buildSystemPrompt = (config: SessionConfig) => {
  const name = extractName(config.userProfileText);
  const topic = config.topics?.[0] || "Work";
  const n = config.numberOfQuestions || 5;
  const target = typeof config.targetBand === "number" ? config.targetBand : "not specified";
  const profile = config.userProfileText?.trim() || "(not provided)";

  return `
You are an experienced IELTS Speaking Coach and Certified Examiner.

Your job:
1) Simulate a real IELTS Speaking test (friendly but professional).
2) Coach the student with short improvements + band-appropriate model answers.

Ground truth inputs:
- Student Name: ${name}
- Current CEFR Level: ${config.level}
- Target Band: ${target}
- STRICT Topic: ${topic}
- Number of Questions: ${n}
- Optional Student Info: ${profile}

Rules (must follow):
- Stick strictly to topic "${topic}".
- Ask exactly ${n} questions TOTAL.
- Ask ONE question at a time, then stop and wait.
- After each student answer, output:
  Quick feedback: (0–2 short sentences)
  Model answer (Target level): (1–2 sentences only)
- After the final answer, say: "This is the end of the practice session." + 3–5 short lines overall feedback.

Start now: greet ${name} briefly, explain you will ask ${n} questions about "${topic}", then ask Question 1/${n}.
`.trim();
};

export function SpeakingLiveSessionConvai({ config, onComplete }: Props) {
  const apiKey = import.meta.env.VITE_CONVAI_API_KEY as string | undefined;
  const characterId = import.meta.env.VITE_CONVAI_CHARACTER_ID as string | undefined;

  // Experience Embed (video)
  const xpid = import.meta.env.VITE_CONVAI_XPID as string | undefined;
  const xpidType = (import.meta.env.VITE_CONVAI_XPID_TYPE as string | undefined) || "unlisted";

  const systemPrompt = useMemo(() => buildSystemPrompt(config), [config]);

  const clientRef = useRef<any>(null);

  // We aggregate partial text here and only push to log on "final" moments
  const userFinalRef = useRef<string>("");
  const userPartialRef = useRef<string>("");

  const npcFinalRef = useRef<string>("");
  const npcPartialRef = useRef<string>("");

  const turnsRef = useRef<Turn[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [userLiveText, setUserLiveText] = useState("");
  const [npcLiveText, setNpcLiveText] = useState("");

  const [textInput, setTextInput] = useState("");
  const [questionCountHint, setQuestionCountHint] = useState(0);

  const progress = Math.min(100, (questionCountHint / Math.max(1, config.numberOfQuestions)) * 100);

  const pushTurn = (who: "user" | "npc", text: string) => {
    const clean = (text || "").trim();
    if (!clean) return;

    const t: Turn = { id: uid(), who, text: clean, ts: Date.now() };
    turnsRef.current = [...turnsRef.current, t];
    setTurns(turnsRef.current);
  };

  const embedUrl = useMemo(() => {
    if (!xpid) return "";
    // ✅ هذا الرابط هو اللي شغال عادة لعرض الـ Experience stream
    return `https://x.convai.com/?xpid=${encodeURIComponent(xpid)}&type=${encodeURIComponent(xpidType)}`;
  }, [xpid, xpidType]);

  useEffect(() => {
    if (!apiKey || !characterId) {
      setStatus("error");
      setErrorMsg("Missing VITE_CONVAI_API_KEY or VITE_CONVAI_CHARACTER_ID");
      return;
    }

    try {
      const client = new ConvaiClient({ apiKey, characterId, enableAudio: true });
      clientRef.current = client;

      client.setResponseCallback((response: any) => {
        try {
          // ✅ User transcript (partial/final)
   if (response?.hasUserQuery?.()) {
  const q = response.getUserQuery();
  const text = q?.getTextData?.() || "";
  const isFinal = typeof q?.getIsFinal === "function" ? q.getIsFinal() : false;

  if (text) {
    if (isFinal) {
      userFinalRef.current = (userFinalRef.current + " " + text).trim();
      userPartialRef.current = "";
      setUserLiveText(userFinalRef.current);
    } else {
      userPartialRef.current = text;
      setUserLiveText((userFinalRef.current + " " + userPartialRef.current).trim());
    }
  }
}


          // ✅ NPC text streaming (partial)
          if (response?.hasAudioResponse?.()) {
            const ar = response.getAudioResponse?.();
            const text = ar?.getTextData?.() || "";
            if (text) {
              npcPartialRef.current = (npcPartialRef.current + " " + text).trim();
              setNpcLiveText(npcPartialRef.current);

              // heuristic: count questions by ?
              const qCount = (npcPartialRef.current.match(/\?/g) || []).length;
              setQuestionCountHint(Math.min(config.numberOfQuestions, qCount));
            }
          }
        } catch {
          // ignore
        }
      });

      // ✅ When NPC starts talking
      client.onAudioPlay?.(() => {
        setStatus("npc_talking");
      });

      // ✅ When NPC finishes talking: commit the NPC message once (no duplicates)
      client.onAudioStop?.(() => {
        setStatus("ready");

        const npcFinal = (npcPartialRef.current || "").trim();
        if (npcFinal) {
          // move partial -> final
          npcFinalRef.current = npcFinal;
          pushTurn("npc", npcFinalRef.current);
        }

        // reset partial bucket for next reply
        npcPartialRef.current = "";
      });

      setStatus("ready");

      // ✅ Start the session by sending system prompt (no copy/paste)
      client.sendTextChunk?.(systemPrompt);
    } catch (e: any) {
      setStatus("error");
      setErrorMsg(e?.message || "Failed to init ConvaiClient");
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

  const startListening = async () => {
    if (!clientRef.current) return;

    // reset user aggregation for a new utterance
    userFinalRef.current = "";
    userPartialRef.current = "";
    setUserLiveText("");

    setStatus("listening");
    try {
      clientRef.current.startAudioChunk?.();
    } catch (e: any) {
      setStatus("error");
      setErrorMsg(e?.message || "Microphone start failed");
    }
  };

  const stopListening = () => {
    if (!clientRef.current) return;

    try {
      clientRef.current.endAudioChunk?.();
      setStatus("ready");

      // push final user text to log ONCE
      const finalUser = (userLiveText || "").trim();
      if (finalUser) pushTurn("user", finalUser);
    } catch (e: any) {
      setStatus("error");
      setErrorMsg(e?.message || "Microphone stop failed");
    }
  };

  const sendText = () => {
    if (!clientRef.current) return;

    const t = textInput.trim();
    if (!t) return;

    // clear npc partial buffer for new reply
    npcPartialRef.current = "";
    setNpcLiveText("");

    pushTurn("user", t);
    setUserLiveText(t);

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
      feedback: "Session ended.",
      suggestedLevel: config.level,
      nextTopics: ["Work & Career", "Interview Skills", "Opinions & Debates"],
    };
    onComplete(result);
  };

  return (
    <div className="space-y-6">
      {/* ✅ VIDEO AVATAR STREAM */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold">
                Speaking • {config.level}
                {typeof config.targetBand === "number" ? ` • Target ${config.targetBand}` : ""}
              </div>
              <div className="text-xs text-gray-600 truncate">
                Topic: {config.topics?.[0] || "Work"} • Questions: {config.numberOfQuestions}
              </div>
            </div>
            <div className="text-xs text-gray-600">{status}</div>
          </div>

          {status === "error" && (
            <div className="text-sm text-red-600">{errorMsg || "Something went wrong."}</div>
          )}

          {embedUrl ? (
            <div className="rounded-lg overflow-hidden border bg-black">
              <iframe
                src={embedUrl}
                className="w-full h-[520px]"
                title="Convai Experience"
                allow="camera; microphone; autoplay; clipboard-write; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="text-sm text-red-600">
              Missing XPID. Set <b>VITE_CONVAI_XPID</b> in Vercel env vars and redeploy.
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
