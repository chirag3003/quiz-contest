"use client"

import type { Metadata } from "next";
import { useState } from "react";

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

// export const metadata: Metadata = {
//   title: "Quizzes | Quiz Contest",
//   description: "Browse our collection of interactive quizzes across various topics",
// };

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Get all unique topics from quizzes
  const allTopics = Array.from(new Set(demoQuizzes.flatMap(quiz => quiz.topicsCovered || []))).sort();

  // Filter quizzes based on search term and selected topic
  const filteredQuizzes = demoQuizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quiz.topicsCovered || []).some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTopic = !selectedTopic || quiz.topicsCovered?.includes(selectedTopic);
    
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Start Your Learning Journey</h1>
      
      {/* Filters section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium mb-1 dark:text-gray-300">Search Quizzes</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, description, or topic..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="topics" className="block text-sm font-medium mb-1 dark:text-gray-300">Filter by Topic</label>
            <select
              id="topics"
              value={selectedTopic || ""}
              onChange={(e) => setSelectedTopic(e.target.value || null)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Topics</option>
              {allTopics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Topics search */}
        <div className="flex flex-wrap gap-2">
          {allTopics.map(topic => (
            <button
              key={topic}
              type="button"
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTopic === topic ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">{quiz.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3 dark:text-gray-300">{quiz.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {quiz.topicsCovered?.map((topic) => (
                <span key={topic} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {topic}
                </span>
              ))}
            </div>
            <button type="button" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-800 dark:hover:bg-blue-900">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
