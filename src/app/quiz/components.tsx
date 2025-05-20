"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuizProgress from '../../components/QuizProgress';
import { bioDataQuestions, generalQuestions, networkingQuestions, securityQuestions } from '../../data/questionsData';
import { calculateScores } from '../../utils/scoring';
import { getRecommendations } from '../../utils/recommendations';

// Define types
interface Question {
  id: string;
  text: string;
  type: string;
  options?: string[];
  required?: boolean;
  points?: {
    [key: string]: number;
  };
  category?: string;
}

interface Answers {
  [key: string]: string;
}

export function QuizForm(): JSX.Element {
  const router = useRouter();
  const [section, setSection] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState<string>('');
  
  const totalSections = 4; // Bio, General, Networking, Security
  
  const getCurrentSectionQuestions = (): Question[] => {
    switch(section) {
      case 1: return bioDataQuestions;
      case 2: return generalQuestions;
      case 3: return networkingQuestions;
      case 4: return securityQuestions;
      default: return [];
    }
  };
  
  const getSectionTitle = (): string => {
    switch(section) {
      case 1: return "Personal Information";
      case 2: return "General IT Knowledge";
      case 3: return "Networking Knowledge";
      case 4: return "Cybersecurity Knowledge";
      default: return "";
    }
  };
  
  const handleChange = (questionId: string, value: string): void => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const validateSection = (): boolean => {
    const questions = getCurrentSectionQuestions();
    let isValid = true;
    let errorMsg = '';
    
    questions.forEach(question => {
      if (question.required && !answers[question.id]) {
        isValid = false;
        errorMsg = 'Please answer all required questions before continuing.';
      }
    });
    
    setError(errorMsg);
    return isValid;
  };
  
  const handleNext = (): void => {
    if (validateSection()) {
      if (section < totalSections) {
        setSection(section + 1);
        window.scrollTo(0, 0);
      } else {
        // Submit the quiz
        const scores = calculateScores(answers);
        const recommendations = getRecommendations(scores);
        
        // Store results in localStorage
        localStorage.setItem('quizResults', JSON.stringify({
          answers,
          scores,
          recommendations
        }));
        
        // Navigate to results page
        router.push('/results');
      }
    }
  };
  
  const handleBack = (): void => {
    if (section > 1) {
      setSection(section - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const renderQuestion = (question: Question): JSX.Element | null => {
    switch(question.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            type={question.type}
            id={question.id}
            value={answers[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={question.required}
          />
        );
      
      case 'select':
        return (
          <select
            id={question.id}
            value={answers[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={question.required}
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="flex flex-col space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleChange(question.id, option)}
                  className="h-5 w-5 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const questions = getCurrentSectionQuestions();
  
  return (
    <div className="max-w-2xl mx-auto">
      <QuizProgress currentSection={section} totalSections={totalSections} />
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          {getSectionTitle()}
        </h2>
        
        <form onSubmit={(e) => e.preventDefault()}>
          {questions.map((question) => (
            <div key={question.id} className="mb-6">
              <label className="block mb-2 font-medium">
                {question.text} {question.required && <span className="text-red-500">*</span>}
              </label>
              {renderQuestion(question)}
            </div>
          ))}
          
          {error && (
            <div className="p-3 mb-6 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={section === 1}
              className={`px-6 py-2 rounded-lg ${
                section === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Back
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {section < totalSections ? 'Continue' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}