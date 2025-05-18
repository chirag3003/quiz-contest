"use client";

import { Question } from "@/lib/validators/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type MultipleChoiceQuestionProps = {
  question: Question;
  selectedAnswer: string | string[] | undefined;
  onAnswerSelected: (answer: string) => void;
};

export default function MultipleChoiceQuestion({
  question,
  selectedAnswer,
  onAnswerSelected,
}: MultipleChoiceQuestionProps) {
  if (!question.options || question.options.length === 0) {
    return <div className="text-red-500">Question is missing options</div>;
  }

  return (
    <RadioGroup
      value={selectedAnswer as string}
      onValueChange={onAnswerSelected}
      className="space-y-3"
    >
      {question.options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
          <RadioGroupItem id={`option-${index}`} value={option} />
          <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
