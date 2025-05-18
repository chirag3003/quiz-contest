import { z } from 'zod';

// Define a schema for the different types of questions
const QuestionTypeSchema = z.enum(['multiple-choice', 'true-false', 'fill-in-the-blank', 'image-based', 'drag-and-drop']);

// Define a schema for the structure of a single question
const QuestionSchema = z.object({
  id: z.string(), // Unique identifier for the question
  text: z.string().min(1, "Question text cannot be empty"), // The question itself
  type: QuestionTypeSchema, // The type of question
  topic: z.string().optional(), // Topic classification for the question
  options: z.array(z.string()).optional(), // Options for multiple-choice questions
  correctAnswer: z.union([z.string(), z.array(z.string())]), // The correct answer(s)
  feedback: z.object({
    correct: z.string().optional(), // Feedback for a correct answer
    incorrect: z.string().optional(), // Feedback for an incorrect answer
  }).optional(),
  imageUrl: z.string().url().optional(), // Optional image URL for image-based questions
  code: z.string().optional(), // Optional code snippet for programming questions
  // Add other fields as needed for different question types (e.g., blanks for fill-in-the-blank)
});

// Define the schema for the overall Quiz
const QuizSchema = z.object({
  id: z.string().uuid(), // Unique identifier for the quiz
  title: z.string().min(1, "Quiz title cannot be empty"), // The title of the quiz
  description: z.string().optional(), // Optional description of the quiz
  topicsCovered: z.array(z.string()).optional(), // Clear learning objectives
  questions: z.array(QuestionSchema).min(1, "A quiz must have at least one question"), // Array of questions in the quiz
  timeLimit: z.number().int().positive().optional(), // Time limit in minutes
  passingScore: z.number().int().min(0).max(100).default(70), // Passing score percentage
  // Add other quiz-level configurations here
});

// Export the schema
export type Quiz = z.infer<typeof QuizSchema>;
export type Question = z.infer<typeof QuestionSchema>;

export { QuizSchema, QuestionSchema };
