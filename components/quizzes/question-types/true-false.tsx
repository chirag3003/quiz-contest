"use client";

import { Question } from "@/lib/validators/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type TrueFalseQuestionProps = {
  question: Question;
  selectedAnswer: string | string[] | undefined;
  onAnswerSelected: (answer: string) => void;
};

export default function TrueFalseQuestion({
  question,
  selectedAnswer,
  onAnswerSelected,
}: TrueFalseQuestionProps) {
  return (
    <RadioGroup
      value={selectedAnswer as string}
      onValueChange={onAnswerSelected}
      className="space-y-3"
    >
      <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
        <RadioGroupItem id="option-true" value="true" />
        <Label htmlFor="option-true" className="flex-grow cursor-pointer">
          True
        </Label>
      </div>
      <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
        <RadioGroupItem id="option-false" value="false" />
        <Label htmlFor="option-false" className="flex-grow cursor-pointer">
          False
        </Label>
      </div>
    </RadioGroup>
  );
}
