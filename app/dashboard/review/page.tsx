import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review | Quiz Contest",
  description: "Review your completed quizzes and learn from explanations",
};

export default function ReviewPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Review Quizzes</h1>
      {/* Review content will be implemented here */}
    </div>
  );
}
