import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import type { SessionConfig, SessionResult } from "../LivePractice";

// استيراد مكونات الأسئلة
import { MCQQuestion } from "./questions/MCQQuestion";
import { FillBlankQuestion } from "./questions/FillBlankQuestion";
import { DragDropQuestion } from "./questions/DragDropQuestion";
import { ReadingPassage } from "./questions/ReadingPassage";
import { ListeningExercise } from "./questions/ListeningExercise";

// ✅ استيراد الـ Speaking من مكانه الجديد (تأكد من المسار)
import { SpeakingLiveSession } from "./speaking/SpeakingLiveSession";

interface PracticeSessionProps {
  config: SessionConfig;
  onComplete: (result: SessionResult) => void;
}

const generateQuestions = (config: SessionConfig) => {
  // ... (نفس دالة توليد الأسئلة الخاصة بك - لم أغير فيها شيئاً)
  const questions: any[] = [];
  const topics = config.topics?.length ? config.topics : ["General"];

  for (let i = 0; i < config.numberOfQuestions; i++) {
    const topic = topics[i % topics.length];
    // ... (منطق توليد الأسئلة لباقي المهارات)
    // ...
  }
  return questions;
};

export function PracticeSession({ config, onComplete }: PracticeSessionProps) {
  
  // ✅ (1) التعامل مع الـ Speaking
  if (config.skill === "speaking") {
    // تصحيح الخطأ الإملائي هنا (كانت ملتصقة)
    return <SpeakingLiveSession config={config} onComplete={onComplete} />;
  }

  // ✅ (2) التعامل مع باقي المهارات (Reading, Listening, etc.)
  // نضع useState داخل دالة توليد الأسئلة عشان ما يعيد التوليد مع كل رندر
  const [questions] = useState(() => generateQuestions(config));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  
  // تأكد أن الأسئلة موجودة لتجنب أخطاء الـ undefined
  const currentQuestion = questions[currentQuestionIndex];
  
  // إذا لم تكن هناك أسئلة (حالة نادرة)، نرجع null أو رسالة خطأ
  if (!currentQuestion) return <div>Loading or No questions generated...</div>;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: any) => {
    const newAnswers = [...answers, { questionId: currentQuestion.id, answer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    // حساب النتيجة النهائية
    // ملاحظة: هذا حساب بسيط، يمكنك تطويره
    const correctAnswersCount = newAnswers.length; // مجرد مثال، عدل المنطق حسب نوع السؤال
    const score = Math.round((correctAnswersCount / questions.length) * 100);

    const result: SessionResult = {
      id: `session-${Date.now()}`,
      config,
      score,
      totalQuestions: questions.length,
      answers: newAnswers, // تأكد أن النوع مطابق للـ Interface
      timestamp: new Date(),
      feedback: "Session Completed.",
      suggestedLevel: config.level,
    };

    onComplete(result);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600 capitalize">
              {config.level} • {config.skill}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question Display Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Reading */}
        {config.skill === "reading" && currentQuestion.passage && (
          <ReadingPassage
            passage={currentQuestion.passage}
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        )}

        {/* Listening */}
        {config.skill === "listening" && currentQuestion.transcript && (
          <ListeningExercise
            audioUrl={currentQuestion.audioUrl || ""}
            transcript={currentQuestion.transcript}
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        )}

        {/* Other Skills (Grammar, Vocab, Writing) */}
        {(config.skill === "grammar" || config.skill === "vocabulary" || config.skill === "writing") && (
          <>
            {currentQuestion.type === "mcq" && (
              <MCQQuestion 
                question={currentQuestion.question} 
                options={currentQuestion.options} 
                onAnswer={handleAnswer} 
              />
            )}
            {currentQuestion.type === "fill-blank" && (
              <FillBlankQuestion 
                sentence={currentQuestion.sentence} 
                onAnswer={handleAnswer} 
              />
            )}
            {currentQuestion.type === "drag-drop" && (
              <DragDropQuestion 
                instruction={currentQuestion.instruction} 
                words={currentQuestion.words} 
                onAnswer={handleAnswer} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}