import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { Button } from './ui/button';

// interface BlogPageProps {
//   onNavigate: (page: string) => void;
// }

export function BlogPage() {
  const featuredPost = {
    title: '10 Proven Strategies to Improve Your IELTS Speaking Score',
    excerpt: 'Discover expert tips and AI-powered techniques to boost your speaking confidence and achieve your target band score.',
    author: 'Sarah Johnson',
    date: 'January 10, 2026',
    readTime: '8 min read',
    category: 'IELTS Tips',
    image: '📚'
  };

  const posts = [
    {
      title: 'How AI is Revolutionizing Language Learning',
      excerpt: 'Explore how artificial intelligence is transforming the way we learn English and other languages.',
      author: 'Michael Chen',
      date: 'January 8, 2026',
      readTime: '6 min read',
      category: 'Technology',
      image: '🤖'
    },
    {
      title: 'IELTS Writing Task 2: Complete Guide for Beginners',
      excerpt: 'Master the essay writing section with our comprehensive guide and sample answers.',
      author: 'Emily Parker',
      date: 'January 5, 2026',
      readTime: '10 min read',
      category: 'IELTS Tips',
      image: '✍️'
    },
    {
      title: 'Building Vocabulary: The Smart Way',
      excerpt: 'Learn effective techniques to expand your vocabulary and remember new words effortlessly.',
      author: 'David Kumar',
      date: 'January 3, 2026',
      readTime: '5 min read',
      category: 'Vocabulary',
      image: '📖'
    },
    {
      title: 'Common Grammar Mistakes and How to Avoid Them',
      excerpt: 'Identify and fix the most common grammar errors that English learners make.',
      author: 'Sarah Johnson',
      date: 'December 28, 2025',
      readTime: '7 min read',
      category: 'Grammar',
      image: '📝'
    },
    {
      title: 'Listening Practice: Tips for Better Comprehension',
      excerpt: 'Improve your listening skills with proven strategies and recommended resources.',
      author: 'Michael Chen',
      date: 'December 25, 2025',
      readTime: '6 min read',
      category: 'Listening',
      image: '🎧'
    },
    {
      title: 'Study Schedule: How to Prepare for IELTS in 3 Months',
      excerpt: 'A detailed study plan to help you achieve your target score in just 12 weeks.',
      author: 'Emily Parker',
      date: 'December 22, 2025',
      readTime: '9 min read',
      category: 'Study Tips',
      image: '📅'
    }
  ];

  const categories = ['All', 'IELTS Tips', 'Technology', 'Vocabulary', 'Grammar', 'Study Tips'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
              Mr Kassel Blog
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 px-4">
              Tips, strategies, and insights for English learners
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Featured Post */}
        <div className="max-w-6xl mx-auto mb-8 sm:mb-12">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all mx-2">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8 sm:p-12 min-h-[200px] sm:min-h-[300px]">
                <div className="text-6xl sm:text-7xl md:text-9xl">{featuredPost.image}</div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                  {featuredPost.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-6xl mx-auto mb-6 sm:mb-8 px-2">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm ${
                  index === 0
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:transform hover:scale-105 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-40 sm:h-48 flex items-center justify-center">
                  <div className="text-5xl sm:text-6xl md:text-7xl">{post.image}</div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs mb-3 sm:mb-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span className="truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="max-w-6xl mx-auto mt-8 sm:mt-12 text-center px-2">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
          >
            Load More Articles
          </Button>
        </div>

        {/* Newsletter */}
        <div className="max-w-4xl mx-auto mt-12 sm:mt-16 px-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100">
              Get the latest tips and strategies delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              />
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}