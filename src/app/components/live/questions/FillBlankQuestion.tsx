import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { FileText, Send, Sparkles } from 'lucide-react';

interface FillBlankQuestionProps {
  sentence: string;
  onAnswer: (answer: string | string[]) => void;
}

export function FillBlankQuestion({ sentence, onAnswer }: FillBlankQuestionProps) {
  const parts = sentence.split('____');
  const blankCount = parts.length - 1;
  
  const [answers, setAnswers] = useState<string[]>(new Array(blankCount).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const filledAnswers = answers.filter(a => a.trim());
    if (filledAnswers.length === blankCount) {
      setSubmitted(true);
      // Simulate AI analysis
      setTimeout(() => {
        const mockFeedback = {
          overallBand: 7.0,
          correctCount: Math.floor(Math.random() * blankCount) + 1,
          totalCount: blankCount,
          suggestions: answers.map((ans, idx) => ({
            yourAnswer: ans,
            correctAnswer: `[Sample Answer ${idx + 1}]`,
            isCorrect: Math.random() > 0.3,
          })),
          comments: [
            'Good vocabulary usage',
            'Check spelling and grammar',
            'Consider context when choosing words',
          ],
        };
        setFeedback(mockFeedback);
      }, 1500);
    }
  };

  const handleContinue = () => {
    onAnswer(blankCount === 1 ? answers[0].trim() : answers);
  };

  const allFilled = answers.every(a => a.trim());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Fill in the Blank
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {feedback && (
          <div className="sticky top-4 z-10">
            <Button
              onClick={handleContinue}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all gap-2 h-12 text-base font-semibold"
            >
              <Send className="h-5 w-5" />
              Continue to Next Question
            </Button>
          </div>
        )}

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-wrap items-center gap-2 text-lg leading-relaxed">
            {parts.map((part, index) => (
              <span key={index} className="inline-flex flex-wrap items-center gap-2">
                <span>{part}</span>
                {index < parts.length - 1 && (
                  <Input
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && allFilled && handleSubmit()}
                    className="inline-flex w-auto min-w-[200px] bg-white"
                    placeholder={`Answer ${index + 1}...`}
                    disabled={submitted}
                    autoFocus={index === 0}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        {!submitted ? (
          <>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Tip:</strong> Fill in all the blanks with appropriate words. Press Enter or click submit when done.
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!allFilled}
              className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
              size="lg"
            >
              <Sparkles className="h-5 w-5" />
              Get AI Feedback
            </Button>
          </>
        ) : feedback ? (
          <div className="space-y-4">
            {/* Your Answers vs Correct Answers */}
            <div className="space-y-3">
              {feedback.suggestions.map((suggestion: any, idx: number) => (
                <div key={idx} className={`border-2 rounded-2xl p-4 ${
                  suggestion.isCorrect 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1">
                        Blank {idx + 1} - Your Answer:
                      </p>
                      <p className="text-sm font-medium">{suggestion.yourAnswer}</p>
                    </div>
                    {!suggestion.isCorrect && (
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Suggested Answer:
                        </p>
                        <p className="text-sm font-medium text-green-700">
                          {suggestion.correctAnswer}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        suggestion.isCorrect ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <span className="text-xs font-medium">
                        {suggestion.isCorrect ? 'Correct' : 'Review This'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Assessment */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 mb-2">AI Assessment</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    You got {feedback.correctCount} out of {feedback.totalCount} correct. 
                    Your word choice shows good understanding of context and grammar.
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-xl p-4 mb-3">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <p className="font-semibold text-sm text-blue-900">
                    IELTS Band Score:
                  </p>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-lg">
                    {feedback.overallBand.toFixed(1)}
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {feedback.comments.map((comment: string, idx: number) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{comment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-3 animate-pulse" />
            <p className="text-gray-600">Analyzing your answers...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
