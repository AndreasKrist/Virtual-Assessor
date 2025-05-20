export const getRecommendations = (scores) => {
  const recommendations = [];
  
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
    const percentageB = scores.categoryPercentages[categoryB];
    
    // Lower percentage categories get priority
    if (percentageA !== percentageB) {
      return percentageA - percentageB;
    }
    
    // Then sort by course level
    const levelOrder = { "Beginner": 0, "Intermediate": 1, "Advanced": 2 };
    return levelOrder[a.level] - levelOrder[b.level];
  });
  
  // Remove duplicates
  const uniqueRecommendations = [];
  const ids = new Set();
  
  recommendations.forEach(recommendation => {
    if (!ids.has(recommendation.id)) {
      uniqueRecommendations.push(recommendation);
      ids.add(recommendation.id);
    }
  });
  
  return uniqueRecommendations;
};