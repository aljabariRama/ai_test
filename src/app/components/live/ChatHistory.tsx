import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { 
  History, 
  Clock, 
  Award, 
  MessageSquare,
  MoreHorizontal,
  Trash2,
  Play,
  LayoutDashboard
} from 'lucide-react';
import type { SessionResult, SessionConfig } from '../LivePractice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface ChatHistoryProps {
  history: SessionResult[];
  onLoadSession: (config: SessionConfig) => void;
  isVisible: boolean;
  onToggle: () => void;
  onReturnToDashboard?: () => void;
}

export function ChatHistory({ history, onLoadSession, isVisible, onReturnToDashboard }: ChatHistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'C2': 'bg-purple-100 text-purple-700 border-purple-300',
      'C1': 'bg-indigo-100 text-indigo-700 border-indigo-300',
      'B2': 'bg-blue-100 text-blue-700 border-blue-300',
      'B1': 'bg-cyan-100 text-cyan-700 border-cyan-300',
      'A2': 'bg-orange-100 text-orange-700 border-orange-300',
      'A1': 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[level] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  // Group history by date
  const groupedHistory = history.reduce((groups, session) => {
    const date = session.timestamp.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, SessionResult[]>);

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (dateString === today) return 'Today';
    if (dateString === yesterday) return 'Yesterday';
    
    const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (daysAgo < 7) return 'Previous 7 Days';
    if (daysAgo < 30) return 'Previous 30 Days';
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 border-l">
      {/* Header */}
      <div className="p-4 border-b bg-white space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-purple-600" />
            Practice History
          </h2>
        </div>
        
        {/* Return to Dashboard Button */}
        {onReturnToDashboard && (
          <Button 
            onClick={onReturnToDashboard}
            variant="outline" 
            className="w-full gap-2 h-9"
          >
            <LayoutDashboard className="h-4 w-4" />
            Return to Dashboard
          </Button>
        )}
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-1">No practice history yet</p>
            <p className="text-gray-400 text-sm">
              Start practicing to track your progress
            </p>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-4">
            {Object.entries(groupedHistory).map(([dateString, sessions]) => (
              <div key={dateString}>
                {/* Date Header */}
                <div className="px-2 py-1 text-xs font-semibold text-gray-500">
                  {getDateLabel(dateString)}
                </div>

                {/* Sessions in this date group */}
                <div className="space-y-2 mt-2">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => onLoadSession(session.config)}
                      className="group relative bg-white rounded-lg p-3 hover:shadow-md cursor-pointer transition-all border border-gray-200 hover:border-purple-300"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900 capitalize truncate">
                              {session.config.skill}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-1.5 py-0 border ${getLevelColor(session.config.level)}`}
                            >
                              {session.config.level}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {session.config.topics.slice(0, 2).join(', ')}
                          </p>
                        </div>

                        {/* Actions Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                onLoadSession(session.config);
                              }}
                            >
                              <Play className="mr-2 h-3 w-3" />
                              Practice Again
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add delete functionality
                              }}
                            >
                              <Trash2 className="mr-2 h-3 w-3" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Performance Metrics */}
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          {session.bandScore && (
                            <div className="flex items-center gap-1 text-purple-600 font-semibold">
                              <Award className="h-3 w-3" />
                              <span>{session.bandScore.toFixed(1)}</span>
                            </div>
                          )}
                          <span className={`font-semibold ${
                            session.score >= 80 ? 'text-green-600' : 
                            session.score >= 60 ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                            {session.score}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(session.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}