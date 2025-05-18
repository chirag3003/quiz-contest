"use client";

import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

type TopicAnalysisProps = {
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  percentageCorrect: number;
};

type TopicAnalysisListProps = {
  topicAnalysis: TopicAnalysisProps[];
};

export function TopicAnalysis({
  topic,
  totalQuestions,
  correctAnswers,
  percentageCorrect,
}: TopicAnalysisProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium text-lg mb-1">{topic}</h3>
      <Progress 
        value={percentageCorrect} 
        className="h-2 mb-2" 
      />
      <div className="flex justify-between items-center text-sm">
        <span>{percentageCorrect}% correct</span>
        <span>{correctAnswers}/{totalQuestions} questions</span>
      </div>
    </Card>
  );
}

export function TopicAnalysisList({ topicAnalysis }: TopicAnalysisListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Topic Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topicAnalysis.map((analysis) => (
          <TopicAnalysis key={analysis.topic} {...analysis} />
        ))}
      </div>
    </div>
  );
}
