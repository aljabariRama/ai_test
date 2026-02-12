import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { SeparatePlans } from './SeparatePlans';
import { Link } from 'react-router-dom';
import { RecordedCourses } from './RecordedCourses';
import {
  MessageSquare,
  PenTool,
  Headphones,
  BookOpen,
  Brain,
  Target,
  Video,
  Sparkles,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Zap,
  BookMarked,
  BarChart3,
  GraduationCap,
  Calendar,
  Gift,
  MapPin,
  ChevronRight,
  PlayCircle,

} from 'lucide-react';

// interface HomePageProps {
//   onNavigate: (page: string) => void;
// }


export function HomePage() {

  const { t, language } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState<'ielts' | 'toefl' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | null>(null);

  const features = [
    {
      icon: BookMarked,
      title: 'Smart Dictionary & Vocabulary',
      description: 'Build your vocabulary with intelligent flashcards and spaced repetition',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Target,
      title: 'Real Exam-Style Questions',
      description: 'Practice with authentic IELTS & TOEFL questions',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: BarChart3,
      title: 'Full Exam Simulations',
      description: 'Experience complete practice tests under real exam conditions',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Video,
      title: 'Animated AI Educational Videos',
      description: 'Learn with engaging AI-powered animated lessons',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: MessageSquare,
      title: 'AI Speaking Partner',
      description: 'Practice speaking with AI that corrects and guides you',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analysis',
      description: 'Get detailed feedback and improvement suggestions',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50'
    }
  ];

  const skills = [
    {
      id: 'speaking',
      icon: MessageSquare,
      title: 'Speaking',
      emoji: '🗣️',
      description: 'Practice with AI examiner and get instant feedback on pronunciation, fluency, and grammar',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'writing',
      icon: PenTool,
      title: 'Writing',
      emoji: '✍️',
      description: 'Improve your essays and reports with AI scoring and detailed corrections',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'listening',
      icon: Headphones,
      title: 'Listening',
      emoji: '🎧',
      description: 'Master different accents and question types with authentic audio materials',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'reading',
      icon: BookOpen,
      title: 'Reading',
      emoji: '📖',
      description: 'Develop speed and comprehension with passages from real exam topics',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const journeySteps = [
    { icon: Award, title: 'Choose Certificate', description: 'IELTS or TOEFL' },
    { icon: Video, title: 'Learn with AI Videos', description: 'Animated lessons' },
    { icon: Target, title: 'Practice Skills', description: '4 core skills' },
    { icon: Sparkles, title: 'Get AI Feedback', description: 'Instant scoring' },
    { icon: BarChart3, title: 'Simulate the Exam', description: 'Full practice tests' },
    { icon: Calendar, title: 'Book Official Test', description: 'Find test centers' },
    { icon: GraduationCap, title: 'Pass with Confidence', description: 'Achieve your goals' }
  ];

  return (
    <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            {/* Badge */}
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-4 py-2 text-sm sm:text-base">
              <Sparkles className="h-4 w-4 mr-2 inline" />
              AI-Powered IELTS & TOEFL Preparation
            </Badge>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Prepare Smarter for IELTS & TOEFL
              </span>
              <br />
              <span className="text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                With AI That Trains You Like a Real Examiner
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Practice, simulate, and improve your speaking, writing, listening, and reading skills with AI feedback, animated lessons, and real exam simulations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to={"/live"}>
              <Button
                // onClick={() => onNavigate('live')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto group"
              >
                <PlayCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Practicing
              </Button>
              </Link>
              <Button
                onClick={() => {
                  const plansSection = document.getElementById('plans-section');
                  plansSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="border-2 border-gray-300 hover:border-purple-600 text-gray-700 hover:text-purple-600 px-8 py-6 text-base sm:text-lg rounded-xl transition-all w-full sm:w-auto"
              >
                <Star className="h-5 w-5 mr-2" />
                View Plans
              </Button>
            </div>

            {/* Secondary CTA */}
            <div className="pt-4">
              <Button
                onClick={() => {
                  const bookingSection = document.getElementById('booking-section');
                  bookingSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="ghost"
                className="text-purple-600 hover:text-purple-700 text-sm sm:text-base"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Book Your Official Exam
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 max-w-3xl mx-auto">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">5M+</p>
                <p className="text-xs sm:text-sm text-gray-600">Active Learners</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">4.9★</p>
                <p className="text-xs sm:text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">150+</p>
                <p className="text-xs sm:text-sm text-gray-600">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">98%</p>
                <p className="text-xs sm:text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Mr. Kassel Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4">
                <Brain className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                What is Mr. Kassel?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                An intelligent preparation platform designed to help students succeed in IELTS and TOEFL
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-purple-200"
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills-Based Learning Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-16">
              <Badge className="bg-purple-600 text-white border-0 px-4 py-2 mb-3">
                <Target className="h-4 w-4 mr-2 inline" />
                Master the 4 Essential Skills
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Skills-Based Learning
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Each skill includes AI videos, practice questions, real exam tasks, and detailed feedback
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {skills.map((skill) => (
                <Card
                  key={skill.id}
                  className={`group cursor-pointer border-2 ${skill.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
                  // onClick={() => onNavigate('live')}
                >
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${skill.color} p-6 sm:p-8 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 text-6xl sm:text-8xl opacity-10">
                        {skill.emoji}
                      </div>
                      <div className="relative z-10">
                        <skill.icon className="h-10 w-10 sm:h-12 sm:w-12 text-white mb-3 sm:mb-4" />
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          {skill.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${skill.bgColor} p-6 sm:p-8`}>
                      <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
                        {skill.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Video className="h-4 w-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Animated AI Video</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Target className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">Practice Questions</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Sparkles className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">AI Feedback & Scoring</span>
                        </div>
                      </div>

                      <Button 
                        className={`w-full bg-gradient-to-r ${skill.color} hover:opacity-90 text-white group-hover:scale-105 transition-transform`}
                      >
                        Start Practicing
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Video Unlock Logic Info */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 sm:p-8 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">How It Works</h4>
                  <p className="text-sm text-white/90">
                    Watch the AI educational video to unlock each skill's content → After completing the video, access practice questions and get instant AI feedback on your performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Selection Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
              <Badge className="bg-orange-600 text-white border-0 px-4 py-2 mb-3">
                <Award className="h-4 w-4 mr-2 inline" />
                Choose Your Path
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Choose Your Certificate
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Select IELTS or TOEFL and the entire platform adapts to your chosen exam format
              </p>
            </div>

            {/* Certificate Cards */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* IELTS */}
              <Card
                className={`cursor-pointer border-2 transition-all duration-300 hover:-translate-y-2 ${
                  selectedCertificate === 'ielts'
                    ? 'border-blue-500 shadow-xl ring-4 ring-blue-100'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                }`}
                onClick={() => setSelectedCertificate('ielts')}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    {selectedCertificate === 'ielts' && (
                      <CheckCircle2 className="h-8 w-8 text-blue-500" />
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    IELTS Preparation
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Prepare for the International English Language Testing System with AI-powered practice and feedback
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Academic & General Training</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Band Score 1-9 Grading</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Real Exam Simulations</span>
                    </li>
                  </ul>
                  <Button 
                    className={`w-full ${
                      selectedCertificate === 'ielts'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedCertificate === 'ielts' ? 'Selected' : 'Select IELTS'}
                  </Button>
                </CardContent>
              </Card>

              {/* TOEFL */}
              <Card
                className={`cursor-pointer border-2 transition-all duration-300 hover:-translate-y-2 ${
                  selectedCertificate === 'toefl'
                    ? 'border-purple-500 shadow-xl ring-4 ring-purple-100'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
                }`}
                onClick={() => setSelectedCertificate('toefl')}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    {selectedCertificate === 'toefl' && (
                      <CheckCircle2 className="h-8 w-8 text-purple-500" />
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    TOEFL Preparation
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Get ready for the Test of English as a Foreign Language with comprehensive practice materials
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>iBT & Paper-Based Format</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>0-120 Score Range</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Integrated Tasks Practice</span>
                    </li>
                  </ul>
                  <Button 
                    className={`w-full ${
                      selectedCertificate === 'toefl'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedCertificate === 'toefl' ? 'Selected' : 'Select TOEFL'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Adapts Automatically</h4>
                  <p className="text-sm text-gray-600">
                    When you select your certificate, all questions, simulations, feedback, videos, and content automatically adapt to match your chosen exam format (IELTS or TOEFL)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans & Subscription Section - Separate IELTS and TOEFL */}
      <SeparatePlans  />

      {/* Recorded Courses Section */}
      <RecordedCourses  />


      {/* Exam Booking Integration */}
      <section id="booking-section" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
              <Badge className="bg-green-600 text-white border-0 px-4 py-2 mb-3">
                <Calendar className="h-4 w-4 mr-2 inline" />
                Ready to Take the Test?
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Book Your Official Exam
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Find accredited test centers and book your exam directly through Mr. Kassel
              </p>
            </div>

            {/* Booking Process */}
            <Card className="border-2 border-gray-200 mb-8">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Choose Your Exam</h4>
                      <p className="text-sm text-gray-600">Select IELTS or TOEFL based on your preparation</p>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 ml-5"></div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Find Test Center</h4>
                      <p className="text-sm text-gray-600">Browse accredited test centers near your location</p>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 ml-5"></div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Book Through Mr. Kassel</h4>
                      <p className="text-sm text-gray-600">Complete your booking seamlessly on our platform</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 sm:p-8 lg:p-10 text-white mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">Special Offer!</h3>
                  <p className="text-base sm:text-lg text-white/90 mb-4">
                    Book your official exam through Mr. Kassel and receive <strong>FREE Pro Plan access for 1 month</strong>
                  </p>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li className="flex items-center gap-2 justify-center md:justify-start">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>Full exam simulations</span>
                    </li>
                    <li className="flex items-center gap-2 justify-center md:justify-start">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>AI speaking & writing feedback</span>
                    </li>
                    <li className="flex items-center gap-2 justify-center md:justify-start">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <span>Unlimited practice access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => alert('Finding test centers near you...')}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Find Test Center
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => alert('Redirecting to exam booking...')}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Exam Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
              <Badge className="bg-white/20 text-white border-0 px-4 py-2 mb-3">
                <Target className="h-4 w-4 mr-2 inline" />
                Your Journey to Success
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                7 Steps to Exam Success
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
                Follow our proven path from beginner to confident test-taker
              </p>
            </div>

            {/* Timeline - Desktop */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>

                {/* Steps */}
                <div className="relative grid grid-cols-7 gap-4">
                  {journeySteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl relative z-10">
                          <step.icon className="h-10 w-10 text-purple-600" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{step.title}</h4>
                      <p className="text-xs text-white/70">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline - Mobile & Tablet */}
            <div className="lg:hidden space-y-6">
              {journeySteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-xl flex-shrink-0">
                    <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-purple-600" />
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="font-semibold text-base sm:text-lg mb-1">{step.title}</h4>
                    <p className="text-sm text-white/70">{step.description}</p>
                  </div>
                  {index < journeySteps.length - 1 && (
                    <ChevronRight className="h-6 w-6 text-white/30 flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12 sm:mt-16">
              <Link to ="live">
              <Button
                // onClick={() => onNavigate('live')}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 sm:px-12 py-6 text-base sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Start Your Journey Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Ace Your Exam?
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              Join millions of students who have improved their English skills with Mr. Kassel
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link to ="live">
        
              <Button
                // onClick={() => onNavigate('live')}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-base sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
              >
                <PlayCircle className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>

              </Link>


              <Link to ="contact">
              <Button
                // onClick={() => onNavigate('contact')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base sm:text-lg rounded-xl transition-all w-full sm:w-auto"
              >
                Contact Us
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}