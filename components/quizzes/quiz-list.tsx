"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Hash } from "lucide-react"
import Link from "next/link"
import type { Quiz } from "@/lib/validators/quiz"

interface QuizListProps {
  quizzes: Quiz[]
}

export function QuizList({ quizzes }: QuizListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  const questionCount = quiz.questions?.length || 0
  const estimatedTime = Math.ceil(questionCount * 0.5) // Assuming 30 seconds per question

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">{quiz.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
            <Hash className="h-3.5 w-3.5 mr-1" />
            {questionCount} Qs
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1.5" />
          {estimatedTime} min
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {quiz.description || 'Test your knowledge with this quiz'}
        </p>
        
        {quiz.topicsCovered && quiz.topicsCovered.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {quiz.topicsCovered.slice(0, 3).map((topic) => (
              <Badge 
                key={topic} 
                variant="outline"
                className="text-xs font-medium px-2 py-1"
              >
                {topic}
              </Badge>
            ))}
            {quiz.topicsCovered.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                +{quiz.topicsCovered.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full" size="sm">
          <Link href={`/dashboard/quizzes/${quiz.id}/start`}>
            Take Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
