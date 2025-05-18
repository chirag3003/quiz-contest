import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics | Quiz Contest",
  description: "Browse quizzes by topic",
};

export default function TopicsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Topics</h1>
      {/* Topics content will be implemented here */}
    </div>
  );
}
