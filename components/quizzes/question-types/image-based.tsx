"use client";

import Image from "next/image";
import type { Question } from "@/lib/validators/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type ImageBasedQuestionProps = {
  question: Question;
  selectedAnswer: string | string[] | undefined;
  onAnswerSelected: (answer: string) => void;
};

export default function ImageBasedQuestion({
  question,
  selectedAnswer,
  onAnswerSelected,
}: ImageBasedQuestionProps) {
  if (!question.imageUrl) {
    return <div className="text-red-500">Question is missing image URL</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative h-60 w-full border rounded-md overflow-hidden">
        <Image 
          src={question.imageUrl} 
          alt="Question image"
          fill
          className="object-contain"
        />
      </div>

      {question.options ? (
        <RadioGroup
          value={selectedAnswer as string}
          onValueChange={onAnswerSelected}
          className="space-y-3 mt-4"
        >
          {question.options.map((option, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
              <RadioGroupItem id={`option-${index}`} value={option} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="imageAnswer">Your Answer</Label>
          <input
            id="imageAnswer"
            value={selectedAnswer as string || ""}
            onChange={(e) => onAnswerSelected(e.target.value)}
            placeholder="Type your answer based on the image..."
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}
    </div>
  );
}
