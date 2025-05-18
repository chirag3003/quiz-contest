"use client"

import { useState } from "react";
import { QuizFilters } from "@/components/quizzes/quiz-filters"
import { QuizList } from "@/components/quizzes/quiz-list"

// Demo quiz data
const demoQuizzes = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control structures",
    topicsCovered: ["JavaScript", "Programming", "Web Development"],
    questions: []
  },
  {
    id: "2",
    title: "React Basics",
    description: "Quiz about React fundamentals including components, props, and state management",
    topicsCovered: ["React", "Frontend", "JavaScript"],
    questions: []
  },
  {
    id: "3",
    title: "Python Programming",
    description: "Assess your Python programming skills with this comprehensive quiz",
    topicsCovered: ["Python", "Programming", "Data Structures"],
    questions: []
  }
];

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Filter quizzes based on search term and selected topic
  const filteredQuizzes = demoQuizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quiz.topicsCovered || []).some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTopic = !selectedTopic || quiz.topicsCovered?.includes(selectedTopic);
    
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quizzes</h1>
      </div>

      <QuizFilters
        onSearchChange={setSearchTerm}
        onTopicChange={setSelectedTopic}
      />

      <QuizList quizzes={filteredQuizzes} />
    </div>
  );
}
