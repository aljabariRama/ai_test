const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "2mb" }));

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    credentials: true,
  })
);

// تخزين بسيط بالذاكرة (للتجربة). بعدين بنبدله DB
const sessions = new Map();

const uid = () =>
  Math.random().toString(16).slice(2) + Date.now().toString(16);

function buildSystemPrompt({
  studentName,
  currentLevel,
  targetBand,
  topic,
  numQuestions,
  studentInfo,
}) {
  const name = (studentName || "Student").trim();
  const lvl = currentLevel || "B1";
  const n = Number(numQuestions || 5);
  const strictTopic = (topic || "Work & Career").trim();
  const info = (studentInfo || "").trim();
  const target = targetBand != null ? String(targetBand) : "not specified";

  return `
You are an experienced IELTS Speaking Coach and Certified Examiner.

You must simulate a REAL IELTS Speaking test (friendly but professional) and coach the student.

GROUND TRUTH INPUTS:
- Student Name: ${name}
- Current CEFR Level: ${lvl}
- Target IELTS Band: ${target}
- STRICT Topic: ${strictTopic}
- Number of Questions: ${n}
- Optional Student Info: ${info || "(not provided)"}

CRITICAL RULES (MUST FOLLOW):
- Stick strictly to the topic "${strictTopic}". Never switch topics.
- Ask exactly ${n} questions total.
- Ask ONE question at a time, then stop and wait for the student's response.
- After each student response, output:
  Quick feedback: (0–2 short sentences, only if needed)
  Model answer (Target level): (1–2 sentences only, natural spoken English, topic-safe)
- After the final answer, say: "This is the end of the practice session."
  Then give overall feedback in 3–5 short lines (strengths + 1 improvement area + encouragement).

FORMAT (IMPORTANT):
Start with a short greeting using the student's name, explain you will ask ${n} questions about "${strictTopic}", then ask:

Question 1/${n}:
<exactly ONE question>

Now start.
`.trim();
}

function simpleScore(turns) {
  // heuristic بسيط للتجربة (بدّك تقييم “حقيقي” لاحقًا ب API تقييم)
  const userTexts = turns.filter(t => t.who === "user").map(t => t.text || "");
  const words = userTexts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const turnsCount = userTexts.length;

  let score = 40;
  score += Math.min(30, turnsCount * 5);
  score += Math.min(30, Math.floor(words / 20) * 3);

  score = Math.max(0, Math.min(100, score));
  return score;
}

/**
 * إنشاء Session + رجّعي systemPrompt
 */
app.post("/api/speaking/session/start", (req, res) => {
  const {
    studentName,
    currentLevel,
    targetBand,
    topic,
    numQuestions,
    studentInfo,
  } = req.body || {};

  const sessionId = uid();
  const systemPrompt = buildSystemPrompt({
    studentName,
    currentLevel,
    targetBand,
    topic,
    numQuestions,
    studentInfo,
  });

  sessions.set(sessionId, {
    id: sessionId,
    createdAt: Date.now(),
    config: { studentName, currentLevel, targetBand, topic, numQuestions, studentInfo },
    turns: [],
  });

  res.json({ sessionId, systemPrompt });
});

/**
 * حفظ turn (يوزر/كوتش)
 */
app.post("/api/speaking/session/:id/turn", (req, res) => {
  const { id } = req.params;
  const s = sessions.get(id);
  if (!s) return res.status(404).json({ message: "Session not found" });

  const { who, text, ts } = req.body || {};
  if (!who || !text) return res.status(400).json({ message: "Missing who/text" });

  s.turns.push({
    id: uid(),
    who,
    text,
    ts: ts || Date.now(),
  });

  res.json({ ok: true });
});

/**
 * إنهاء Session + Score
 */
app.post("/api/speaking/session/:id/end", (req, res) => {
  const { id } = req.params;
  const s = sessions.get(id);
  if (!s) return res.status(404).json({ message: "Session not found" });

  const score = simpleScore(s.turns);
  res.json({
    sessionId: id,
    score,
    turns: s.turns,
    summary: "Session ended (mock scoring).",
  });
});

/**
 * Health
 */
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
