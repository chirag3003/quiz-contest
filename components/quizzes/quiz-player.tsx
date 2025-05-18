"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Quiz, Question } from "@/lib/validators/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import MultipleChoiceQuestion from "./question-types/multiple-choice";
import TrueFalseQuestion from "./question-types/true-false";
import FillInTheBlankQuestion from "./question-types/fill-in-the-blank";
import ImageBasedQuestion from "./question-types/image-based";
import DragAndDropQuestion from "./question-types/drag-and-drop";

// Define a type for the user's answers
type UserAnswers = {
  [questionId: string]: string | string[];
};

// Define props for the QuizPlayer component
type QuizPlayerProps = {
  quiz: Quiz;
};

export default function QuizPlayer({ quiz }: QuizPlayerProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : 30 * 60); // Default to 30 minutes if not set
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    unanswered: quiz.questions.length,
  });

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Time's up - could navigate to results page
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleAnswerSelected = (questionId: string, answer: string | string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    // Update stats in the background for tracking
    // Note: This is just tracking changes and not shown to the user
    const question = quiz.questions.find(q => q.id === questionId);
    if (question) {
      const isCorrect = Array.isArray(answer) 
        ? JSON.stringify(answer.sort()) === JSON.stringify(([] as string[]).concat(question.correctAnswer).sort())
        : answer === question.correctAnswer;

      // Only count the first answer for a question
      if (!(questionId in userAnswers)) {
        setStats(prev => ({
          ...prev,
          correct: isCorrect ? prev.correct + 1 : prev.correct,
          incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
          unanswered: prev.unanswered - 1,
        }));
      } else if (userAnswers[questionId] !== answer) {
        // If changing an answer
        const wasCorrect = Array.isArray(userAnswers[questionId])
          ? JSON.stringify((userAnswers[questionId] as string[]).sort()) === JSON.stringify(([] as string[]).concat(question.correctAnswer).sort())
          : userAnswers[questionId] === question.correctAnswer;

        if (wasCorrect && !isCorrect) {
          setStats(prev => ({
            ...prev,
            correct: prev.correct - 1,
            incorrect: prev.incorrect + 1,
          }));
        } else if (!wasCorrect && isCorrect) {
          setStats(prev => ({
            ...prev,
            correct: prev.correct + 1,
            incorrect: prev.incorrect - 1,
          }));
        }
      }
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    // Store answers and score in localStorage or state management
    localStorage.setItem(`quiz-${quiz.id}-answers`, JSON.stringify(userAnswers));
    localStorage.setItem(`quiz-${quiz.id}-stats`, JSON.stringify(stats));
    
    // Navigate to results page (which you'd implement later)
    router.push(`/dashboard/quizzes/${quiz.id}/result`);
  };

  const renderQuestion = (question: Question) => {
    const commonProps = {
      question,
      selectedAnswer: userAnswers[question.id],
      onAnswerSelected: (answer: string | string[]) => handleAnswerSelected(question.id, answer),
    };

    switch (question.type) {
      case "multiple-choice":
        return <MultipleChoiceQuestion {...commonProps} />;
      case "true-false":
        return <TrueFalseQuestion {...commonProps} />;
      case "fill-in-the-blank":
        return <FillInTheBlankQuestion {...commonProps} />;
      case "image-based":
        return <ImageBasedQuestion {...commonProps} />;
      case "drag-and-drop":
        return <DragAndDropQuestion {...commonProps} />;
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Timer and Progress */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-lg font-medium">
            <Clock className="h-5 w-5" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-6 mb-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{currentQuestion.text}</h2>
          {renderQuestion(currentQuestion)}
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button onClick={submitQuiz}>Submit Quiz</Button>
          ) : (
            <Button onClick={goToNextQuestion}>Next</Button>
          )}
        </div>
      </div>
    </div>
  );
}
