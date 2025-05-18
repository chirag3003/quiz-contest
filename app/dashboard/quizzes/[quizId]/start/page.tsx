import { notFound } from 'next/navigation';
import { Clock, Hash, Award } from 'lucide-react';
import { 
  QuizDetailCard, 
  QuizTopics, 
  QuizRules, 
  StartQuizButton 
} from '@/components/quizzes/start-quiz';
import { getQuizById } from '@/lib/data/demo-quizzes';

// Get quiz details from demo data
const getQuizDetails = async (quizId: string) => {
  const quiz = getQuizById(quizId);
  if (!quiz) {
    throw new Error('Quiz not found');
  }
  return quiz;
};

export const metadata = {
  title: 'Start Quiz',
  description: 'Prepare to start the quiz with rules and timer',
};

export default async function StartQuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  if (!quizId) {
    notFound();
  }

  const quiz = await getQuizDetails(quizId);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 p-6 border-b">
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <p className="text-muted-foreground mt-2">{quiz.description}</p>
        </div>

        {/* Quiz Details */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuizDetailCard 
              icon={<Hash className="h-5 w-5" />}
              label="Questions"
              value={quiz.questions.length}
            />
            
            <QuizDetailCard 
              icon={<Clock className="h-5 w-5" />}
              label="Time Limit"
              value={`${quiz.timeLimit} minutes`}
            />
            
            <QuizDetailCard 
              icon={<Award className="h-5 w-5" />}
              label="Passing Score"
              value="70%"
            />
          </div>

          {/* Topics */}
          <QuizTopics topics={quiz.topicsCovered || []} />

          {/* Rules */}
          <QuizRules 
            timeLimit={quiz.timeLimit || 0}
            questionCount={quiz.questions.length}
          />

          {/* Start Button */}
          <StartQuizButton quizId={quizId} />
        </div>
      </div>
    </div>
  );
}
