import { Headphones, BookOpen, PenTool, Languages, BookText, Mic } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import type { SkillType } from '../LivePractice';

interface SkillSelectionProps {
  onSelect: (skill: SkillType) => void;
}

const skills = [
  {
    id: 'listening' as SkillType,
    name: 'Listening',
    description: 'Practice with audio content and comprehension questions',
    icon: Headphones,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-50',
  },
  {
    id: 'reading' as SkillType,
    name: 'Reading',
    description: 'Read passages and answer comprehension questions',
    icon: BookOpen,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-50',
  },
  {
    id: 'writing' as SkillType,
    name: 'Writing',
    description: 'Compose essays and get AI-powered feedback',
    icon: PenTool,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-50',
  },
  {
    id: 'grammar' as SkillType,
    name: 'Grammar',
    description: 'Master grammar rules with interactive exercises',
    icon: Languages,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-50',
  },
  {
    id: 'vocabulary' as SkillType,
    name: 'Vocabulary',
    description: 'Expand your word knowledge and usage',
    icon: BookText,
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-50',
  },
  {
    id: 'speaking' as SkillType,
    name: 'Speaking',
    description: 'Practice speaking with AI avatar and get instant feedback',
    icon: Mic,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-50',
  },
];

export function SkillSelection({ onSelect }: SkillSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Your Skill</h2>
        <p className="text-gray-600">Select the skill you want to practice</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <Card
              key={skill.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 hover:border-blue-500 ${skill.hoverColor}`}
              onClick={() => onSelect(skill.id)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${skill.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
