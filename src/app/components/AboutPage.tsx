import { Target, Users, Award, Sparkles, Heart, Globe, TrendingUp, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

// interface AboutPageProps {
//   onNavigate: (page: string) => void;
// }

export function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Student-Centered',
      description: 'Every feature is designed with your learning journey in mind'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Cutting-edge technology that adapts to your unique needs'
    },
    {
      icon: Heart,
      title: 'Passionate',
      description: 'We love what we do and it shows in every interaction'
    },
    {
      icon: Shield,
      title: 'Trusted',
      description: 'Your data and progress are secure with industry-leading protection'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students' },
    { number: '120+', label: 'Countries' },
    { number: '95%', label: 'Success Rate' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4">
              About Mr Kassel
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 px-4">
              Revolutionizing English language learning through artificial intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 md:mb-16 mx-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
              At Mr Kassel, we believe that everyone deserves access to world-class English education. 
              Our mission is to break down language barriers using the power of artificial intelligence, 
              making personalized, effective English learning accessible to students worldwide.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              We combine proven language teaching methodologies with cutting-edge AI technology to create 
              a learning experience that adapts to each student's unique needs, pace, and goals.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16 px-2">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-8 sm:mb-12 md:mb-16 px-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-4">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all">
                    <div className="inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-100 mb-3 sm:mb-4">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-sm sm:text-base text-gray-700">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Story */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 md:mb-16 mx-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
              Mr Kassel was born from a simple observation: traditional English learning methods 
              weren't working for everyone. Some students needed more practice with speaking, 
              others with writing, and everyone learned at different paces.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
              We asked ourselves: What if we could create a learning platform that understood each 
              student's unique needs and adapted accordingly? What if AI could provide the kind of 
              personalized attention that only the best human teachers could offer?
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Today, Mr Kassel serves students in over 120 countries, helping them achieve their 
              English language goals whether it's passing IELTS, advancing their careers, or simply 
              becoming more confident communicators.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl mx-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Your Journey?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100">
              Join thousands of students achieving their English language goals
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to ="placement"></Link>
              <Button
                // onClick={() => onNavigate('placement')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              >
                <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Take Smart Test
              </Button>

              <Link to ="plans"></Link>
              <Button
                // onClick={() => onNavigate('plans')}
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              >
                <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                View Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}