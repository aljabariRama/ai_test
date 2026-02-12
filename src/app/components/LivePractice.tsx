import { useState } from 'react';
import { SkillSelection } from './live/SkillSelection';
import { ConfigurationPanel } from './live/ConfigurationPanel';
import { PracticeSession } from './live/PracticeSession';
import { ResultsAnalytics } from './live/ResultsAnalytics';
import { ChatHistory } from './live/ChatHistory';
import { Dashboard } from './live/Dashboard';
import { PlacementTestFlow } from './live/PlacementTestFlow';
import { CategorySelection } from './live/CategorySelection';
import { PracticeHistoryPage } from './live/PracticeHistoryPage';
import { PhraseNotebook } from './PhraseNotebook';
import { ArrowLeft, PanelLeftClose, PanelLeft, BookMarked } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export type SkillType = 'listening' | 'reading' | 'writing' | 'grammar' | 'vocabulary' | 'speaking';
export type QuestionType = 'fill-blank' | 'mcq' | 'drag-drop';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface SessionConfig {
  skill: SkillType;
  questionType?: QuestionType;
  level: Level;
  numberOfQuestions: number;
  topics: string[];
  questionTypes?: QuestionType[];
   targetBand?: number;       
   userProfileText?: string; 
}

export interface SessionResult {
  id: string;
  config: SessionConfig;
  score: number;
  totalQuestions: number;
  answers: any[];
  timestamp: Date;
  bandScore?: number;
  feedback?: string;
  suggestedLevel?: Level;
  nextTopics?: string[];
}

export function LivePractice() {
  const [step, setStep] = useState<'dashboard' | 'category' | 'skill' | 'config' | 'practice' | 'results' | 'placement-test' | 'dictionary' | 'history'>('dashboard');
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(true);
  
  // Placement test state
  const [hasCompletedPlacementTest, setHasCompletedPlacementTest] = useState(false);
  const [userLevel, setUserLevel] = useState<Level>('B1');
  const [userBandScore, setUserBandScore] = useState(5.5);
  
  // Example/Mock session history (pre-filled like ChatGPT)
  const [sessionHistory, setSessionHistory] = useState<SessionResult[]>([
    {
      id: '8',
      config: {
        skill: 'speaking',
        level: 'B2',
        numberOfQuestions: 5,
        topics: ['Technology', 'Innovation']
      },
      score: 78,
      totalQuestions: 5,
      answers: [],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      bandScore: 6.5,
    },
    {
      id: '7',
      config: {
        skill: 'reading',
        level: 'B2',
        numberOfQuestions: 10,
        topics: ['Environment', 'Climate Change']
      },
      score: 85,
      totalQuestions: 10,
      answers: [],
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      bandScore: 7.0,
    },
    {
      id: '6',
      config: {
        skill: 'listening',
        level: 'B1',
        numberOfQuestions: 8,
        topics: ['Travel', 'Tourism']
      },
      score: 72,
      totalQuestions: 8,
      answers: [],
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      bandScore: 6.0,
    },
    {
      id: '5',
      config: {
        skill: 'vocabulary',
        level: 'B2',
        numberOfQuestions: 15,
        topics: ['Business', 'Economics']
      },
      score: 88,
      totalQuestions: 15,
      answers: [],
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      bandScore: 7.5,
    },
    {
      id: '4',
      config: {
        skill: 'grammar',
        level: 'B1',
        numberOfQuestions: 12,
        topics: ['Past Tenses', 'Present Perfect']
      },
      score: 65,
      totalQuestions: 12,
      answers: [],
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      bandScore: 5.5,
    },
    {
      id: '3',
      config: {
        skill: 'writing',
        level: 'B2',
        numberOfQuestions: 2,
        topics: ['Education', 'Society']
      },
      score: 82,
      totalQuestions: 2,
      answers: [],
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      bandScore: 6.5,
    },
    {
      id: '2',
      config: {
        skill: 'reading',
        level: 'C1',
        numberOfQuestions: 10,
        topics: ['Science', 'Research', 'Innovation']
      },
      score: 91,
      totalQuestions: 10,
      answers: [],
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      bandScore: 8.0,
    },
    {
      id: '1',
      config: {
        skill: 'listening',
        level: 'B2',
        numberOfQuestions: 10,
        topics: ['Health', 'Fitness', 'Lifestyle']
      },
      score: 76,
      totalQuestions: 10,
      answers: [],
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      bandScore: 6.5,
    },
    {
      id: '0',
      config: {
        skill: 'speaking',
        level: 'B1',
        numberOfQuestions: 5,
        topics: ['Daily Routine', 'Hobbies']
      },
      score: 70,
      totalQuestions: 5,
      answers: [],
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      bandScore: 6.0,
    },
  ]);

  const handleStartPractice = () => {
    setStep('skill');
    setShowHistory(false);
  };

  const handleStartPracticeWithConfig = (config: Partial<SessionConfig>) => {
    // Start practice with a predefined configuration
    const fullConfig: SessionConfig = {
      skill: config.skill as SkillType || 'listening',
      level: config.level as Level || 'B1',
      numberOfQuestions: config.numberOfQuestions || 10,
      topics: config.topics || [],
      questionTypes: config.questionTypes || []
    };
    setSelectedSkill(fullConfig.skill);
    setSessionConfig(fullConfig);
    setShowHistory(false);
    setStep('practice');
  };

  const handleSkillSelect = (skill: SkillType) => {
    setSelectedSkill(skill);
    setStep('config');
  };

  const handleConfigComplete = (config: SessionConfig) => {
    setSessionConfig(config);
    setStep('practice');
  };

  const handleSessionComplete = (result: SessionResult) => {
    setSessionHistory([result, ...sessionHistory]);
    setStep('results');
    setCurrentSession(result);
  };

  const handleStartNew = () => {
    setStep('dashboard');
    setSelectedSkill(null);
    setSessionConfig(null);
    setCurrentSession(null);
  };

  const handlePlacementTestComplete = (bandScore: number, level: Level) => {
    setHasCompletedPlacementTest(true);
    setUserBandScore(bandScore);
    setUserLevel(level);
    setStep('category');
  };

  const handleCategorySelect = (category: 'skills' | 'components' | 'exam-prep') => {
    setStep('skill');
  };

  const handleLoadSession = (config: SessionConfig) => {
    setSessionConfig(config);
    setSelectedSkill(config.skill);
    setStep('practice');
  };

  const handleOpenDictionary = () => {
    setStep('dictionary');
  };

  const handleStartPlacementTest = () => {
    setStep('placement-test');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 max-w-7xl">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="border-b bg-white px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {step !== 'history' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowHistory(!showHistory)}
                  className="lg:hidden shrink-0"
                >
                  {showHistory ? (
                    <PanelLeftClose className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <PanelLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </Button>
              )}
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-semibold truncate">Live Practice</h1>
                {step !== 'dashboard' && step !== 'skill' && step !== 'placement-test' && step !== 'dictionary' && (
                  <p className="text-xs sm:text-sm text-gray-500 capitalize truncate">
                    {selectedSkill && `${selectedSkill} • ${sessionConfig?.level || ''}`}
                  </p>
                )}
              </div>
              {hasCompletedPlacementTest && step === 'dashboard' && (
                <Badge className="bg-purple-600 text-white ml-1 sm:ml-2 text-xs hidden sm:inline-flex">
                  Level: {userLevel} • Band {userBandScore.toFixed(1)}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Dictionary Button */}
              {step !== 'dictionary' && (
                <Button
                  variant="outline"
                  onClick={handleOpenDictionary}
                  className="gap-1 sm:gap-2"
                  size="sm"
                >
                  <BookMarked className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden md:inline text-xs sm:text-sm">My Dictionary</span>
                </Button>
              )}
              {step !== 'dashboard' && (
                <Button
                  variant="outline"
                  onClick={handleStartNew}
                  className="gap-1 sm:gap-2"
                  size="sm"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden md:inline text-xs sm:text-sm">Dashboard</span>
                </Button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
            <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 max-w-6xl">
              {step === 'placement-test' && (
                <PlacementTestFlow onComplete={handlePlacementTestComplete} />
              )}

              {step === 'dictionary' && (
                <PhraseNotebook />
              )}

              {step === 'dashboard' && (
                <Dashboard 
                  onStartPractice={handleStartPractice}
                  sessionHistory={sessionHistory}
                  onStartPlacementTest={handleStartPlacementTest}
                  onStartPracticeWithConfig={handleStartPracticeWithConfig}
                  onViewHistory={() => setStep('history')}
                />
              )}

              {step === 'history' && (
                <PracticeHistoryPage
                  sessionHistory={sessionHistory}
                  onBack={() => setStep('dashboard')}
                />
              )}

              {step === 'category' && (
                <CategorySelection onSelect={handleCategorySelect} />
              )}

              {step === 'skill' && (
                <SkillSelection onSelect={handleSkillSelect} />
              )}
              
              {step === 'config' && selectedSkill && (
                <ConfigurationPanel
                  skill={selectedSkill}
                  onComplete={handleConfigComplete}
                  onBack={() => setStep('skill')}
                />
              )}
              
              {step === 'practice' && sessionConfig && (
                <PracticeSession
                  config={sessionConfig}
                  onComplete={handleSessionComplete}
                />
              )}
              
              {step === 'results' && currentSession && (
                <ResultsAnalytics
                  result={currentSession}
                  onStartNew={handleStartNew}
                />
              )}
            </div>
          </div>
        </div>

        {/* ChatGPT-Style Sidebar */}
        {/* {step !== 'history' && (
          <div className={`${
            showHistory ? 'w-80' : 'w-0'
          } transition-all duration-300 overflow-hidden border-l hidden lg:block`}>
            <ChatHistory
              history={sessionHistory}
              onLoadSession={handleLoadSession}
              isVisible={showHistory}
              onToggle={() => setShowHistory(!showHistory)}
              onReturnToDashboard={handleStartNew}
            />
          </div>
        )} */}

        {/* Mobile Sidebar Overlay
        {showHistory && step !== 'history' && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowHistory(false)}>
            <div 
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ChatHistory
                history={sessionHistory}
                onLoadSession={handleLoadSession}
                isVisible={showHistory}
                onToggle={() => setShowHistory(!showHistory)}
                onReturnToDashboard={handleStartNew}
              />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}