"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getQuizById } from "@/lib/data/demo-quizzes";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, BookOpen, Trophy, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OverallScore } from "@/components/quizzes/results/overall-score";
import { TopicAnalysisList } from "@/components/quizzes/results/topic-analysis";
import { StrengthsAndFocus } from "@/components/quizzes/results/strengths-and-focus";
import { TopicFilter } from "@/components/quizzes/results/topic-filter";
import { QuestionList } from "@/components/quizzes/results/question-list";
import type { Question } from "@/lib/validators/quiz";

interface QuestionResult {
  id: string;
  text: string;
  type: string;
  topic?: string;
  isCorrect: boolean;
  isAttempted: boolean;
  userAnswer?: string | string[];
  correctAnswer: string | string[];
}

interface TopicAnalysis {
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  percentageCorrect: number;
};

export default function QuizResultPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get unique topics from the quiz questions
  const topics = useMemo(() => {
    const topicsSet = new Set(questionResults.map(q => q.topic || 'Uncategorized'));
    return Array.from(topicsSet);
  }, [questionResults]);

  // Filter results by topic if selected
  const filteredResults = useMemo(() => {
    if (!selectedTopic) return questionResults;
    return questionResults.filter(q => q.topic === selectedTopic);
  }, [questionResults, selectedTopic]);

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    const total = questionResults.length;
    const correct = questionResults.filter(q => q.isCorrect).length;
    const incorrect = questionResults.filter(q => !q.isCorrect && q.isAttempted).length;
    const unattempted = questionResults.filter(q => !q.isAttempted).length;
    
    return {
      total,
      correct,
      incorrect,
      unattempted,
      percentageCorrect: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  }, [questionResults]);

  // Generate topic analysis
  const topicAnalysis = useMemo(() => {
    // Group questions by topic
    const analysisByTopic: { [key: string]: TopicAnalysis } = {};
    
    for (const question of questionResults) {
      const topic = question.topic || 'Uncategorized';
      
      if (!analysisByTopic[topic]) {
        analysisByTopic[topic] = {
          topic,
          totalQuestions: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          unattempted: 0,
          percentageCorrect: 0,
        };
      }
      
      analysisByTopic[topic].totalQuestions++;
      
      if (question.isCorrect) {
        analysisByTopic[topic].correctAnswers++;
      } else if (question.isAttempted) {
        analysisByTopic[topic].incorrectAnswers++;
      } else {
        analysisByTopic[topic].unattempted++;
      }
    }
    
    // Calculate percentages
    for (const analysis of Object.values(analysisByTopic)) {
      analysis.percentageCorrect = analysis.totalQuestions > 0 
        ? Math.round((analysis.correctAnswers / analysis.totalQuestions) * 100) 
        : 0;
    }
    
    return Object.values(analysisByTopic).sort((a, b) => b.percentageCorrect - a.percentageCorrect);
  }, [questionResults]);

  // Determine strengths and areas to focus on
  const { strengths, areasToFocus } = useMemo(() => {
    const strengths = topicAnalysis
      .filter(analysis => analysis.percentageCorrect >= 75)
      .map(analysis => analysis.topic);
      
    const areasToFocus = topicAnalysis
      .filter(analysis => analysis.percentageCorrect < 60)
      .map(analysis => analysis.topic);
      
    return { strengths, areasToFocus };
  }, [topicAnalysis]);

  // Load quiz data and user answers from localStorage
  useEffect(() => {
    if (!quizId) return;
    
    const loadResults = () => {
      setIsLoading(true);
      try {
        const quiz = getQuizById(quizId);
        if (!quiz) {
          setIsLoading(false);
          return;
        }
        
        // Get user answers from localStorage
        const userAnswersJson = localStorage.getItem(`quiz-${quizId}-answers`);
        const userAnswers = userAnswersJson ? JSON.parse(userAnswersJson) : {};
        
        // Build question results
        const results = quiz.questions.map((question: Question) => {
          const userAnswer = userAnswers[question.id];
          const isAttempted = userAnswer !== undefined;
          
          // Check if answer is correct
          let isCorrect = false;
          if (isAttempted) {
            if (Array.isArray(question.correctAnswer) && Array.isArray(userAnswer)) {
              // For array answers (like drag-and-drop)
              isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify([...question.correctAnswer].sort());
            } else {
              // For simple answers
              isCorrect = userAnswer === question.correctAnswer;
            }
          }
          
          return {
            id: question.id,
            text: question.text,
            type: question.type,
            topic: question.topic || 'Uncategorized',
            isCorrect,
            isAttempted,
            userAnswer,
            correctAnswer: question.correctAnswer,
          };
        });
        
        setQuestionResults(results);
      } catch (error) {
        console.error('Error loading quiz results:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadResults();
  }, [quizId]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-40">
          <div className="text-lg">Loading results...</div>
        </div>
      </div>
    );
  }

  if (questionResults.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
        <Card className="p-6">
          <div className="text-center py-8">
            <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
            <p className="text-muted-foreground">
              We couldn't find any results for this quiz. Try taking the quiz first!
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      
      <OverallScore {...overallStats} />
      
      <TopicAnalysisList topicAnalysis={topicAnalysis} />
      
      <StrengthsAndFocus 
        strengths={strengths} 
        areasToFocus={areasToFocus} 
      />
      
      <TopicFilter 
        topics={topics} 
        selectedTopic={selectedTopic} 
        onTopicSelect={setSelectedTopic} 
      />
      
      <QuestionList questions={filteredResults} />
      
      <div className="flex justify-center mt-8">
        <Button onClick={() => { window.location.href = `/dashboard/quizzes/${quizId}`; }}>
          Back to Quiz
        </Button>
      </div>
    </div>
  );
}
