import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import {
  CheckCircle2,
  BookOpen,
  Headphones,
  Volume2,
  Mic,
  Brain,
  Sparkles,
  Trophy,
  ArrowRight,
  Target,
  BookMarked,
  Zap,
  Award,
  Play,
  StopCircle,
  AlertCircle,
  CheckCircle,
  PenTool
} from 'lucide-react';
import type { Level } from '../LivePractice';

interface PlacementTestFlowProps {
  onComplete: (bandScore: number, level: Level) => void;
}

interface Answer {
  questionIndex: number;
  answer: string | string[];
  isCorrect?: boolean;
}

type QuestionType = 'listening' | 'reading' | 'vocabulary' | 'grammar' | 'speaking' | 'writing';

interface Question {
  type: QuestionType;
  questionNumber: number;
  content: string;
  audioUrl?: string;
  passage?: string;
  blanks?: string[];
  correctAnswers?: string[];
  spokenQuestion?: string;
}

export function PlacementTestFlow({ onComplete }: PlacementTestFlowProps) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentSectionAnswers, setCurrentSectionAnswers] = useState<string[]>([]);
  const [recordedAnswer, setRecordedAnswer] = useState('');

  // Generate placement test questions - 15 total
  const questions: Question[] = [
    // Listening Section - 3 questions (1 audio, 3 fill in the blank)
    {
      type: 'listening',
      questionNumber: 1,
      content: 'Listen to the audio and fill in the blank: The conference will be held in _____ on Friday.',
      audioUrl: '/mock-audio-1.mp3',
      correctAnswers: ['London', 'london']
    },
    {
      type: 'listening',
      questionNumber: 2,
      content: 'The speaker mentions that registration starts at _____ AM.',
      correctAnswers: ['9', 'nine', '9:00', '9 o\'clock']
    },
    {
      type: 'listening',
      questionNumber: 3,
      content: 'The main topic of the conference is _____.',
      correctAnswers: ['technology', 'Technology', 'artificial intelligence', 'AI']
    },

    // Reading Section - 3 questions (1 passage, 3 fill in the blank)
    {
      type: 'reading',
      questionNumber: 4,
      passage: 'Climate change is one of the most pressing challenges of our time. Rising global temperatures have led to melting ice caps, rising sea levels, and extreme weather events. Scientists agree that human activities, particularly the burning of fossil fuels, are the primary cause of recent climate change. To address this crisis, many countries have committed to reducing their carbon emissions and transitioning to renewable energy sources such as solar and wind power.',
      content: 'According to the passage, the primary cause of recent climate change is _____.',
      correctAnswers: ['human activities', 'burning fossil fuels', 'fossil fuels', 'human activity']
    },
    {
      type: 'reading',
      questionNumber: 5,
      content: 'Rising global temperatures have led to melting ice caps, rising sea levels, and _____.',
      correctAnswers: ['extreme weather events', 'extreme weather', 'weather events']
    },
    {
      type: 'reading',
      questionNumber: 6,
      content: 'Many countries are transitioning to renewable energy sources such as _____ and wind power.',
      correctAnswers: ['solar', 'solar power', 'solar energy']
    },

    // Vocabulary Section - 3 fill in the blank
    {
      type: 'vocabulary',
      questionNumber: 7,
      content: 'The professor gave a very _____ explanation that was easy to understand. (clear/unclear)',
      correctAnswers: ['clear', 'Clear']
    },
    {
      type: 'vocabulary',
      questionNumber: 8,
      content: 'Due to the _____ weather, the flight was delayed for three hours. (adverse/favorable)',
      correctAnswers: ['adverse', 'Adverse']
    },
    {
      type: 'vocabulary',
      questionNumber: 9,
      content: 'The company\'s new policy aims to _____ employee productivity and satisfaction. (enhance/reduce)',
      correctAnswers: ['enhance', 'Enhance', 'improve', 'Improve', 'increase', 'Increase']
    },

    // Grammar Section - 3 fill in the blank
    {
      type: 'grammar',
      questionNumber: 10,
      content: 'She _____ to Paris three times this year. (has been / have been / was)',
      correctAnswers: ['has been', 'Has been']
    },
    {
      type: 'grammar',
      questionNumber: 11,
      content: 'If I _____ you, I would accept the job offer. (am / was / were)',
      correctAnswers: ['were', 'Were']
    },
    {
      type: 'grammar',
      questionNumber: 12,
      content: 'The report _____ by the team yesterday. (completed / was completed / has completed)',
      correctAnswers: ['was completed', 'Was completed']
    },

    // Writing Section - 1 question
    {
      type: 'writing',
      questionNumber: 13,
      content: 'Write a short paragraph (50-100 words) about your favorite hobby and why you enjoy it. Include details about when you started and how it makes you feel.'
    },

    // Speaking Section - 3 questions
    {
      type: 'speaking',
      questionNumber: 14,
      spokenQuestion: 'Tell me about your hometown. What do you like most about it?',
      content: 'Tell me about your hometown. What do you like most about it?'
    },
    {
      type: 'speaking',
      questionNumber: 15,
      spokenQuestion: 'Describe a memorable experience you had while learning something new.',
      content: 'Describe a memorable experience you had while learning something new.'
    },
    {
      type: 'speaking',
      questionNumber: 16,
      spokenQuestion: 'What are your goals for the future, and how do you plan to achieve them?',
      content: 'What are your goals for the future, and how do you plan to achieve them?'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Get section info
  const getSectionInfo = (type: QuestionType) => {
    switch (type) {
      case 'listening':
        return { icon: Headphones, color: 'purple', label: 'Listening' };
      case 'reading':
        return { icon: BookOpen, color: 'blue', label: 'Reading' };
      case 'vocabulary':
        return { icon: BookMarked, color: 'teal', label: 'Vocabulary' };
      case 'grammar':
        return { icon: Sparkles, color: 'cyan', label: 'Grammar' };
      case 'speaking':
        return { icon: Mic, color: 'orange', label: 'Speaking' };
      case 'writing':
        return { icon: PenTool, color: 'green', label: 'Writing' };
    }
  };

  const sectionInfo = getSectionInfo(currentQuestion.type);

  // Play AI-generated audio (simulated)
  const playAudio = () => {
    setAudioPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setAudioPlaying(false);
    }, 5000); // 5 seconds audio
  };

  // Play speaking question audio (avatar speaks)
  const playSpokenQuestion = () => {
    // In a real app, this would use text-to-speech API
    setAudioPlaying(true);
    setTimeout(() => {
      setAudioPlaying(false);
    }, 3000);
  };

  // Start recording answer
  const startRecording = () => {
    setIsRecording(true);
    // In a real app, this would use Web Speech API
  };

  // Stop recording answer
  const stopRecording = () => {
    setIsRecording(false);
    // Simulate transcription
    setRecordedAnswer('This is a simulated transcription of the recorded answer.');
  };

  // Handle answer submission
  const handleAnswer = (answer: string) => {
    const newAnswer: Answer = {
      questionIndex: currentQuestionIndex,
      answer: answer
    };

    // Check if answer is correct for non-speaking questions
    if (currentQuestion.correctAnswers) {
      const isCorrect = currentQuestion.correctAnswers.some(
        correct => correct.toLowerCase().trim() === answer.toLowerCase().trim()
      );
      newAnswer.isCorrect = isCorrect;
    }

    setAnswers([...answers, newAnswer]);
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentSectionAnswers([]);
      setRecordedAnswer('');
    } else {
      finishTest();
    }
  };

  // Calculate results and finish test
  const finishTest = () => {
    // Calculate score based on correct answers
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalGradedQuestions = 12; // Exclude 3 speaking questions from auto-grading
    const scorePercentage = (correctAnswers / totalGradedQuestions) * 100;

    // Simulate speaking score (in real app, would use AI)
    const speakingScore = 70 + Math.random() * 20; // 70-90%
    
    // Calculate overall score
    const overallScore = (scorePercentage * 0.75) + (speakingScore * 0.25);

    // Determine band score and level
    const bandScore = calculateBandScore(overallScore);
    const level = calculateLevel(bandScore);

    setShowResults(true);
    
    // Complete test after showing results
    setTimeout(() => {
      onComplete(bandScore, level);
    }, 5000);
  };

  const calculateBandScore = (score: number): number => {
    if (score >= 90) return 8.5;
    if (score >= 85) return 8.0;
    if (score >= 80) return 7.5;
    if (score >= 75) return 7.0;
    if (score >= 70) return 6.5;
    if (score >= 65) return 6.0;
    if (score >= 60) return 5.5;
    if (score >= 55) return 5.0;
    if (score >= 50) return 4.5;
    return 4.0;
  };

  const calculateLevel = (bandScore: number): Level => {
    if (bandScore >= 8.0) return 'C2';
    if (bandScore >= 7.0) return 'C1';
    if (bandScore >= 6.0) return 'B2';
    if (bandScore >= 5.0) return 'B1';
    if (bandScore >= 4.0) return 'A2';
    return 'A1';
  };

  // Auto-play audio for listening questions
  useEffect(() => {
    if (currentQuestion.type === 'listening' && currentQuestion.questionNumber === 1) {
      // Play audio once when entering listening section
      setTimeout(() => playAudio(), 1000);
    }
    if (currentQuestion.type === 'speaking' && currentQuestion.spokenQuestion) {
      // Play spoken question when entering speaking question
      setTimeout(() => playSpokenQuestion(), 500);
    }
  }, [currentQuestionIndex]);

  // Instructions Dialog
  if (showInstructions) {
    return (
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              Placement Test Instructions
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Complete this test to determine your current English proficiency level
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 py-3 sm:py-4">
            {/* Test Overview */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 sm:p-6 border-2 border-purple-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">16 Questions • 5 Skills</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Estimated time: 20-25 minutes</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                This placement test will assess your listening, reading, vocabulary, grammar, writing, and speaking skills.
                Your results will determine your starting level for personalized practice sessions.
              </p>
            </div>

            {/* Test Sections */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Test Sections:</h4>
              
              {/* Listening */}
              <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-sm sm:text-base text-purple-900">Listening (3 questions)</h5>
                  <p className="text-xs sm:text-sm text-gray-600">Listen to an AI-generated audio and answer 3 fill-in-the-blank questions</p>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">3 Q's</Badge>
              </div>

              {/* Reading */}
              <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-sm sm:text-base text-blue-900">Reading (3 questions)</h5>
                  <p className="text-xs sm:text-sm text-gray-600">Read a passage and answer 3 fill-in-the-blank questions</p>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">3 Q's</Badge>
              </div>

              {/* Vocabulary */}
              <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 bg-teal-50 rounded-lg border border-teal-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookMarked className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-sm sm:text-base text-teal-900">Vocabulary (3 questions)</h5>
                  <p className="text-xs sm:text-sm text-gray-600">Complete sentences with appropriate vocabulary</p>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">3 Q's</Badge>
              </div>

              {/* Grammar */}
              <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-sm sm:text-base text-cyan-900">Grammar (3 questions)</h5>
                  <p className="text-xs sm:text-sm text-gray-600">Fill in the blanks with correct grammar forms</p>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">3 Q's</Badge>
              </div>

              {/* Writing */}
              <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PenTool className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-sm sm:text-base text-green-900">Writing (1 question)</h5>
                  <p className="text-xs sm:text-sm text-gray-600">Write a short paragraph (50-100 words) on a given topic</p>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">1 Q</Badge>
              </div>

              {/* Speaking */}
              <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mic className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-sm sm:text-base text-orange-900">Speaking (3 questions)</h5>
                  <p className="text-xs sm:text-sm text-gray-600">Listen to AI avatar questions and record your spoken answers</p>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">3 Q's</Badge>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-3 sm:p-4 rounded">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <p className="font-semibold text-blue-900">Important Notes:</p>
                  <ul className="space-y-0.5 sm:space-y-1 text-gray-700 list-disc list-inside">
                    <li>You cannot go back to previous questions</li>
                    <li>For listening questions, audio will play automatically</li>
                    <li>For speaking questions, click the microphone to record your answer</li>
                    <li>Take your time and answer carefully</li>
                    <li>Your band score will be displayed at the end</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <Button 
              onClick={() => setShowInstructions(false)}
              className="w-full h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2"
              size="lg"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              Start Placement Test
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Results Screen
  if (showResults) {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalGradedQuestions = 12;
    const scorePercentage = (correctAnswers / totalGradedQuestions) * 100;
    const speakingScore = 70 + Math.random() * 20;
    const overallScore = (scorePercentage * 0.75) + (speakingScore * 0.25);
    const bandScore = calculateBandScore(overallScore);
    const level = calculateLevel(bandScore);

    return (
      <div className="min-h-[600px] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-bounce">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Test Complete!</CardTitle>
            <p className="text-gray-600">Analyzing your performance...</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Band Score */}
            <div className="text-center py-8 bg-white rounded-xl border-2 border-purple-200">
              <p className="text-gray-600 mb-2 text-lg">Your IELTS Band Score</p>
              <div className="text-7xl font-bold text-purple-600 mb-2">
                {bandScore.toFixed(1)}
              </div>
              <Badge className="bg-purple-600 text-white text-lg px-4 py-1">
                CEFR Level: {level}
              </Badge>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Written Skills</p>
                <p className="text-2xl font-bold text-blue-600">{scorePercentage.toFixed(0)}%</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-gray-600 mb-1">Speaking</p>
                <p className="text-2xl font-bold text-orange-600">{speakingScore.toFixed(0)}%</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-900 mb-1">What's Next?</p>
                  <p className="text-sm text-gray-700">
                    Your placement level has been set to <strong>{level}</strong>. You can now start practicing 
                    with personalized questions tailored to your proficiency level!
                  </p>
                </div>
              </div>
            </div>

            {/* Auto-redirect message */}
            <div className="text-center text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 inline mr-1 text-green-600" />
              Redirecting to Live Practice...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Test Interface
  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 py-3 sm:py-6 px-3 sm:px-4">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Badge className={
              sectionInfo.color === 'purple' ? 'bg-purple-600 text-white' :
              sectionInfo.color === 'blue' ? 'bg-blue-600 text-white' :
              sectionInfo.color === 'teal' ? 'bg-teal-600 text-white' :
              sectionInfo.color === 'cyan' ? 'bg-cyan-600 text-white' :
              sectionInfo.color === 'green' ? 'bg-green-600 text-white' :
              'bg-orange-600 text-white'
            }>
              {sectionInfo.label}
            </Badge>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-purple-600">
            {progress.toFixed(0)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-2 border-gray-200">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-2">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              sectionInfo.color === 'purple' ? 'bg-purple-600' :
              sectionInfo.color === 'blue' ? 'bg-blue-600' :
              sectionInfo.color === 'teal' ? 'bg-teal-600' :
              sectionInfo.color === 'cyan' ? 'bg-cyan-600' :
              sectionInfo.color === 'green' ? 'bg-green-600' :
              'bg-orange-600'
            }`}>
              <sectionInfo.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl">
                {sectionInfo.label} Question {currentQuestion.questionNumber}
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-500">
                {currentQuestion.type === 'listening' && 'Listen carefully and fill in the blank'}
                {currentQuestion.type === 'reading' && 'Read the passage and answer'}
                {currentQuestion.type === 'vocabulary' && 'Choose the correct word'}
                {currentQuestion.type === 'grammar' && 'Complete with correct grammar'}
                {currentQuestion.type === 'writing' && 'Write a paragraph response'}
                {currentQuestion.type === 'speaking' && 'Listen and record your response'}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">{/* Listening Section - Audio Player */}
          {currentQuestion.type === 'listening' && currentQuestion.questionNumber === 1 && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 sm:p-6 border-2 border-purple-200">
              <div className="space-y-3 sm:space-y-4">
                {/* Waveform Visualization */}
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-purple-200">
                  <div className="flex items-center justify-center gap-0.5 sm:gap-1 h-16 sm:h-20 mb-3">
                    {[...Array(30)].map((_, i) => {
                      const height = Math.random() * 60 + 20;
                      const delay = i * 0.05;
                      return (
                        <div
                          key={i}
                          className={`w-0.5 sm:w-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-full transition-all duration-300 ${audioPlaying ? 'animate-pulse' : ''}`}
                          style={{ 
                            height: audioPlaying ? `${height}%` : '20%',
                            animationDelay: `${delay}s`
                          }}
                        ></div>
                      );
                    })}
                  </div>

                  {/* Audio Player Controls */}
                  <div className="space-y-2 sm:space-y-3">
                    {/* Play Button and Time */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Button
                        onClick={playAudio}
                        disabled={audioPlaying}
                        size="lg"
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0 flex-shrink-0 ${audioPlaying ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} shadow-lg transition-all duration-300 ${audioPlaying ? 'animate-pulse' : 'hover:scale-110'}`}
                      >
                        {audioPlaying ? (
                          <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                            <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-white rounded"></div>
                            <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-white rounded"></div>
                          </div>
                        ) : (
                          <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white ml-0.5" fill="white" />
                        )}
                      </Button>

                      {/* Time Display */}
                      <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs sm:text-sm text-gray-700">
                        <span className={audioPlaying ? 'text-purple-600 font-semibold' : ''}>
                          {audioPlaying ? '0:05' : '0:00'}
                        </span>
                        <span className="text-gray-400">/</span>
                        <span>0:05</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex-1 relative group">
                        <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                          <div 
                            className={`h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-300 ${audioPlaying ? 'animate-pulse' : ''}`}
                            style={{ width: audioPlaying ? '100%' : '0%', transition: audioPlaying ? 'width 5s linear' : 'width 0.3s' }}
                          >
                            {/* Progress indicator */}
                            <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-600 rounded-full shadow-lg transition-all ${audioPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`}></div>
                          </div>
                        </div>
                      </div>

                      {/* Volume Control - Hidden on mobile */}
                      <div className="hidden md:flex items-center gap-2">
                        <Volume2 className="h-5 w-5 text-gray-600" />
                        <div className="w-12 lg:w-16 h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer group">
                          <div className="h-full w-3/4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full group-hover:from-purple-600 group-hover:to-purple-400 transition-all"></div>
                        </div>
                      </div>

                      {/* More Options - Hidden on mobile */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hidden sm:flex w-8 h-8 p-0 rounded-full hover:bg-purple-100"
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                        </div>
                      </Button>
                    </div>

                    {/* Audio Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${audioPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                          {audioPlaying ? 'Now Playing: Conference Announcement' : 'Conference Announcement - 5 seconds'}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs w-fit">
                        {audioPlaying ? 'PLAYING' : 'READY'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-purple-100 rounded-lg p-3 sm:p-4 border border-purple-300">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-purple-900 mb-1">Listening Instructions</p>
                      <p className="text-xs sm:text-sm text-gray-700">
                        {audioPlaying 
                          ? '🎧 Listen carefully to the audio. You can replay it at any time.'
                          : '▶️ Click the play button to start the audio. Listen carefully to answer the next 3 questions.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reading Section - Passage */}
          {currentQuestion.type === 'reading' && currentQuestion.passage && currentQuestion.questionNumber === 4 && (
            <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border-2 border-blue-200 mb-4 sm:mb-6">
              <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-900 flex items-center gap-2">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                Reading Passage
              </h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {currentQuestion.passage}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 italic">
                Read the passage above to answer the next 3 questions
              </p>
            </div>
          )}

          {/* Question Content */}
          <div className="space-y-4">
            <p className="text-base sm:text-lg font-medium text-gray-900">
              {currentQuestion.content}
            </p>

            {/* Speaking Question - Avatar & Recording */}
            {currentQuestion.type === 'speaking' ? (
              <div className="space-y-3 sm:space-y-4">
                {/* AI Avatar */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 sm:p-6 border-2 border-orange-200">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base sm:text-lg">AI Examiner</p>
                      <p className="text-xs sm:text-sm text-gray-600">Listen to the question</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={playSpokenQuestion}
                      disabled={audioPlaying}
                      className="w-full sm:w-auto"
                    >
                      <Volume2 className="h-4 w-4 mr-2" />
                      {audioPlaying ? 'Speaking...' : 'Play Question'}
                    </Button>
                  </div>
                </div>

                {/* Recording Interface */}
                <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-gray-200 text-center">
                  <div className="mb-4">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center mb-3 ${
                      isRecording 
                        ? 'bg-red-600 animate-pulse' 
                        : 'bg-gray-100'
                    }`}>
                      <Mic className={`h-8 w-8 sm:h-10 sm:w-10 ${isRecording ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <p className="font-semibold text-base sm:text-lg mb-1">
                      {isRecording ? 'Recording...' : 'Click to record your answer'}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {isRecording ? 'Speak clearly and naturally' : 'Aim for 1-2 minutes'}
                    </p>
                  </div>

                  {!isRecording && !recordedAnswer && (
                    <Button
                      onClick={startRecording}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 gap-2 w-full sm:w-auto"
                    >
                      <Mic className="h-5 w-5" />
                      Start Recording
                    </Button>
                  )}

                  {isRecording && (
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      variant="outline"
                      className="gap-2 w-full sm:w-auto"
                    >
                      <StopCircle className="h-5 w-5" />
                      Stop Recording
                    </Button>
                  )}

                  {recordedAnswer && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <p className="font-semibold text-green-900 text-sm sm:text-base">Recording Complete</p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 italic break-words">\"{recordedAnswer}\"</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setRecordedAnswer('');
                          startRecording();
                        }}
                        className="mt-2"
                      >
                        Re-record
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : currentQuestion.type === 'writing' ? (
              /* Writing Question - Textarea */
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <PenTool className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    <p className="text-xs sm:text-sm font-semibold text-green-900">Writing Tips:</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Aim for 50-100 words</li>
                    <li>Use complete sentences with proper grammar</li>
                    <li>Include specific details and examples</li>
                    <li>Express your ideas clearly</li>
                  </ul>
                </div>
                <Textarea
                  placeholder="Write your paragraph here... (50-100 words)"
                  className="text-sm sm:text-base min-h-[180px] sm:min-h-[200px] border-2 focus:border-green-500 resize-none"
                  value={currentSectionAnswers[0] || ''}
                  onChange={(e) => {
                    const newAnswers = [...currentSectionAnswers];
                    newAnswers[0] = e.target.value;
                    setCurrentSectionAnswers(newAnswers);
                  }}
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
                  <p className="text-gray-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    Click Next when you're satisfied with your answer
                  </p>
                  <p className="text-gray-600 font-medium">
                    {currentSectionAnswers[0]?.split(/\s+/).filter(w => w.length > 0).length || 0} words
                  </p>
                </div>
              </div>
            ) : (
              /* Fill in the Blank Input */
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Type your answer here..."
                  className="text-base sm:text-lg h-12 sm:h-14 border-2 focus:border-purple-500"
                  value={currentSectionAnswers[0] || ''}
                  onChange={(e) => {
                    const newAnswers = [...currentSectionAnswers];
                    newAnswers[0] = e.target.value;
                    setCurrentSectionAnswers(newAnswers);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && currentSectionAnswers[0]?.trim()) {
                      handleAnswer(currentSectionAnswers[0]);
                      nextQuestion();
                    }
                  }}
                />
                <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  Press Enter or click Next to submit your answer
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
          Section: {sectionInfo.label} • Question {currentQuestion.questionNumber}
        </div>
        <Button
          onClick={() => {
            if (currentQuestion.type === 'speaking') {
              if (recordedAnswer) {
                handleAnswer(recordedAnswer);
                nextQuestion();
              }
            } else if (currentSectionAnswers[0]?.trim()) {
              handleAnswer(currentSectionAnswers[0]);
              nextQuestion();
            }
          }}
          disabled={
            currentQuestion.type === 'speaking' 
              ? !recordedAnswer 
              : !currentSectionAnswers[0]?.trim()
          }
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 gap-2 w-full sm:w-auto sm:min-w-[140px] h-12 sm:h-auto"
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question'}
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
}