import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import {
  BookMarked,
  Sparkles,
  Globe,
  Volume2,
  Star,
  CheckCircle2,
  Calendar,
  TrendingUp,
  RefreshCw,
  Languages,
  Send,
  Target,
  Brain,
  Zap,
  Mic,
  StopCircle,
  MessageSquare,
  X,
  AlertCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

type ViewMode = 'onboarding' | 'word-list' | 'learning';

interface VocabularyWord {
  word: string;
  translation: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleTranslation: string;
  difficulty: 'B2' | 'C1' | 'C2';
  topic: string;
  learned: boolean;
}

interface UserPreferences {
  currentLevel: string;
  targetLevel: string;
  interests: string[];
  nativeLanguage: string;
}

interface PracticeAttempt {
  wordPronunciation: string;
  sentenceAttempt: string;
  transcript: string;
  aiFeedback: {
    pronunciationScore: number;
    usageScore: number;
    pronunciationFeedback: string;
    usageFeedback: string;
    suggestions: string;
  };
}

export function PhraseNotebook() {
  const [viewMode, setViewMode] = useState<ViewMode>('onboarding');
  const [preferences, setPreferences] = useState<UserPreferences>({
    currentLevel: 'B2',
    targetLevel: 'C2',
    interests: [],
    nativeLanguage: 'Arabic'
  });
  const [selectedLanguage, setSelectedLanguage] = useState('Arabic');
  const [customInterest, setCustomInterest] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [practiceDialogOpen, setPracticeDialogOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStage, setRecordingStage] = useState<'word' | 'sentence'>('word');
  const [showFeedback, setShowFeedback] = useState(false);
  const [practiceAttempt, setPracticeAttempt] = useState<PracticeAttempt | null>(null);

  // Mock vocabulary data
  const [vocabularyList, setVocabularyList] = useState<VocabularyWord[]>([
    {
      word: 'Quintessential',
      translation: 'الجوهري / المثالي',
      partOfSpeech: 'adjective',
      exampleSentence: 'She is the quintessential example of a dedicated researcher.',
      exampleTranslation: 'إنها المثال الجوهري للباحث المتفاني.',
      difficulty: 'C2',
      topic: 'Academic',
      learned: true
    },
    {
      word: 'Paradigm',
      translation: 'نموذج / نمط',
      partOfSpeech: 'noun',
      exampleSentence: 'The discovery represented a paradigm shift in scientific thinking.',
      exampleTranslation: 'مثل الاكتشاف تحولاً نموذجياً في التفكير العلمي.',
      difficulty: 'C1',
      topic: 'Academic',
      learned: true
    },
    {
      word: 'Meticulous',
      translation: 'دقيق / شديد العناية',
      partOfSpeech: 'adjective',
      exampleSentence: 'The architect was meticulous in every detail of the design.',
      exampleTranslation: 'كان المهندس المعماري دقيقاً في كل تفاصيل التصميم.',
      difficulty: 'C1',
      topic: 'Professional',
      learned: false
    },
    {
      word: 'Ubiquitous',
      translation: 'منتشر في كل مكان',
      partOfSpeech: 'adjective',
      exampleSentence: 'Smartphones have become ubiquitous in modern society.',
      exampleTranslation: 'أصبحت الهواتف الذكية منتشرة في كل مكان في المجتمع الحديث.',
      difficulty: 'C1',
      topic: 'Technology',
      learned: false
    },
    {
      word: 'Ameliorate',
      translation: 'يحسن / يخفف',
      partOfSpeech: 'verb',
      exampleSentence: 'The new policies aim to ameliorate the housing crisis.',
      exampleTranslation: 'تهدف السياسات الجديدة إلى تحسين أزمة الإسكان.',
      difficulty: 'C2',
      topic: 'Social Issues',
      learned: false
    }
  ]);

  const languages = [
    'Arabic', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 
    'Korean', 'Portuguese', 'Russian', 'Italian', 'Turkish', 'Hindi',
    'Dutch', 'Swedish', 'Polish', 'Greek', 'Hebrew', 'Thai'
  ];

  const suggestedInterests = [
    'Technology', 'Business', 'Science', 'Medicine', 'Arts & Culture',
    'Politics', 'Environment', 'Sports', 'Travel', 'Food & Cuisine',
    'Psychology', 'Education', 'Finance', 'Architecture', 'Literature'
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !preferences.interests.includes(customInterest.trim())) {
      setPreferences(prev => ({
        ...prev,
        interests: [...prev.interests, customInterest.trim()]
      }));
      setCustomInterest('');
    }
  };

  const handleStartLearning = () => {
    setViewMode('word-list');
  };

  const toggleWordLearned = (word: string) => {
    setVocabularyList(prev =>
      prev.map(item =>
        item.word === word ? { ...item, learned: !item.learned } : item
      )
    );
  };

  const handleOpenPractice = (word: VocabularyWord) => {
    setSelectedWord(word);
    setPracticeDialogOpen(true);
    setShowFeedback(false);
    setRecordingStage('word');
    setPracticeAttempt(null);
  };

  const handleStartRecording = (stage: 'word' | 'sentence') => {
    setRecordingStage(stage);
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleSubmitPractice = () => {
    // Mock AI feedback
    const mockFeedback: PracticeAttempt = {
      wordPronunciation: selectedWord?.word || '',
      sentenceAttempt: `I used this word in my sentence`,
      transcript: `Quintessential. The quality of her work is quintessential in our industry.`,
      aiFeedback: {
        pronunciationScore: 85,
        usageScore: 92,
        pronunciationFeedback: 'Your pronunciation of "quintessential" was very good! The stress on the third syllable was correct. Minor improvement needed on the "-tial" ending.',
        usageFeedback: 'Excellent usage! You used "quintessential" correctly in a professional context. The sentence structure is natural and the meaning is clear.',
        suggestions: 'Try emphasizing the "kwin-tuh-SEN-shuhl" pattern more clearly. Practice with: "This is the quintessential example of modern architecture."'
      }
    };
    
    setPracticeAttempt(mockFeedback);
    setShowFeedback(true);
  };

  const handleRetryPractice = () => {
    setShowFeedback(false);
    setRecordingStage('word');
    setPracticeAttempt(null);
  };

  const learnedCount = vocabularyList.filter(w => w.learned).length;
  const progressPercentage = (learnedCount / vocabularyList.length) * 100;

  // Onboarding View
  if (viewMode === 'onboarding') {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 mb-4">
              <BookMarked className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">AI-Powered Phrase Notebook</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let our AI create a personalized vocabulary learning path based on your interests and goals
            </p>
          </div>

          {/* AI Introduction Card */}
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Tell us your current level and learning interests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>AI generates 50 personalized words with example sentences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Words are translated to your native language</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>New vocabulary updated every 3 days based on your progress</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Form */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Current & Target Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                  Your Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Current Level
                  </label>
                  <Select value={preferences.currentLevel} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, currentLevel: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A1">A1 - Beginner</SelectItem>
                      <SelectItem value="A2">A2 - Elementary</SelectItem>
                      <SelectItem value="B1">B1 - Intermediate</SelectItem>
                      <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                      <SelectItem value="C1">C1 - Advanced</SelectItem>
                      <SelectItem value="C2">C2 - Proficiency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Target Level
                  </label>
                  <Select value={preferences.targetLevel} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, targetLevel: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B1">B1 - Intermediate</SelectItem>
                      <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                      <SelectItem value="C1">C1 - Advanced</SelectItem>
                      <SelectItem value="C2">C2 - Proficiency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Native Language */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Languages className="h-5 w-5 text-purple-600" />
                  Translation Language
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select your native language for translations
                  </label>
                  <Select value={preferences.nativeLanguage} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, nativeLanguage: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-900 flex items-start gap-2">
                    <Globe className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>All vocabulary and example sentences will be translated to {preferences.nativeLanguage}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interests Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Topics of Interest
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Select topics you're interested in. AI will generate vocabulary relevant to these areas.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {suggestedInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={preferences.interests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer transition-all px-3 py-1.5 ${
                      preferences.interests.includes(interest)
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                    {preferences.interests.includes(interest) && (
                      <CheckCircle2 className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>

              {/* Custom Interest Input */}
              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Add custom topic
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Artificial Intelligence, Climate Change..."
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomInterest()}
                  />
                  <Button onClick={handleAddCustomInterest} className="gap-2">
                    <Send className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Selected Interests Display */}
              {preferences.interests.length > 0 && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-900 mb-2">
                    Selected Topics ({preferences.interests.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {preferences.interests.map((interest) => (
                      <Badge key={interest} className="bg-purple-600">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Start Button */}
          <div className="text-center">
            <Button
              onClick={handleStartLearning}
              disabled={preferences.interests.length === 0}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2 px-8"
            >
              <Sparkles className="h-5 w-5" />
              Generate My Personalized Vocabulary
            </Button>
            {preferences.interests.length === 0 && (
              <p className="text-sm text-gray-500 mt-3">
                Please select at least one topic to continue
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Word List View
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header with Progress */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <BookMarked className="h-7 w-7 text-purple-600" />
                My Phrase Notebook
              </h1>
              <p className="text-gray-600 mt-1">
                {preferences.currentLevel} → {preferences.targetLevel} • {preferences.nativeLanguage} Translations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[160px]">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm opacity-90 mb-1">Words Learned</p>
                  <p className="text-3xl font-bold">{learnedCount} / {vocabularyList.length}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Next Update</p>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    In 2 days
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-2">Overall Progress</p>
                  <Progress value={progressPercentage} className="h-2 bg-white/20" />
                  <p className="text-sm mt-1">{Math.round(progressPercentage)}% Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">AI Learning Tip</h3>
                <p className="text-sm text-gray-700">
                  You're making great progress! Focus on words related to <strong>{preferences.interests[0]}</strong> this week. 
                  Practice using them in sentences to improve retention. Your next vocabulary set will be generated in 2 days 
                  based on your learning patterns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vocabulary List */}
        <div className="grid gap-4">
          {vocabularyList.map((item, index) => (
            <Card key={index} className={`transition-all ${item.learned ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1 w-full sm:w-auto">
                    {/* Word Header */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{item.word}</h3>
                      <Badge variant="outline" className="text-xs">
                        {item.partOfSpeech}
                      </Badge>
                      <Badge className={`text-xs ${
                        item.difficulty === 'C2' ? 'bg-purple-600' :
                        item.difficulty === 'C1' ? 'bg-blue-600' : 'bg-cyan-600'
                      }`}>
                        {item.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.topic}
                      </Badge>
                    </div>

                    {/* Translation */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-base sm:text-lg text-gray-700 font-medium flex items-center gap-2">
                        <Languages className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="break-words">{item.translation}</span>
                      </p>
                    </div>

                    {/* Example Sentence */}
                    <div className="space-y-2 bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Example:</p>
                        <p className="text-sm sm:text-base text-gray-900 italic break-words">\"{item.exampleSentence}\"</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Translation:</p>
                        <p className="text-sm sm:text-base text-gray-700 break-words">\"{item.exampleTranslation}\"</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full flex-shrink-0"
                    >
                      <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 flex-1 sm:flex-none"
                      onClick={() => handleOpenPractice(item)}
                    >
                      <Mic className="h-4 w-4" />
                      Practice
                    </Button>
                    <Button
                      variant={item.learned ? "default" : "outline"}
                      size="icon"
                      className={`rounded-full flex-shrink-0 ${item.learned ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      onClick={() => toggleWordLearned(item.word)}
                    >
                      {item.learned ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Showing 5 of 50 words • {vocabularyList.length - learnedCount} remaining to learn
          </p>
          <Button variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Load More Words
          </Button>
        </div>
      </div>

      {/* Practice Dialog */}
      <Dialog open={practiceDialogOpen} onOpenChange={setPracticeDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-2xl">
              <Mic className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              <span className="truncate">Practice Speaking: {selectedWord?.word}</span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Pronounce the word and use it in a sentence. AI will analyze your pronunciation and usage.
            </DialogDescription>
          </DialogHeader>

          {!showFeedback ? (
            <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              {/* Word Information */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardContent className="p-4 sm:p-5">
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">{selectedWord?.word}</h3>
                      <p className="text-base sm:text-lg text-gray-700 flex items-center gap-2">
                        <Languages className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="break-words">{selectedWord?.translation}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">{selectedWord?.partOfSpeech}</Badge>
                      <Badge className="bg-purple-600 text-xs">{selectedWord?.difficulty}</Badge>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Example Usage:</p>
                      <p className="text-sm sm:text-base text-gray-900 italic break-words">\"{selectedWord?.exampleSentence}\"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 1: Pronounce the Word */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs sm:text-sm flex-shrink-0">1</div>
                    <span>Pronounce the Word</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Click the button below and clearly say: <strong className="break-words">\"{selectedWord?.word}\"</strong>
                  </p>
                  <div className="flex items-center justify-center p-6 sm:p-8 bg-gray-50 rounded-lg">
                    <Button
                      size="lg"
                      variant={isRecording && recordingStage === 'word' ? "destructive" : "default"}
                      onClick={() => isRecording && recordingStage === 'word' ? handleStopRecording() : handleStartRecording('word')}
                      className="gap-2 sm:gap-3 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
                    >
                      {isRecording && recordingStage === 'word' ? (
                        <>
                          <StopCircle className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                          <span className="whitespace-nowrap">Stop Recording</span>
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
                          <span className="whitespace-nowrap">Start Recording</span>
                        </>
                      )}
                    </Button>
                  </div>
                  {isRecording && recordingStage === 'word' && (
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      Recording in progress...
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Step 2: Use in a Sentence */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs sm:text-sm flex-shrink-0">2</div>
                    <span>Use the Word in a Sentence</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Create your own sentence using <strong className="break-words">\"{selectedWord?.word}\"</strong> and speak it aloud.
                  </p>
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs text-blue-900 mb-2 font-medium flex items-center gap-2">
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      Tips for a good sentence:
                    </p>
                    <ul className="text-xs text-blue-800 space-y-1 ml-5 list-disc">
                      <li>Use the word in a clear, relevant context</li>
                      <li>Make it grammatically correct</li>
                      <li>Keep it natural and conversational</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center p-6 sm:p-8 bg-gray-50 rounded-lg">
                    <Button
                      size="lg"
                      variant={isRecording && recordingStage === 'sentence' ? "destructive" : "default"}
                      onClick={() => isRecording && recordingStage === 'sentence' ? handleStopRecording() : handleStartRecording('sentence')}
                      className="gap-2 sm:gap-3 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
                    >
                      {isRecording && recordingStage === 'sentence' ? (
                        <>
                          <StopCircle className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                          <span className="whitespace-nowrap">Stop Recording</span>
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
                          <span className="whitespace-nowrap">Record Sentence</span>
                        </>
                      )}
                    </Button>
                  </div>
                  {isRecording && recordingStage === 'sentence' && (
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      Recording in progress...
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={() => setPracticeDialogOpen(false)}
                  className="w-full sm:flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitPractice}
                  className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Get AI Feedback
                </Button>
              </div>
            </div>
          ) : (
            // Feedback View
            <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              {/* Transcript */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    Your Speech Transcript
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-900 italic break-words">\"{practiceAttempt?.transcript}\"</p>
                  </div>
                </CardContent>
              </Card>

              {/* Scores */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-blue-900 mb-1 sm:mb-2">Pronunciation Score</p>
                    <p className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
                      {practiceAttempt?.aiFeedback.pronunciationScore}/100
                    </p>
                    <Progress value={practiceAttempt?.aiFeedback.pronunciationScore} className="h-2" />
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-purple-900 mb-1 sm:mb-2">Usage Score</p>
                    <p className="text-3xl sm:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">
                      {practiceAttempt?.aiFeedback.usageScore}/100
                    </p>
                    <Progress value={practiceAttempt?.aiFeedback.usageScore} className="h-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Pronunciation Feedback */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    Pronunciation Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-gray-700 break-words">{practiceAttempt?.aiFeedback.pronunciationFeedback}</p>
                </CardContent>
              </Card>

              {/* Usage Feedback */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    Usage Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-gray-700 break-words">{practiceAttempt?.aiFeedback.usageFeedback}</p>
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-gray-700 break-words">{practiceAttempt?.aiFeedback.suggestions}</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleRetryPractice}
                  className="flex-1 gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  onClick={() => setPracticeDialogOpen(false)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Complete Practice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}