import { courseRecommendations } from '../data/coursesData';

// Define types for better TypeScript support
interface Scores {
  categoryPercentages: {
    [key: string]: number;
  };
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  minScore: number;
  maxScore: number;
  level: string;
  duration: string;
}

export const getRecommendations = (scores: Scores): Course[] => {
  const recommendations: Course[] = [];
  
  // Get category-specific recommendations
  Object.entries(scores.categoryPercentages).forEach(([category, percentage]) => {
    const relevantCourses = courseRecommendations.filter(course => 
      course.category === category && 
      percentage >= course.minScore / 10 && 
      percentage <= course.maxScore / 10
    );
    
    recommendations.push(...relevantCourses);
  });
  
  // Sort by how relevant they are (courses for lower scores first if score is low)
  recommendations.sort((a, b) => {
    const categoryA = a.category;
    const categoryB = b.category;
    const percentageA = scores.categoryPercentages[categoryA];
    const percentageB = scores