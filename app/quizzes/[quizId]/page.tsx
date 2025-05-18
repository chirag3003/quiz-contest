import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { quizId: string };
}) {
  return {
    title: "Quiz Details | Quiz Contest",
    description: "View quiz details and learning objectives",
  };
}

export default function QuizDetailsPage({
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
      <h1 className="text-3xl font-bold mb-6">Quiz Details</h1>
      {/* Quiz details content will be implemented here */}
    </div>
  );
}
