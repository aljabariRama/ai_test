import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { UdemyStyleVideosV2 } from './UdemyStyleVideosV2';
import { useState } from 'react';
import { 
  Play, 
  Crosshair, 
  TrendingUp,
  BookOpen,
  Headphones,
  PenTool,
  Sparkles,
  Globe,
  Mic,
  BarChart3,
  Award,
  Calendar,
  Brain,
  ArrowRight,
  Zap,
  Video,
  Clock,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SessionResult } from '../LivePractice';

interface DashboardProps {
  onStartPractice: () => void;
  sessionHistory: SessionResult[];
  onStartPlacementTest?: () => void;
  onStartPracticeWithConfig?: (config: any) => void;
  onViewHistory?: () => void;
}

export function Dashboard({ onStartPractice, sessionHistory, onStartPlacementTest, onStartPracticeWithConfig, onViewHistory }: DashboardProps) {
  const [isVideosModalOpen, setIsVideosModalOpen] = useState(false);
  
  // Mock user data - in real app, this would come from props or API
  const userName = 'tasneem';
  const currentBand = 5.5;
  const targetBand = 7.5;

  // Helper function to format time ago
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Helper function to format days ago
  const formatDaysAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const days = Math.floor(diff / 86400000);
    
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months === 1) return '1 month ago';
    return `${months} months ago`;
  };

  // Calculate skill-specific band scores from session history
  const calculateSkillBands = () => {
    const skills = ['reading', 'listening', 'writing', 'speaking', 'grammar', 'vocabulary'];
    const skillData: Record<string, { score: number; count: number }> = {};

    skills.forEach(skill => {
      skillData[skill] = { score: 0, count: 0 };
    });

    sessionHistory.forEach(session => {
      const skill = session.config.skill;
      if (skillData[skill]) {
        skillData[skill].score += session.bandScore || 0;
        skillData[skill].count += 1;
      }
    });

    return skills.map(skill => {
      const data = skillData[skill];
      const avgBand = data.count > 0 ? data.score / data.count : 5 + Math.random() * 2;
      const percentage = Math.round((avgBand / 9) * 100);
      return {
        skill,
        band: parseFloat(avgBand.toFixed(1)),
        percentage
      };
    });
  };

  const skillScores = calculateSkillBands();

  // Generate band score progress data for the chart (daily)
  const generateProgressData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const dailyData = [];
    
    // Generate data for the last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];
      
      // Calculate score based on actual sessions for that day or use progressive mock data
      const sessionsOnDay = sessionHistory.filter(session => {
        const sessionDate = new Date(session.timestamp);
        return sessionDate.toDateString() === date.toDateString();
      });
      
      let score;
      if (sessionsOnDay.length > 0) {
        // Average band score for the day
        const avgBand = sessionsOnDay.reduce((sum, s) => sum + (s.bandScore || 5.5), 0) / sessionsOnDay.length;
        score = parseFloat(avgBand.toFixed(1));
      } else {
        // Progressive mock data if no sessions
        score = parseFloat((5.0 + ((6 - i) * 0.15)).toFixed(1));
      }
      
      dailyData.push({
        day: dayName,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score
      });
    }
    
    return dailyData;
  };

  const progressData = generateProgressData();

  // Calculate this week's sessions
  const thisWeekSessions = sessionHistory.filter(session => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return session.timestamp >= weekAgo;
  }).length;

  const skillIcons: Record<string, any> = {
    reading: BookOpen,
    listening: Headphones,
    writing: PenTool,
    speaking: Mic,
    grammar: Sparkles,
    vocabulary: Globe
  };

  const skillColors: Record<string, { icon: string; bg: string; progress: string }> = {
    reading: { icon: 'text-blue-600', bg: 'bg-blue-50', progress: 'bg-blue-600' },
    listening: { icon: 'text-purple-600', bg: 'bg-purple-50', progress: 'bg-purple-600' },
    writing: { icon: 'text-pink-600', bg: 'bg-pink-50', progress: 'bg-pink-600' },
    speaking: { icon: 'text-purple-600', bg: 'bg-purple-50', progress: 'bg-purple-600' },
    grammar: { icon: 'text-cyan-600', bg: 'bg-cyan-50', progress: 'bg-cyan-600' },
    vocabulary: { icon: 'text-teal-600', bg: 'bg-teal-50', progress: 'bg-teal-600' }
  };

  // AI Recommendations based on performance
  const getAIRecommendations = () => {
    // Find weakest skills
    const sortedSkills = [...skillScores].sort((a, b) => a.band - b.band);
    const weakestSkill = sortedSkills[0];
    const secondWeakest = sortedSkills[1];
    
    const recommendations = [];

    // Recommendation based on weakest skill
    if (weakestSkill.band < 6.0) {
      const Icon = skillIcons[weakestSkill.skill];
      recommendations.push({
        icon: Icon,
        title: `Focus on ${weakestSkill.skill.charAt(0).toUpperCase() + weakestSkill.skill.slice(1)}`,
        description: `Your ${weakestSkill.skill} score is ${weakestSkill.band}. Practice more to reach Band 6.0 and improve your overall score.`,
        action: `Practice ${weakestSkill.skill}`,
        priority: 'high',
        skill: weakestSkill.skill,
        color: skillColors[weakestSkill.skill]
      });
    }

    // Recommendation for consistency
    if (sessionHistory.length > 0 && thisWeekSessions < 3) {
      recommendations.push({
        icon: Calendar,
        title: 'Maintain Consistency',
        description: `You've practiced ${thisWeekSessions} time${thisWeekSessions !== 1 ? 's' : ''} this week. Aim for at least 5 sessions weekly for optimal progress.`,
        action: 'Start Daily Practice',
        priority: 'medium',
        skill: null,
        color: { icon: 'text-orange-600', bg: 'bg-orange-50', progress: 'bg-orange-600' }
      });
    }

    // Recommendation for balanced practice
    const unpracticedSkills = skillScores.filter(s => 
      !sessionHistory.some(h => h.config.skill === s.skill)
    );
    if (unpracticedSkills.length > 0) {
      const skill = unpracticedSkills[0].skill;
      const Icon = skillIcons[skill];
      recommendations.push({
        icon: Icon,
        title: 'Try a New Skill',
        description: `You haven't practiced ${skill} yet. A well-rounded approach to all skills will help you achieve your target band faster.`,
        action: `Explore ${skill}`,
        priority: 'low',
        skill: skill,
        color: skillColors[skill]
      });
    }

    // Level up recommendation
    if (weakestSkill.band >= 6.5 && sortedSkills[sortedSkills.length - 1].band >= 7.0) {
      recommendations.push({
        icon: TrendingUp,
        title: 'Ready for Next Level',
        description: `Your performance is strong across multiple skills. Consider moving to a higher CEFR level (${secondWeakest.band >= 6.5 ? 'C1' : 'B2'}) to challenge yourself.`,
        action: 'Level Up',
        priority: 'high',
        skill: null,
        color: { icon: 'text-green-600', bg: 'bg-green-50', progress: 'bg-green-600' }
      });
    }

    return recommendations.slice(0, 2); // Return top 2 recommendations
  };

  const aiRecommendations = getAIRecommendations();

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 px-2 sm:px-0">
      {/* Welcome Section */}
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-gray-500 text-sm sm:text-base lg:text-lg">Continue your IELTS preparation journey</p>
      </div>

      {/* Current Band & Quick Actions */}
      <div className="grid lg:grid-cols-[340px_1fr] gap-3 sm:gap-4">
        {/* Current Band Card */}
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-purple-700 text-sm sm:text-base">
              <Award className="h-4 w-4 sm:h-5 sm:w-5" />
              Current Band
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-600 mb-2">
                {currentBand.toFixed(1)}
              </div>
              <p className="text-gray-600 font-medium text-sm">Overall IELTS Band</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Target:</span>
                <span className="font-bold">{targetBand.toFixed(1)}</span>
              </div>
              <div className="relative h-3 bg-purple-100 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all"
                  style={{ width: `${(currentBand / targetBand) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                {((currentBand / targetBand) * 100).toFixed(0)}% to your goal
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onStartPractice}
              className="flex-1 h-14 sm:h-16 text-base sm:text-lg bg-purple-600 hover:bg-purple-700 gap-3"
            >
              <Play className="h-5 w-5 fill-white" />
              Start Practice
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsVideosModalOpen(true)}
              className="flex-1 h-14 sm:h-16 text-base sm:text-lg gap-3 border-2 hover:border-blue-500 hover:bg-blue-50"
            >
              <Video className="h-5 w-5" />
              Videos
            </Button>
            <Button 
              variant="outline"
              onClick={onStartPlacementTest}
              className="flex-1 h-14 sm:h-16 text-base sm:text-lg gap-3"
            >
              <Crosshair className="h-5 w-5" />
              Placement Test
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Skills Overview */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold">Skills Overview</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {skillScores.map(({ skill, band, percentage }) => {
            const Icon = skillIcons[skill];
            const colors = skillColors[skill];
            
            return (
              <Card key={skill} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.icon}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold capitalize text-base sm:text-lg">{skill}</h3>
                        <p className="text-xl sm:text-2xl font-bold">{band}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {percentage}%
                    </Badge>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`absolute inset-y-0 left-0 ${colors.progress} rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Band Score Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp className="h-5 w-5" />
            Band Score Progress
          </CardTitle>
          <p className="text-sm text-gray-500">Daily performance over the last week</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  domain={[0, 9]} 
                  ticks={[0, 3, 6, 9]}
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#7c3aed" 
                  strokeWidth={3}
                  dot={{ fill: '#7c3aed', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* This Week Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <BarChart3 className="h-5 w-5" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-gray-600 text-sm sm:text-base">Sessions</span>
            <span className="text-4xl sm:text-5xl font-bold ml-auto">{thisWeekSessions}</span>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Recommendations
              </CardTitle>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                Personalized
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">Based on your performance analysis</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-xl border-2 ${
                    rec.priority === 'high' ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-red-50' :
                    rec.priority === 'medium' ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50' :
                    'border-green-300 bg-gradient-to-r from-green-50 to-teal-50'
                  } p-4 sm:p-5`}
                >
                  {/* Priority Badge */}
                  {rec.priority === 'high' && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        High Priority
                      </Badge>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${rec.color.bg} flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-200`}>
                      <rec.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${rec.color.icon}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg mb-1 text-gray-900">
                        {rec.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">
                        {rec.description}
                      </p>
                      <Button 
                        onClick={onStartPractice}
                        size="sm"
                        className={`gap-2 font-semibold shadow-sm ${rec.color.progress} hover:opacity-90 transition-all`}
                      >
                        {rec.action}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
 {/* Start Practice – Videos Section */}
      <Card 
        className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 via-white to-purple-50 cursor-pointer hover:shadow-xl transition-all group"
        onClick={() => setIsVideosModalOpen(true)}
      >
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  Videos
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                    62 Lessons
                  </Badge>
                </h2>
                <p className="text-gray-600">
                  Watch structured video lessons and practice by skill and level
                </p>
              </div>
            </div>
            <ArrowRight className="h-8 w-8 text-blue-600 group-hover:translate-x-2 transition-transform" />
          </div>
        </CardContent>
      </Card>

      {/* Practice History Section */}
      {sessionHistory.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold">Practice History</h2>
              <Badge variant="outline" className="text-sm">
                {sessionHistory.length} {sessionHistory.length === 1 ? 'Session' : 'Sessions'}
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2"
              onClick={onViewHistory}
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid gap-3 sm:gap-4">
            {sessionHistory.slice(0, 8).map((session, index) => {
              const Icon = skillIcons[session.config.skill];
              const colors = skillColors[session.config.skill];
              const percentage = Math.round((session.score / session.totalQuestions) * 100);
              const isPerfect = percentage === 100;
              const isGood = percentage >= 70;
              const timeAgo = formatTimeAgo(session.timestamp);
              
              // Determine border color class
              const borderColorClass = 
                session.config.skill === 'reading' ? 'border-l-blue-600' :
                session.config.skill === 'listening' ? 'border-l-purple-600' :
                session.config.skill === 'writing' ? 'border-l-pink-600' :
                session.config.skill === 'speaking' ? 'border-l-purple-600' :
                session.config.skill === 'grammar' ? 'border-l-cyan-600' :
                'border-l-teal-600';
              
              return (
                <Card 
                  key={session.id} 
                  className={`hover:shadow-md transition-all cursor-pointer group border-l-4 ${borderColorClass}`}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-4">
                      {/* Skill Icon */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${colors.icon}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-bold text-base sm:text-lg capitalize text-gray-900 mb-1">
                              {session.config.skill} Practice
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                              <Badge variant="secondary" className="text-xs font-medium">
                                {session.config.level}
                              </Badge>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {timeAgo}
                              </span>
                            </div>
                          </div>
                          
                          {/* Status Badge */}
                          {isPerfect ? (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Perfect
                            </Badge>
                          ) : isGood ? (
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                              Great
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1">
                              <TrendingDown className="h-3.5 w-3.5" />
                              Review
                            </Badge>
                          )}
                        </div>
                        
                        {/* Topics */}
                        {session.config.topics && session.config.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {session.config.topics.map((topic, i) => (
                              <span 
                                key={i}
                                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Score and Band */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Score</p>
                            <p className="font-bold text-lg">
                              {session.score}/{session.totalQuestions}
                              <span className="text-sm text-gray-500 ml-1">({percentage}%)</span>
                            </p>
                          </div>
                          
                          {session.bandScore && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Band Score</p>
                              <p className="font-bold text-lg flex items-center gap-1">
                                {session.bandScore.toFixed(1)}
                                <span className="text-sm text-gray-500">/9.0</span>
                              </p>
                            </div>
                          )}
                          
                          <div className="hidden sm:block">
                            <p className="text-xs text-gray-500 mb-1">Practice Date</p>
                            <p className="font-bold text-lg text-gray-700">
                              {formatDaysAgo(session.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {sessionHistory.length > 8 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={onViewHistory}
              >
                View All History
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

     
      {/* Videos Modal */}
      <UdemyStyleVideosV2 
        isOpen={isVideosModalOpen}
        onClose={() => setIsVideosModalOpen(false)}
        onStartPractice={onStartPracticeWithConfig}
      />
    </div>
  );
}