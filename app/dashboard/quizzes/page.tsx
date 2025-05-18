"use client"

import { useState } from "react";
import { QuizFilters } from "@/components/quizzes/quiz-filters"
import { QuizList } from "@/components/quizzes/quiz-list"
import { demoQuizzes } from "@/lib/data/demo-quizzes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuizzesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Filter quizzes based on search term and selected topic
  const filteredQuizzes = demoQuizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quiz.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quiz.topicsCovered || []).some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTopic = !selectedTopic || quiz.topicsCovered?.includes(selectedTopic);
    
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => {router.push("/dashboard/quizzes/create")}}
         >
          <Plus className="h-4 w-4" />
          Create Custom Quiz
        </Button>
      </div>

      <QuizFilters
        onSearchChange={setSearchTerm}
        onTopicChange={setSelectedTopic}
      />

      <QuizList quizzes={filteredQuizzes} />
    </div>
  );
}
