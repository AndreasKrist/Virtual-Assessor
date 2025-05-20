import { generalQuestions, networkingQuestions, securityQuestions } from '../data/questionsData';

// Define types for better TypeScript support
interface Answers {
  [questionId: string]: string;
}

interface Score {
  categoryScores: {
    [category: string]: number;
  };
  categoryPercentages: {
    [category: string]: number;
  };
  overallScore: number;
  overallMaxScore: number;
  overallPercentage: number;
}

interface Question {
  id: string;
  points?: {
    [answer: string]: number;
  };
  category?: string;
}

export const calculateScores = (answers: Answers): Score => {
  const categories = ["general", "networking", "security"];
  const scores: {[category: string]: number} = {};
  const maxScores: {[category: string]: number} = {};
  
  // Initialize scores
  categories.forEach(category => {
    scores[category] = 0;
    maxScores[category] = 0;
  });
  
  // Calculate scores by category
  Object.keys(answers).forEach(questionId => {
    const answer = answers[questionId];
    const questionType = questionId.charAt(0);
    
    let category: string | undefined;
    if (questionType === 'g') category = 'general';
    else if (questionType === 'n') category = 'networking';
    else if (questionType === 's') category = 'security';
    else return; // Skip biodata questions
    
    // Find the question to get points
    let questions: Question[] = [];
    if (category === 'general') questions = generalQuestions;
    else if (category === 'networking') questions = networkingQuestions;
    else if (category === 'security') questions = securityQuestions;
    
    const question = questions.find(q => q.id === questionId);
    if (question && question.points && question.points[answer]) {
      scores[category] += question.points[answer];
      maxScores[category] += 10; // Assuming max is 10 per question
    }
  });
  
  // Calculate percentages
  const percentages: {[category: string]: number} = {};
  categories.forEach(category => {
    percentages[category] = maxScores[category] > 0 ? 
      Math.round((scores[category] / maxScores[category]) * 100) : 0;
  });
  
  // Calculate overall score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const totalMaxScore = Object.values(maxScores).reduce((sum, score) => sum + score, 0);
  const overallPercentage = totalMaxScore > 0 ? 
    Math.round((totalScore / totalMaxScore) * 100) : 0;
  
  return {
    categoryScores: scores,
    categoryPercentages: percentages,
    overallScore: totalScore,
    overallMaxScore: totalMaxScore,
    overallPercentage
  };
};