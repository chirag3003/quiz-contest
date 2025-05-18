import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { quizId: string };
}) {
  return {
    title: 'Play Quiz | Quiz Contest',
    description: "Take the quiz and test your knowledge",
  };
}

export default function PlayQuizPage({
  params,
}: {
  params: { quizId: string };
}) {
  const { quizId } = params;

  // TODO: Fetch quiz details and questions from database
  if (!quizId) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Play Quiz</h1>
      {/* Quiz questions will be implemented here */}
    </div>
  );
}
