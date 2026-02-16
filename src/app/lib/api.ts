export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function startSpeakingSession(payload: {
  studentName: string;
  currentLevel: string;
  targetBand: number;
  topic: string;
  numQuestions: number;
  studentInfo?: string;
}) {
  const res = await fetch(`${API_BASE}/api/speaking/session/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to start session");
  return res.json() as Promise<{ sessionId: string; systemPrompt: string }>;
}

export async function saveTurn(sessionId: string, turn: { who: "user" | "npc"; text: string; ts?: number }) {
  await fetch(`${API_BASE}/api/speaking/session/${sessionId}/turn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(turn),
  });
}

export async function endSession(sessionId: string) {
  const res = await fetch(`${API_BASE}/api/speaking/session/${sessionId}/end`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to end session");
  return res.json() as Promise<{ score: number; turns: any[] }>;
}
