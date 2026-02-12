import { useEffect, useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";

interface Props {
  prompt: string;
  suggestedDuration: number;
  onAnswer: (answer: string) => void;
}

export function SpeakingPractice({
  prompt,
  suggestedDuration,
  onAnswer,
}: Props) {
  const [text, setText] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    setIsRunning(false);
    onAnswer(text.trim());
  };

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Prompt */}
        <div>
          <div className="text-sm font-semibold mb-1">
            IELTS Speaking Prompt
          </div>
          <div className="text-sm">{prompt}</div>
          <div className="text-xs text-gray-500 mt-1">
            Suggested duration: {suggestedDuration}s
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>
            Time: {seconds}s
          </span>
          <span>
            Words: {wordCount}
          </span>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full min-h-[140px] border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (!isRunning) setIsRunning(true);
          }}
          placeholder="Type your spoken answer here..."
        />

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="flex-1"
          >
            Submit Answer
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setText("");
              setSeconds(0);
              setIsRunning(false);
            }}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
