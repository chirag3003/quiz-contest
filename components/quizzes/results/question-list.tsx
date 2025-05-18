"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type QuestionResult = {
  id: string;
  text: string;
  type: string;
  topic?: string;
  isCorrect: boolean;
  isAttempted: boolean;
  userAnswer?: string | string[];
  correctAnswer: string | string[];
};

type QuestionListProps = {
  questions: QuestionResult[];
};

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className="space-y-4 mb-8">
      {questions.map((result) => (
        <Card key={result.id} className={`p-4 border-l-4 ${
          result.isCorrect 
            ? 'border-l-green-500' 
            : result.isAttempted 
              ? 'border-l-red-500' 
              : 'border-l-gray-300'
        }`}>
          <div className="flex justify-between mb-2">
            <Badge variant="outline">{result.topic || 'Uncategorized'}</Badge>
            <Badge 
              variant={result.isCorrect ? "default" : result.isAttempted ? "destructive" : "outline"}
            >
              {result.isCorrect 
                ? 'Correct' 
                : result.isAttempted 
                  ? 'Incorrect' 
                  : 'Unattempted'}
            </Badge>
          </div>
          
          <h3 className="font-medium mb-2">{result.text}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-muted-foreground mb-1">Your Answer:</div>
              <div>
                {result.isAttempted ? (
                  Array.isArray(result.userAnswer) ? (
                    <ul className="list-disc pl-5">
                      {result.userAnswer.map((ans, index) => (
                        <li key={`user-answer-${ans.substring(0, 10)}-${index}`}>{ans}</li>
                      ))}
                    </ul>
                  ) : (
                    result.userAnswer
                  )
                ) : (
                  <span className="text-muted-foreground italic">Not answered</span>
                )}
              </div>
            </div>
            
            <div>
              <div className="font-medium text-muted-foreground mb-1">Correct Answer:</div>
              <div>
                {Array.isArray(result.correctAnswer) ? (
                  <ul className="list-disc pl-5">
                    {result.correctAnswer.map((ans, index) => (
                      <li key={`correct-answer-${ans.substring(0, 10)}-${index}`}>{ans}</li>
                    ))}
                  </ul>
                ) : (
                  result.correctAnswer
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
