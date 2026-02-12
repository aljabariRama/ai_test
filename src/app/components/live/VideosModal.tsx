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
  Award
} from 'lucide-react';

interface VideosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  skill: string;
  level: string;
  practiceQuestions: number;
  description: string;
}

export function VideosModal({ isOpen, onClose }: VideosModalProps) {
  const [step, setStep] = useState<'skill' | 'level' | 'videos'>('skill');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);

  // Mock video data
  const allVideos: Video[] = [
    // Listening videos
    { id: 'l1', title: 'Understanding Different Accents', duration: '12:30', thumbnail: '', skill: 'listening', level: 'A2', practiceQuestions: 8, description: 'Learn to recognize British, American, and Australian accents' },
    { id: 'l2', title: 'Note-Taking Strategies', duration: '15:45', thumbnail: '', skill: 'listening', level: 'B1', practiceQuestions: 10, description: 'Master effective note-taking during listening exercises' },
    { id: 'l3', title: 'Academic Lectures Practice', duration: '18:20', thumbnail: '', skill: 'listening', level: 'B2', practiceQuestions: 12, description: 'Handle complex academic content with confidence' },
    { id: 'l4', title: 'Advanced Listening Techniques', duration: '20:00', thumbnail: '', skill: 'listening', level: 'C1', practiceQuestions: 15, description: 'Master inference and understanding implicit meaning' },
    
    // Speaking videos
    { id: 's1', title: 'Pronunciation Basics', duration: '10:30', thumbnail: '', skill: 'speaking', level: 'A1', practiceQuestions: 5, description: 'Master fundamental English pronunciation' },
    { id: 's2', title: 'Fluency & Coherence', duration: '14:20', thumbnail: '', skill: 'speaking', level: 'B1', practiceQuestions: 8, description: 'Improve your speaking flow and connection' },
    { id: 's3', title: 'Part 2: Long Turn Strategies', duration: '16:45', thumbnail: '', skill: 'speaking', level: 'B2', practiceQuestions: 10, description: 'Speak for 2 minutes on any topic confidently' },
    { id: 's4', title: 'Advanced Vocabulary in Speaking', duration: '19:30', thumbnail: '', skill: 'speaking', level: 'C1', practiceQuestions: 12, description: 'Use sophisticated vocabulary naturally' },
    
    // Reading videos
    { id: 'r1', title: 'Skimming and Scanning', duration: '11:15', thumbnail: '', skill: 'reading', level: 'A2', practiceQuestions: 8, description: 'Quick reading techniques for efficiency' },
    { id: 'r2', title: 'Understanding Main Ideas', duration: '13:30', thumbnail: '', skill: 'reading', level: 'B1', practiceQuestions: 10, description: 'Identify key points in passages' },
    { id: 'r3', title: 'True/False/Not Given Questions', duration: '15:45', thumbnail: '', skill: 'reading', level: 'B2', practiceQuestions: 12, description: 'Master this challenging question type' },
    { id: 'r4', title: 'Complex Text Analysis', duration: '18:00', thumbnail: '', skill: 'reading', level: 'C1', practiceQuestions: 15, description: 'Analyze academic and complex texts' },
    
    // Writing videos
    { id: 'w1', title: 'Essay Structure Basics', duration: '12:00', thumbnail: '', skill: 'writing', level: 'A2', practiceQuestions: 5, description: 'Learn the foundation of essay writing' },
    { id: 'w2', title: 'Task 1: Data Description', duration: '16:30', thumbnail: '', skill: 'writing', level: 'B1', practiceQuestions: 8, description: 'Describe charts, graphs, and tables' },
    { id: 'w3', title: 'Task 2: Opinion Essays', duration: '18:45', thumbnail: '', skill: 'writing', level: 'B2', practiceQuestions: 10, description: 'Write compelling argumentative essays' },
    { id: 'w4', title: 'Advanced Writing Techniques', duration: '20:30', thumbnail: '', skill: 'writing', level: 'C1', practiceQuestions: 12, description: 'Master complex sentence structures' },
    
    // Grammar videos
    { id: 'g1', title: 'Tenses Overview', duration: '14:20', thumbnail: '', skill: 'grammar', level: 'A1', practiceQuestions: 10, description: 'Understand all English tenses' },
    { id: 'g2', title: 'Conditionals Explained', duration: '12:45', thumbnail: '', skill: 'grammar', level: 'B1', practiceQuestions: 12, description: 'Master if-clauses and conditions' },
    { id: 'g3', title: 'Passive Voice Mastery', duration: '11:30', thumbnail: '', skill: 'grammar', level: 'B2', practiceQuestions: 10, description: 'Use passive constructions correctly' },
    { id: 'g4', title: 'Advanced Grammar Structures', duration: '16:00', thumbnail: '', skill: 'grammar', level: 'C1', practiceQuestions: 15, description: 'Complex grammatical patterns' },
    
    // Vocabulary videos
    { id: 'v1', title: 'Academic Word List', duration: '15:30', thumbnail: '', skill: 'vocabulary', level: 'A2', practiceQuestions: 20, description: 'Essential academic vocabulary' },
    { id: 'v2', title: 'Collocations & Phrases', duration: '13:20', thumbnail: '', skill: 'vocabulary', level: 'B1', practiceQuestions: 15, description: 'Words that naturally go together' },
    { id: 'v3', title: 'Synonyms for Band 7+', duration: '14:45', thumbnail: '', skill: 'vocabulary', level: 'B2', practiceQuestions: 18, description: 'Expand your vocabulary range' },
    { id: 'v4', title: 'Idiomatic Expressions', duration: '17:30', thumbnail: '', skill: 'vocabulary', level: 'C1', practiceQuestions: 20, description: 'Use idioms appropriately' }
  ];

  const skills = [
    { id: 'vocabulary', name: 'Vocabulary', icon: BookMarked, color: 'from-indigo-500 to-blue-500', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
    { id: 'grammar', name: 'Grammar', icon: FileText, color: 'from-pink-500 to-rose-500', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
    { id: 'listening', name: 'Listening', icon: Headphones, color: 'from-orange-500 to-red-500', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { id: 'speaking', name: 'Speaking', icon: MessageSquare, color: 'from-blue-500 to-cyan-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { id: 'reading', name: 'Reading', icon: BookOpen, color: 'from-green-500 to-emerald-500', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { id: 'writing', name: 'Writing', icon: PenTool, color: 'from-purple-500 to-pink-500', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' }
  ];

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const filteredVideos = allVideos.filter(video => 
    video.skill === selectedSkill && video.level === selectedLevel
  );

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkill(skillId);
    setStep('level');
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setStep('videos');
  };

  const handleBack = () => {
    if (step === 'videos') {
      setStep('level');
      setSelectedLevel(null);
      setExpandedVideoId(null);
    } else if (step === 'level') {
      setStep('skill');
      setSelectedSkill(null);
    }
  };

  const handlePracticeToggle = (videoId: string) => {
    setExpandedVideoId(expandedVideoId === videoId ? null : videoId);
  };

  const selectedSkillData = skills.find(s => s.id === selectedSkill);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {step !== 'skill' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleBack}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold">Video Learning Library</h2>
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

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className={step === 'skill' ? 'text-white font-semibold' : ''}>Choose Skill</span>
            <ChevronRight className="h-4 w-4" />
            <span className={step === 'level' ? 'text-white font-semibold' : ''}>
              {step === 'skill' ? 'Level' : selectedLevel || 'Choose Level'}
            </span>
            <ChevronRight className="h-4 w-4" />
            <span className={step === 'videos' ? 'text-white font-semibold' : ''}>Videos</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step A: Choose Skill */}
          {step === 'skill' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Skill to Practice</h3>
                <p className="text-gray-600">Choose which skill you'd like to improve with video lessons</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <Card
                      key={skill.id}
                      className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-purple-300 group"
                      onClick={() => handleSkillSelect(skill.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className={`w-16 h-16 rounded-xl ${skill.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className={`h-8 w-8 ${skill.iconColor}`} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{skill.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {allVideos.filter(v => v.skill === skill.id).length} videos available
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className={`w-full bg-gradient-to-r ${skill.color}`}
                          >
                            Select {skill.name}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step B: Choose Level */}
          {step === 'level' && selectedSkillData && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${selectedSkillData.iconBg} flex items-center justify-center`}>
                  <selectedSkillData.icon className={`h-6 w-6 ${selectedSkillData.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedSkillData.name}</h3>
                  <p className="text-gray-600">Select your proficiency level</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {levels.map((level) => {
                  const videosForLevel = allVideos.filter(
                    v => v.skill === selectedSkill && v.level === level
                  ).length;

                  return (
                    <Card
                      key={level}
                      className={`cursor-pointer hover:shadow-lg transition-all border-2 ${
                        videosForLevel === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:border-purple-300'
                      }`}
                      onClick={() => videosForLevel > 0 && handleLevelSelect(level)}
                    >
                      <CardContent className="p-6">
                        <div className="text-center space-y-3">
                          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${selectedSkillData.color} flex items-center justify-center`}>
                            <span className="text-2xl font-bold text-white">{level}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Level {level}</p>
                            <p className="text-xs text-gray-600">{videosForLevel} videos</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>CEFR Levels:</strong> A1 (Beginner) → A2 (Elementary) → B1 (Intermediate) → B2 (Upper-Intermediate) → C1 (Advanced) → C2 (Proficient)
                </p>
              </div>
            </div>
          )}

          {/* Step C: Videos Display */}
          {step === 'videos' && selectedSkillData && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${selectedSkillData.iconBg} flex items-center justify-center`}>
                    <selectedSkillData.icon className={`h-6 w-6 ${selectedSkillData.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedSkillData.name} • Level {selectedLevel}
                    </h3>
                    <p className="text-gray-600">{filteredVideos.length} video lessons available</p>
                  </div>
                </div>
              </div>

              {filteredVideos.length === 0 ? (
                <Card className="border-2 border-dashed">
                  <CardContent className="p-12 text-center">
                    <p className="text-gray-500">No videos available for this level yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filteredVideos.map((video) => (
                    <Card key={video.id} className="border-2 hover:shadow-lg transition-all overflow-hidden">
                      <CardContent className="p-0">
                        {/* Video Thumbnail */}
                        <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 relative group cursor-pointer">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                              <PlayCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-black/60 text-white border-0">
                              <Clock className="h-3 w-3 mr-1" />
                              {video.duration}
                            </Badge>
                          </div>
                        </div>

                        {/* Video Info */}
                        <div className="p-4 space-y-3">
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{video.title}</h4>
                            <p className="text-sm text-gray-600">{video.description}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={selectedSkillData.iconColor}>
                              {selectedSkillData.name}
                            </Badge>
                            <Badge variant="outline">Level {video.level}</Badge>
                            <Badge variant="outline">
                              <Target className="h-3 w-3 mr-1" />
                              {video.practiceQuestions}
                            </Badge>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              className={`flex-1 bg-gradient-to-r ${selectedSkillData.color}`}
                            >
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Watch Video
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => handlePracticeToggle(video.id)}
                            >
                              <Target className="h-4 w-4 mr-2" />
                              Practice
                            </Button>
                          </div>

                          {/* Practice Panel */}
                          {expandedVideoId === video.id && (
                            <div className="mt-4 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg space-y-4 animate-in slide-in-from-top duration-200">
                              <div className="flex items-center justify-between">
                                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                                  <Target className="h-5 w-5 text-purple-600" />
                                  Practice Exercises
                                </h5>
                                <Badge className="bg-purple-600">
                                  {video.practiceQuestions} Questions
                                </Badge>
                              </div>

                              <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <p className="text-sm text-gray-700 mb-3">
                                  <strong>Instructions:</strong> Complete the exercises below to reinforce what you learned in the video.
                                </p>

                                {/* Practice Exercises Placeholder */}
                                <div className="space-y-3">
                                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm font-medium text-gray-900 mb-2">Question 1 of {video.practiceQuestions}</p>
                                    <p className="text-sm text-gray-700">[Practice question content will appear here]</p>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Progress value={0} className="flex-1" />
                                    <span className="text-xs text-gray-600">0/{video.practiceQuestions}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  Submit Answer
                                </Button>
                                <Button variant="outline" onClick={() => setExpandedVideoId(null)}>
                                  Close
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
