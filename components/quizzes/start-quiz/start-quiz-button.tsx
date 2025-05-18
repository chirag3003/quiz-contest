import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface StartQuizButtonProps {
  quizId: string
}

export function StartQuizButton({ quizId }: StartQuizButtonProps) {
  return (
    <div className="pt-4">
      <Button asChild size="lg" className="w-full md:w-auto">
        <Link href={`/dashboard/quizzes/${quizId}/play`}>
          Start Quiz
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
