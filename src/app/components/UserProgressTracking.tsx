import { useState } from 'react';
import { 
  Users, TrendingUp, TrendingDown, Search, Filter, 
  ChevronDown, Eye, Award, Target, Clock, Calendar,
  BookOpen, Headphones, Mic, PenTool, BookMarked, Brain,
  ArrowUp, ArrowDown, Minus, Activity, Zap, Star,
  ChevronRight, ChevronLeft, BarChart3, LineChart as LineChartIcon,
  CreditCard, Phone, AlertTriangle, CheckCircle, XCircle,
  Download, Trash2, Archive, Bell, DollarSign, Package, MessageSquare,
  AlertCircle,
  Link
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface UserProgressTrackingProps {
  onNavigate: (page: string) => void;
}

export function UserProgressTracking() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock users data with detailed progress
  const users = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      phone: '+1 (555) 123-4567',
      avatar: '👩‍💼',
      currentLevel: 'B2',
      previousLevel: 'B1',
      levelTrend: 'up',
      overallScore: 6.8,
      scoreChange: +0.5,
      testsCompleted: 45,
      studyHours: 156,
      streak: 23,
      lastActive: '2 min ago',
      status: 'online',
      currentActivity: 'Solving Reading Test - Passage 2',
      joinedDate: '2024-10-15',
      subscriptionPlan: 'Premium',
      subscriptionStatus: 'active',
      subscriptionExpiry: '2026-03-15',
      daysUntilExpiry: 62,
      credits: 150,
      autoRenewal: true,
      totalSpent: 89.97,
      skillScores: {
        listening: 7.0,
        reading: 7.5,
        writing: 6.0,
        speaking: 6.5,
        grammar: 7.0,
        vocabulary: 7.5
      },
      skillTrends: {
        listening: 'up',
        reading: 'up',
        writing: 'stable',
        speaking: 'up',
        grammar: 'up',
        vocabulary: 'up'
      },
      recentTests: [
        { date: '2026-01-12', type: 'Reading', score: 7.5, level: 'B2', duration: '45 min' },
        { date: '2026-01-11', type: 'Listening', score: 7.0, level: 'B2', duration: '30 min' },
        { date: '2026-01-10', type: 'Writing', score: 6.0, level: 'B1', duration: '60 min' },
        { date: '2026-01-09', type: 'Speaking', score: 6.5, level: 'B2', duration: '15 min' },
        { date: '2026-01-08', type: 'Grammar', score: 7.0, level: 'B2', duration: '20 min' },
      ],
      progressHistory: [
        { week: 'Week 1', overall: 5.5, listening: 5.5, reading: 6.0, writing: 5.0, speaking: 5.5 },
        { week: 'Week 2', overall: 5.8, listening: 6.0, reading: 6.2, writing: 5.0, speaking: 5.8 },
        { week: 'Week 3', overall: 6.0, listening: 6.2, reading: 6.5, writing: 5.5, speaking: 6.0 },
        { week: 'Week 4', overall: 6.3, listening: 6.5, reading: 6.8, writing: 5.8, speaking: 6.2 },
        { week: 'Week 5', overall: 6.5, listening: 6.8, reading: 7.0, writing: 5.8, speaking: 6.3 },
        { week: 'Week 6', overall: 6.8, listening: 7.0, reading: 7.5, writing: 6.0, speaking: 6.5 },
      ],
      dailyActivity: [
        { day: 'Mon', minutes: 120, tests: 3 },
        { day: 'Tue', minutes: 90, tests: 2 },
        { day: 'Wed', minutes: 150, tests: 4 },
        { day: 'Thu', minutes: 110, tests: 3 },
        { day: 'Fri', minutes: 95, tests: 2 },
        { day: 'Sat', minutes: 180, tests: 5 },
        { day: 'Sun', minutes: 140, tests: 3 },
      ],
      weakAreas: ['Writing Task 2', 'Speaking Part 3', 'Grammar Conditionals'],
      strongAreas: ['Reading Comprehension', 'Vocabulary', 'Listening Details'],
      achievements: ['7-Day Streak', '50 Tests Completed', 'B2 Level Achieved'],
    },
    {
      id: 2,
      name: 'Ahmed Khan',
      email: 'ahmed.khan@email.com',
      avatar: '👨‍💻',
      currentLevel: 'C1',
      previousLevel: 'B2',
      levelTrend: 'up',
      overallScore: 7.5,
      scoreChange: +0.8,
      testsCompleted: 67,
      studyHours: 234,
      daysUntilExpiry: 62,

      streak: 45,
      lastActive: '5 min ago',
      status: 'online',
      currentActivity: 'Live Practice - Speaking Session',
      joinedDate: '2024-09-20',
      skillScores: {
        listening: 7.5,
        reading: 8.0,
        writing: 7.0,
        speaking: 7.5,
        grammar: 7.8,
        vocabulary: 8.0
      },
      skillTrends: {
        listening: 'up',
        reading: 'up',
        writing: 'stable',
        speaking: 'up',
        grammar: 'up',
        vocabulary: 'stable'
      },
      recentTests: [
        { date: '2026-01-12', type: 'Speaking', score: 7.5, level: 'C1', duration: '15 min' },
        { date: '2026-01-12', type: 'Reading', score: 8.0, level: 'C1', duration: '50 min' },
        { date: '2026-01-11', type: 'Listening', score: 7.5, level: 'C1', duration: '35 min' },
        { date: '2026-01-11', type: 'Writing', score: 7.0, level: 'B2', duration: '65 min' },
        { date: '2026-01-10', type: 'Grammar', score: 7.8, level: 'C1', duration: '25 min' },
      ],
      progressHistory: [
        { week: 'Week 1', overall: 6.5, listening: 6.5, reading: 7.0, writing: 6.0, speaking: 6.5 },
        { week: 'Week 2', overall: 6.8, listening: 6.8, reading: 7.2, writing: 6.2, speaking: 6.8 },
        { week: 'Week 3', overall: 7.0, listening: 7.0, reading: 7.5, writing: 6.5, speaking: 7.0 },
        { week: 'Week 4', overall: 7.2, listening: 7.2, reading: 7.7, writing: 6.8, speaking: 7.2 },
        { week: 'Week 5', overall: 7.3, listening: 7.3, reading: 7.8, writing: 6.8, speaking: 7.3 },
        { week: 'Week 6', overall: 7.5, listening: 7.5, reading: 8.0, writing: 7.0, speaking: 7.5 },
      ],
      dailyActivity: [
        { day: 'Mon', minutes: 150, tests: 4 },
        { day: 'Tue', minutes: 130, tests: 3 },
        { day: 'Wed', minutes: 170, tests: 5 },
        { day: 'Thu', minutes: 140, tests: 4 },
        { day: 'Fri', minutes: 120, tests: 3 },
        { day: 'Sat', minutes: 200, tests: 6 },
        { day: 'Sun', minutes: 160, tests: 4 },
      ],
      weakAreas: ['Writing Coherence', 'Complex Grammar'],
      strongAreas: ['Reading Speed', 'Vocabulary Range', 'Listening Accuracy'],
      achievements: ['45-Day Streak', '100 Tests', 'C1 Level', 'Top Performer'],
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      avatar: '👩‍🎓',
      currentLevel: 'B1',
      previousLevel: 'B1',
      levelTrend: 'stable',
      overallScore: 5.5,
      scoreChange: +0.1,
      testsCompleted: 28,
      studyHours: 89,
      streak: 12,
      daysUntilExpiry: 62,

      lastActive: '15 min ago',
      status: 'idle',
      currentActivity: 'Dictionary - Learning Vocabulary',
      joinedDate: '2024-11-10',
      skillScores: {
        listening: 5.5,
        reading: 6.0,
        writing: 5.0,
        speaking: 5.5,
        grammar: 5.5,
        vocabulary: 6.0
      },
      skillTrends: {
        listening: 'stable',
        reading: 'up',
        writing: 'down',
        speaking: 'stable',
        grammar: 'up',
        vocabulary: 'up'
      },
      recentTests: [
        { date: '2026-01-12', type: 'Reading', score: 6.0, level: 'B1', duration: '40 min' },
        { date: '2026-01-11', type: 'Vocabulary', score: 6.0, level: 'B1', duration: '15 min' },
        { date: '2026-01-10', type: 'Listening', score: 5.5, level: 'B1', duration: '28 min' },
        { date: '2026-01-09', type: 'Writing', score: 5.0, level: 'A2', duration: '55 min' },
        { date: '2026-01-08', type: 'Grammar', score: 5.5, level: 'B1', duration: '18 min' },
      ],
      progressHistory: [
        { week: 'Week 1', overall: 5.0, listening: 5.0, reading: 5.5, writing: 4.5, speaking: 5.0 },
        { week: 'Week 2', overall: 5.1, listening: 5.0, reading: 5.6, writing: 4.8, speaking: 5.0 },
        { week: 'Week 3', overall: 5.2, listening: 5.2, reading: 5.7, writing: 4.8, speaking: 5.2 },
        { week: 'Week 4', overall: 5.3, listening: 5.3, reading: 5.8, writing: 4.9, speaking: 5.3 },
        { week: 'Week 5', overall: 5.4, listening: 5.4, reading: 5.9, writing: 4.9, speaking: 5.4 },
        { week: 'Week 6', overall: 5.5, listening: 5.5, reading: 6.0, writing: 5.0, speaking: 5.5 },
      ],
      dailyActivity: [
        { day: 'Mon', minutes: 60, tests: 2 },
        { day: 'Tue', minutes: 45, tests: 1 },
        { day: 'Wed', minutes: 70, tests: 2 },
        { day: 'Thu', minutes: 55, tests: 2 },
        { day: 'Fri', minutes: 40, tests: 1 },
        { day: 'Sat', minutes: 90, tests: 3 },
        { day: 'Sun', minutes: 65, tests: 2 },
      ],
      weakAreas: ['Writing Structure', 'Speaking Fluency', 'Grammar Tenses'],
      strongAreas: ['Reading Basic Texts', 'Vocabulary Learning'],
      achievements: ['First Test Completed', '10-Day Streak', 'B1 Reading'],
    },
    {
      id: 4,
      name: 'Carlos Rodriguez',
      email: 'carlos.r@email.com',
      avatar: '👨‍🔬',
      currentLevel: 'A2',
      previousLevel: 'B1',
      levelTrend: 'down',
      overallScore: 4.5,
      scoreChange: -0.3,
      testsCompleted: 15,
      studyHours: 42,
      streak: 3,
      lastActive: '2 hours ago',
      status: 'offline',
      daysUntilExpiry: 62,

      currentActivity: 'Last: Grammar Practice',
      joinedDate: '2024-12-05',
      skillScores: {
        listening: 4.5,
        reading: 5.0,
        writing: 4.0,
        speaking: 4.5,
        grammar: 4.5,
        vocabulary: 5.0
      },
      skillTrends: {
        listening: 'down',
        reading: 'stable',
        writing: 'down',
        speaking: 'down',
        grammar: 'stable',
        vocabulary: 'up'
      },
      recentTests: [
        { date: '2026-01-12', type: 'Grammar', score: 4.5, level: 'A2', duration: '15 min' },
        { date: '2026-01-10', type: 'Reading', score: 5.0, level: 'B1', duration: '35 min' },
        { date: '2026-01-09', type: 'Listening', score: 4.5, level: 'A2', duration: '25 min' },
        { date: '2026-01-07', type: 'Writing', score: 4.0, level: 'A2', duration: '50 min' },
        { date: '2026-01-06', type: 'Vocabulary', score: 5.0, level: 'B1', duration: '12 min' },
      ],
      progressHistory: [
        { week: 'Week 1', overall: 4.8, listening: 4.8, reading: 5.0, writing: 4.5, speaking: 4.8 },
        { week: 'Week 2', overall: 4.7, listening: 4.7, reading: 5.0, writing: 4.3, speaking: 4.7 },
        { week: 'Week 3', overall: 4.6, listening: 4.6, reading: 5.0, writing: 4.2, speaking: 4.6 },
        { week: 'Week 4', overall: 4.5, listening: 4.5, reading: 5.0, writing: 4.0, speaking: 4.5 },
        { week: 'Week 5', overall: 4.5, listening: 4.5, reading: 5.0, writing: 4.0, speaking: 4.5 },
        { week: 'Week 6', overall: 4.5, listening: 4.5, reading: 5.0, writing: 4.0, speaking: 4.5 },
      ],
      dailyActivity: [
        { day: 'Mon', minutes: 30, tests: 1 },
        { day: 'Tue', minutes: 0, tests: 0 },
        { day: 'Wed', minutes: 25, tests: 1 },
        { day: 'Thu', minutes: 35, tests: 1 },
        { day: 'Fri', minutes: 0, tests: 0 },
        { day: 'Sat', minutes: 45, tests: 2 },
        { day: 'Sun', minutes: 20, tests: 1 },
      ],
      weakAreas: ['Writing Paragraphs', 'Listening Comprehension', 'Speaking Confidence'],
      strongAreas: ['Basic Vocabulary', 'Reading Simple Texts'],
      achievements: ['Account Created', 'First Week Complete'],
    },
    {
      id: 5,
      name: 'Yuki Tanaka',
      email: 'yuki.t@email.com',
      avatar: '👩‍🏫',
      currentLevel: 'B2',
      previousLevel: 'B2',
      levelTrend: 'stable',
      overallScore: 7.0,
      scoreChange: +0.2,
      testsCompleted: 52,
      studyHours: 178,
      daysUntilExpiry: 62,

      streak: 31,
      lastActive: '1 hour ago',
      status: 'idle',
      currentActivity: 'Last: Writing Task 2',
      joinedDate: '2024-10-01',
      skillScores: {
        listening: 7.0,
        reading: 7.5,
        writing: 6.5,
        speaking: 7.0,
        grammar: 7.2,
        vocabulary: 7.5
      },
      skillTrends: {
        listening: 'up',
        reading: 'stable',
        writing: 'up',
        speaking: 'stable',
        grammar: 'up',
        vocabulary: 'stable'
      },
      recentTests: [
        { date: '2026-01-12', type: 'Writing', score: 6.5, level: 'B2', duration: '60 min' },
        { date: '2026-01-11', type: 'Grammar', score: 7.2, level: 'B2', duration: '22 min' },
        { date: '2026-01-11', type: 'Reading', score: 7.5, level: 'B2', duration: '48 min' },
        { date: '2026-01-10', type: 'Listening', score: 7.0, level: 'B2', duration: '32 min' },
        { date: '2026-01-09', type: 'Speaking', score: 7.0, level: 'B2', duration: '16 min' },
      ],
      progressHistory: [
        { week: 'Week 1', overall: 6.5, listening: 6.5, reading: 7.0, writing: 6.0, speaking: 6.5 },
        { week: 'Week 2', overall: 6.6, listening: 6.6, reading: 7.1, writing: 6.1, speaking: 6.6 },
        { week: 'Week 3', overall: 6.7, listening: 6.7, reading: 7.2, writing: 6.2, speaking: 6.7 },
        { week: 'Week 4', overall: 6.8, listening: 6.8, reading: 7.3, writing: 6.3, speaking: 6.8 },
        { week: 'Week 5', overall: 6.9, listening: 6.9, reading: 7.4, writing: 6.4, speaking: 6.9 },
        { week: 'Week 6', overall: 7.0, listening: 7.0, reading: 7.5, writing: 6.5, speaking: 7.0 },
      ],
      dailyActivity: [
        { day: 'Mon', minutes: 110, tests: 3 },
        { day: 'Tue', minutes: 95, tests: 2 },
        { day: 'Wed', minutes: 130, tests: 4 },
        { day: 'Thu', minutes: 105, tests: 3 },
        { day: 'Fri', minutes: 90, tests: 2 },
        { day: 'Sat', minutes: 155, tests: 4 },
        { day: 'Sun', minutes: 120, tests: 3 },
      ],
      weakAreas: ['Writing Advanced Vocabulary', 'Speaking Idioms'],
      strongAreas: ['Reading Comprehension', 'Grammar Accuracy', 'Listening Details'],
      achievements: ['30-Day Streak', '50 Tests', 'B2 Maintained', 'Grammar Expert'],
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1': return 'text-red-600 bg-red-100';
      case 'A2': return 'text-orange-600 bg-orange-100';
      case 'B1': return 'text-yellow-600 bg-yellow-100';
      case 'B2': return 'text-green-600 bg-green-100';
      case 'C1': return 'text-blue-600 bg-blue-100';
      case 'C2': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case 'listening': return <Headphones className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      case 'writing': return <PenTool className="h-4 w-4" />;
      case 'speaking': return <Mic className="h-4 w-4" />;
      case 'grammar': return <BookMarked className="h-4 w-4" />;
      case 'vocabulary': return <Brain className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || user.currentLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const selectedUserData = selectedUser !== null ? users.find(u => u.id === selectedUser) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">User Progress Tracking</h1>
              <p className="text-sm sm:text-base text-blue-100">Monitor individual user performance and level progression</p>
            </div>
            <div className="flex gap-2">
                            <Link to={"/subscription-management"}>

              <Button 
                variant="outline" 
                // onClick={() => onNavigate('subscription-management')}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Subscriptions
              </Button>
              </Link>
                            <Link to={"/admin"}>

              <Button 
                variant="outline" 
                // onClick={() => onNavigate('admin')}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Recently Active</option>
                <option value="score-high">Highest Score</option>
                <option value="score-low">Lowest Score</option>
                <option value="progress">Most Improved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        {!selectedUserData ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500"
              >
                {/* User Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl relative">
                      {user.avatar}
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        user.status === 'online' ? 'bg-green-500' :
                        user.status === 'idle' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base">{user.name}</h3>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Level and Trend */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getLevelColor(user.currentLevel)} font-bold`}>
                      {user.currentLevel}
                    </Badge>
                    {getTrendIcon(user.levelTrend)}
                    {user.previousLevel !== user.currentLevel && (
                      <span className="text-xs text-gray-500">from {user.previousLevel}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-sm">{user.overallScore}</span>
                    <span className={`text-xs ${user.scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({user.scoreChange >= 0 ? '+' : ''}{user.scoreChange})
                    </span>
                  </div>
                </div>

                {/* Current Activity */}
                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-900">Current Activity</span>
                  </div>
                  <p className="text-xs text-blue-700">{user.currentActivity}</p>
                  <p className="text-xs text-blue-500 mt-1">{user.lastActive}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="h-3 w-3 text-purple-500" />
                      <span className="text-xs font-bold">{user.testsCompleted}</span>
                    </div>
                    <p className="text-xs text-gray-500">Tests</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <span className="text-xs font-bold">{user.studyHours}h</span>
                    </div>
                    <p className="text-xs text-gray-500">Study</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Zap className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs font-bold">{user.streak}</span>
                    </div>
                    <p className="text-xs text-gray-500">Streak</p>
                  </div>
                </div>

                {/* View Details Button */}
                <Button className="w-full mt-4" size="sm">
                  View Detailed Progress
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed User View */
          <div className="space-y-6">
            {/* User Overview */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl relative">
                    {selectedUserData.avatar}
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      selectedUserData.status === 'online' ? 'bg-green-500' :
                      selectedUserData.status === 'idle' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedUserData.name}</h2>
                    <p className="text-sm text-gray-500">{selectedUserData.email}</p>
                    <p className="text-xs text-gray-400 mt-1">Joined: {selectedUserData.joinedDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message User
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to List
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-600 font-semibold">Current Level</span>
                    {getTrendIcon(selectedUserData.levelTrend)}
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{selectedUserData.currentLevel}</p>
                  <p className="text-xs text-blue-600">from {selectedUserData.previousLevel}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <span className="text-xs text-green-600 font-semibold">Overall Score</span>
                  <p className="text-2xl font-bold text-green-900">{selectedUserData.overallScore}</p>
                  <p className={`text-xs ${selectedUserData.scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedUserData.scoreChange >= 0 ? '+' : ''}{selectedUserData.scoreChange} change
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                  <span className="text-xs text-purple-600 font-semibold">Tests Done</span>
                  <p className="text-2xl font-bold text-purple-900">{selectedUserData.testsCompleted}</p>
                  <p className="text-xs text-purple-600">completed</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                  <span className="text-xs text-orange-600 font-semibold">Study Hours</span>
                  <p className="text-2xl font-bold text-orange-900">{selectedUserData.studyHours}h</p>
                  <p className="text-xs text-orange-600">total time</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                  <span className="text-xs text-yellow-600 font-semibold">Streak</span>
                  <p className="text-2xl font-bold text-yellow-900">{selectedUserData.streak}</p>
                  <p className="text-xs text-yellow-600">days active</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
                  <span className="text-xs text-pink-600 font-semibold">Status</span>
                  <p className="text-sm font-bold text-pink-900 capitalize">{selectedUserData.status}</p>
                  <p className="text-xs text-pink-600">{selectedUserData.lastActive}</p>
                </div>
              </div>
            </div>

            {/* Current Activity */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="h-6 w-6 animate-pulse" />
                <h3 className="text-lg font-bold">What They're Doing Right Now</h3>
              </div>
              <p className="text-xl font-semibold">{selectedUserData.currentActivity}</p>
              <p className="text-sm text-blue-100 mt-1">Last active: {selectedUserData.lastActive}</p>
            </div>

            {/* Subscription Details */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-blue-600" />
                Subscription & Account Details
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Phone Number */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-600">Phone Number</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedUserData.phone || 'Not provided'}</p>
                </div>

                {/* Subscription Plan */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-600">Subscription Plan</span>
                  </div>
                  <p className="text-lg font-bold text-purple-900">{selectedUserData.subscriptionPlan || 'Free'}</p>
                </div>

                {/* Subscription Status */}
                <div className={`rounded-lg p-4 ${
                  selectedUserData.subscriptionStatus === 'active' && selectedUserData.daysUntilExpiry > 30
                    ? 'bg-gradient-to-br from-green-50 to-green-100'
                    : selectedUserData?.daysUntilExpiry <= 30 && selectedUserData?.daysUntilExpiry > 0
                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100'
                    : 'bg-gradient-to-br from-red-50 to-red-100'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedUserData.subscriptionStatus === 'active' && selectedUserData.daysUntilExpiry > 30 ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0 ? (
                      <Bell className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${
                      selectedUserData.subscriptionStatus === 'active' && selectedUserData.daysUntilExpiry > 30
                        ? 'text-green-600'
                        : selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      Status
                    </span>
                  </div>
                  <p className={`text-lg font-bold ${
                    selectedUserData.subscriptionStatus === 'active' && selectedUserData.daysUntilExpiry > 30
                      ? 'text-green-900'
                      : selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0
                      ? 'text-yellow-900'
                      : 'text-red-900'
                  }`}>
                    {selectedUserData.daysUntilExpiry > 0 ? 'Active' : 'Expired'}
                  </p>
                </div>

                {/* Expiry Date */}
                <div className={`rounded-lg p-4 ${
                  selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0
                    ? 'bg-gradient-to-br from-orange-50 to-orange-100'
                    : selectedUserData.daysUntilExpiry < 0
                    ? 'bg-gradient-to-br from-red-50 to-red-100'
                    : 'bg-gradient-to-br from-blue-50 to-blue-100'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className={`h-5 w-5 ${
                      selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0
                        ? 'text-orange-600'
                        : selectedUserData.daysUntilExpiry < 0
                        ? 'text-red-600'
                        : 'text-blue-600'
                    }`} />
                    <span className={`text-sm font-semibold ${
                      selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0
                        ? 'text-orange-600'
                        : selectedUserData.daysUntilExpiry < 0
                        ? 'text-red-600'
                        : 'text-blue-600'
                    }`}>
                      Expiry Date
                    </span>
                  </div>
                  <p className={`text-lg font-bold ${
                    selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0
                      ? 'text-orange-900'
                      : selectedUserData.daysUntilExpiry < 0
                      ? 'text-red-900'
                      : 'text-blue-900'
                  }`}>
                    {selectedUserData.subscriptionExpiry || 'N/A'}
                  </p>
                  <p className={`text-xs mt-1 ${
                    selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0
                      ? 'text-orange-600'
                      : selectedUserData.daysUntilExpiry < 0
                      ? 'text-red-600'
                      : 'text-blue-600'
                  }`}>
                    {selectedUserData.daysUntilExpiry > 0 
                      ? `${selectedUserData.daysUntilExpiry} days remaining`
                      : `Expired ${Math.abs(selectedUserData.daysUntilExpiry)} days ago`
                    }
                  </p>
                </div>

                {/* Credits */}
                <div className={`rounded-lg p-4 ${
                  selectedUserData.credits === 0
                    ? 'bg-gradient-to-br from-red-50 to-red-100'
                    : selectedUserData.credits < 50
                    ? 'bg-gradient-to-br from-orange-50 to-orange-100'
                    : 'bg-gradient-to-br from-green-50 to-green-100'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className={`h-5 w-5 ${
                      selectedUserData.credits === 0
                        ? 'text-red-600'
                        : selectedUserData.credits < 50
                        ? 'text-orange-600'
                        : 'text-green-600'
                    }`} />
                    <span className={`text-sm font-semibold ${
                      selectedUserData.credits === 0
                        ? 'text-red-600'
                        : selectedUserData.credits < 50
                        ? 'text-orange-600'
                        : 'text-green-600'
                    }`}>
                      Available Credits
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${
                    selectedUserData.credits === 0
                      ? 'text-red-900'
                      : selectedUserData.credits < 50
                      ? 'text-orange-900'
                      : 'text-green-900'
                  }`}>
                    {selectedUserData.credits || 0}
                  </p>
                  {selectedUserData.credits < 50 && selectedUserData.credits > 0 && (
                    <p className="text-xs text-orange-600 mt-1">⚠️ Low credits</p>
                  )}
                  {selectedUserData.credits === 0 && (
                    <p className="text-xs text-red-600 mt-1">⛔ No credits remaining</p>
                  )}
                </div>

                {/* Auto-Renewal */}
                <div className={`rounded-lg p-4 ${
                  selectedUserData.autoRenewal
                    ? 'bg-gradient-to-br from-green-50 to-green-100'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedUserData.autoRenewal ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-600" />
                    )}
                    <span className={`text-sm font-semibold ${
                      selectedUserData.autoRenewal ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      Auto-Renewal
                    </span>
                  </div>
                  <p className={`text-lg font-bold ${
                    selectedUserData.autoRenewal ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    {selectedUserData.autoRenewal ? 'Enabled' : 'Disabled'}
                  </p>
                </div>

                {/* Total Spent */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-semibold text-indigo-600">Total Spent</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-900">${selectedUserData.totalSpent || 0}</p>
                </div>

                {/* Member Since */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-teal-600" />
                    <span className="text-sm font-semibold text-teal-600">Member Since</span>
                  </div>
                  <p className="text-lg font-bold text-teal-900">{selectedUserData.joinedDate}</p>
                </div>

                {/* Account Actions */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-pink-600" />
                    <span className="text-sm font-semibold text-pink-600">Quick Actions</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                      Add Credits
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Extend Subscription
                    </Button>
                  </div>
                </div>
              </div>

              {/* Warning Banner for Expiring/Expired */}
              {selectedUserData.daysUntilExpiry <= 30 && selectedUserData.daysUntilExpiry > 0 && (
                <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-yellow-900 mb-1">Subscription Expiring Soon</h4>
                      <p className="text-sm text-yellow-700">
                        This user's subscription will expire in <strong>{selectedUserData.daysUntilExpiry} days</strong> on <strong>{selectedUserData.subscriptionExpiry}</strong>.
                        {!selectedUserData.autoRenewal && ' Auto-renewal is disabled - they will need to renew manually.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedUserData.daysUntilExpiry < 0 && (
                <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-900 mb-1">Subscription Expired</h4>
                      <p className="text-sm text-red-700">
                        This user's subscription expired <strong>{Math.abs(selectedUserData.daysUntilExpiry)} days ago</strong> on <strong>{selectedUserData.subscriptionExpiry}</strong>.
                        {Math.abs(selectedUserData.daysUntilExpiry) >= 60 && (
                          <span className="block mt-1 font-bold">⚠️ Account is flagged for automatic archival and deletion.</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Over Time */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Level Progression (Last 6 Weeks)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedUserData.progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 9]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="overall" stroke="#4A90E2" strokeWidth={3} name="Overall" />
                  <Line type="monotone" dataKey="listening" stroke="#66BB6A" strokeWidth={2} name="Listening" />
                  <Line type="monotone" dataKey="reading" stroke="#FFA726" strokeWidth={2} name="Reading" />
                  <Line type="monotone" dataKey="writing" stroke="#EF5350" strokeWidth={2} name="Writing" />
                  <Line type="monotone" dataKey="speaking" stroke="#AB47BC" strokeWidth={2} name="Speaking" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Skills Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Skills Radar */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Skills Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={Object.entries(selectedUserData.skillScores).map(([skill, score]) => ({
                    skill: skill.charAt(0).toUpperCase() + skill.slice(1),
                    score: score,
                    fullMark: 9
                  }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 9]} tick={{ fontSize: 10 }} />
                    <Radar name="Current Score" dataKey="score" stroke="#4A90E2" fill="#4A90E2" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Skills List with Trends */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Skill Details & Trends</h3>
                <div className="space-y-3">
                  {Object.entries(selectedUserData.skillScores).map(([skill, score]) => (
                    <div key={skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getSkillIcon(skill)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm capitalize">{skill}</span>
                            {getTrendIcon(selectedUserData.skillTrends[skill as keyof typeof selectedUserData.skillTrends])}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(score / 9) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="font-bold text-lg">{score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Activity */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Daily Activity (This Week)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={selectedUserData.dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="minutes" fill="#4A90E2" name="Study Minutes" />
                  <Bar dataKey="tests" fill="#FFA726" name="Tests Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Tests */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Recent Test Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold">Date</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold">Test Type</th>
                      <th className="text-center py-3 px-2 text-xs sm:text-sm font-semibold">Score</th>
                      <th className="text-center py-3 px-2 text-xs sm:text-sm font-semibold">Level</th>
                      <th className="text-center py-3 px-2 text-xs sm:text-sm font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUserData.recentTests.map((test, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 text-xs sm:text-sm text-gray-600">{test.date}</td>
                        <td className="py-3 px-2 text-xs sm:text-sm font-medium">{test.type}</td>
                        <td className="py-3 px-2 text-center">
                          <Badge className="bg-blue-100 text-blue-700 font-bold">{test.score}</Badge>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Badge className={getLevelColor(test.level)}>{test.level}</Badge>
                        </td>
                        <td className="py-3 px-2 text-center text-xs sm:text-sm text-gray-600">{test.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weak Areas */}
              <div className="bg-red-50 rounded-lg sm:rounded-xl border-2 border-red-200 p-4 sm:p-6">
                <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Areas Needing Improvement
                </h3>
                <div className="space-y-2">
                  {selectedUserData.weakAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm text-red-900">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strong Areas */}
              <div className="bg-green-50 rounded-lg sm:rounded-xl border-2 border-green-200 p-4 sm:p-6">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Strong Areas
                </h3>
                <div className="space-y-2">
                  {selectedUserData.strongAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-green-900">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-500" />
                Achievements Unlocked
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {selectedUserData.achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🏆</div>
                    <p className="text-xs font-semibold text-gray-800">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}