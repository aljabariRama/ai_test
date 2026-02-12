import { useState } from 'react';
import { 
  Users, TrendingUp, BookOpen, Target, Award, Clock, 
  DollarSign, BarChart3, Activity, UserCheck, AlertCircle,
  Filter, Download, Calendar, Search, ChevronDown, 
  Eye, Edit, Trash2, CheckCircle, XCircle, MessageSquare,
  Headphones, Mic, PenTool, BookMarked, Brain, Star,
  Zap, CreditCard, TrendingDown, UserPlus, UserMinus,
  Globe, Cpu, Database, Server, Wifi, WifiOff,
  FileText, Send, Reply, PhoneCall, Mail, Shield,
  Settings, RefreshCw, PlayCircle, PauseCircle, Volume2,
  Sparkles, Bot, Type, MessageCircle, Layers, Package,
  Link
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface RoleBasedAdminDashboardProps {
  // onNavigate: (page: string) => void;
  userRole: 'super-admin' | 'admin' | 'accountant' | 'support';
  setUserRole: (role: 'super-admin' | 'admin' | 'accountant' | 'support') => void;
}

export function RoleBasedAdminDashboard({ userRole, setUserRole }: RoleBasedAdminDashboardProps) {
  const [timeRange, setTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Real-time AI Generation Stats
  const aiGenerationData = [
    { time: '00:00', words: 1234, answers: 456, feedback: 234, translations: 345 },
    { time: '04:00', words: 2345, answers: 678, feedback: 345, translations: 456 },
    { time: '08:00', words: 4567, answers: 1234, feedback: 567, translations: 678 },
    { time: '12:00', words: 5678, answers: 1456, feedback: 678, translations: 789 },
    { time: '16:00', words: 6789, answers: 1678, feedback: 789, translations: 890 },
    { time: '20:00', words: 7890, answers: 1890, feedback: 890, translations: 901 },
    { time: '23:59', words: 8234, answers: 2034, feedback: 945, translations: 1012 },
  ];

  // Live user activity (real-time)
  const liveActivities = [
    { id: 1, user: 'Sarah M.', action: 'AI generating feedback', detail: 'Writing Task 2', status: 'processing', time: 'Just now' },
    { id: 2, user: 'John D.', action: 'AI translating vocabulary', detail: '25 words to Arabic', status: 'processing', time: '2 sec ago' },
    { id: 3, user: 'Emma W.', action: 'Completed Reading Test', detail: 'Score: 7.5 (AI scored)', status: 'completed', time: '5 sec ago' },
    { id: 4, user: 'Ahmed K.', action: 'AI analyzing pronunciation', detail: 'Speaking Practice', status: 'processing', time: '8 sec ago' },
    { id: 5, user: 'Lisa P.', action: 'Subscribed to Premium', detail: '$29.99/month', status: 'payment', time: '12 sec ago' },
    { id: 6, user: 'Carlos R.', action: 'AI generated 50 words', detail: 'Dictionary update', status: 'completed', time: '15 sec ago' },
    { id: 7, user: 'Yuki T.', action: 'Live chat opened', detail: 'Technical issue', status: 'support', time: '18 sec ago' },
    { id: 8, user: 'Mohammed A.', action: 'AI generating questions', detail: 'Grammar Practice', status: 'processing', time: '22 sec ago' },
  ];

  // Financial data (for Accountant & Super Admin)
  const financialData = [
    { month: 'Jan', revenue: 12340, expenses: 5600, subscriptions: 234 },
    { month: 'Feb', revenue: 15670, expenses: 6200, subscriptions: 289 },
    { month: 'Mar', revenue: 19230, expenses: 6800, subscriptions: 356 },
    { month: 'Apr', revenue: 24560, expenses: 7400, subscriptions: 423 },
    { month: 'May', revenue: 29890, expenses: 8100, subscriptions: 501 },
    { month: 'Jun', revenue: 35120, expenses: 8900, subscriptions: 587 },
    { month: 'Jul', revenue: 45234, expenses: 9800, subscriptions: 678 },
  ];

  // Subscription breakdown
  const subscriptionData = [
    { plan: 'Free', users: 8234, revenue: 0, percentage: 66 },
    { plan: 'Basic', users: 2345, revenue: 11725, percentage: 19 },
    { plan: 'Premium', users: 1456, revenue: 43680, percentage: 12 },
    { plan: 'Enterprise', users: 423, revenue: 84600, percentage: 3 },
  ];

  // Support tickets (for Customer Support & Super Admin)
  const supportTickets = [
    { id: 'T-1234', user: 'John Doe', issue: 'Cannot access speaking practice', priority: 'high', status: 'open', time: '5 min ago', agent: 'Unassigned' },
    { id: 'T-1233', user: 'Sarah Smith', issue: 'Payment failed but charged', priority: 'critical', status: 'open', time: '8 min ago', agent: 'Unassigned' },
    { id: 'T-1232', user: 'Mike Johnson', issue: 'Dictionary not updating', priority: 'medium', status: 'in-progress', time: '15 min ago', agent: 'Alex R.' },
    { id: 'T-1231', user: 'Emma Wilson', issue: 'How to change language?', priority: 'low', status: 'in-progress', time: '23 min ago', agent: 'Maria S.' },
    { id: 'T-1230', user: 'David Brown', issue: 'AI feedback not showing', priority: 'high', status: 'resolved', time: '1 hour ago', agent: 'James K.' },
  ];

  // Live chat sessions
  const liveChatSessions = [
    { id: 'C-456', user: 'Alice Cooper', message: 'My test results are not showing...', status: 'active', duration: '3:24', unread: 2 },
    { id: 'C-455', user: 'Bob Martin', message: 'How do I upgrade my plan?', status: 'active', duration: '1:15', unread: 1 },
    { id: 'C-454', user: 'Carol White', message: 'Thanks for the help!', status: 'idle', duration: '15:42', unread: 0 },
    { id: 'C-453', user: 'Dan Lee', message: 'Can I get a refund?', status: 'waiting', duration: '0:45', unread: 3 },
  ];

  // System performance metrics
  const systemMetrics = {
    serverStatus: 'healthy',
    uptime: '99.98%',
    responseTime: '124ms',
    activeConnections: 3842,
    cpuUsage: 45,
    memoryUsage: 62,
    databaseLoad: 38,
    apiCalls: 156234,
    errorRate: 0.02,
  };

  // AI Processing stats
  const aiStats = {
    totalWordsGenerated: 234567,
    totalAnswersGenerated: 45678,
    totalFeedbackGenerated: 23456,
    totalTranslations: 34567,
    avgProcessingTime: '2.3s',
    aiAccuracy: 94.5,
    totalTokensUsed: '12.4M',
    estimatedCost: '$2,345',
  };

  const COLORS = ['#4A90E2', '#FFA726', '#66BB6A', '#EF5350', '#AB47BC', '#29B6F6'];

  // Role-based stats
  const getRoleStats = () => {
    const baseStats = [
      { title: 'Total Users', value: '12,458', change: '+12.5%', icon: Users, color: 'from-blue-500 to-blue-600', visible: ['super-admin', 'admin', 'accountant'] },
      { title: 'Active Now', value: '3,842', change: '+8.2%', icon: Activity, color: 'from-green-500 to-green-600', visible: ['super-admin', 'admin', 'support'] },
      { title: 'Revenue (Today)', value: '$1,847', change: '+23.1%', icon: DollarSign, color: 'from-purple-500 to-purple-600', visible: ['super-admin', 'accountant'] },
      { title: 'New Subscriptions', value: '47', change: '+15.3%', icon: UserPlus, color: 'from-orange-500 to-orange-600', visible: ['super-admin', 'accountant'] },
      { title: 'AI Words Generated', value: '8,234', change: '+18.2%', icon: Type, color: 'from-pink-500 to-pink-600', visible: ['super-admin', 'admin'] },
      { title: 'AI Answers Generated', value: '2,034', change: '+14.7%', icon: MessageCircle, color: 'from-indigo-500 to-indigo-600', visible: ['super-admin', 'admin'] },
      { title: 'Open Tickets', value: '23', change: '-5.2%', icon: AlertCircle, color: 'from-red-500 to-red-600', visible: ['super-admin', 'support'] },
      { title: 'Live Chats', value: '12', change: '+3', icon: MessageSquare, color: 'from-teal-500 to-teal-600', visible: ['super-admin', 'support'] },
      { title: 'Total Revenue', value: '$45,234', change: '+28.4%', icon: TrendingUp, color: 'from-green-600 to-green-700', visible: ['super-admin', 'accountant'] },
      { title: 'Active Subscribers', value: '4,224', change: '+12.8%', icon: CreditCard, color: 'from-blue-600 to-blue-700', visible: ['super-admin', 'accountant'] },
      { title: 'AI Processing', value: '945/min', change: '+22.1%', icon: Cpu, color: 'from-purple-600 to-purple-700', visible: ['super-admin', 'admin'] },
      { title: 'Avg Response Time', value: '124ms', change: '-12ms', icon: Zap, color: 'from-yellow-500 to-yellow-600', visible: ['super-admin', 'admin'] },
    ];

    return baseStats.filter(stat => stat.visible.includes(userRole));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Header with Role Selector */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {userRole === 'super-admin' ? 'Super Admin Dashboard' :
                   userRole === 'admin' ? 'Admin Dashboard' :
                   userRole === 'accountant' ? 'Accountant Dashboard' :
                   'Customer Support Dashboard'}
                </h1>
                <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                  {userRole === 'super-admin' ? '👑 Super Admin' :
                   userRole === 'admin' ? '⚙️ Admin' :
                   userRole === 'accountant' ? '💰 Accountant' :
                   '🎧 Support'}
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-blue-100">
                {userRole === 'super-admin' ? 'Full system access and control' :
                 userRole === 'admin' ? 'Platform management (non-financial)' :
                 userRole === 'accountant' ? 'Financial overview and subscriber management' :
                 'Technical support and live chat management'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto">
              {/* Role Switcher */}
              <div className="flex gap-2 flex-wrap">
                <Button 
                  size="sm"
                  onClick={() => setUserRole('super-admin')}
                  className={`text-xs ${userRole === 'super-admin' ? 'bg-white text-blue-600' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  👑 Super Admin
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setUserRole('admin')}
                  className={`text-xs ${userRole === 'admin' ? 'bg-white text-blue-600' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  ⚙️ Admin
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setUserRole('accountant')}
                  className={`text-xs ${userRole === 'accountant' ? 'bg-white text-blue-600' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  💰 Accountant
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setUserRole('support')}
                  className={`text-xs ${userRole === 'support' ? 'bg-white text-blue-600' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  🎧 Support
                </Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm"
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  <RefreshCw className={`mr-2 h-3 w-3 ${autoRefresh ? 'animate-spin' : ''}`} />
                  {autoRefresh ? 'Live' : 'Paused'}
                </Button>
                <Button 
                  size="sm"
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs"
                >
                  <Download className="mr-2 h-3 w-3" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {getRoleStats().map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            return (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className={`text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-xs text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* SUPER ADMIN VIEW */}
        {userRole === 'super-admin' && (
          <>
            {/* System Overview */}
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* System Health */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <Server className="h-5 w-5 text-green-500" />
                  System Health
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="font-semibold text-sm">{systemMetrics.uptime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="font-semibold text-sm text-green-600">{systemMetrics.responseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Connections</span>
                    <span className="font-semibold text-sm">{systemMetrics.activeConnections.toLocaleString()}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">CPU Usage</span>
                      <span className="font-semibold">{systemMetrics.cpuUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${systemMetrics.cpuUsage}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Memory Usage</span>
                      <span className="font-semibold">{systemMetrics.memoryUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${systemMetrics.memoryUsage}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Processing Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  AI Processing (Today)
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Words Generated</span>
                    <span className="font-bold text-purple-600">{aiStats.totalWordsGenerated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Answers Generated</span>
                    <span className="font-bold text-blue-600">{aiStats.totalAnswersGenerated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Feedback Provided</span>
                    <span className="font-bold text-green-600">{aiStats.totalFeedbackGenerated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Translations</span>
                    <span className="font-bold text-orange-600">{aiStats.totalTranslations.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-gray-700">AI Accuracy</span>
                    <span className="font-bold text-green-600">{aiStats.aiAccuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Avg Processing</span>
                    <span className="font-semibold text-sm">{aiStats.avgProcessingTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Total Tokens</span>
                    <span className="font-semibold text-sm">{aiStats.totalTokensUsed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Estimated Cost</span>
                    <span className="font-bold text-red-600">{aiStats.estimatedCost}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-2">
                                <Link to={"/user-progress"}>

                  <Button 
                    size="sm" 
                    // onClick={() => onNavigate('user-progress')}
                    className="h-auto py-3 flex-col gap-1 bg-blue-500 hover:bg-blue-600 text-xs"
                  >
                    <Users className="h-4 w-4" />
                    User Progress
                  </Button>
                  </Link>
                  <Button size="sm" className="h-auto py-3 flex-col gap-1 bg-green-500 hover:bg-green-600 text-xs">
                    <DollarSign className="h-4 w-4" />
                    Finance
                  </Button>
                  <Button size="sm" className="h-auto py-3 flex-col gap-1 bg-purple-500 hover:bg-purple-600 text-xs">
                    <Bot className="h-4 w-4" />
                    AI Config
                  </Button>
                  <Button size="sm" className="h-auto py-3 flex-col gap-1 bg-orange-500 hover:bg-orange-600 text-xs">
                    <MessageSquare className="h-4 w-4" />
                    Support
                  </Button>
                  <Button size="sm" className="h-auto py-3 flex-col gap-1 bg-pink-500 hover:bg-pink-600 text-xs">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                  <Button size="sm" className="h-auto py-3 flex-col gap-1 bg-indigo-500 hover:bg-indigo-600 text-xs">
                    <BarChart3 className="h-4 w-4" />
                    Reports
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Generation Chart */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">AI Generation Activity (Last 24h)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={aiGenerationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="words" fill="#8884d8" stroke="#8884d8" fillOpacity={0.6} name="Words Generated" />
                  <Bar dataKey="answers" fill="#82ca9d" name="Answers Generated" />
                  <Line type="monotone" dataKey="feedback" stroke="#ff7300" name="Feedback" />
                  <Line type="monotone" dataKey="translations" stroke="#ffc658" name="Translations" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Revenue & Subscriptions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="revenue" fill="#4A90E2" name="Revenue ($)" />
                  <Bar dataKey="expenses" fill="#EF5350" name="Expenses ($)" />
                  <Line type="monotone" dataKey="subscriptions" stroke="#FFA726" strokeWidth={2} name="Subscriptions" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ADMIN VIEW (No Financial Data) */}
        {userRole === 'admin' && (
          <>
            {/* AI Generation Chart */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">AI Generation Activity (Last 24h)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={aiGenerationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="words" stackId="1" stroke="#4A90E2" fill="#4A90E2" name="Words" />
                  <Area type="monotone" dataKey="answers" stackId="1" stroke="#FFA726" fill="#FFA726" name="Answers" />
                  <Area type="monotone" dataKey="feedback" stackId="1" stroke="#66BB6A" fill="#66BB6A" name="Feedback" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* User Activity & Content Management */}
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Content Performance</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-sm">Reading Tests</span>
                    </div>
                    <span className="font-bold text-blue-600">5,234</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Headphones className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-sm">Listening Tests</span>
                    </div>
                    <span className="font-bold text-green-600">4,520</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <PenTool className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-sm">Writing Tasks</span>
                    </div>
                    <span className="font-bold text-purple-600">3,890</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mic className="h-5 w-5 text-orange-600" />
                      <span className="font-medium text-sm">Speaking Practice</span>
                    </div>
                    <span className="font-bold text-orange-600">3,456</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4">AI Processing Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Words Generated</span>
                    <span className="font-bold text-purple-600">{aiStats.totalWordsGenerated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Answers</span>
                    <span className="font-bold text-blue-600">{aiStats.totalAnswersGenerated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Feedback Provided</span>
                    <span className="font-bold text-green-600">{aiStats.totalFeedbackGenerated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Translations</span>
                    <span className="font-bold text-orange-600">{aiStats.totalTranslations.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-sm text-gray-600">AI Accuracy</span>
                    <span className="font-bold text-green-600">{aiStats.aiAccuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Processing Time</span>
                    <span className="font-semibold text-sm">{aiStats.avgProcessingTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ACCOUNTANT VIEW (Only Financial) */}
        {userRole === 'accountant' && (
          <>
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Revenue & Expenses Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="revenue" fill="#4A90E2" name="Revenue ($)" />
                  <Bar dataKey="expenses" fill="#EF5350" name="Expenses ($)" />
                  <Line type="monotone" dataKey="subscriptions" stroke="#FFA726" strokeWidth={2} name="New Subscriptions" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Subscription Breakdown */}
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Subscription Plans</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="users"
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Revenue by Plan</h2>
                <div className="space-y-3">
                  {subscriptionData.map((plan, index) => (
                    <div key={index} className="border-b pb-3 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm">{plan.plan}</span>
                        <span className="font-bold text-green-600">${plan.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span>{plan.users.toLocaleString()} users</span>
                        <span>{plan.percentage}% of total</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${plan.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">User</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">Plan</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-xs sm:text-sm">Sarah Mitchell</td>
                      <td className="py-3 px-2 text-xs sm:text-sm">Premium</td>
                      <td className="py-3 px-2 text-xs sm:text-sm font-semibold text-green-600">$29.99</td>
                      <td className="py-3 px-2"><Badge className="bg-green-100 text-green-700 text-xs">Success</Badge></td>
                      <td className="py-3 px-2 text-xs sm:text-sm text-gray-600">Just now</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-xs sm:text-sm">John Anderson</td>
                      <td className="py-3 px-2 text-xs sm:text-sm">Enterprise</td>
                      <td className="py-3 px-2 text-xs sm:text-sm font-semibold text-green-600">$199.99</td>
                      <td className="py-3 px-2"><Badge className="bg-green-100 text-green-700 text-xs">Success</Badge></td>
                      <td className="py-3 px-2 text-xs sm:text-sm text-gray-600">5 min ago</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-xs sm:text-sm">Emma Chen</td>
                      <td className="py-3 px-2 text-xs sm:text-sm">Basic</td>
                      <td className="py-3 px-2 text-xs sm:text-sm font-semibold text-green-600">$4.99</td>
                      <td className="py-3 px-2"><Badge className="bg-green-100 text-green-700 text-xs">Success</Badge></td>
                      <td className="py-3 px-2 text-xs sm:text-sm text-gray-600">12 min ago</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-xs sm:text-sm">David Lee</td>
                      <td className="py-3 px-2 text-xs sm:text-sm">Premium</td>
                      <td className="py-3 px-2 text-xs sm:text-sm font-semibold text-red-600">$29.99</td>
                      <td className="py-3 px-2"><Badge className="bg-red-100 text-red-700 text-xs">Failed</Badge></td>
                      <td className="py-3 px-2 text-xs sm:text-sm text-gray-600">18 min ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* CUSTOMER SUPPORT VIEW */}
        {userRole === 'support' && (
          <>
            {/* Live Chat Sessions */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Active Live Chats</h2>
                <Badge className="bg-green-100 text-green-700">4 Active</Badge>
              </div>
              <div className="space-y-3">
                {liveChatSessions.map((chat) => (
                  <div key={chat.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        chat.status === 'active' ? 'bg-green-100' :
                        chat.status === 'waiting' ? 'bg-red-100' :
                        'bg-gray-100'
                      }`}>
                        <MessageSquare className={`h-5 w-5 ${
                          chat.status === 'active' ? 'text-green-600' :
                          chat.status === 'waiting' ? 'text-red-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{chat.user}</p>
                          {chat.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs">{chat.unread}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate">{chat.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${
                            chat.status === 'active' ? 'bg-green-100 text-green-700' :
                            chat.status === 'waiting' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {chat.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{chat.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="ml-2">
                      <Reply className="h-4 w-4 mr-1" />
                      Respond
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Support Tickets</h2>
                <div className="flex gap-2">
                  <Badge className="bg-red-100 text-red-700">1 Critical</Badge>
                  <Badge className="bg-orange-100 text-orange-700">2 High</Badge>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold">ID</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold">User</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold">Issue</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold">Priority</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold">Status</th>
                      <th className="text-left py-3 px-2 text-xs sm:text-sm font-semibold">Agent</th>
                      <th className="text-right py-3 px-2 text-xs sm:text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 font-mono text-xs">{ticket.id}</td>
                        <td className="py-3 px-2 text-xs sm:text-sm">{ticket.user}</td>
                        <td className="py-3 px-2 text-xs sm:text-sm max-w-xs truncate">{ticket.issue}</td>
                        <td className="py-3 px-2">
                          <Badge className={`text-xs ${
                            ticket.priority === 'critical' ? 'bg-red-100 text-red-700' :
                            ticket.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <Badge className={`text-xs ${
                            ticket.status === 'open' ? 'bg-blue-100 text-blue-700' :
                            ticket.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-xs text-gray-600">{ticket.agent}</td>
                        <td className="py-3 px-2 text-right">
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Support Stats */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-sm mb-3">Response Times</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Avg First Response</span>
                    <span className="font-bold">3.2 min</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Avg Resolution</span>
                    <span className="font-bold">24.5 min</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-sm mb-3">Satisfaction</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Customer Rating</span>
                    <span className="font-bold">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Resolved Today</span>
                    <span className="font-bold">47 tickets</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-sm mb-3">Your Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Tickets Handled</span>
                    <span className="font-bold">12 today</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Avg Rating</span>
                    <span className="font-bold">4.9/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Live Activity Feed (All Roles) */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Live Activity Feed
              {autoRefresh && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>}
            </h2>
            <span className="text-xs text-gray-500">Updated in real-time</span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {liveActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'processing' ? 'bg-blue-500 animate-pulse' :
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'payment' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{activity.user}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-600">{activity.action}</span>
                    </div>
                    <p className="text-xs text-gray-500">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 ml-2">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}