import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Award,
  GraduationCap,
  CheckCircle2,
  Star,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SeparatePlansProps {
  onNavigate: (page: string) => void;
}

export function SeparatePlans() {
  return (
    <section id="plans-section" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2 mb-3">
              <Star className="h-4 w-4 mr-2 inline" />
              Flexible Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Choose Your Plan
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Select your certificate and plan to get started
            </p>
          </div>

          {/* IELTS Plans */}
          <div className="mb-12 sm:mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-center gap-3">
                <Award className="h-6 w-6 sm:h-8 sm:w-8" />
                <h3 className="text-2xl sm:text-3xl font-bold">IELTS Plans</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 bg-white rounded-b-xl border-2 border-blue-200">
              {/* IELTS Free */}
              <Card className="border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-3">
                      <Lock className="h-7 w-7 text-gray-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">IELTS Free</h4>
                    <div className="mb-3">
                      <span className="text-4xl font-bold text-gray-900">$0</span>
                      <span className="text-gray-600">/forever</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>5 practice questions per skill</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Band Score calculator</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Basic IELTS tips</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Sample intro videos</span>
                    </li>
                  </ul>
                  <Link to ="live">
                  <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white" >
                    Get Started
                  </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* IELTS Pro */}
              <Card className="border-2 border-blue-500 shadow-xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white border-0 px-4 py-1">
                    <Star className="h-3 w-3 mr-1 inline" />
                    Popular
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-3">
                      <Unlock className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">IELTS Pro</h4>
                    <div className="mb-3">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">$29</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Unlimited IELTS practice</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Full exam simulations</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">AI band score prediction</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Writing Task 1 & 2 feedback</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Speaking part 1, 2 & 3</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">All recorded courses</span>
                    </li>
                  </ul>
                  <Link to="plans">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white" >
                    Subscribe Now
                    <Sparkles className="h-4 w-4 ml-2" />
                  </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* TOEFL Plans */}
          <div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-center gap-3">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
                <h3 className="text-2xl sm:text-3xl font-bold">TOEFL Plans</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 bg-white rounded-b-xl border-2 border-purple-200">
              {/* TOEFL Free */}
              <Card className="border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-3">
                      <Lock className="h-7 w-7 text-gray-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">TOEFL Free</h4>
                    <div className="mb-3">
                      <span className="text-4xl font-bold text-gray-900">$0</span>
                      <span className="text-gray-600">/forever</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>5 practice questions per skill</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Score calculator (0-120)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Basic TOEFL tips</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Sample intro videos</span>
                    </li>
                  </ul>
                       <Link to="live">
                  <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white" >
                    Get Started
                  </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* TOEFL Pro */}
              <Card className="border-2 border-purple-500 shadow-xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white border-0 px-4 py-1">
                    <Star className="h-3 w-3 mr-1 inline" />
                    Popular
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-3">
                      <Unlock className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">TOEFL Pro</h4>
                    <div className="mb-3">
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$29</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Unlimited TOEFL practice</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Full iBT simulations</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">AI score prediction</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Integrated task feedback</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">Independent speaking tasks</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">All recorded courses</span>
                    </li>
                  </ul>
                       <Link to="plans">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white" >
                    Subscribe Now
                    <Sparkles className="h-4 w-4 ml-2" />
                  </Button>
               </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
