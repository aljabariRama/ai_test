import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  X,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Target,
  Clock,
  CheckCircle2,
  BookOpen,
  Headphones,
  PenTool,
  MessageSquare,
  BookMarked,
  FileText,
  Award,
  Star,
  Users,
  Globe,
  BarChart3,
  Download,
  Share2,
  Heart,
  ChevronDown,
  ChevronUp,
  Lock,
  Play,
  Pause,
  Volume2,
  Maximize,
  Settings,
  SkipForward,
  SkipBack,
  Filter,
  Home
} from 'lucide-react';

interface UdemyStyleVideosProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPractice?: (config: any) => void;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: 'video' | 'practice' | 'quiz';
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  rating: number;
  ratingCount: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  skill: string;
  description: string;
  whatYouWillLearn: string[];
  sections: Section[];
  thumbnail: string;
}

export function UdemyStyleVideos({ isOpen, onClose, onStartPractice }: UdemyStyleVideosProps) {
  const [view, setView] = useState<'catalog' | 'course'>('catalog');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['1']);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('curriculum');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  // Mock courses data
  const courses: Course[] = [
    {
      id: 'listening-b2',
      title: 'Complete IELTS Listening Mastery',
      subtitle: 'Master IELTS Listening from B2 to Band 9 with proven strategies',
      instructor: 'Mr. Kassel',
      rating: 4.8,
      ratingCount: 1243,
      students: 8567,
      duration: '6h 30m',
      lessons: 42,
      level: 'B2',
      skill: 'listening',
      description: 'Master IELTS Listening with comprehensive training covering all question types, strategies, and practice tests. This course takes you from intermediate to advanced level.',
      whatYouWillLearn: [
        'Understand different English accents (British, American, Australian)',
        'Master all IELTS Listening question types',
        'Develop effective note-taking strategies',
        'Improve prediction and anticipation skills',
        'Handle distractors and tricky questions',
        'Achieve Band 7+ in IELTS Listening'
      ],
      sections: [
        {
          id: '1',
          title: 'Introduction to IELTS Listening',
          lessons: [
            { id: '1-1', title: 'Course Overview & Structure', duration: '8:30', completed: true, locked: false, type: 'video' },
            { id: '1-2', title: 'Understanding the Test Format', duration: '12:15', completed: true, locked: false, type: 'video' },
            { id: '1-3', title: 'Practice: Test Format Quiz', duration: '5:00', completed: false, locked: false, type: 'quiz' }
          ]
        },
        {
          id: '2',
          title: 'Part 1: Social Situations',
          lessons: [
            { id: '2-1', title: 'Form Completion Strategies', duration: '15:45', completed: false, locked: false, type: 'video' },
            { id: '2-2', title: 'Note Completion Techniques', duration: '14:20', completed: false, locked: false, type: 'video' },
            { id: '2-3', title: 'Practice: Part 1 Exercise', duration: '10:00', completed: false, locked: false, type: 'practice' },
            { id: '2-4', title: 'Common Mistakes & How to Avoid Them', duration: '11:30', completed: false, locked: false, type: 'video' }
          ]
        },
        {
          id: '3',
          title: 'Part 2: Monologues',
          lessons: [
            { id: '3-1', title: 'Multiple Choice Strategies', duration: '16:40', completed: false, locked: false, type: 'video' },
            { id: '3-2', title: 'Map & Diagram Labeling', duration: '18:20', completed: false, locked: false, type: 'video' },
            { id: '3-3', title: 'Practice: Monologue Exercise', duration: '12:00', completed: false, locked: false, type: 'practice' }
          ]
        },
        {
          id: '4',
          title: 'Part 3: Educational Discussions',
          lessons: [
            { id: '4-1', title: 'Matching Information', duration: '15:30', completed: false, locked: true, type: 'video' },
            { id: '4-2', title: 'Understanding Academic Vocabulary', duration: '13:45', completed: false, locked: true, type: 'video' },
            { id: '4-3', title: 'Practice: Discussion Analysis', duration: '10:00', completed: false, locked: true, type: 'practice' }
          ]
        },
        {
          id: '5',
          title: 'Part 4: Academic Lectures',
          lessons: [
            { id: '5-1', title: 'Advanced Note-Taking', duration: '17:20', completed: false, locked: true, type: 'video' },
            { id: '5-2', title: 'Handling Complex Information', duration: '16:15', completed: false, locked: true, type: 'video' },
            { id: '5-3', title: 'Practice: Full Lecture', duration: '15:00', completed: false, locked: true, type: 'practice' }
          ]
        },
        {
          id: '6',
          title: 'Advanced Strategies',
          lessons: [
            { id: '6-1', title: 'Dealing with Distractors', duration: '14:30', completed: false, locked: true, type: 'video' },
            { id: '6-2', title: 'Time Management Tips', duration: '12:40', completed: false, locked: true, type: 'video' },
            { id: '6-3', title: 'Final Practice Test', duration: '30:00', completed: false, locked: true, type: 'practice' }
          ]
        }
      ],
      thumbnail: ''
    },
    {
      id: 'speaking-b1',
      title: 'IELTS Speaking Excellence',
      subtitle: 'Speak with confidence and achieve Band 7+ in IELTS Speaking',
      instructor: 'Mr. Kassel',
      rating: 4.9,
      ratingCount: 2156,
      students: 12340,
      duration: '8h 15m',
      lessons: 56,
      level: 'B1',
      skill: 'speaking',
      description: 'Transform your speaking skills with comprehensive training covering all three parts of the IELTS Speaking test.',
      whatYouWillLearn: [
        'Master fluency and coherence',
        'Expand your vocabulary range',
        'Perfect your pronunciation',
        'Handle all question types confidently',
        'Use advanced grammatical structures',
        'Achieve natural, native-like flow'
      ],
      sections: [
        {
          id: '1',
          title: 'Speaking Fundamentals',
          lessons: [
            { id: '1-1', title: 'Introduction to IELTS Speaking', duration: '10:00', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'Fluency & Coherence Explained', duration: '15:30', completed: false, locked: false, type: 'video' },
            { id: '1-3', title: 'Practice: Self-Assessment', duration: '8:00', completed: false, locked: false, type: 'practice' }
          ]
        }
      ],
      thumbnail: ''
    },
    {
      id: 'writing-b2',
      title: 'IELTS Writing Task 1 & 2 Masterclass',
      subtitle: 'Write high-scoring essays with proven templates and techniques',
      instructor: 'Mr. Kassel',
      rating: 4.7,
      ratingCount: 987,
      students: 6543,
      duration: '10h 45m',
      lessons: 48,
      level: 'B2',
      skill: 'writing',
      description: 'Learn to write Band 8+ essays with step-by-step guidance on structure, vocabulary, and grammar.',
      whatYouWillLearn: [
        'Master Task 1 data description',
        'Write compelling Task 2 essays',
        'Use advanced linking words',
        'Develop strong arguments',
        'Avoid common grammar mistakes',
        'Manage time effectively'
      ],
      sections: [
        {
          id: '1',
          title: 'Writing Basics',
          lessons: [
            { id: '1-1', title: 'Understanding the Writing Test', duration: '12:00', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'Essay Structure Fundamentals', duration: '16:30', completed: false, locked: false, type: 'video' }
          ]
        }
      ],
      thumbnail: ''
    },
    {
      id: 'reading-a2',
      title: 'IELTS Reading Strategies for Beginners',
      subtitle: 'Build strong reading foundations from A2 to B2 level',
      instructor: 'Mr. Kassel',
      rating: 4.6,
      ratingCount: 756,
      students: 5234,
      duration: '5h 20m',
      lessons: 35,
      level: 'A2',
      skill: 'reading',
      description: 'Develop essential reading skills with proven strategies for all IELTS question types.',
      whatYouWillLearn: [
        'Master skimming and scanning',
        'Understand main ideas quickly',
        'Handle True/False/Not Given',
        'Improve reading speed',
        'Build academic vocabulary',
        'Achieve Band 6+ in Reading'
      ],
      sections: [
        {
          id: '1',
          title: 'Reading Fundamentals',
          lessons: [
            { id: '1-1', title: 'Introduction to IELTS Reading', duration: '9:30', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'Skimming Techniques', duration: '14:15', completed: false, locked: false, type: 'video' }
          ]
        }
      ],
      thumbnail: ''
    },
    {
      id: 'grammar-b1',
      title: 'IELTS Grammar Essentials',
      subtitle: 'Master essential grammar for IELTS success',
      instructor: 'Mr. Kassel',
      rating: 4.8,
      ratingCount: 1432,
      students: 9876,
      duration: '7h 30m',
      lessons: 52,
      level: 'B1',
      skill: 'grammar',
      description: 'Complete grammar course covering all structures needed for IELTS Band 7+.',
      whatYouWillLearn: [
        'Master all English tenses',
        'Use conditionals correctly',
        'Perfect passive voice',
        'Understand complex sentences',
        'Avoid common errors',
        'Apply grammar in writing & speaking'
      ],
      sections: [
        {
          id: '1',
          title: 'Tenses Mastery',
          lessons: [
            { id: '1-1', title: 'Present Tenses Overview', duration: '15:00', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'Past Tenses Overview', duration: '14:30', completed: false, locked: false, type: 'video' }
          ]
        }
      ],
      thumbnail: ''
    },
    {
      id: 'vocabulary-c1',
      title: 'Advanced Academic Vocabulary',
      subtitle: 'Expand your vocabulary to Band 8+ level',
      instructor: 'Mr. Kassel',
      rating: 4.9,
      ratingCount: 1876,
      students: 11234,
      duration: '6h 45m',
      lessons: 40,
      level: 'C1',
      skill: 'vocabulary',
      description: 'Learn high-level academic vocabulary with context, collocations, and real examples.',
      whatYouWillLearn: [
        'Master academic word list',
        'Use collocations naturally',
        'Understand synonyms & paraphrasing',
        'Learn topic-specific vocabulary',
        'Use idioms appropriately',
        'Build word families'
      ],
      sections: [
        {
          id: '1',
          title: 'Academic Vocabulary Foundations',
          lessons: [
            { id: '1-1', title: 'Introduction to AWL', duration: '12:30', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'High-Frequency Academic Words', duration: '18:20', completed: false, locked: false, type: 'video' }
          ]
        }
      ],
      thumbnail: ''
    }
  ];

  const skills = [
    { id: 'listening', name: 'Listening', icon: Headphones, color: 'from-orange-500 to-red-500' },
    { id: 'speaking', name: 'Speaking', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { id: 'reading', name: 'Reading', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { id: 'writing', name: 'Writing', icon: PenTool, color: 'from-purple-500 to-pink-500' },
    { id: 'grammar', name: 'Grammar', icon: FileText, color: 'from-pink-500 to-rose-500' },
    { id: 'vocabulary', name: 'Vocabulary', icon: BookMarked, color: 'from-indigo-500 to-blue-500' }
  ];

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(course.sections[0].lessons[0]);
    setView('course');
  };

  const handleBackToCatalog = () => {
    setView('catalog');
    setSelectedCourse(null);
    setSelectedLesson(null);
    setShowPractice(false);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLessonSelect = (lesson: Lesson) => {
    if (!lesson.locked) {
      setSelectedLesson(lesson);
      setIsPlaying(false);
      setShowPractice(lesson.type === 'practice' || lesson.type === 'quiz');
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return PlayCircle;
      case 'practice': return Target;
      case 'quiz': return FileText;
      default: return PlayCircle;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Catalog View */}
      {view === 'catalog' && (
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Video Courses</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Course Catalog */}
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">All Courses</h2>
              <p className="text-gray-600">Choose a course to start learning</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const skillData = skills.find(s => s.id === course.skill);
                const Icon = skillData?.icon || BookOpen;

                return (
                  <Card
                    key={course.id}
                    className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-purple-300"
                    onClick={() => handleCourseSelect(course)}
                  >
                    {/* Course Thumbnail */}
                    <div className={`h-40 bg-gradient-to-br ${skillData?.color || 'from-gray-600 to-gray-800'} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-16 w-16 text-white opacity-50" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-black/60 text-white border-0">
                          Level {course.level}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-white/90 text-gray-900 border-0">
                          {course.duration}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {course.subtitle}
                      </p>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-purple-600">MK</span>
                        </div>
                        <span className="text-xs text-gray-600">{course.instructor}</span>
                      </div>

                      {/* Rating & Stats */}
                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">{course.rating}</span>
                          <span>({course.ratingCount.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students.toLocaleString()} students</span>
                        </div>
                      </div>

                      {/* Lessons Count */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <PlayCircle className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Course Player View */}
      {view === 'course' && selectedCourse && selectedLesson && (
        <div className="flex-1 flex flex-col overflow-hidden bg-black">
          {/* Top Navigation Bar */}
          <div className="bg-gray-900 text-white px-4 py-3 flex items-center gap-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={handleBackToCatalog}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Courses
            </Button>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold truncate text-sm sm:text-base">{selectedCourse.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Video Player + Content Area */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-black">
              {/* Video Player */}
              {!showPractice ? (
                <div className="bg-black">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative group max-w-full">
                    {/* Video Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm hover:bg-white/30 transition-all"
                        >
                          {isPlaying ? (
                            <Pause className="h-10 w-10 text-white" />
                          ) : (
                            <Play className="h-10 w-10 text-white ml-1" />
                          )}
                        </button>
                        <div className="text-white">
                          <p className="font-semibold text-lg">{selectedLesson.title}</p>
                          <p className="text-sm text-white/70">Duration: {selectedLesson.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 w-1/3"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-white hover:bg-white/20"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-white hover:bg-white/20"
                          >
                            <SkipBack className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-white hover:bg-white/20"
                          >
                            <SkipForward className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-white hover:bg-white/20"
                          >
                            <Volume2 className="h-5 w-5" />
                          </Button>
                          <span className="text-sm">0:00 / {selectedLesson.duration}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-white hover:bg-white/20"
                          >
                            <Settings className="h-5 w-5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-white hover:bg-white/20"
                          >
                            <Maximize className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Practice/Quiz View */
                <div className="bg-white p-8">
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                      <Badge className="mb-2">
                        {selectedLesson.type === 'quiz' ? 'Quiz' : 'Practice Exercise'}
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedLesson.title}</h2>
                    </div>

                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
                            <p className="text-sm text-gray-700">
                              Complete the exercises below to test your understanding of the lesson material.
                            </p>
                          </div>

                          {/* Practice Content */}
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                              <p className="font-medium text-gray-900 mb-3">Question 1 of 10</p>
                              <p className="text-gray-700 mb-4">
                                [Practice question content will appear here based on the lesson type]
                              </p>
                              <div className="space-y-2">
                                {['Option A', 'Option B', 'Option C', 'Option D'].map((option, idx) => (
                                  <label key={idx} className="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                                    <input type="radio" name="answer" className="w-4 h-4" />
                                    <span className="text-gray-900">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Progress value={10} className="flex-1" />
                              <span className="text-sm text-gray-600">1/10</span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Submit Answer
                            </Button>
                            <Button variant="outline" onClick={() => setShowPractice(false)}>
                              Back to Video
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Course Info Tabs - Below Video */}
              {!showPractice && (
                <div className="bg-white">
                  <div className="max-w-5xl mx-auto px-6">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                      <div className="flex gap-6">
                        <button
                          onClick={() => setActiveTab('overview')}
                          className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                            activeTab === 'overview'
                              ? 'border-purple-600 text-purple-600'
                              : 'border-transparent text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Overview
                        </button>
                        <button
                          onClick={() => setActiveTab('curriculum')}
                          className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                            activeTab === 'curriculum'
                              ? 'border-purple-600 text-purple-600'
                              : 'border-transparent text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Curriculum
                        </button>
                        <button
                          onClick={() => setActiveTab('reviews')}
                          className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                            activeTab === 'reviews'
                              ? 'border-purple-600 text-purple-600'
                              : 'border-transparent text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Reviews
                        </button>
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="py-6 pb-12">
                      {activeTab === 'overview' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About this course</h3>
                            <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {selectedCourse.whatYouWillLearn.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t">
                            <div className="flex items-center gap-3">
                              <BarChart3 className="h-5 w-5 text-gray-600" />
                              <div>
                                <p className="text-sm text-gray-600">Skill Level</p>
                                <p className="font-semibold text-gray-900">{selectedCourse.level}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5 text-gray-600" />
                              <div>
                                <p className="text-sm text-gray-600">Students</p>
                                <p className="font-semibold text-gray-900">{selectedCourse.students.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Globe className="h-5 w-5 text-gray-600" />
                              <div>
                                <p className="text-sm text-gray-600">Language</p>
                                <p className="font-semibold text-gray-900">English</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'reviews' && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <div className="text-5xl font-bold text-gray-900 mb-2">{selectedCourse.rating}</div>
                              <div className="flex items-center gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                ))}
                              </div>
                              <p className="text-sm text-gray-600">Course Rating</p>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-600 mb-2">{selectedCourse.ratingCount.toLocaleString()} ratings</p>
                              <Progress value={85} className="mb-2" />
                              <p className="text-sm text-gray-500">85% of students rated this course 5 stars</p>
                            </div>
                          </div>

                          <div className="space-y-4 pt-6 border-t">
                            {[1, 2, 3].map((review) => (
                              <div key={review} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="font-bold text-purple-600">A</span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-900">Student Name</p>
                                    <div className="flex items-center gap-2">
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star key={star} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                        ))}
                                      </div>
                                      <span className="text-xs text-gray-600">2 weeks ago</span>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-gray-700">Excellent course! The instructor explains everything clearly and the practice exercises are very helpful.</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Curriculum Sidebar */}
            <div className="w-full sm:w-96 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <h3 className="font-bold text-lg text-gray-900">Course Content</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCourse.sections.reduce((acc, s) => acc + s.lessons.length, 0)} lessons • {selectedCourse.duration} total
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {selectedCourse.sections.map((section) => {
                  const isExpanded = expandedSections.includes(section.id);
                  const completedLessons = section.lessons.filter(l => l.completed).length;

                  return (
                    <div key={section.id} className="border-b border-gray-200">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1 text-left">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{section.title}</h4>
                          <p className="text-xs text-gray-600">
                            {completedLessons}/{section.lessons.length} | {section.lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} min
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="bg-gray-50">
                          {section.lessons.map((lesson) => {
                            const LessonIcon = getLessonIcon(lesson.type);
                            const isActive = selectedLesson?.id === lesson.id;

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => handleLessonSelect(lesson)}
                                disabled={lesson.locked}
                                className={`w-full p-3 px-6 flex items-center gap-3 text-left transition-colors ${
                                  isActive
                                    ? 'bg-purple-50 border-l-4 border-purple-600'
                                    : lesson.locked
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-gray-100'
                                }`}
                              >
                                <LessonIcon className={`h-4 w-4 flex-shrink-0 ${
                                  isActive ? 'text-purple-600' : 'text-gray-600'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm truncate ${
                                    isActive ? 'text-purple-600 font-semibold' : 'text-gray-900'
                                  }`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-gray-600">{lesson.duration}</p>
                                </div>
                                {lesson.completed && (
                                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                                )}
                                {lesson.locked && (
                                  <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}