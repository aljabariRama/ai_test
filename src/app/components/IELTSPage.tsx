import {
  BookOpen,
  Headphones,
  PenTool,
  MessageSquare,
  Award,
  Clock,
  Target,
  CheckCircle,
  TrendingUp,
  Brain,
  Link,
} from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";

interface IELTSPageProps {
  onNavigate: (page: string) => void;
}

export function IELTSPage() {
  const { t } = useLanguage();

  const skills = [
    {
      icon: Headphones,
      title: "Listening",
      duration: "30 minutes",
      sections: "4 sections",
      description:
        "40 questions based on recordings of native English speakers",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: BookOpen,
      title: "Reading",
      duration: "60 minutes",
      sections: "3 passages",
      description: "Academic or General Training texts with 40 questions",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: PenTool,
      title: "Writing",
      duration: "60 minutes",
      sections: "2 tasks",
      description: "Task 1: 150 words | Task 2: 250 words essay",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: MessageSquare,
      title: "Speaking",
      duration: "11-14 minutes",
      sections: "3 parts",
      description: "Face-to-face interview with an IELTS examiner",
      color: "from-green-500 to-green-600",
    },
  ];

  const bandScores = [
    {
      band: 9,
      level: "Expert User",
      description: "Full operational command of the language",
    },
    {
      band: 8,
      level: "Very Good User",
      description: "Fully operational with occasional inaccuracies",
    },
    {
      band: 7,
      level: "Good User",
      description: "Operational command with occasional inaccuracies",
    },
    {
      band: 6,
      level: "Competent User",
      description: "Generally effective command despite inaccuracies",
    },
    {
      band: 5,
      level: "Modest User",
      description: "Partial command with frequent problems",
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Personalized Learning Path",
      description: "AI-powered study plan tailored to your target band score",
    },
    {
      icon: Brain,
      title: "Smart Practice",
      description: "Adaptive exercises that focus on your weak areas",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Real-time analytics and performance insights",
    },
    {
      icon: Award,
      title: "Band Score Prediction",
      description: "Accurate scoring based on official IELTS criteria",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Master IELTS with AI
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 px-4">
              Your comprehensive guide to achieving your target band score
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to={"/placement"}>
                <Button
                  // onClick={() => onNavigate('placement')}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                >
                  <Brain className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Take Placement Test
                </Button>
              </Link>
              <Link to={"/live"}>
                <Button
                  // onClick={() => onNavigate('live')}
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                >
                  <Target className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Start Practicing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What is IELTS */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 px-4">
            What is IELTS?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            The International English Language Testing System (IELTS) is the
            world's most popular English language proficiency test for higher
            education and global migration, with over 3 million tests taken last
            year.
          </p>

          {/* Test Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div
                    className={`inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${skill.color} mb-3 sm:mb-4`}
                  >
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                    {skill.title}
                  </h3>
                  <div className="flex gap-3 sm:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{skill.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{skill.sections}</span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Band Scores */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 px-4">
              IELTS Band Scores
            </h2>
            <p className="text-base sm:text-lg text-gray-700 text-center mb-8 sm:mb-12 px-4">
              Understand the 9-band scoring system and what each level means
            </p>

            <div className="space-y-3 sm:space-y-4 px-2">
              {bandScores.map((score, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          {score.band}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold mb-1">
                        {score.level}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700">
                        {score.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mr Kassel Features */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 px-4">
            Why Choose Mr Kassel for IELTS Preparation?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 text-center mb-8 sm:mb-12 px-4">
            AI-powered features designed to help you achieve your target band
            score
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-100 mb-3 sm:mb-4">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl mx-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Start Your IELTS Journey?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100">
              Take our Smart Test to assess your current level and get a
              personalized study plan
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to={"/placement"}>
                <Button
                  // onClick={() => onNavigate('placement')}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                >
                  <Brain className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Take Smart Test
                </Button>
              </Link>
              <Link to={"/plans"}>
                <Button
                  // onClick={() => onNavigate('plans')}
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                >
                  <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
