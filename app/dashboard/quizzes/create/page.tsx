"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { demoQuestions } from "@/lib/data/demo-questions"

export default function CreateQuizPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [timeLimit, setTimeLimit] = useState("")
  const [numQuestions, setNumQuestions] = useState("")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const topics = Array.from(new Set(demoQuestions.map(q => q.topic)))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!title || !description || !timeLimit || !numQuestions || selectedTopics.length === 0) {
      setError("Please fill in all required fields")
      return
    }

    const quiz = {
      id: Date.now().toString(),
      title,
      description,
      timeLimit: Number.parseInt(timeLimit),
      numQuestions: Number.parseInt(numQuestions),
      topics: selectedTopics,
      questions: demoQuestions
        .filter(q => selectedTopics.includes(q.topic as string))
        .sort(() => Math.random() - 0.5)
        .slice(0, Number.parseInt(numQuestions))
    }

    // Store quiz in localStorage (temporary solution)
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
    localStorage.setItem('quizzes', JSON.stringify([...quizzes, quiz]))

    // Redirect back to quizzes page
    router.push("/dashboard/quizzes")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Quiz</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter quiz title"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter quiz description"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Time Limit (minutes)</Label>
          <Input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Number of Questions</Label>
          <Input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">Topics</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center space-x-2">
                <Checkbox
                  id={topic}
                  checked={selectedTopics.includes(topic as string)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTopics([...selectedTopics, topic as string])
                    } else {
                      setSelectedTopics(selectedTopics.filter(t => t !== topic))
                    }
                  }}
                />
                <Label htmlFor={topic} className="text-sm">
                  {topic}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full py-3">
          Create Quiz
        </Button>
      </form>
    </div>
  )
}
