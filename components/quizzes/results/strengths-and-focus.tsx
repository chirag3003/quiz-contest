"use client";

import { Trophy, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

type StrengthsAndFocusProps = {
  strengths: string[];
  areasToFocus: string[];
};

export function StrengthsAndFocus({ strengths, areasToFocus }: StrengthsAndFocusProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-semibold">Your Strengths</h2>
        </div>
        {strengths.length > 0 ? (
          <ul className="space-y-2">
            {strengths.map((topic) => (
              <li key={topic} className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-green-500" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Keep practicing to develop strengths!</p>
        )}
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-semibold">Areas to Focus</h2>
        </div>
        {areasToFocus.length > 0 ? (
          <ul className="space-y-2">
            {areasToFocus.map((topic) => (
              <li key={topic} className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-amber-500" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-500 font-medium">Great job! You're doing well in all topics.</p>
        )}
      </Card>
    </div>
  );
}
