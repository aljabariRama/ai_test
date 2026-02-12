import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { CourseViewer } from './CourseViewer';
import {
  MessageSquare,
  PenTool,
  Headphones,
  BookOpen,
  Video,
  PlayCircle,
  BookMarked,
  FileText,
  ArrowRight,
  Unlock
} from 'lucide-react';

// interface RecordedCoursesProps {
//   onNavigate: (page: string) => void;
// }

export function RecordedCourses() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Course data with lessons
  const coursesData = {
    speaking: {
      name: 'Speaking Course',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
      lessons: [
        { id: 1, title: 'Introduction to Speaking', duration: '8:30', completed: false, videoUrl: '', practiceQuestions: 5 },
        { id: 2, title: 'Pronunciation Basics', duration: '12:15', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 3, title: 'Fluency Techniques', duration: '10:45', completed: false, videoUrl: '', practiceQuestions: 6 },
        { id: 4, title: 'Part 1: Personal Questions', duration: '15:20', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 5, title: 'Part 2: Long Turn', duration: '18:30', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 6, title: 'Part 3: Discussion', duration: '16:45', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 7, title: 'Common Topics Practice', duration: '14:20', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 8, title: 'Idioms and Expressions', duration: '11:30', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 9, title: 'Advanced Vocabulary', duration: '13:45', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 10, title: 'Mock Speaking Tests', duration: '20:00', completed: false, videoUrl: '', practiceQuestions: 5 },
        { id: 11, title: 'Examiner Tips', duration: '9:30', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 12, title: 'Final Assessment', duration: '25:00', completed: false, videoUrl: '', practiceQuestions: 20 }
      ]
    },
    writing: {
      name: 'Writing Course',
      icon: PenTool,
      color: 'from-purple-500 to-pink-500',
      lessons: [
        { id: 1, title: 'Essay Structure', duration: '10:30', completed: false, videoUrl: '', practiceQuestions: 5 },
        { id: 2, title: 'Task 1: Data Analysis', duration: '15:45', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 3, title: 'Task 2: Opinion Essays', duration: '18:20', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 4, title: 'Linking Words', duration: '12:15', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 5, title: 'Academic Vocabulary', duration: '14:30', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 6, title: 'Grammar for Writing', duration: '16:45', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 7, title: 'Common Mistakes', duration: '11:20', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 8, title: 'Time Management', duration: '9:30', completed: false, videoUrl: '', practiceQuestions: 5 },
        { id: 9, title: 'Sample Essays', duration: '20:00', completed: false, videoUrl: '', practiceQuestions: 6 },
        { id: 10, title: 'AI Feedback Practice', duration: '25:00', completed: false, videoUrl: '', practiceQuestions: 20 }
      ]
    },
    listening: {
      name: 'Listening Course',
      icon: Headphones,
      color: 'from-orange-500 to-red-500',
      lessons: [
        { id: 1, title: 'Listening Strategies', duration: '10:00', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 2, title: 'Note-Taking Skills', duration: '12:30', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 3, title: 'Different Accents', duration: '15:45', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 4, title: 'Multiple Choice', duration: '11:20', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 5, title: 'Gap Fill Exercises', duration: '13:15', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 6, title: 'Matching Information', duration: '14:30', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 7, title: 'Map & Diagram Labels', duration: '16:45', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 8, title: 'Academic Lectures', duration: '18:20', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 9, title: 'Conversations', duration: '12:00', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 10, title: 'Practice Tests', duration: '30:00', completed: false, videoUrl: '', practiceQuestions: 25 }
      ]
    },
    reading: {
      name: 'Reading Course',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      lessons: [
        { id: 1, title: 'Skimming & Scanning', duration: '10:30', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 2, title: 'Understanding Main Ideas', duration: '12:15', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 3, title: 'Detail Questions', duration: '14:30', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 4, title: 'Inference Skills', duration: '15:45', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 5, title: 'Vocabulary in Context', duration: '11:20', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 6, title: 'True/False/Not Given', duration: '13:30', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 7, title: 'Matching Headings', duration: '12:45', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 8, title: 'Summary Completion', duration: '14:00', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 9, title: 'Speed Reading', duration: '16:30', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 10, title: 'Practice Passages', duration: '25:00', completed: false, videoUrl: '', practiceQuestions: 30 }
      ]
    },
    vocabulary: {
      name: 'Vocabulary Course',
      icon: BookMarked,
      color: 'from-indigo-500 to-blue-500',
      lessons: [
        { id: 1, title: 'Academic Word List', duration: '15:30', completed: false, videoUrl: '', practiceQuestions: 20 },
        { id: 2, title: 'Topic-Based Vocabulary', duration: '18:20', completed: false, videoUrl: '', practiceQuestions: 25 },
        { id: 3, title: 'Collocations', duration: '12:45', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 4, title: 'Phrasal Verbs', duration: '14:30', completed: false, videoUrl: '', practiceQuestions: 20 },
        { id: 5, title: 'Synonyms & Antonyms', duration: '11:15', completed: false, videoUrl: '', practiceQuestions: 18 },
        { id: 6, title: 'Word Families', duration: '13:00', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 7, title: 'Context Clues', duration: '10:45', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 8, title: 'Vocabulary Building Strategies', duration: '16:30', completed: false, videoUrl: '', practiceQuestions: 10 }
      ]
    },
    grammar: {
      name: 'Grammar Course',
      icon: FileText,
      color: 'from-pink-500 to-rose-500',
      lessons: [
        { id: 1, title: 'Tenses Overview', duration: '16:30', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 2, title: 'Present Perfect vs Past Simple', duration: '14:20', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 3, title: 'Conditionals', duration: '15:45', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 4, title: 'Passive Voice', duration: '13:30', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 5, title: 'Reported Speech', duration: '12:15', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 6, title: 'Modal Verbs', duration: '11:45', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 7, title: 'Articles', duration: '10:30', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 8, title: 'Relative Clauses', duration: '14:00', completed: false, videoUrl: '', practiceQuestions: 10 },
        { id: 9, title: 'Subject-Verb Agreement', duration: '9:45', completed: false, videoUrl: '', practiceQuestions: 8 },
        { id: 10, title: 'Complex Sentences', duration: '15:20', completed: false, videoUrl: '', practiceQuestions: 12 },
        { id: 11, title: 'Common Grammar Errors', duration: '13:15', completed: false, videoUrl: '', practiceQuestions: 15 },
        { id: 12, title: 'Grammar for Writing', duration: '17:30', completed: false, videoUrl: '', practiceQuestions: 20 }
      ]
    }
  };

  const handleStartCourse = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleCloseCourse = () => {
    setSelectedCourse(null);
  };

  // If a course is selected, show the CourseViewer
  if (selectedCourse) {
    const course = coursesData[selectedCourse as keyof typeof coursesData];
    return (
      <CourseViewer
        courseName={course.name}
        courseIcon={course.icon}
        courseColor={course.color}
        lessons={course.lessons}
        onClose={handleCloseCourse}
        // onNavigate={onNavigate}
      />
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
            <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0 px-4 py-2 mb-3">
              <Video className="h-4 w-4 mr-2 inline" />
              Comprehensive Curriculum
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Recorded Courses Library
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Access structured lessons organized by skill with practice exercises included
            </p>
          </div>

          {/* Courses Accordion */}
          <Accordion type="multiple" className="space-y-4">
            {/* Speaking Course */}
            <AccordionItem value="speaking" className="border-2 border-blue-200 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Speaking Course</h3>
                    <p className="text-sm text-gray-600">12 lessons • Practice included</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3 mt-4">
                  {['Introduction to Speaking', 'Pronunciation Basics', 'Fluency Techniques', 'Part 1: Personal Questions', 'Part 2: Long Turn', 'Part 3: Discussion', 'Common Topics Practice', 'Idioms and Expressions', 'Advanced Vocabulary', 'Mock Speaking Tests', 'Examiner Tips', 'Final Assessment'].map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm font-bold text-blue-600">
                          {idx + 1}
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-700">{lesson}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all" onClick={() => handleStartCourse('speaking')}>
                        <PlayCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Practice</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Writing Course */}
            <AccordionItem value="writing" className="border-2 border-purple-200 rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PenTool className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Writing Course</h3>
                    <p className="text-sm text-gray-600">10 lessons • Practice included</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3 mt-4">
                  {['Essay Structure', 'Task 1: Data Analysis', 'Task 2: Opinion Essays', 'Linking Words', 'Academic Vocabulary', 'Grammar for Writing', 'Common Mistakes', 'Time Management', 'Sample Essays', 'AI Feedback Practice'].map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-purple-100 hover:border-purple-300 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-sm font-bold text-purple-600">
                          {idx + 1}
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-700">{lesson}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500 transition-all" onClick={() => handleStartCourse('writing')}>
                        <PlayCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Practice</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Listening Course */}
            <AccordionItem value="listening" className="border-2 border-orange-200 rounded-xl overflow-hidden bg-gradient-to-r from-orange-50 to-red-50">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Headphones className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Listening Course</h3>
                    <p className="text-sm text-gray-600">10 lessons • Practice included</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3 mt-4">
                  {['Listening Strategies', 'Note-Taking Skills', 'Different Accents', 'Multiple Choice', 'Gap Fill Exercises', 'Matching Information', 'Map & Diagram Labels', 'Academic Lectures', 'Conversations', 'Practice Tests'].map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-100 hover:border-orange-300 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-sm font-bold text-orange-600">
                          {idx + 1}
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-700">{lesson}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all" onClick={() => handleStartCourse('listening')}>
                        <PlayCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Practice</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Reading Course */}
            <AccordionItem value="reading" className="border-2 border-green-200 rounded-xl overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Reading Course</h3>
                    <p className="text-sm text-gray-600">10 lessons • Practice included</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3 mt-4">
                  {['Skimming & Scanning', 'Understanding Main Ideas', 'Detail Questions', 'Inference Skills', 'Vocabulary in Context', 'True/False/Not Given', 'Matching Headings', 'Summary Completion', 'Speed Reading', 'Practice Passages'].map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-100 hover:border-green-300 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm font-bold text-green-600">
                          {idx + 1}
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-700">{lesson}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all" onClick={() => handleStartCourse('reading')}>
                        <PlayCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Practice</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Vocabulary Course */}
            <AccordionItem value="vocabulary" className="border-2 border-indigo-200 rounded-xl overflow-hidden bg-gradient-to-r from-indigo-50 to-blue-50">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookMarked className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Vocabulary Course</h3>
                    <p className="text-sm text-gray-600">8 lessons • Practice included</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3 mt-4">
                  {['Academic Word List', 'Topic-Based Vocabulary', 'Collocations', 'Phrasal Verbs', 'Synonyms & Antonyms', 'Word Families', 'Context Clues', 'Vocabulary Building Strategies'].map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-600">
                          {idx + 1}
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-700">{lesson}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all" onClick={() => handleStartCourse('vocabulary')}>
                        <PlayCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Practice</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Grammar Course */}
            <AccordionItem value="grammar" className="border-2 border-pink-200 rounded-xl overflow-hidden bg-gradient-to-r from-pink-50 to-rose-50">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Grammar Course</h3>
                    <p className="text-sm text-gray-600">12 lessons • Practice included</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-3 mt-4">
                  {['Tenses Overview', 'Present Perfect vs Past Simple', 'Conditionals', 'Passive Voice', 'Reported Speech', 'Modal Verbs', 'Articles', 'Relative Clauses', 'Subject-Verb Agreement', 'Complex Sentences', 'Common Grammar Errors', 'Grammar for Writing'].map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-pink-100 hover:border-pink-300 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-sm font-bold text-pink-600">
                          {idx + 1}
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-700">{lesson}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2 group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-500 transition-all" onClick={() => handleStartCourse('grammar')}>
                        <PlayCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Practice</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Pro Plan CTA */}
          <div className="mt-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 sm:p-8 text-white text-center">
            <div className="max-w-2xl mx-auto">
              <Unlock className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">Unlock All Courses</h3>
              <p className="text-white/90 mb-6">
                Get unlimited access to all 62 recorded lessons across 6 skills with Pro Plan
              </p>
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6" onClick={() => onNavigate('plans')}>
                Upgrade to Pro
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}