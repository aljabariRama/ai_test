import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Headphones, Play, Pause, Volume2, Check, FileText, Send, Sparkles } from 'lucide-react';

interface ListeningExerciseProps {
  audioUrl: string;
  transcript: string;
  question: string;
  options: string[];
  onAnswer: (answer: number) => void;
}

export function ListeningExercise({ 
  audioUrl, 
  transcript, 
  question, 
  options, 
  onAnswer 
}: ListeningExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock audio playback since we don't have real audio
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control actual audio playback
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
      // Simulate AI analysis
      setTimeout(() => {
        const isCorrect = Math.random() > 0.3;
        const mockFeedback = {
          overallBand: isCorrect ? 7.5 : 6.5,
          isCorrect,
          correctAnswer: Math.floor(Math.random() * options.length),
          yourAnswer: selectedOption,
          listeningSkills: {
            mainIdea: isCorrect ? 'Excellent' : 'Good',
            details: 'Good',
            inference: isCorrect ? 'Strong' : 'Developing',
          },
          comments: [
            isCorrect ? 'Excellent listening comprehension' : 'Focus on key details mentioned',
            'Good attention to speaker\'s tone and context',
            'Try listening without the transcript first',
          ],
        };
        setFeedback(mockFeedback);
      }, 1500);
    }
  };

  const handleContinue = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption);
    }
  };

  return (
    <div className="space-y-4">
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-blue-600" />
            Listening Exercise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audio Player */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={togglePlay}
                className="rounded-full h-16 w-16 bg-blue-600 hover:bg-blue-700"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              <div className="flex-1">
                <p className="font-medium mb-2">Audio Track</p>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-gray-600" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: isPlaying ? '100%' : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                {showTranscript ? 'Hide' : 'Show'} Transcript
              </Button>
            </div>

            {showTranscript && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-700 italic">{transcript}</p>
              </div>
            )}
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h3 className="font-semibold">{question}</h3>
            
            {!submitted ? (
              <>
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(index)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedOption === index
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === index
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedOption === index && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                  size="lg"
                >
                  <Sparkles className="h-5 w-5" />
                  Get AI Feedback
                </Button>
              </>
            ) : feedback ? (
              <div className="space-y-4">
                {/* Answer Review */}
                <div className="space-y-3">
                  <div className={`border-2 rounded-2xl p-4 ${
                    feedback.isCorrect 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-orange-50 border-orange-200'
                  }`}>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Your Answer:
                        </p>
                        <p className="text-sm font-medium">{options[feedback.yourAnswer]}</p>
                      </div>
                      {!feedback.isCorrect && (
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mb-1">
                            Correct Answer:
                          </p>
                          <p className="text-sm font-medium text-green-700">
                            {options[feedback.correctAnswer]}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          feedback.isCorrect ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        <span className="text-xs font-medium">
                          {feedback.isCorrect ? 'Correct!' : 'Incorrect - Listen again for key details'}
                        </span>
                      </div>
                    </div>
                  </div>
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
                        Your listening comprehension shows {feedback.isCorrect ? 'excellent' : 'good'} understanding of the audio content. 
                        You demonstrated strong attention to detail and context.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/60 rounded-xl p-4 mb-3">
                    <p className="text-xs font-semibold text-gray-600 mb-3 text-center">
                      Listening Skills Breakdown
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {Object.entries(feedback.listeningSkills).map(([skill, level]) => (
                        <div key={skill} className="text-center">
                          <div className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                            {skill.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm font-medium text-blue-600">
                            {level as string}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-3 pt-3 border-t">
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
                <p className="text-gray-600">Analyzing your answer...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
