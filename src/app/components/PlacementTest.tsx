import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import {
  CheckCircle2,
  BookOpen,
  Headphones,
  PenTool,
  Brain,
  Sparkles,
  Clock,
  Trophy,
  ArrowRight,
  BarChart3,
  AlertCircle,
  Target
} from 'lucide-react';
import type { SkillType, Level, SessionResult } from './LivePractice';

type TestMode = 'skill-selection' | 'testing' | 'results';

interface PlacementTestConfig {
  skills: SkillType[];
  numberOfQuestions: number;
}

interface TestResult {
  skill: SkillType;
  score: number;
  level: Level;
  bandScore: number;
}

export function PlacementTest() {
  const [mode, setMode] = useState<TestMode>('skill-selection');
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [startTime, setStartTime] = useState<Date | null>(null);

  const skillOptions = [
    {
      id: 'reading' as SkillType,
      name: 'Reading',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      description: 'Comprehension & Analysis',
      questions: 10
    },
    {
      id: 'listening' as SkillType,
      name: 'Listening',
      icon: Headphones,
      color: 'bg-purple-100 text-purple-700 border-purple-300',
      description: 'Audio Comprehension',
      questions: 8
    },
    {
      id: 'writing' as SkillType,
      name: 'Writing',
      icon: PenTool,
      color: 'bg-green-100 text-green-700 border-green-300',
      description: 'Essay & Task Response',
      questions: 2
    },
    {
      id: 'speaking' as SkillType,
      name: 'Speaking',
      icon: Brain,
      color: 'bg-orange-100 text-orange-700 border-orange-300',
      description: 'Oral Communication',
      questions: 5
    }
  ];

  const toggleSkill = (skillId: SkillType) => {
    setSelectedSkills(prev => 
      prev.includes(skillId)
        ? prev.filter(s => s !== skillId)
        : [...prev, skillId]
    );
  };

  const getTotalQuestions = () => {
    return selectedSkills.reduce((total, skillId) => {
      const skill = skillOptions.find(s => s.id === skillId);
      return total + (skill?.questions || 0);
    }, 0);
  };

  const startTest = () => {
    if (selectedSkills.length === 0) return;
    setMode('testing');
    setStartTime(new Date());
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const nextQuestion = () => {
    const total = getTotalQuestions();
    if (currentQuestionIndex < total - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    // Simulate test results
    const results: TestResult[] = selectedSkills.map(skill => {
      const baseScore = Math.floor(Math.random() * 30) + 65; // 65-95
      const level = getLevel(baseScore);
      const bandScore = getBandScore(baseScore);
      
      return {
        skill,
        score: baseScore,
        level,
        bandScore
      };
    });

    setTestResults(results);
    setMode('results');
  };

  const getLevel = (score: number): Level => {
    if (score >= 90) return 'C2';
    if (score >= 80) return 'C1';
    if (score >= 70) return 'B2';
    if (score >= 60) return 'B1';
    if (score >= 50) return 'A2';
    return 'A1';
  };

  const getBandScore = (score: number): number => {
    if (score >= 90) return 8.5;
    if (score >= 85) return 8.0;
    if (score >= 80) return 7.5;
    if (score >= 75) return 7.0;
    if (score >= 70) return 6.5;
    if (score >= 65) return 6.0;
    if (score >= 60) return 5.5;
    if (score >= 55) return 5.0;
    return 4.5;
  };

  const getOverallBandScore = (): number => {
    if (testResults.length === 0) return 0;
    const avg = testResults.reduce((sum, r) => sum + r.bandScore, 0) / testResults.length;
    return Math.round(avg * 2) / 2; // Round to nearest 0.5
  };

  const getOverallLevel = (): Level => {
    const bandScore = getOverallBandScore();
    if (bandScore >= 8.0) return 'C2';
    if (bandScore >= 7.0) return 'C1';
    if (bandScore >= 6.0) return 'B2';
    if (bandScore >= 5.0) return 'B1';
    if (bandScore >= 4.0) return 'A2';
    return 'A1';
  };

  const resetTest = () => {
    setMode('skill-selection');
    setSelectedSkills([]);
    setCurrentQuestionIndex(0);
    setTestResults([]);
    setAnswers({});
    setStartTime(null);
  };

  // Skill Selection Screen
  if (mode === 'skill-selection') {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">IELTS Placement Test</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover your English proficiency level. Select one or more skills to test, 
              and receive your CEFR level and IELTS band score.
            </p>
          </div>

          {/* Skill Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {skillOptions.map((skill) => {
              const Icon = skill.icon;
              const isSelected = selectedSkills.includes(skill.id);
              
              return (
                <Card 
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg ${skill.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{skill.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {skill.questions} questions
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => toggleSkill(skill.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="text-sm text-gray-600">
                            {isSelected ? 'Selected' : 'Select this skill'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Test Info & Start */}
          {selectedSkills.length > 0 && (
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ready to Start?</h3>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{selectedSkills.length} skill{selectedSkills.length > 1 ? 's' : ''} selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{getTotalQuestions()} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>No pausing allowed</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={startTest}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
                  >
                    Start Test
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedSkills.length === 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <p className="text-blue-900 font-medium mb-1">Select at least one skill to begin</p>
                <p className="text-sm text-blue-700">
                  Choose multiple skills for a comprehensive assessment or focus on specific areas
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Testing Screen
  if (mode === 'testing') {
    const totalQuestions = getTotalQuestions();
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Sample Question - Reading Comprehension
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                This is a placeholder question. In the actual placement test, 
                you would see real IELTS-style questions based on your selected skills.
              </p>
              
              <div className="space-y-3">
                {['Option A', 'Option B', 'Option C', 'Option D'].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[currentQuestionIndex] === option
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
              Previous
            </Button>
            <Button 
              onClick={nextQuestion}
              disabled={!answers[currentQuestionIndex]}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Warning */}
          <Card className="mt-6 bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-900">
                <p className="font-medium mb-1">Important Notice</p>
                <p className="text-yellow-800">
                  Once you submit your test, you cannot change your answers. 
                  Results will be shown only at the end with your final scores.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results Screen
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-4 animate-bounce">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Test Complete!</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are your results and recommended CEFR level
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <p className="text-sm uppercase tracking-wide opacity-90 mb-2">Overall IELTS Band Score</p>
            <div className="text-6xl font-bold mb-3">{getOverallBandScore().toFixed(1)}</div>
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-1">
              CEFR Level: {getOverallLevel()}
            </Badge>
          </CardContent>
        </Card>

        {/* Individual Skill Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testResults.map((result) => {
            const skillOption = skillOptions.find(s => s.id === result.skill);
            const Icon = skillOption?.icon || Target;
            
            return (
              <Card key={result.skill}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg ${skillOption?.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold capitalize mb-3">{result.skill}</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Score</p>
                          <p className="text-xl font-bold text-blue-600">{result.score}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Band</p>
                          <p className="text-xl font-bold text-purple-600">{result.bandScore.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Level</p>
                          <Badge variant="outline" className="text-sm px-2 py-1">
                            {result.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recommendations */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              Based on your performance, we recommend:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Focus on improving your weaker skills through targeted practice sessions</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Start with {getOverallLevel()} level materials and gradually increase difficulty</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Practice regularly using our Live Practice mode to track your progress</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={resetTest}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            Take Another Test
          </Button>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
          >
            <Target className="h-5 w-5" />
            Start Practice Sessions
          </Button>
        </div>
      </div>
    </div>
  );
}