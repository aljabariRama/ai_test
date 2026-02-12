import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  PlayCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Target,
  Clock,
  Award,
  X,
  Lock,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
  practiceQuestions: number;
}

interface CourseViewerProps {
  courseName: string;
  courseIcon: any;
  courseColor: string;
  lessons: Lesson[];
  onClose: () => void;
  // onNavigate: (page: string) => void;
}

export function CourseViewer({ 
  courseName, 
  courseIcon: Icon, 
  courseColor, 
  lessons,
  onClose,
  // onNavigate 
}: CourseViewerProps) {
  const navigate=useNavigate();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [videoWatched, setVideoWatched] = useState(false);

  const currentLesson = lessons[currentLessonIndex];
  const completedLessons = lessons.filter(l => l.completed).length;
  const progress = (completedLessons / lessons.length) * 100;

  const handleWatchVideo = () => {
    setShowVideo(true);
  };

  const handleVideoComplete = () => {
    setVideoWatched(true);
  };

  const handleStartPractice = () => {
    setShowVideo(false);
    navigate('live');
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setShowVideo(true);
      setVideoWatched(false);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setShowVideo(true);
      setVideoWatched(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${courseColor} text-white`}>
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={onClose}
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Back to Courses
              </Button>
              <div className="h-8 w-px bg-white/30"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold">{courseName}</h1>
                  <p className="text-sm text-white/80">{lessons.length} Lessons</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm">{completedLessons}/{lessons.length} Lessons</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lesson List - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Lessons</h3>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setCurrentLessonIndex(index);
                        setShowVideo(true);
                        setVideoWatched(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        currentLessonIndex === index
                          ? `bg-gradient-to-r ${courseColor} text-white shadow-md`
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          currentLessonIndex === index
                            ? 'bg-white/20'
                            : 'bg-gray-200'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle2 className={`h-5 w-5 ${
                              currentLessonIndex === index ? 'text-white' : 'text-green-600'
                            }`} />
                          ) : (
                            <span className={`text-sm font-bold ${
                              currentLessonIndex === index ? 'text-white' : 'text-gray-600'
                            }`}>
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            currentLessonIndex === index ? 'text-white' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className={`h-3 w-3 ${
                              currentLessonIndex === index ? 'text-white/70' : 'text-gray-500'
                            }`} />
                            <span className={`text-xs ${
                              currentLessonIndex === index ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Lesson {currentLessonIndex + 1}</Badge>
                      {currentLesson.completed && (
                        <Badge className="bg-green-600">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{currentLesson.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{currentLesson.practiceQuestions} Practice Questions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button
                    onClick={handleWatchVideo}
                    className={`${showVideo ? `bg-gradient-to-r ${courseColor}` : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    <PlayCircle className="h-5 w-5 mr-2" />
                    {showVideo ? 'Watching Video' : 'Watch Video'}
                  </Button>
                  <Button
                    onClick={handleStartPractice}
                    disabled={!videoWatched}
                    className={`${!showVideo && videoWatched ? `bg-gradient-to-r ${courseColor}` : ''}`}
                    variant={!showVideo && videoWatched ? 'default' : 'outline'}
                  >
                    {videoWatched ? (
                      <>
                        <Target className="h-5 w-5 mr-2" />
                        Start Practice
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Practice (Watch Video First)
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Video Player */}
            {showVideo && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Lesson Video
                  </h3>
                  {/* Video Player Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white space-y-4">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm group-hover:bg-white/30 transition-all cursor-pointer">
                          <PlayCircle className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{currentLesson.title}</p>
                          <p className="text-sm text-white/70">Duration: {currentLesson.duration}</p>
                        </div>
                      </div>
                    </div>
                    {/* Video placeholder overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">00:00 / {currentLesson.duration}</span>
                        <Button
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white"
                          onClick={handleVideoComplete}
                        >
                          Mark as Watched
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {videoWatched && (
                    <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-green-900">Video Completed!</p>
                          <p className="text-sm text-green-700">You can now start practicing the lesson.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Practice Section */}
            {!showVideo && videoWatched && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Practice Exercises
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">Practice Questions Ready</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Test your understanding with {currentLesson.practiceQuestions} practice questions based on this lesson.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button 
                              className={`bg-gradient-to-r ${courseColor}`}
                              onClick={handleStartPractice}
                            >
                              <Target className="h-4 w-4 mr-2" />
                              Start Practice Now
                            </Button>
                            <Button variant="outline" onClick={() => setShowVideo(true)}>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Re-watch Video
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Practice Features */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-100">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Target className="h-5 w-5 text-purple-600" />
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">{currentLesson.practiceQuestions} Questions</p>
                        <p className="text-xs text-gray-600">Mixed difficulty</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-100">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">AI Feedback</p>
                        <p className="text-xs text-gray-600">Instant scoring</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-100">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">Track Progress</p>
                        <p className="text-xs text-gray-600">Save your scores</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lesson Navigation */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePreviousLesson}
                    disabled={currentLessonIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </Button>
                  <span className="text-sm text-gray-600">
                    Lesson {currentLessonIndex + 1} of {lessons.length}
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex === lessons.length - 1}
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
