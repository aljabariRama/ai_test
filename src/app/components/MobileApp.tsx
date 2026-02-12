import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import {
  Home,
  Target,
  BookMarked,
  User,
  Award,
  Star,
  Flame,
  TrendingUp,
  Clock,
  Zap,
  ChevronRight,
  Bell,
  Settings,
  Play,
  Headphones,
  Mic,
  PenTool,
  BookOpen,
  Globe,
  Calendar,
  CheckCircle2,
  BarChart3,
  Trophy,
  MessageSquare,
  Sparkles,
  Volume2,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

type Screen = 'home' | 'practice' | 'notebook' | 'progress' | 'profile';

export function MobileApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  // Mock data
  const dailyStreak = 12;
  const todayProgress = 65;
  const currentLevel = 'B2';
  const targetLevel = 'C2';
  const wordsLearned = 450;
  const practiceTime = 127; // minutes

  const quickPractice = [
    {
      id: 'speaking',
      title: 'Speaking',
      subtitle: '5 min practice',
      icon: Mic,
      color: 'from-blue-500 to-blue-600',
      progress: 40
    },
    {
      id: 'listening',
      title: 'Listening',
      subtitle: '10 min practice',
      icon: Headphones,
      color: 'from-purple-500 to-purple-600',
      progress: 70
    },
    {
      id: 'writing',
      title: 'Writing',
      subtitle: '15 min practice',
      icon: PenTool,
      color: 'from-pink-500 to-pink-600',
      progress: 30
    },
    {
      id: 'reading',
      title: 'Reading',
      subtitle: '8 min practice',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      progress: 85
    }
  ];

  const recentWords = [
    { word: 'Quintessential', translation: 'جوهري', learned: true },
    { word: 'Ephemeral', translation: 'مؤقت', learned: true },
    { word: 'Serendipity', translation: 'صدفة سعيدة', learned: false },
    { word: 'Eloquent', translation: 'فصيح', learned: true }
  ];

  const achievements = [
    { title: '7-Day Streak', icon: Flame, unlocked: true },
    { title: '100 Words', icon: BookMarked, unlocked: true },
    { title: 'Speaking Master', icon: Mic, unlocked: false },
    { title: 'Top Learner', icon: Trophy, unlocked: false }
  ];

  const renderHomeScreen = () => (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hello, Khaled 👋</h1>
            <p className="text-blue-100 text-sm">Ready to practice today?</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Streak Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Flame className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dailyStreak} Day Streak</p>
                  <p className="text-blue-100 text-sm">Keep it going!</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Progress */}
      <div className="px-4 -mt-4 mb-6">
        <Card className="shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Today's Goal</h3>
              <span className="text-sm font-medium text-blue-600">{todayProgress}%</span>
            </div>
            <Progress value={todayProgress} className="h-3 mb-3" />
            <p className="text-sm text-gray-600">6.5 / 10 minutes completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Practice */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Quick Practice</h2>
          <button className="text-sm text-blue-600 font-medium">See All</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickPractice.map((practice) => {
            const Icon = practice.icon;
            return (
              <Card
                key={practice.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPractice(practice.id)}
              >
                <CardContent className="p-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${practice.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{practice.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{practice.subtitle}</p>
                  <Progress value={practice.progress} className="h-1.5" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Continue Learning */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Continue Learning</h2>
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Live Practice</p>
                <h3 className="text-xl font-bold mb-2">IELTS Speaking Part 2</h3>
                <p className="text-purple-100 text-sm">8 minutes left</p>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="h-7 w-7" />
              </div>
            </div>
            <Progress value={65} className="h-2 mt-4 bg-white/20" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Words */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Words</h2>
          <button className="text-sm text-blue-600 font-medium">See All</button>
        </div>
        <div className="space-y-2">
          {recentWords.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{item.word}</p>
                    <p className="text-sm text-gray-600">{item.translation}</p>
                  </div>
                  {item.learned ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Star className="h-6 w-6 text-gray-400" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPracticeScreen = () => (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Live Practice</h1>
        <p className="text-sm text-gray-600">Choose your practice mode</p>
      </div>

      <div className="p-4 space-y-4">
        {/* IELTS Practice */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">IELTS Practice</h3>
                <p className="text-sm text-gray-600">Full test simulation</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <Headphones className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-700">Listening</p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg text-center">
                <BookOpen className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-700">Reading</p>
              </div>
              <div className="bg-pink-50 p-2 rounded-lg text-center">
                <PenTool className="h-5 w-5 text-pink-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-700">Writing</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg text-center">
                <Mic className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-700">Speaking</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Chat Practice */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">AI Chat</h3>
                  <p className="text-sm text-gray-600">Conversational practice</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Speaking Practice */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Mic className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Speaking Test</h3>
                  <p className="text-sm text-gray-600">Voice recognition AI</p>
                </div>
              </div>
              <Badge className="bg-green-600">New</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Placement Test */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Placement Test</h3>
                  <p className="text-sm text-gray-600">Find your level</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Practice History */}
        <div className="pt-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Sessions</h2>
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">IELTS Speaking Part 1</p>
                    <p className="text-sm text-gray-600">Yesterday at 3:45 PM</p>
                  </div>
                  <Badge className="bg-blue-600">8.0</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>15 minutes</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">Writing Task 2</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                  <Badge className="bg-purple-600">7.5</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>40 minutes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotebookScreen = () => (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Phrase Notebook</h1>
            <p className="text-purple-100 text-sm">Your personalized vocabulary</p>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <p className="text-purple-100 text-sm mb-1">Words Learned</p>
              <p className="text-3xl font-bold">{wordsLearned}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <p className="text-purple-100 text-sm mb-1">Next Update</p>
              <p className="text-3xl font-bold">2d</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Level Progress */}
      <div className="px-4 -mt-4 mb-6">
        <Card className="shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Progress</p>
                <p className="text-2xl font-bold text-gray-900">{currentLevel} → {targetLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">68%</p>
              </div>
            </div>
            <Progress value={68} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Today's Words */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Today's Words</h2>
          <Badge className="bg-purple-600">5 New</Badge>
        </div>
        <div className="space-y-3">
          {[
            { word: 'Paradigm', translation: 'نموذج', example: 'A shift in paradigm', difficulty: 'C1' },
            { word: 'Ubiquitous', translation: 'منتشر في كل مكان', example: 'Smartphones are ubiquitous', difficulty: 'C1' },
            { word: 'Meticulous', translation: 'دقيق جدا', example: 'He was meticulous in his work', difficulty: 'B2' }
          ].map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.word}</h3>
                      <Badge variant="outline" className="text-xs">{item.difficulty}</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{item.translation}</p>
                    <p className="text-sm text-gray-500 italic">"{item.example}"</p>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Volume2 className="h-5 w-5 text-blue-600" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Mic className="h-4 w-4" />
                    Practice
                  </Button>
                  <Button size="sm" className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Learned
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Topics */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Your Topics</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'General Conversation',
            'Work & Career',
            'Hobbies',
            'Current Events',
            'Personal Experience',
            'Business',
            'Technology',
            'Travel',
            'Healthcare',
            'Science',
            'Education',
            'Environment',
            'Sports & Fitness',
            'Food & Cooking',
            'Arts & Culture'
          ].map((topic) => (
            <Badge key={topic} variant="outline" className="px-4 py-2 text-sm">
              {topic}
            </Badge>
          ))}
          <Badge variant="outline" className="px-4 py-2 text-sm text-blue-600 border-blue-600">
            + Add Topic
          </Badge>
        </div>
      </div>
    </div>
  );

  const renderProgressScreen = () => (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-sm text-gray-600">Track your learning journey</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <BarChart3 className="h-8 w-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold mb-1">{practiceTime}</p>
              <p className="text-sm text-blue-100">Minutes practiced</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <BookMarked className="h-8 w-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold mb-1">{wordsLearned}</p>
              <p className="text-sm text-purple-100">Words mastered</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <Flame className="h-8 w-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold mb-1">{dailyStreak}</p>
              <p className="text-sm text-orange-100">Day streak</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <Trophy className="h-8 w-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold mb-1">8.0</p>
              <p className="text-sm text-green-100">Average score</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-gray-900 mb-4">Weekly Activity</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {[40, 65, 80, 90, 70, 85, 95].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-100 rounded-t-lg relative" style={{ height: `${height}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg" />
                  </div>
                  <span className="text-xs text-gray-600">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Breakdown */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-gray-900 mb-4">Skills Breakdown</h3>
            <div className="space-y-4">
              {[
                { skill: 'Speaking', score: 8.0, color: 'bg-blue-600' },
                { skill: 'Listening', score: 7.5, color: 'bg-purple-600' },
                { skill: 'Reading', score: 8.5, color: 'bg-pink-600' },
                { skill: 'Writing', score: 7.0, color: 'bg-green-600' }
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                    <span className="text-sm font-bold text-gray-900">{item.score}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${(item.score / 9) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Achievements</h3>
              <span className="text-sm text-gray-600">2/4 Unlocked</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="text-center">
                    <div
                      className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-2 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                          : 'bg-gray-200'
                      }`}
                    >
                      <Icon className={`h-7 w-7 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <p className={`text-xs ${achievement.unlocked ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                      {achievement.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-indigo-100 text-sm mb-1">Current Level</p>
                <p className="text-3xl font-bold">{currentLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-indigo-100 text-sm mb-1">Target</p>
                <p className="text-3xl font-bold">{targetLevel}</p>
              </div>
            </div>
            <Progress value={68} className="h-3 bg-white/20 mb-2" />
            <p className="text-sm text-indigo-100">68% to next level</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProfileScreen = () => (
    <div className="flex-1 overflow-auto pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
            KN
          </div>
          <div>
            <h1 className="text-2xl font-bold">Khaled Naser</h1>
            <p className="text-blue-100">khaled00@kasselsoft.com</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
            <p className="text-2xl font-bold">{dailyStreak}</p>
            <p className="text-blue-100 text-sm">Day Streak</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
            <p className="text-2xl font-bold">8.0</p>
            <p className="text-blue-100 text-sm">Band Score</p>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
            <p className="text-2xl font-bold">{currentLevel}</p>
            <p className="text-blue-100 text-sm">Level</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 -mt-6 space-y-3">
        <Card className="shadow-lg">
          <CardContent className="p-0">
            {[
              { icon: User, label: 'Account Settings', badge: null },
              { icon: Globe, label: 'Learning Language', badge: 'English' },
              { icon: Sparkles, label: 'Upgrade to Premium', badge: 'New' },
              { icon: Bell, label: 'Notifications', badge: null },
              { icon: Calendar, label: 'Study Schedule', badge: null },
              { icon: Settings, label: 'App Settings', badge: null }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index}>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <Badge className={item.badge === 'New' ? 'bg-green-600' : 'bg-gray-200 text-gray-700'}>
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>
                  {index < 5 && <div className="h-px bg-gray-100" />}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardContent className="p-0">
            {[
              { icon: MessageSquare, label: 'Help & Support' },
              { icon: BookOpen, label: 'About LinguaAI' },
              { icon: Star, label: 'Rate the App' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index}>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                  {index < 2 && <div className="h-px bg-gray-100" />}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
          Sign Out
        </Button>

        {/* Version */}
        <p className="text-center text-sm text-gray-500 pb-4">Version 2.5.0</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen bg-white flex flex-col relative shadow-2xl">
      {/* Status Bar (iOS style) */}
      <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between text-xs">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
          </div>
          <div className="ml-1 text-gray-900">100%</div>
        </div>
      </div>

      {/* Screen Content */}
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'practice' && renderPracticeScreen()}
      {currentScreen === 'notebook' && renderNotebookScreen()}
      {currentScreen === 'progress' && renderProgressScreen()}
      {currentScreen === 'profile' && renderProfileScreen()}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { id: 'home' as Screen, icon: Home, label: 'Home' },
            { id: 'practice' as Screen, icon: Target, label: 'Practice' },
            { id: 'notebook' as Screen, icon: BookMarked, label: 'Notebook' },
            { id: 'progress' as Screen, icon: BarChart3, label: 'Progress' },
            { id: 'profile' as Screen, icon: User, label: 'Profile' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentScreen === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentScreen(tab.id)}
                className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-all ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                  <Icon className="h-6 w-6" />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                  )}
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}