"use client";

import { CheckCircle, XCircle, BookOpen, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

type OverallScoreProps = {
  correct: number;
  incorrect: number;
  unattempted: number;
  total: number;
  percentageCorrect: number;
};

export function OverallScore({
  correct,
  incorrect,
  unattempted,
  total,
  percentageCorrect,
}: OverallScoreProps) {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-2">Score Summary</h2>
          <div className="text-5xl font-bold mb-4">
            {percentageCorrect}%
          </div>
          <Progress 
            value={percentageCorrect} 
            className="h-3 mb-4" 
          />
          <div className="text-sm text-muted-foreground">
            Passing score: 70%
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Correct</span>
              </div>
              <div className="text-2xl font-bold">{correct}</div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="font-medium">Incorrect</span>
              </div>
              <div className="text-2xl font-bold">{incorrect}</div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Total</span>
              </div>
              <div className="text-2xl font-bold">{total}</div>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <span className="font-medium">Unattempted</span>
              </div>
              <div className="text-2xl font-bold">{unattempted}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
