import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { ArrowLeft, Sparkles, Send } from "lucide-react";
import type { SkillType, QuestionType, Level, SessionConfig } from "../LivePractice";

interface ConfigurationPanelProps {
  skill: SkillType;
  onComplete: (config: SessionConfig) => void;
  onBack: () => void;
}

const levels: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const questionTypes: { id: QuestionType; name: string }[] = [
  { id: "fill-blank", name: "Fill in the Blank" },
  { id: "mcq", name: "Multiple Choice" },
  { id: "drag-drop", name: "Drag & Drop" },
];

const suggestedTopicsBySkill: Record<SkillType, string[]> = {
  listening: ["Daily Conversations", "Academic Lectures", "News Reports", "Interviews", "Podcasts"],
  reading: ["Articles", "Essays", "Stories", "Scientific Texts", "News"],
  writing: ["Opinion Essays", "Formal Letters", "Reports", "Stories"],
  grammar: ["Tenses", "Conditionals", "Passive Voice", "Prepositions"],
  vocabulary: ["Business", "Technology", "Environment", "Health", "Travel"],
  speaking: [
    "General Conversation","Work & Career","Hobbies","Current Events","Personal Experience",
    "Travel Stories","Culture & Traditions","Food & Restaurants","Technology & Innovation","Education",
    "Entertainment","Sports & Fitness","Family & Relationships","Future Plans","Opinions & Debates"
  ],
};

export function ConfigurationPanel({ skill, onComplete, onBack }: ConfigurationPanelProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level>("B1");
  const [questionType, setQuestionType] = useState<QuestionType>("mcq");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const [customTopic, setCustomTopic] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // ✅ NEW for speaking personalization
  const [studentName, setStudentName] = useState("");
  const [targetBand, setTargetBand] = useState<number>(6.5);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const showQuestionTypes = skill !== "speaking" && skill !== "writing";
  const suggestedTopics = suggestedTopicsBySkill[skill];

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleAddCustomTopic = () => {
    const t = customTopic.trim();
    if (!t) return;
    if (!selectedTopics.includes(t)) setSelectedTopics([...selectedTopics, t]);
    setCustomTopic("");
  };

  const buildUserProfileText = () => {
    // نخليها English عشان prompt تبع IELTS
    const parts: string[] = [];
    if (studentName.trim()) parts.push(`My name is ${studentName.trim()}.`);
    if (additionalInfo.trim()) parts.push(additionalInfo.trim());
    return parts.join(" ");
  };

  const handleStart = () => {
    const config: SessionConfig = {
      skill,
      questionType: showQuestionTypes ? questionType : undefined,
      level: selectedLevel,
      numberOfQuestions,
      topics: selectedTopics.length > 0 ? selectedTopics : [suggestedTopics[0]],
      // ✅ speaking extras
      targetBand: skill === "speaking" ? targetBand : undefined,
      userProfileText: skill === "speaking" ? buildUserProfileText() : undefined,
    };
    onComplete(config);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2 mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Skills
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Configure Your Practice Session
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ✅ Speaking personalization */}
          {skill === "speaking" && (
            <div className="space-y-4 rounded-lg border p-4 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Student name</Label>
                  <Input
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Ahmad"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Target IELTS band</Label>
                  <Input
                    type="number"
                    step="0.5"
                    min={1}
                    max={9}
                    value={targetBand}
                    onChange={(e) => setTargetBand(Number(e.target.value))}
                    placeholder="6.5"
                  />
                  <div className="text-xs text-gray-500">Example: 6.0, 6.5, 7.0</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional info (optional)</Label>
                <Textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="I am a 10th grade student. My hobbies are football and science fiction. Please ask me about technology and sports."
                  className="min-h-[90px]"
                />
              </div>

              <div className="text-xs text-gray-600">
                This info will be sent to the teacher avatar and used in greeting + personalized questions.
              </div>
            </div>
          )}

          {/* Question Type Selection */}
          {showQuestionTypes && (
            <div className="space-y-3">
              <Label>Question Type</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {questionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setQuestionType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      questionType === type.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <span className="font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Level Selection */}
          <div className="space-y-3">
            <Label>CEFR Level</Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                    selectedLevel === level ? "border-blue-600 bg-blue-600 text-white" : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Number of Questions</Label>
              <span className="text-2xl font-bold text-blue-600">{numberOfQuestions}</span>
            </div>
            <Slider
              value={[numberOfQuestions]}
              onValueChange={(v) => setNumberOfQuestions(v[0])}
              min={5}
              max={30}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>5 questions</span>
              <span>30 questions</span>
            </div>
          </div>

          {/* Topics */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Topics</Label>
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-gray-600">Suggested topics:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((topic) => (
                  <Badge
                    key={topic}
                    variant={selectedTopics.includes(topic) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => handleTopicToggle(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-sm focus-within:border-blue-500 transition-all">
                <Textarea
                  placeholder="Add custom topic then press Enter or Send"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddCustomTopic();
                    }
                  }}
                  className="min-h-[80px] border-0 focus-visible:ring-0 resize-none p-4 pr-14 rounded-2xl"
                />
                <div className="absolute bottom-3 right-3">
                  <Button
                    onClick={handleAddCustomTopic}
                    disabled={!customTopic.trim()}
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Start */}
          <Button
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
            disabled={selectedTopics.length === 0}
          >
            Start Practice Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
