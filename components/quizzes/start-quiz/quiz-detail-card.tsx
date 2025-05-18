import { Clock, Hash, Award } from "lucide-react"

interface QuizDetailCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
}

export function QuizDetailCard({ icon, label, value }: QuizDetailCardProps) {
  return (
    <div className="flex items-center p-4 bg-muted/50 rounded-lg">
      <div className="p-2 bg-primary/10 text-primary rounded-full mr-3">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
