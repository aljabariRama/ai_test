import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { GripVertical, Send, Sparkles } from 'lucide-react';

interface DragDropQuestionProps {
  instruction: string;
  words: string[];
  onAnswer: (answer: number[]) => void;
}

interface DragItem {
  index: number;
  word: string;
}

interface DraggableWordProps {
  word: string;
  index: number;
  moveWord: (dragIndex: number, hoverIndex: number) => void;
}

const ItemType = 'WORD';

function DraggableWord({ word, index, moveWord }: DraggableWordProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index, word },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    hover: (item: DragItem) => {
      if (item.index !== index) {
        moveWord(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center gap-3 p-4 bg-white border-2 rounded-lg cursor-move transition-all ${
        isDragging
          ? 'border-blue-600 shadow-lg opacity-50 scale-95'
          : isOver
          ? 'border-blue-400 bg-blue-50'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
      }`}
    >
      <GripVertical className="h-5 w-5 text-gray-400" />
      <span className="flex-1 font-medium">{word}</span>
      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">#{index + 1}</span>
    </div>
  );
}

function DragDropQuestionContent({ instruction, words, onAnswer }: DragDropQuestionProps) {
  const [orderedWords, setOrderedWords] = useState([...words]);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const moveWord = (dragIndex: number, hoverIndex: number) => {
    const newWords = [...orderedWords];
    const draggedWord = newWords[dragIndex];
    newWords.splice(dragIndex, 1);
    newWords.splice(hoverIndex, 0, draggedWord);
    setOrderedWords(newWords);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Simulate AI analysis
    setTimeout(() => {
      const mockFeedback = {
        overallBand: 7.5,
        correctCount: Math.floor(Math.random() * words.length) + 1,
        totalCount: words.length,
        comments: [
          'Good sequencing skills demonstrated',
          'Consider reviewing sentence structure rules',
          'Pay attention to context clues',
        ],
      };
      setFeedback(mockFeedback);
    }, 1500);
  };

  const handleContinue = () => {
    const order = orderedWords.map((word) => words.indexOf(word));
    onAnswer(order);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GripVertical className="h-5 w-5 text-blue-600" />
          Drag & Drop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-700">{instruction}</p>

        {feedback && (
          <div className="sticky top-4 z-10">
            <Button
              onClick={handleContinue}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all gap-2 h-12 text-base font-semibold"
            >
              <Send className="h-5 w-5" />
              Continue to Next Question
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {orderedWords.map((word, index) => (
            <DraggableWord
              key={`${word}-${index}`}
              word={word}
              index={index}
              moveWord={moveWord}
            />
          ))}
        </div>

        {!submitted ? (
          <>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Tip:</strong> Drag and drop the words to arrange them in the correct order.
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
              size="lg"
            >
              <Sparkles className="h-5 w-5" />
              Get AI Feedback
            </Button>
          </>
        ) : feedback ? (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 mb-2">AI Assessment</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  You got {feedback.correctCount} out of {feedback.totalCount} in the optimal order. 
                  Your sequencing shows good understanding of context and logical flow.
                </p>
              </div>
            </div>

            <div className="bg-white/60 rounded-xl p-4 mb-3">
              <div className="flex items-center justify-center gap-2 mb-3">
                <p className="font-semibold text-sm text-blue-900">
                  IELTS Band Score:
                </p>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-lg">
                  {feedback.overallBand.toFixed(1)}
                </div>
              </div>
              <ul className="space-y-1.5">
                {feedback.comments.map((comment: string, idx: number) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{comment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-3 animate-pulse" />
            <p className="text-gray-600">Analyzing your answer...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DragDropQuestion(props: DragDropQuestionProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragDropQuestionContent {...props} />
    </DndProvider>
  );
}
