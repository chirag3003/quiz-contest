"use client";

import { useState, useEffect, useCallback } from "react";
import type { Question } from "@/lib/validators/quiz";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

type DragAndDropQuestionProps = {
  question: Question;
  selectedAnswer: string | string[] | undefined;
  onAnswerSelected: (answer: string[]) => void;
};

export default function DragAndDropQuestion({
  question,
  selectedAnswer,
  onAnswerSelected,
}: DragAndDropQuestionProps) {
  const [items, setItems] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize items from props
  const initializeItems = useCallback(() => {
    if (selectedAnswer && Array.isArray(selectedAnswer) && selectedAnswer.length > 0) {
      setItems(selectedAnswer);
    } else if (question.options && question.options.length > 0) {
      setItems([...question.options]);
      onAnswerSelected([...question.options]);
    } else if (Array.isArray(question.correctAnswer)) {
      setItems([...question.correctAnswer]);
      onAnswerSelected([...question.correctAnswer]);
    } else {
      const defaultItems = ["Item 1", "Item 2", "Item 3", "Item 4"];
      setItems(defaultItems);
      onAnswerSelected(defaultItems);
    }
    setIsInitialized(true);
  }, [question, selectedAnswer, onAnswerSelected]);

  // Initialize on mount
  useEffect(() => {
    if (!isInitialized) {
      initializeItems();
    }
  }, [isInitialized, initializeItems]);

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedItem, 1);
    newItems.splice(index, 0, removed);

    setItems(newItems);
    onAnswerSelected(newItems);
    setDraggedItem(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Handle shuffle
  const handleShuffle = () => {
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
    onAnswerSelected(shuffledItems);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Drag items to arrange them in the correct order:</p>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`p-3 flex items-center gap-2 cursor-move ${
              draggedItem === index ? "opacity-50 border-primary" : ""
            }`}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <span>{item}</span>
          </Card>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleShuffle}
        className="mt-2"
      >
        Shuffle
      </Button>
    </div>
  );
}
