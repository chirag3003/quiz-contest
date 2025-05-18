import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { quizId: string };
}) {
  return {
    title: "Start Quiz | Quiz Contest",
    description: "Prepare to start the quiz with rules and timer",
  };
}

export default function StartQuizPage({
  params,
}: {
  params: { quizId: string };
}) {
  const { quizId } = params;

  // TODO: Fetch quiz details from database
  if (!quizId) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Start Quiz</h1>
      {/* Start quiz content will be implemented here */}
    </div>
  );
}
