"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

// Define types
interface CategoryPercentages {
  [key: string]: number;
}

interface Scores {
  categoryPercentages: CategoryPercentages;
  overallPercentage: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
}

interface QuizResults {
  scores: Scores;
  recommendations: Course[];
}

export default function Results(): JSX.Element {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Load results from localStorage
    const storedResults = localStorage.getItem('quizResults');
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect to quiz if no results found
      router.push('/quiz');
    }
    
    setLoading(false);
  }, [router]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading your results...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!results) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-600">No Results Found</h1>
            <p className="text-lg text-gray-600 mb-6">Please complete the assessment to see your results.</p>
            <Link 
              href="/quiz" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Take the Assessment
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { scores, recommendations } = results;
  
  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };
  
  const getCategoryEmoji = (category: string): string => {
    switch(category) {
      case 'general': return '💻';
      case 'networking': return '🌐';
      case 'security': return '🔒';
      default: return '📚';
    }
  };
  
  const getLevelBadge = (level: string): JSX.Element | null => {
    switch(level) {
      case 'Beginner':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Beginner</span>;
      case 'Intermediate':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Intermediate</span>;
      case 'Advanced':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Advanced</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
            <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Your Assessment Results</h1>
            
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(scores.overallPercentage)}`}>
                    {scores.overallPercentage}%
                  </span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={scores.overallPercentage >= 80 ? "#059669" : scores.overallPercentage >= 50 ? "#d97706" : "#dc2626"}
                    strokeWidth="8"
                    strokeDasharray={`${scores.overallPercentage * 2.83} 283`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(scores.categoryPercentages).map(([category, percentage]) => (
                <div key={category} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 capitalize flex items-center">
                    <span className="mr-2">{getCategoryEmoji(category)}</span>
                    {category}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        percentage >= 80 ? "bg-green-600" : 
                        percentage >= 50 ? "bg-yellow-500" : 
                        "bg-red-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className={`text-right font-bold ${getScoreColor(percentage)}`}>
                    {percentage}%
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-bold mb-3 text-blue-600">What Your Results Mean</h2>
              <p className="text-gray-700">
                {scores.overallPercentage >= 80 
                  ? "You have a strong foundation in IT knowledge! While there's always more to learn, you're well-equipped with the basics."
                  : scores.overallPercentage >= 50
                  ? "You have a moderate understanding of IT concepts. With some targeted learning, you can quickly fill the gaps in your knowledge."
                  : "You're at the beginning of your IT learning journey. The good news is that there are plenty of resources available to help you build a solid foundation."}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Recommended Courses for You</h2>
            
            {recommendations && recommendations.length > 0 ? (
              <div className="grid gap-6">
                {recommendations.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{course.title}</h3>
                      {getLevelBadge(course.level)}
                    </div>
                    <p className="text-gray-600 mb-3">{course.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {getCategoryEmoji(course.category)} {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        ⏱️ {course.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No specific courses recommended at this time.</p>
            )}
            
            <div className="mt-8 text-center">
              <Link 
                href="/quiz" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mx-2"
              >
                Retake Assessment
              </Link>
              <Link 
                href="/" 
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg mx-2"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}