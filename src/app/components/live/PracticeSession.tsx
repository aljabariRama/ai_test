import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import type { SessionConfig, SessionResult } from "../LivePractice";

import { MCQQuestion } from "./questions/MCQQuestion";
import { FillBlankQuestion } from "./questions/FillBlankQuestion";
import { DragDropQuestion } from "./questions/DragDropQuestion";
import { ReadingPassage } from "./questions/ReadingPassage";
import { ListeningExercise } from "./questions/ListeningExercise";

import { SpeakingLiveSessionConvai } from "./questions/SpeakingLiveSessionConvai";

interface PracticeSessionProps {
  config: SessionConfig;
  onComplete: (result: SessionResult) => void;
}

const generateQuestions = (config: SessionConfig) => {
  const questions: any[] = [];
  const topics = config.topics?.length ? config.topics : ["General"];

  for (let i = 0; i < config.numberOfQuestions; i++) {
    const topic = topics[i % topics.length];

    if (config.skill === "reading") {
      questions.push({
        id: `q-${i}`,
        type: config.questionType || "mcq",
        passage: `This is a sample reading passage about ${topic}.`,
        question: `What is the main idea of this passage about ${topic}?`,
        options: [
          `The importance of ${topic} in education`,
          `Historical background of ${topic}`,
          `Future predictions about ${topic}`,
          `Criticism of ${topic}`,
        ],
        correctAnswer: 0,
      });
    } else if (config.skill === "listening") {
      questions.push({
        id: `q-${i}`,
        type: config.questionType || "mcq",
        audioUrl: `https://example.com/audio-${i}.mp3`,
        transcript: `Welcome to today's discussion about ${topic}.`,
        question: `What is the speaker discussing?`,
        options: [topic, "General topics", "Historical events", "Future trends"],
        correctAnswer: 0,
      });
    } else {
      if (config.questionType === "fill-blank") {
        questions.push({
          id: `q-${i}`,
          type: "fill-blank",
          sentence: `The student ____ studying ${topic} for the past three years.`,
          correctAnswer: "has been",
        });
      } else if (config.questionType === "drag-drop") {
        questions.push({
          id: `q-${i}`,
          type: "drag-drop",
          instruction: `Arrange these words to form a correct sentence about ${topic}:`,
          words: ["studying", "is", "essential", topic, "for", "success"],
          correctOrder: [0, 1, 2, 3, 4, 5],
        });
      } else {
        questions.push({
          id: `q-${i}`,
          type: "mcq",
          question: `Which word best describes ${topic}?`,
          options: ["Important", "Irrelevant", "Optional", "Confusing"],
          correctAnswer: 0,
        });
      }
    }
  }

  return questions;
};

export function PracticeSession({ config, onComplete }: PracticeSessionProps) {
  // ✅ speaking uses convai live
  if (config.skill === "speaking") {
    return <SpeakingLiveSessionConvai config={config} onComplete={onComplete} />;
  }

  const [questions] = useState(() => generateQuestions(config));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: any) => {
    const newAnswers = [...answers, { questionId: currentQuestion.id, answer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    const correctAnswers = newAnswers.filter((ans, idx) => {
      const q = questions[idx];
      if (q.correctAnswer !== undefined) return ans.answer === q.correctAnswer;
      return true;
    }).length;

    const score = Math.round((correctAnswers / questions.length) * 100);

    const result: SessionResult = {
      id: `session-${Date.now()}`,
      config,
      score,
      totalQuestions: questions.length,
      answers: newAnswers,
      timestamp: new Date(),
      bandScore: undefined,
      feedback: "Mock feedback.",
      suggestedLevel: config.level,
      nextTopics: [],
    };

    onComplete(result);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {config.level} • {config.skill}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div>
        {config.skill === "reading" && currentQuestion.passage && (
          <ReadingPassage
            passage={currentQuestion.passage}
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        )}

        {config.skill === "listening" && currentQuestion.transcript && (
          <ListeningExercise
            audioUrl={currentQuestion.audioUrl}
            transcript={currentQuestion.transcript}
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        )}

        {(config.skill === "grammar" || config.skill === "vocabulary" || config.skill === "writing") && (
          <>
            {currentQuestion.type === "mcq" && (
              <MCQQuestion question={currentQuestion.question} options={currentQuestion.options} onAnswer={handleAnswer} />
            )}
            {currentQuestion.type === "fill-blank" && (
              <FillBlankQuestion sentence={currentQuestion.sentence} onAnswer={handleAnswer} />
            )}
            {currentQuestion.type === "drag-drop" && (
              <DragDropQuestion instruction={currentQuestion.instruction} words={currentQuestion.words} onAnswer={handleAnswer} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
