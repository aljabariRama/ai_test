import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { ArrowLeft, Sparkles, Send } from "lucide-react";
import type { SkillType, SessionConfig, Level } from "../../../types/LivePractice";

interface ConfigurationPanelProps {
  skill: SkillType;
  onComplete: (config: SessionConfig) => void;
  onBack: () => void;
}

const levels: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const suggestedTopics = [
  "Work & Career",
  "Hobbies",
  "Current Events",
  "Personal Experience",
  "Travel Stories",
  "Culture",
  "Technology",
  "Education",
  "Sports",
  "Family",
  "Future Plans",
];

export function ConfigurationPanel({ skill, onComplete, onBack }: ConfigurationPanelProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level>("B1");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [customTopic, setCustomTopic] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // ✅ Speaking fields
  const [userName, setUserName] = useState("");
  const [targetBand, setTargetBand] = useState<number>(6.5);
  const [studentInfo, setStudentInfo] = useState("");

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
  };

  const handleAddCustomTopic = () => {
    const t = customTopic.trim();
    if (!t) return;
    setSelectedTopics((prev) => (prev.includes(t) ? prev : [...prev, t]));
    setCustomTopic("");
  };

  const handleStart = () => {
    // ✅ نبني نص واحد واضح للـ AI
    const profileParts: string[] = [];
    if (userName.trim()) profileParts.push(`My name is ${userName.trim()}.`);
    if (studentInfo.trim()) profileParts.push(studentInfo.trim());
    const userProfileText = profileParts.join(" ");

    const topics = selectedTopics.length > 0 ? selectedTopics : ["Work & Career"];

    const config: SessionConfig = {
      skill,
      level: selectedLevel,               // current level
      numberOfQuestions,
      topics,
      // ✅ أسماء ثابتة
      userName: userName.trim(),
      targetBand,                         // رقم
      studentInfo: studentInfo.trim(),
      userProfileText,                    // نص كامل
      // ✅ (اختياري) لو بدك كمان targetBandOrLevel string
      targetBandOrLevel: String(targetBand),
    };

    onComplete(config);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Setup Speaking Session
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Personal info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Your Name</Label>
              <Input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Khaled" />
            </div>

            <div className="space-y-2">
              <Label>Target Band</Label>
              <Input
                type="number"
                step="0.5"
                min="1"
                max="9"
                value={targetBand}
                onChange={(e) => setTargetBand(Number(e.target.value))}
              />
            </div>
          </div>

          {/* ✅ معلومات إضافية (كانت ناقصة عندك) */}
          <div className="space-y-2">
            <Label>Additional info (optional)</Label>
            <Textarea
              value={studentInfo}
              onChange={(e) => setStudentInfo(e.target.value)}
              placeholder="Example: I work as a cashier. I want to improve fluency and confidence."
              className="min-h-[90px]"
            />
          </div>

          {/* Level */}
          <div className="space-y-2">
            <Label>Current Level ({selectedLevel})</Label>
            <div className="flex gap-2 flex-wrap">
              {levels.map((l) => (
                <Button key={l} variant={selectedLevel === l ? "default" : "outline"} onClick={() => setSelectedLevel(l)} size="sm">
                  {l}
                </Button>
              ))}
            </div>
          </div>

          {/* Questions slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Number of Questions</Label>
              <span className="font-bold text-blue-600">{numberOfQuestions}</span>
            </div>
            <Slider value={[numberOfQuestions]} onValueChange={(v) => setNumberOfQuestions(v[0])} min={3} max={15} step={1} />
          </div>

          {/* Topics */}
          <div className="space-y-2">
            <Label>Choose Topics</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((t) => (
                <Badge
                  key={t}
                  variant={selectedTopics.includes(t) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => handleTopicToggle(t)}
                >
                  {t}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <Input value={customTopic} onChange={(e) => setCustomTopic(e.target.value)} placeholder="Add custom topic..." />
              <Button size="icon" onClick={handleAddCustomTopic}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleStart} disabled={!userName.trim()}>
            Start Speaking Test
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
