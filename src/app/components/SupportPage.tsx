import { HelpCircle, BookOpen, Video, MessageSquare, Mail, FileText, Search, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// interface SupportPageProps {
//   onNavigate: (page: string) => void;
// }

export function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Help Center',
      description: 'Browse articles and guides',
      availability: 'Self-service',
      action: 'Browse Articles',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      availability: '50+ tutorials',
      action: 'Watch Videos',
      color: 'from-green-500 to-green-600'
    }
  ];

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the "Start Free Trial" button in the header, fill in your details, and verify your email address to get started.'
        },
        {
          q: 'Is there a free trial available?',
          a: 'Yes! We offer a 7-day free trial with full access to all features. No credit card required.'
        },
        {
          q: 'How does the Smart Test work?',
          a: 'Our AI-powered Smart Test adapts to your level in real-time, providing an accurate assessment of your English proficiency in just 15-20 minutes.'
        }
      ]
    },
    {
      category: 'Subscription & Billing',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, PayPal, and local payment methods depending on your region.'
        },
        {
          q: 'Can I cancel my subscription anytime?',
          a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our service.'
        }
      ]
    },
    {
      category: 'Features & Tools',
      questions: [
        {
          q: 'How does the AI feedback work?',
          a: 'Our AI analyzes your answers in real-time, comparing them to IELTS standards and providing detailed feedback on grammar, vocabulary, coherence, and more.'
        },
        {
          q: 'Can I practice speaking with AI?',
          a: 'Yes! Our Live Practice feature includes AI-powered speaking practice with pronunciation feedback and conversation simulation.'
        },
        {
          q: 'What is My Dictionary?',
          a: 'My Dictionary is an AI-powered vocabulary learning tool that creates personalized word lists based on your interests and learning progress.'
        }
      ]
    },
    {
      category: 'Technical Issues',
      questions: [
        {
          q: 'The app is not loading properly',
          a: 'Try clearing your browser cache, updating to the latest browser version, or using a different browser. If the issue persists, contact support.'
        },
        {
          q: 'I can\'t hear the audio in listening exercises',
          a: 'Check your device volume, ensure your browser has permission to play audio, and try using headphones if available.'
        },
        {
          q: 'My progress is not being saved',
          a: 'Make sure you\'re logged into your account and have a stable internet connection. Your progress is automatically saved to the cloud.'
        }
      ]
    }
  ];

  const guides = [
    {
      title: 'Complete Guide to IELTS Preparation',
      description: 'Everything you need to know to ace your IELTS exam',
      icon: '📚',
      readTime: '15 min'
    },
    {
      title: 'How to Use Live Practice Effectively',
      description: 'Maximize your learning with our practice tools',
      icon: '🎯',
      readTime: '8 min'
    },
    {
      title: 'Understanding Your Band Score',
      description: 'Learn how IELTS scoring works',
      icon: '📊',
      readTime: '5 min'
    },
    {
      title: 'Troubleshooting Common Issues',
      description: 'Quick fixes for technical problems',
      icon: '🔧',
      readTime: '6 min'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
              Help & Support
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 px-4">
              We're here to help you succeed
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-lg sm:rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white shadow-xl text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Support Options */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How Can We Help?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all hover:transform hover:scale-105 text-center"
                >
                  <div className={`inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-r ${option.color} mb-3 sm:mb-4`}>
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-gray-700 text-xs sm:text-sm mb-2">{option.description}</p>
                  <p className="text-gray-500 text-xs mb-3 sm:mb-4">{option.availability}</p>
                  <Button className="w-full text-sm sm:text-base" variant="outline">
                    {option.action}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Guides */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Popular Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all hover:transform hover:translate-x-2 cursor-pointer group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{guide.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm mb-3">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">⏱️ {guide.readTime}</span>
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-600">{section.category}</h3>
                <div className="space-y-3 sm:space-y-4">
                  {section.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-gray-200 pb-3 sm:pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{faq.q}</h4>
                          <p className="text-gray-700 text-xs sm:text-sm">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto px-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Still Need Help?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100">
              Our support team is ready to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to ="/contact">
              <Button
                // onClick={() => onNavigate('contact')}

                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Contact Support
              </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold w-full sm:w-auto"
              >
                <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}