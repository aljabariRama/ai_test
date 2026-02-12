import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Trophy, 
  TrendingUp, 
  Crosshair, 
  Lightbulb, 
  RotateCcw,
  Award,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  BarChart3
} from 'lucide-react';
import type { SessionResult } from '../LivePractice';

interface ResultsAnalyticsProps {
  result: SessionResult;
  onStartNew: () => void;
}

export function ResultsAnalytics({ result, onStartNew }: ResultsAnalyticsProps) {
  const scoreColor = result.score >= 80 ? 'text-green-600' : result.score >= 60 ? 'text-blue-600' : 'text-orange-600';
  const scoreBg = result.score >= 80 ? 'bg-green-50 border-green-200' : result.score >= 60 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200';

  const getBandColor = (band: number) => {
    if (band >= 7) return { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' };
    if (band >= 5.5) return { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' };
    return { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' };
  };

  const getLevelInfo = (level: string) => {
    const levels: Record<string, { name: string; color: string; bg: string }> = {
      'A1': { name: 'Beginner', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
      'A2': { name: 'Elementary', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
      'B1': { name: 'Intermediate', color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-200' },
      'B2': { name: 'Upper Intermediate', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
      'C1': { name: 'Advanced', color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
      'C2': { name: 'Proficiency', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
    };
    return levels[level] || { name: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200' };
  };

  const bandColors = result.bandScore ? getBandColor(result.bandScore) : null;
  const levelInfo = getLevelInfo(result.config.level);
  const correctAnswers = Math.round((result.score / 100) * result.totalQuestions);
  const incorrectAnswers = result.totalQuestions - correctAnswers;

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Overall Score Card */}
      <Card className={`border-2 ${scoreBg}`}>
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-lg">
              <Trophy className={`h-8 w-8 sm:h-10 sm:w-10 ${scoreColor}`} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Excellent Work!</h2>
              <p className="text-sm sm:text-base text-gray-600">You've completed your practice session</p>
            </div>
            <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${scoreColor}`}>
              {result.score}%
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="font-semibold">{correctAnswers} Correct</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                <span className="font-semibold">{incorrectAnswers} Incorrect</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Band Score & Level */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {/* IELTS Band Score */}
        {result.bandScore && (
          <Card className={`border-2 ${bandColors?.light}`}>
            <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
                <Award className={`h-4 w-4 sm:h-5 sm:w-5 ${bandColors?.text}`} />
                IELTS Band Score
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="flex items-end gap-3 sm:gap-4">
                <div className={`text-4xl sm:text-5xl font-bold ${bandColors?.text}`}>
                  {result.bandScore.toFixed(1)}
                </div>
                <div className="flex-1 space-y-2 mb-2">
                  <div className="text-xs sm:text-sm text-gray-600">Band Assessment</div>
                  <Progress 
                    value={(result.bandScore / 9) * 100} 
                    className="h-2 sm:h-3"
                  />
                  <div className="text-xs text-gray-500">Out of 9.0</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CEFR Level */}
        <Card className={`border-2 ${levelInfo.bg}`}>
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
              <Crosshair className={`h-4 w-4 sm:h-5 sm:w-5 ${levelInfo.color}`} />
              CEFR Level
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="flex items-end gap-3 sm:gap-4">
              <div className={`text-4xl sm:text-5xl font-bold ${levelInfo.color}`}>
                {result.config.level}
              </div>
              <div className="flex-1 mb-2">
                <div className="text-xs sm:text-sm text-gray-600 mb-1">{levelInfo.name}</div>
                <Badge variant="outline" className={`${levelInfo.color} border-current text-xs`}>
                  {result.config.skill.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Accuracy */}
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Accuracy Rate</span>
                <Badge variant="secondary">{correctAnswers}/{result.totalQuestions}</Badge>
              </div>
              <span className={`font-bold ${scoreColor}`}>{result.score}%</span>
            </div>
            <Progress value={result.score} className="h-3" />
          </div>

          {/* Completion */}
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Completion Rate</span>
                <Zap className="h-4 w-4 text-yellow-500" />
              </div>
              <span className="font-bold text-blue-600">100%</span>
            </div>
            <Progress value={100} className="h-3" />
          </div>

          {/* Speaking specific metrics - removed pronunciation and fluency */}
          {result.config.skill === 'speaking' && (
            <>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Vocabulary</span>
                    <span className="text-sm font-bold text-blue-600">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Grammar</span>
                    <span className="text-sm font-bold text-blue-600">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>
            </>
          )}

          {/* Band Score Breakdown */}
          {result.bandScore && (
            <div className="pt-4 border-t">
              <div className="mb-3 font-medium">Band Score Components</div>
              <div className="space-y-2">
                {[
                  { skill: 'Task Achievement', score: result.bandScore },
                  { skill: 'Coherence & Cohesion', score: result.bandScore - 0.5 },
                  { skill: 'Lexical Resource', score: result.bandScore + 0.5 },
                  { skill: 'Grammar Range', score: result.bandScore },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.skill}</span>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={(item.score / 9) * 100} 
                        className="h-2 w-24"
                      />
                      <span className="font-semibold w-8 text-right">{item.score.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Feedback */}
      {result.feedback && (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              AI Feedback & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{result.feedback}</p>
          </CardContent>
        </Card>
      )}

      {/* Next Steps & Recommendations */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-blue-600" />
            Your Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Level Progression */}
          {result.suggestedLevel && result.suggestedLevel !== result.config.level && (
            <div className="p-4 bg-white rounded-lg border border-green-300">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-1">Ready to Level Up!</p>
                  <p className="text-sm text-gray-600">
                    Your performance indicates you're ready for{' '}
                    <Badge className={`mx-1 ${getLevelInfo(result.suggestedLevel).bg} ${getLevelInfo(result.suggestedLevel).color} border`}>
                      {result.suggestedLevel}
                    </Badge>
                    level exercises. Keep up the excellent work!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Suggested Topics */}
          {result.nextTopics && result.nextTopics.length > 0 && (
            <div className="p-4 bg-white rounded-lg border">
              <p className="font-semibold mb-3">Recommended Practice Topics:</p>
              <div className="flex flex-wrap gap-2">
                {result.nextTopics.map((topic, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 cursor-pointer"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={onStartNew}
              className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2"
              size="lg"
            >
              <RotateCcw className="h-4 w-4" />
              Start New Session
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={onStartNew}
            >
              Practice Same Level
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}