"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Quiz } from "@/lib/validators/quiz"

interface QuizListProps {
  quizzes: Quiz[]
}

export function QuizList({ quizzes }: QuizListProps) {
  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  )
}

interface QuizCardProps {
  quiz: Quiz
}

function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{quiz.description}</p>
        {quiz.topicsCovered && quiz.topicsCovered.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {quiz.topicsCovered.map((topic) => (
              <Badge key={topic} variant="outline">
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
