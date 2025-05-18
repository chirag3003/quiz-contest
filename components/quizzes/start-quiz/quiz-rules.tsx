import { CheckCircle } from "lucide-react"

interface QuizRulesProps {
  timeLimit: number
  questionCount: number
}

export function QuizRules({ timeLimit, questionCount }: QuizRulesProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Quiz Rules</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          <span>You will have {timeLimit} minutes to complete the quiz.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          <span>There are {questionCount} questions in total.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          <span>You need to score at least 70% to pass the quiz.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          <span>You can&apos;t go back to previous questions once answered.</span>
        </li>
      </ul>
    </div>
  )
}
