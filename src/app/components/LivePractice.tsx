import { useState } from 'react';
// استيراد المكونات القديمة
import { SkillSelection } from './live/SkillSelection';
import { ConfigurationPanel } from './live/ConfigurationPanel';
import { PracticeSession } from './live/PracticeSession';
import { ResultsAnalytics } from './live/ResultsAnalytics';
import { Dashboard } from './live/Dashboard';
import { PlacementTestFlow } from './live/PlacementTestFlow';
import { CategorySelection } from './live/CategorySelection';
import { PracticeHistoryPage } from './live/PracticeHistoryPage';
import { PhraseNotebook } from './PhraseNotebook';
import { ArrowLeft, PanelLeftClose, PanelLeft, BookMarked } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

// ✅ استيراد مدير المحادثة الجديد (تأكد من المسار)
import SpeakingManager from '../components/live/speaking/SpeakingManager'; // ✅ صحيح

// ✅ الأنواع (Types) - تأكد أنها متطابقة مع ملف types/LivePractice.ts
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
  studentName?: string; 
}

export interface Turn {
  id: string;
  who: "user" | "npc"; // أو "teacher" حسب ما تستخدم
  text: string;
  ts: number;
}

export interface SessionConfig {
  skill: SkillType;
  questionType?: QuestionType;
  level: Level;
  numberOfQuestions: number;
  topics: string[];
  questionTypes?: QuestionType[];
  targetBand?: number;       
  userProfileText?: string; 
  studentName?: string; 
}


export interface SessionResult {
  id: string;
  config: SessionConfig;
  score: number;
  totalQuestions: number;
  answers: Turn[]; // ✅ يفضل استخدام Turn[] بدلاً من any[]
  timestamp: Date;
  bandScore?: number;
  feedback?: string;
  suggestedLevel?: Level;
  nextTopics?: string[];
}

export function LivePractice() {
  const [step, setStep] = useState<'dashboard' | 'category' | 'skill' | 'config' | 'practice' | 'results' | 'placement-test' | 'dictionary' | 'history' | 'speaking-flow'>('dashboard');
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(true);
  
  // Placement test state
  const [hasCompletedPlacementTest, setHasCompletedPlacementTest] = useState(false);
  const [userLevel, setUserLevel] = useState<Level>('B1');
  const [userBandScore, setUserBandScore] = useState(5.5);
  
  // Mock Data (كما هي في كودك الأصلي)
  const [sessionHistory, setSessionHistory] = useState<SessionResult[]>([
    // ... (بياناتك الوهمية القديمة تبقى كما هي)
  ]);

  const handleStartPractice = () => {
    setStep('skill');
    setShowHistory(false);
  };

  const handleStartPracticeWithConfig = (config: Partial<SessionConfig>) => {
    const fullConfig: SessionConfig = {
      skill: config.skill as SkillType || 'listening',
      level: config.level as Level || 'B1',
      numberOfQuestions: config.numberOfQuestions || 10,
      topics: config.topics || [],
      questionTypes: config.questionTypes || []
    };
    setSelectedSkill(fullConfig.skill);
    
    // ✅ تعديل: إذا كانت المهارة speaking نذهب للوضع الخاص
    if (fullConfig.skill === 'speaking') {
        setStep('speaking-flow');
    } else {
        setSessionConfig(fullConfig);
        setShowHistory(false);
        setStep('practice');
    }
  };

  const handleSkillSelect = (skill: SkillType) => {
    setSelectedSkill(skill);
    // ✅ تعديل جوهري: التوجيه للمسار الخاص بالـ Speaking
    if (skill === 'speaking') {
        setStep('speaking-flow');
    } else {
        setStep('config');
    }
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
    if (config.skill === 'speaking') {
        setStep('speaking-flow');
    } else {
        setStep('practice');
    }
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
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Bar */}
          <div className="border-b bg-white px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
               {/* زر العودة للدشبورد يظهر دائماً إلا في الدشبورد نفسها */}
               {step !== 'dashboard' && (
                  <Button variant="ghost" size="sm" onClick={handleStartNew}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
               )}
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-semibold truncate">Live Practice</h1>
                {selectedSkill && step !== 'dashboard' && (
                  <p className="text-xs sm:text-sm text-gray-500 capitalize truncate">
                    {selectedSkill} Mode
                  </p>
                )}
              </div>
            </div>

            {/* أزرار إضافية */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
               {step !== 'dictionary' && (
                <Button variant="outline" onClick={handleOpenDictionary} size="sm" className="gap-2">
                  <BookMarked className="h-4 w-4" /> Dictionary
                </Button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
            <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 max-w-6xl">
              
              {/* ✅ عرض الـ Speaking Manager الجديد */}
              {step === 'speaking-flow' && (
                // هنا نقوم بتحميل المدير الذي أنشأناه سابقاً
                // هو سيتولى عملية الـ Setup -> Video -> Result داخلياً
                <SpeakingManager />
              )}

              {/* باقي الخطوات القديمة لباقي المهارات */}
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
              
              {/* هذا الكونفيج يظهر فقط للمهارات غير الـ Speaking */}
              {step === 'config' && selectedSkill && selectedSkill !== 'speaking' && (
                <ConfigurationPanel
                  skill={selectedSkill}
                  onComplete={handleConfigComplete}
                  onBack={() => setStep('skill')}
                />
              )}
              
              {/* جلسة التدريب لباقي المهارات */}
              {step === 'practice' && sessionConfig && selectedSkill !== 'speaking' && (
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
      </div>
    </div>
  );
}