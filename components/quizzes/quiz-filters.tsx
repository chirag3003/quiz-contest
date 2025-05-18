"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuizFiltersProps {
  onSearchChange: (value: string) => void
  onTopicChange: (value: string | null) => void
}

export function QuizFilters({ onSearchChange, onTopicChange }: QuizFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const allTopics = [
    "JavaScript",
    "React",
    "Python",
    "Programming",
    "Web Development",
    "Frontend",
    "Data Structures"
  ].sort()

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-1">Search Quizzes</Label>
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              onSearchChange(e.target.value)
            }}
            placeholder="Search by title, description, or topic..."
            className="w-full"
          />
        </div>
        
        <div className="flex-1">
          <Label htmlFor="topics" className="mb-1">Filter by Topic</Label>
          <Select
            value={selectedTopic || "all"}
            onValueChange={(value) => {
              setSelectedTopic(value === "all" ? null : value)
              onTopicChange(value === "all" ? null : value)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {allTopics.map(topic => (
                <SelectItem key={topic} value={topic}>{topic}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTopics.map(topic => (
          <TopicTag
            key={topic}
            topic={topic}
            isSelected={selectedTopic === topic}
            onClick={() => onTopicChange(selectedTopic === topic ? null : topic)}
          />
        ))}
      </div>
    </div>
  )
}

interface TopicTagProps {
  topic: string
  isSelected: boolean
  onClick: () => void
}

function TopicTag({ topic, isSelected, onClick }: TopicTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition-colors ${
        isSelected 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {topic}
    </button>
  )
}
