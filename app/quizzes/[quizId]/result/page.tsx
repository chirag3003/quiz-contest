import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { quizId: string };
}) {
  return {
    title: "Quiz Results | Quiz Contest",
    description: "View your quiz results and feedback",
  };
}

export default function QuizResultPage({
  params,
}: {
  params: { quizId: string };
}) {
  const { quizId } = params;

  // TODO: Fetch quiz results from database
  if (!quizId) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      {/* Results content will be implemented here */}
    </div>
  );
}
