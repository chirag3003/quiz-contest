import { Brain, BarChart3, Target, BookOpen, Clock, Award } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      title: 'Smart Quizzes',
      description: 'Test your knowledge with our intelligent quiz system that adapts to your learning style.'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-green-600" />,
      title: 'Detailed Analytics',
      description: 'Track your progress with comprehensive performance reports and insights.'
    },
    {
      icon: <Target className="h-6 w-6 text-purple-600" />,
      title: 'Focused Learning',
      description: 'Identify and improve your weak areas with targeted practice questions.'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-yellow-600" />,
      title: 'Wide Range of Topics',
      description: 'Access quizzes across various subjects from high school to college level.'
    },
    {
      icon: <Clock className="h-6 w-6 text-red-600" />,
      title: 'Time-based Challenges',
      description: 'Improve your speed and accuracy with timed quizzes.'
    },
    {
      icon: <Award className="h-6 w-6 text-indigo-600" />,
      title: 'Achievements & Badges',
      description: 'Earn rewards as you progress and master different topics.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Master Your Subjects with Smart Quizzes
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            The ultimate platform for high school and college students to test their knowledge, track progress, and excel in their studies.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              href="/dashboard/quizzes"
              className="rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Quizzing
            </Link>
            <Link 
              href="#features"
              className="rounded-md bg-white px-8 py-3 text-base font-medium text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our platform is designed to help you learn more effectively and efficiently.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to improve your knowledge?</span>
            <span className="block text-blue-100 mt-2">Start quizzing today.</span>
          </h2>
          <div className="mt-10">
            <Link
              href="/dashboard/quizzes"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Quiz Contest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
