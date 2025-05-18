import type { Quiz } from "@/lib/validators/quiz";

// Demo quiz data used across the application
export const demoQuizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control structures",
    topicsCovered: ["JavaScript", "Programming", "Web Development"],
    questions: [
      {
        id: "q1-1",
        text: "What is the data type of the following variable?",
        type: 'multiple-choice' as const,
        topic: "Data Types",
        options: ['Number', 'String', 'Boolean', 'Array'],
        correctAnswer: 'Number',
      },
      {
        id: "q1-2",
        text: "What is the purpose of the const keyword?",
        type: 'true-false' as const,
        topic: "Variables",
        correctAnswer: 'true',
      },
      {
        id: "q1-4",
        text: "What is the purpose of the if/else statement?",
        type: 'true-false' as const,
        topic: "Control Flow",
        correctAnswer: 'true',
      },
      {
        id: "q1-6",
        text: "What is the output of the following code?",
        type: 'image-based' as const,
        topic: "Code Analysis",
        imageUrl: "https://placehold.co/300x200.png?text=Code+Example",
        correctAnswer: "Answer 1",
      },
      {
        id: "q1-7",
        text: "What is the purpose of the for loop?",
        type: 'drag-and-drop' as const,
        topic: "Loops",
        correctAnswer: [
          "The for loop is used to iterate over an array or object.",
          "The for loop is used to iterate over a string.",
          "The for loop is used to iterate over a number.",
        ],
        options: [
          "The for loop is used to iterate over an array or object.",
          "The for loop is used to iterate over a string.",
          "The for loop is used to iterate over a number.",
        ]
      },
    ],
    timeLimit: 20,
    passingScore: 70
  },
  {
    id: "2",
    title: "React Basics",
    description: "Quiz about React fundamentals including components, props, and state management",
    topicsCovered: ["React", "Frontend", "JavaScript"],
    questions: Array(8).fill(0).map((_, i) => {
      const topicIndex = i % 4; // Cycle through 4 different topics
      const topics = ["Components", "Hooks", "State Management", "Props"];
      return {
        id: `q2-${i}`,
        text: `React Question ${i + 1}`,
        type: 'multiple-choice' as const,
        topic: topics[topicIndex],
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
      };
    }),
    timeLimit: 15,
    passingScore: 70
  },
  {
    id: "3",
    title: "Python Programming",
    description: "Assess your Python programming skills with this comprehensive quiz",
    topicsCovered: ["Python", "Programming", "Data Structures"],
    questions: Array(12).fill(0).map((_, i) => {
      const topicIndex = i % 4; // Cycle through 4 different topics
      const topics = ["Data Structures", "Functions", "Classes", "File Handling"];
      return {
        id: `q3-${i}`,
        text: `Python Question ${i + 1}`,
        type: 'multiple-choice' as const,
        topic: topics[topicIndex],
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
        correctAnswer: 'Choice 1',
      };
    }),
    timeLimit: 25,
    passingScore: 70
  }
];

// Helper function to get a quiz by ID
export function getQuizById(quizId: string): Quiz | undefined {
  return demoQuizzes.find(quiz => quiz.id === quizId);
}
