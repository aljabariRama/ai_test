import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Star,
  Download,
  Share2,
  Award,
  Users,
  Clock,
  Shield,
  ChevronRight,
  Globe,
  Sparkles,
  MessageSquare,
  BookMarked,
  Mic,
  BarChart3,
  Headphones,
  PenTool,
  BookOpen,
  Check,
  ArrowLeft,
  ExternalLink,
  Heart
} from 'lucide-react';

interface AppStoreProps {
  onBack?: () => void;
}

export function AppStore({ onBack }: AppStoreProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const screenshots = [
    {
      title: 'Live Practice',
      description: 'AI-powered real-time practice sessions',
      color: 'from-blue-500 to-purple-600',
      icon: MessageSquare
    },
    {
      title: 'Phrase Notebook',
      description: 'Personalized vocabulary learning',
      color: 'from-purple-500 to-pink-600',
      icon: BookMarked
    },
    {
      title: 'Speaking Practice',
      description: 'Voice recognition & feedback',
      color: 'from-green-500 to-teal-600',
      icon: Mic
    },
    {
      title: 'Progress Tracking',
      description: 'Detailed analytics & insights',
      color: 'from-orange-500 to-red-600',
      icon: BarChart3
    },
    {
      title: 'Smart Testing',
      description: 'Adaptive placement tests',
      color: 'from-indigo-500 to-blue-600',
      icon: Award
    }
  ];

  const features = [
    {
      icon: Headphones,
      title: 'Listening Practice',
      description: 'Native speaker audio with comprehension exercises'
    },
    {
      icon: PenTool,
      title: 'Writing Exercises',
      description: 'AI-corrected essays and grammar practice'
    },
    {
      icon: BookOpen,
      title: 'Reading Passages',
      description: 'CEFR-leveled content with questions'
    },
    {
      icon: Mic,
      title: 'Speaking AI',
      description: 'Conversational practice with instant feedback'
    },
    {
      icon: Globe,
      title: '18+ Languages',
      description: 'Learn from your native language'
    },
    {
      icon: Sparkles,
      title: 'AI Powered',
      description: 'Personalized learning paths & recommendations'
    }
  ];

  const reviews = [
    {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 5,
      date: '2 days ago',
      title: 'Best Language Learning App!',
      text: 'The AI feedback is incredibly accurate. I\'ve improved my IELTS score from 6.5 to 8.0 in just 3 months. The speaking practice feature is a game-changer!'
    },
    {
      name: 'Mohammed Al-Rashid',
      avatar: 'MA',
      rating: 5,
      date: '1 week ago',
      title: 'Perfect for IELTS Preparation',
      text: 'The Live Practice feature helped me understand exactly what I needed to work on. The personalized vocabulary is spot-on with my interests.'
    },
    {
      name: 'Elena Rodriguez',
      avatar: 'ER',
      rating: 5,
      date: '2 weeks ago',
      title: 'Amazing Progress Tracking',
      text: 'I love how the app tracks every aspect of my learning. The phrase notebook updates every 3 days with new words that match my level perfectly.'
    }
  ];

  const ratings = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {onBack && (
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          )}
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* App Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* App Icon */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl flex items-center justify-center">
              <Globe className="h-16 w-16 text-white" />
            </div>
          </div>

          {/* App Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              LinguaAI - Language Master
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              AI-Powered IELTS & Language Learning
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">4.9</span>
                <span className="text-gray-600">128K ratings</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Download className="h-5 w-5" />
                <span className="font-semibold">5M+</span>
                <span>Downloads</span>
              </div>
              <Badge className="bg-green-600">Editor's Choice</Badge>
            </div>

            {/* Download Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 shadow-lg gap-3"
              >
                <Download className="h-5 w-5" />
                Download Now - Free
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <ExternalLink className="h-5 w-5" />
                Open Web Version
              </Button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Age 4+</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Education</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Updated 3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Preview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
            {screenshots.map((screenshot, index) => {
              const Icon = screenshot.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedScreenshot(index)}
                  className={`relative group ${
                    selectedScreenshot === index ? 'ring-4 ring-blue-600' : ''
                  } rounded-xl overflow-hidden transition-all hover:scale-105`}
                >
                  <div
                    className={`aspect-[9/16] bg-gradient-to-br ${screenshot.color} p-6 flex flex-col items-center justify-center text-white`}
                  >
                    <Icon className="h-12 w-12 mb-4" />
                    <p className="font-semibold text-center text-sm">{screenshot.title}</p>
                  </div>
                  {selectedScreenshot === index && (
                    <div className="absolute inset-0 bg-blue-600/20 border-4 border-blue-600 rounded-xl" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Screenshot Detail */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-4">
                {(() => {
                  const Icon = screenshots[selectedScreenshot].icon;
                  return <Icon className="h-8 w-8" />;
                })()}
                <div>
                  <h3 className="text-2xl font-bold">{screenshots[selectedScreenshot].title}</h3>
                  <p className="text-gray-300">{screenshots[selectedScreenshot].description}</p>
                </div>
              </div>
              <p className="text-gray-400">
                Experience cutting-edge AI technology designed to accelerate your language learning journey. Our platform adapts to your skill level and learning pace.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* What's New */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">What's New</h2>
            <span className="text-sm text-gray-600">Version 2.5.0</span>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Enhanced AI Speaking Coach</p>
                    <p className="text-sm text-gray-600">More accurate pronunciation feedback with native speaker comparisons</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Phrase Notebook Improvements</p>
                    <p className="text-sm text-gray-600">Now supports 18+ languages with better translation accuracy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Live Practice Updates</p>
                    <p className="text-sm text-gray-600">New question types and real-time collaboration features</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Performance Enhancements</p>
                    <p className="text-sm text-gray-600">Faster loading times and smoother animations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Ratings & Reviews */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>
          
          {/* Overall Rating */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-2">4.9</div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">128K ratings</p>
                </div>

                <div className="space-y-2">
                  {ratings.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-6">{rating.stars}★</span>
                      <Progress value={rating.percentage} className="h-2 flex-1" />
                      <span className="text-sm text-gray-600 w-12 text-right">{rating.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full gap-2">
              See All Reviews
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Developer</h3>
                  <p className="text-gray-700">LinguaAI Technologies Inc.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Size</h3>
                  <p className="text-gray-700">145 MB</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <p className="text-gray-700">Education</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Compatibility</h3>
                  <p className="text-gray-700">Requires iOS 13.0 or later / Android 8.0+</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                  <p className="text-gray-700">English, Arabic, Spanish, French, +15 more</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Age Rating</h3>
                  <p className="text-gray-700">4+ years</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Price</h3>
                  <p className="text-gray-700">Free with in-app purchases</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">In-App Purchases</h3>
                  <p className="text-gray-700">Premium: $9.99/month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Start Your Learning Journey Today</h2>
            <p className="text-lg mb-6 text-blue-100">
              Join 5M+ learners improving their language skills with AI-powered practice
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 gap-3"
            >
              <Download className="h-5 w-5" />
              Download Now - Free
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
