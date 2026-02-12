import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  X,
  ChevronLeft,
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
  Star,
  Users,
  ChevronDown,
  ChevronUp,
  Lock,
  Play,
  Pause,
  Home,
  Sparkles
} from 'lucide-react';

interface UdemyStyleVideosV2Props {
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
  type: 'video' | 'practice';
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
}

export function UdemyStyleVideosV2({ isOpen, onClose, onStartPractice }: UdemyStyleVideosV2Props) {
  const [view, setView] = useState<'catalog' | 'course'>('catalog');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['1']);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filterSkill, setFilterSkill] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [showSidebar, setShowSidebar] = useState(true);

  // Comprehensive courses data
  const allCourses: Course[] = [
    {
      id: 'listening-b2',
      title: 'Complete IELTS Listening Mastery',
      subtitle: 'Master IELTS Listening from B2 to Band 9',
      instructor: 'Mr. Kassel',
      rating: 4.8,
      ratingCount: 1243,
      students: 8567,
      duration: '6h 30m',
      lessons: 18,
      level: 'B2',
      skill: 'listening',
      description: 'Master IELTS Listening with comprehensive training covering all question types, strategies, and practice tests.',
      whatYouWillLearn: [
        'Understand different English accents',
        'Master all IELTS Listening question types',
        'Develop effective note-taking strategies',
        'Handle distractors and tricky questions'
      ],
      sections: [
        {
          id: '1',
          title: 'Introduction to IELTS Listening',
          lessons: [
            { id: '1-1', title: 'Course Overview & Structure', duration: '8:30', completed: true, locked: false, type: 'video' },
            { id: '1-2', title: 'Understanding the Test Format', duration: '12:15', completed: true, locked: false, type: 'video' },
            { id: '1-3', title: 'Practice: Test Format', duration: '10:00', completed: false, locked: false, type: 'practice' }
          ]
        },
        {
          id: '2',
          title: 'Part 1: Social Situations',
          lessons: [
            { id: '2-1', title: 'Form Completion Strategies', duration: '15:45', completed: false, locked: false, type: 'video' },
            { id: '2-2', title: 'Note Completion Techniques', duration: '14:20', completed: false, locked: false, type: 'video' },
            { id: '2-3', title: 'Practice: Part 1 Exercise', duration: '12:00', completed: false, locked: false, type: 'practice' }
          ]
        },
        {
          id: '3',
          title: 'Part 2: Monologues',
          lessons: [
            { id: '3-1', title: 'Multiple Choice Strategies', duration: '16:40', completed: false, locked: false, type: 'video' },
            { id: '3-2', title: 'Map & Diagram Labeling', duration: '18:20', completed: false, locked: false, type: 'video' },
            { id: '3-3', title: 'Practice: Monologue Exercise', duration: '15:00', completed: false, locked: false, type: 'practice' }
          ]
        }
      ]
    },
    {
      id: 'speaking-b1',
      title: 'IELTS Speaking Excellence',
      subtitle: 'Speak with confidence and achieve Band 7+',
      instructor: 'Mr. Kassel',
      rating: 4.9,
      ratingCount: 2156,
      students: 12340,
      duration: '8h 15m',
      lessons: 24,
      level: 'B1',
      skill: 'speaking',
      description: 'Transform your speaking skills with comprehensive training covering all three parts of the IELTS Speaking test.',
      whatYouWillLearn: [
        'Master fluency and coherence',
        'Expand your vocabulary range',
        'Perfect your pronunciation',
        'Handle all question types confidently'
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
      ]
    },
    {
      id: 'writing-b2',
      title: 'IELTS Writing Task 1 & 2 Masterclass',
      subtitle: 'Write high-scoring essays with proven templates',
      instructor: 'Mr. Kassel',
      rating: 4.7,
      ratingCount: 987,
      students: 6543,
      duration: '10h 45m',
      lessons: 20,
      level: 'B2',
      skill: 'writing',
      description: 'Learn to write Band 8+ essays with step-by-step guidance on structure, vocabulary, and grammar.',
      whatYouWillLearn: [
        'Master Task 1 data description',
        'Write compelling Task 2 essays',
        'Use advanced linking words',
        'Develop strong arguments'
      ],
      sections: [
        {
          id: '1',
          title: 'Writing Basics',
          lessons: [
            { id: '1-1', title: 'Understanding the Writing Test', duration: '12:00', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'Essay Structure Fundamentals', duration: '16:30', completed: false, locked: false, type: 'video' },
            { id: '1-3', title: 'Practice: Essay Writing', duration: '20:00', completed: false, locked: false, type: 'practice' }
          ]
        }
      ]
    },
    {
      id: 'reading-a2',
      title: 'IELTS Reading Strategies for Beginners',
      subtitle: 'Build strong reading foundations from A2 to B2',
      instructor: 'Mr. Kassel',
      rating: 4.6,
      ratingCount: 756,
      students: 5234,
      duration: '5h 20m',
      lessons: 15,
      level: 'A2',
      skill: 'reading',
      description: 'Develop essential reading skills with proven strategies for all IELTS question types.',
      whatYouWillLearn: [
        'Master skimming and scanning',
        'Understand main ideas quickly',
        'Handle True/False/Not Given',
        'Improve reading speed'
      ],
      sections: [
        {
          id: '1',
          title: 'Reading Fundamentals',
          lessons: [
            { id: '1-1', title: 'Introduction to IELTS Reading', duration: '9:30', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'Skimming Techniques', duration: '14:15', completed: false, locked: false, type: 'video' },
            { id: '1-3', title: 'Practice: Skimming Exercise', duration: '10:00', completed: false, locked: false, type: 'practice' }
          ]
        }
      ]
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
      lessons: 22,
      level: 'B1',
      skill: 'grammar',
      description: 'Complete grammar course covering all structures needed for IELTS Band 7+.',
      whatYouWillLearn: [
        'Master all English tenses',
        'Use conditionals correctly',
        'Perfect passive voice',
        'Understand complex sentences'
      ],
      sections: [
        {
          id: '1',
          title: 'Tenses Mastery',
          lessons: [
            { id: '1-1', title: 'Present Tenses Overview', duration: '15:00', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'Past Tenses Overview', duration: '14:30', completed: false, locked: false, type: 'video' },
            { id: '1-3', title: 'Practice: Tenses Quiz', duration: '10:00', completed: false, locked: false, type: 'practice' }
          ]
        }
      ]
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
      lessons: 18,
      level: 'C1',
      skill: 'vocabulary',
      description: 'Learn high-level academic vocabulary with context, collocations, and real examples.',
      whatYouWillLearn: [
        'Master academic word list',
        'Use collocations naturally',
        'Understand synonyms & paraphrasing',
        'Learn topic-specific vocabulary'
      ],
      sections: [
        {
          id: '1',
          title: 'Academic Vocabulary Foundations',
          lessons: [
            { id: '1-1', title: 'Introduction to AWL', duration: '12:30', completed: false, locked: false, type: 'video' },
            { id: '1-2', title: 'High-Frequency Academic Words', duration: '18:20', completed: false, locked: false, type: 'video' },
            { id: '1-3', title: 'Practice: Vocabulary Exercise', duration: '15:00', completed: false, locked: false, type: 'practice' }
          ]
        }
      ]
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

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // Filter courses
  const filteredCourses = allCourses.filter(course => {
    const matchesSkill = filterSkill === 'all' || course.skill === filterSkill;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSkill && matchesLevel;
  });

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(course.sections[0].lessons[0]);
    setView('course');
    setExpandedSections([course.sections[0].id]);
  };

  const handleBackToCatalog = () => {
    setView('catalog');
    setSelectedCourse(null);
    setSelectedLesson(null);
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
    }
  };

  const handleStartPracticeForLesson = (lesson: Lesson, section: Section) => {
    if (onStartPractice) {
      // Close video modal and start practice with proper configuration
      onClose();
      const config = {
        skill: selectedCourse?.skill || 'listening',
        level: selectedCourse?.level || 'B1',
        topic: `${section.title}: ${lesson.title}`,
        questionTypes: ['multiple-choice', 'true-false', 'fill-blank'],
        numberOfQuestions: 10
      };
      onStartPractice(config);
    }
  };

  const handleStartPracticeForCourse = () => {
    if (onStartPractice && selectedCourse) {
      onClose();
      const config = {
        skill: selectedCourse.skill,
        level: selectedCourse.level,
        topic: selectedCourse.title,
        questionTypes: ['multiple-choice', 'true-false', 'fill-blank'],
        numberOfQuestions: 15
      };
      onStartPractice(config);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Catalog View */}
      {view === 'catalog' && (
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Video Courses</h1>
                  <p className="text-sm text-gray-600 mt-1">Learn with structured video lessons</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Filters */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {/* Skill Filter */}
                <div className="flex-1">
                  <select
                    value={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                  >
                    <option value="all">All Skills</option>
                    {skills.map(skill => (
                      <option key={skill.id} value={skill.id}>{skill.name}</option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="flex-1">
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                  >
                    <option value="all">All Levels</option>
                    {levels.map(level => (
                      <option key={level} value={level}>Level {level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Course Catalog */}
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCourses.map((course) => {
                const skillData = skills.find(s => s.id === course.skill);
                const Icon = skillData?.icon || BookOpen;

                return (
                  <Card
                    key={course.id}
                    className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-purple-300"
                    onClick={() => handleCourseSelect(course)}
                  >
                    {/* Course Thumbnail */}
                    <div className={`h-36 sm:h-40 bg-gradient-to-br ${skillData?.color || 'from-gray-600 to-gray-800'} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-12 w-12 sm:h-16 sm:w-16 text-white opacity-50" />
                      </div>
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <Badge className="bg-black/60 text-white border-0 text-xs">
                          Level {course.level}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3">
                        <Badge className="bg-white/90 text-gray-900 border-0 text-xs">
                          {course.duration}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                        {course.subtitle}
                      </p>

                      {/* Rating & Stats */}
                      <div className="flex items-center gap-3 sm:gap-4 mb-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                          <span className="text-gray-600">{(course.students / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                          <span className="text-gray-600">{course.lessons}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No courses found for the selected filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterSkill('all');
                    setFilterLevel('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Player View */}
      {view === 'course' && selectedCourse && selectedLesson && (
        <div className="flex-1 flex flex-col overflow-hidden bg-black">
          {/* Top Navigation Bar */}
          <div className="bg-gray-900 text-white px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 text-xs sm:text-sm"
              onClick={handleBackToCatalog}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
              <span className="hidden sm:inline">Back to Courses</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold truncate text-xs sm:text-base">{selectedCourse.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hidden lg:flex gap-2"
              onClick={handleStartPracticeForCourse}
            >
              <Sparkles className="h-4 w-4" />
              Start AI Practice
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Video Player + Content Area */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-black">
              {/* Video Player */}
              <div className="bg-black">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative group max-w-full">
                  {/* Video Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="text-center space-y-3 sm:space-y-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm hover:bg-white/30 transition-all"
                      >
                        {isPlaying ? (
                          <Pause className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        ) : (
                          <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1" />
                        )}
                      </button>
                      <div className="text-white px-4">
                        <p className="font-semibold text-sm sm:text-lg">{selectedLesson.title}</p>
                        <p className="text-xs sm:text-sm text-white/70">Duration: {selectedLesson.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Simple Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-purple-500 w-1/3"></div>
                  </div>
                </div>
              </div>

              {/* Course Info - Below Video */}
              <div className="bg-white flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Current Lesson Info */}
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <Badge className="mb-2">
                            {selectedLesson.type === 'practice' ? 'Practice' : 'Video Lesson'}
                          </Badge>
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedLesson.title}</h2>
                        </div>
                        {selectedLesson.type === 'practice' && (
                          <Button
                            onClick={() => {
                              const section = selectedCourse.sections.find(s => 
                                s.lessons.some(l => l.id === selectedLesson.id)
                              );
                              if (section) {
                                handleStartPracticeForLesson(selectedLesson, section);
                              }
                            }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2"
                          >
                            <Sparkles className="h-4 w-4" />
                            <span className="hidden sm:inline">Start AI Practice</span>
                            <span className="sm:hidden">Practice</span>
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{selectedLesson.duration}</span>
                        </div>
                        {selectedLesson.completed && (
                          <Badge className="bg-green-600">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* About Course */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">About this course</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedCourse.description}</p>
                    </div>

                    {/* What You'll Learn */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">What you'll learn</h3>
                      <div className="grid gap-2 sm:gap-3">
                        {selectedCourse.whatYouWillLearn.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 sm:gap-3">
                            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Start AI Practice Button */}
                    <div className="lg:hidden">
                      <Button
                        onClick={handleStartPracticeForCourse}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2 h-12"
                      >
                        <Sparkles className="h-5 w-5" />
                        Start AI Practice for Course
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Sidebar */}
            <div className={`${showSidebar ? 'w-full lg:w-96' : 'w-0'} bg-white border-l border-gray-200 flex flex-col overflow-hidden transition-all`}>
              <div className="p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900">Course Content</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowSidebar(!showSidebar)}
                  >
                    {showSidebar ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  {selectedCourse.sections.reduce((acc, s) => acc + s.lessons.length, 0)} lessons • {selectedCourse.duration}
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">15%</span>
                  </div>
                  <Progress value={15} className="h-1.5 sm:h-2" />
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
                        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">{section.title}</h4>
                          <p className="text-xs text-gray-600">
                            {completedLessons}/{section.lessons.length}
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="bg-gray-50">
                          {section.lessons.map((lesson) => {
                            const isActive = selectedLesson?.id === lesson.id;
                            const isPractice = lesson.type === 'practice';

                            return (
                              <div key={lesson.id} className={`${isActive ? 'bg-purple-50 border-l-4 border-purple-600' : ''}`}>
                                <button
                                  onClick={() => handleLessonSelect(lesson)}
                                  disabled={lesson.locked}
                                  className={`w-full p-2.5 sm:p-3 px-4 sm:px-6 flex items-center gap-2 sm:gap-3 text-left transition-colors ${
                                    lesson.locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                                  }`}
                                >
                                  {isPractice ? (
                                    <Target className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-orange-600'}`} />
                                  ) : (
                                    <PlayCircle className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-gray-600'}`} />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-xs sm:text-sm truncate ${isActive ? 'text-purple-600 font-semibold' : 'text-gray-900'}`}>
                                      {lesson.title}
                                    </p>
                                    <p className="text-xs text-gray-600">{lesson.duration}</p>
                                  </div>
                                  {lesson.completed && (
                                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                                  )}
                                  {lesson.locked && (
                                    <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                                  )}
                                </button>

                                {/* Practice Button for Practice Lessons */}
                                {isPractice && !lesson.locked && (
                                  <div className="px-4 sm:px-6 pb-2.5 sm:pb-3">
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartPracticeForLesson(lesson, section);
                                      }}
                                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xs sm:text-sm h-8 sm:h-9"
                                    >
                                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                      Start AI Practice
                                    </Button>
                                  </div>
                                )}
                              </div>
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
