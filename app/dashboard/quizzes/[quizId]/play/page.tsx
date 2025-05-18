import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuizById } from "@/lib/data/demo-quizzes";
import QuizPlayer from "@/components/quizzes/quiz-player";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = getQuizById(quizId);
  
  if (!quiz) {
    return {
      title: 'Quiz Not Found',
      description: "The requested quiz could not be found",
    };
  }
  
  return {
    title: `${quiz.title} | Quiz Contest`,
    description: "Take the quiz and test your knowledge",
  };
}

export default async function PlayQuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  if (!quizId) {
    notFound();
  }

  const quiz = getQuizById(quizId);
  
  if (!quiz) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      <QuizPlayer quiz={quiz} />
    </div>
  );
}
