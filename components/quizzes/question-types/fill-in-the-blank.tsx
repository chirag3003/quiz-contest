"use client";

import { useState } from "react";
import { Question } from "@/lib/validators/quiz";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FillInTheBlankQuestionProps = {
  question: Question;
  selectedAnswer: string | string[] | undefined;
  onAnswerSelected: (answer: string) => void;
};

export default function FillInTheBlankQuestion({
  question,
  selectedAnswer,
  onAnswerSelected,
}: FillInTheBlankQuestionProps) {
  const [inputValue, setInputValue] = useState(selectedAnswer as string || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onAnswerSelected(value);
  };

  return (
    <div className="space-y-4">
      {question.code && (
        <pre className="p-4 bg-muted rounded-md overflow-x-auto font-mono text-sm">
          <code>{question.code}</code>
        </pre>
      )}
      <div className="space-y-2">
        <Label htmlFor="answer">Your Answer</Label>
        <Input
          id="answer"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
          className="w-full"
        />
      </div>
    </div>
  );
}
