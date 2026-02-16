// src/types/LivePractice.ts

export type SkillType = "listening" | "reading" | "writing" | "speaking" | "grammar" | "vocabulary";
export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type QuestionType = "fill-blank" | "mcq" | "drag-drop";

export interface SessionConfig {
  skill: SkillType;
  level: Level;                 // current
  numberOfQuestions: number;
  topics: string[];

  // speaking
  userName?: string;
  targetBand?: number;
  targetBandOrLevel?: string;
  studentInfo?: string;
  userProfileText?: string;
}

export interface Turn {
  id: string;
  who: "user" | "npc";
  text: string;
  ts: number;
}

export interface SessionResult {
  id: string;
  config: SessionConfig;
  score: number;
  totalQuestions: number;
  answers: Turn[];
  timestamp: Date;
  feedback: string;
  suggestedLevel?: string;
}