import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  BookOpen, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  Target,
  GraduationCap,
  Languages,
  Zap
} from 'lucide-react';

interface CategorySelectionProps {
  onSelect: (category: 'skills' | 'components' | 'exam-prep') => void;
}

export function CategorySelection({ onSelect }: CategorySelectionProps) {
  const categories = [
    {
      id: 'skills' as const,
      title: 'Language Skills',
      description: 'Practice the four core language skills',
      icon: Languages,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-600',
      skills: ['Listening', 'Reading', 'Writing', 'Speaking'],
      badge: 'Most Popular',
      badgeColor: 'bg-blue-600'
    },
    {
      id: 'components' as const,
      title: 'Language Components',
      description: 'Master grammar rules and expand vocabulary',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-600',
      skills: ['Grammar', 'Vocabulary'],
      badge: 'Foundation',
      badgeColor: 'bg-purple-600'
    },
    {
      id: 'exam-prep' as const,
      title: 'Exam Preparation',
      description: 'Practice for IELTS, TOEFL, and other tests',
      icon: GraduationCap,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-600',
      skills: ['IELTS', 'TOEFL', 'Cambridge'],
      badge: 'Coming Soon',
      badgeColor: 'bg-orange-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 py-3 sm:py-6 px-3 sm:px-4">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-3 sm:mb-4">
          <Target className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Practice Path
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Select a category to begin your personalized learning journey
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`${category.borderColor} border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden ${
              category.id === 'exam-prep' ? 'opacity-60' : ''
            }`}
            onClick={() => {
              if (category.id !== 'exam-prep') {
                onSelect(category.id);
              }
            }}
          >
            <CardContent className="p-0">
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${category.color} p-4 sm:p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${category.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                      <category.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <Badge className={`${category.badgeColor} text-white border-0 text-xs`}>
                      {category.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className={`${category.bgColor} p-4 sm:p-6`}>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${category.iconBg}`}></div>
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">{skill}</span>
                      {category.id === 'exam-prep' && (
                        <Badge variant="outline" className="text-xs ml-auto">Soon</Badge>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                {category.id !== 'exam-prep' ? (
                  <Button
                    className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white gap-2 h-10 sm:h-11 text-sm sm:text-base`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(category.id);
                    }}
                  >
                    Start Practicing
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-gray-400 cursor-not-allowed text-white gap-2 h-10 sm:h-11 text-sm sm:text-base"
                    disabled
                  >
                    Coming Soon
                    <Zap className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Practice Options</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">6 Skills</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">AI-Powered</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">Feedback</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">CEFR Levels</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">A1 - C2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 sm:p-6 text-white mt-6 sm:mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-base sm:text-lg mb-1">Personalized Learning Experience</h4>
            <p className="text-xs sm:text-sm text-white/90">
              Our AI adapts to your level and provides instant feedback to help you improve faster
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}