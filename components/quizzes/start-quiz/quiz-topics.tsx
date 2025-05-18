interface QuizTopicsProps {
  topics: string[]
}

export function QuizTopics({ topics }: QuizTopicsProps) {
  if (!topics?.length) return null

  return (
    <div>
      <h3 className="font-medium mb-2">Topics Covered</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span 
            key={topic}
            className="px-3 py-1 bg-muted text-sm rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  )
}
