import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  BookOpen,
  Headphones,
  PenTool,
  Sparkles,
  Globe,
  Mic,
  Clock,
  CheckCircle2,
  TrendingDown,
  ArrowLeft,
  Calendar,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { SessionResult, SkillType } from '../LivePractice';

interface PracticeHistoryPageProps {
  sessionHistory: SessionResult[];
  onBack: () => void;
}

export function PracticeHistoryPage({ sessionHistory, onBack }: PracticeHistoryPageProps) {
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc'>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Helper functions
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

  const formatFullDate = (timestamp: Date) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Sort logic
  const sortedHistory = useMemo(() => {
    let sorted = [...sessionHistory];

    // Sort by date
    sorted.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
    });

    return sorted;
  }, [sessionHistory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
  const paginatedHistory = sortedHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate statistics
  const stats = useMemo(() => {
    const total = sortedHistory.length;
    const avgScore = total > 0 
      ? sortedHistory.reduce((sum, s) => sum + (s.score / s.totalQuestions * 100), 0) / total 
      : 0;
    const avgBand = total > 0 
      ? sortedHistory.reduce((sum, s) => sum + (s.bandScore || 0), 0) / total 
      : 0;

    return { total, avgScore, avgBand };
  }, [sortedHistory]);

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 px-2 sm:px-0">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 -ml-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Practice History</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Complete record of all your practice sessions
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Total Sessions</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Average Score</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.avgScore.toFixed(1)}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Average Band</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.avgBand.toFixed(1)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="h-5 w-5" />
            Sort by Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={sortBy === 'date-desc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('date-desc')}
              className="gap-1.5"
            >
              <Calendar className="h-3.5 w-3.5" />
              Newest First
              <SortDesc className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={sortBy === 'date-asc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('date-asc')}
              className="gap-1.5"
            >
              <Calendar className="h-3.5 w-3.5" />
              Oldest First
              <SortAsc className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {paginatedHistory.length} of {sortedHistory.length} sessions
        </p>
      </div>

      {/* Practice History List */}
      {paginatedHistory.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No practice sessions found</h3>
              <p className="text-gray-500">
                {sessionHistory.length === 0 
                  ? "You haven't completed any practice sessions yet."
                  : "Try adjusting your filters to see more results."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {paginatedHistory.map((session) => {
            const Icon = skillIcons[session.config.skill];
            const colors = skillColors[session.config.skill];
            const percentage = Math.round((session.score / session.totalQuestions) * 100);
            const isPerfect = percentage === 100;
            const isGood = percentage >= 70;
            const timeAgo = formatTimeAgo(session.timestamp);
            const daysAgo = formatDaysAgo(session.timestamp);
            const fullDate = formatFullDate(session.timestamp);
            
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
                      
                      {/* Full Date */}
                      <p className="text-xs text-gray-500 mb-3">
                        {fullDate}
                      </p>
                      
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
                            {daysAgo}
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
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {/* Page Numbers */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-9 h-9 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
