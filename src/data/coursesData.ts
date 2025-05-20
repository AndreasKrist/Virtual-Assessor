export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  minScore: number;
  maxScore: number;
  level: string;
  duration: string;
}

export const courseRecommendations: Course[] = [
  {
    id: "c1",
    title: "Computer Basics for Beginners",
    description: "Learn the fundamentals of using computers, from powering on to basic operations.",
    category: "general",
    minScore: 0,
    maxScore: 30,
    level: "Beginner",
    duration: "2 weeks",
  },
  {
    id: "c2",
    title: "Internet and Web Browsing Essentials",
    description: "Master web browsers, search engines, and effective internet use for daily tasks.",
    category: "general",
    minScore: 31,
    maxScore: 50,
    level: "Beginner",
    duration: "1 week",
  },
  {
    id: "c3",
    title: "Networking Fundamentals",
    description: "Understand how networks function, including wireless and wired connections.",
    category: "networking",
    minScore: 0,
    maxScore: 30,
    level: "Beginner",
    duration: "3 weeks",
  },
  {
    id: "c4",
    title: "Home Network Setup and Troubleshooting",
    description: "Learn to set up, manage, and troubleshoot your home network.",
    category: "networking",
    minScore: 31,
    maxScore: 50,
    level: "Intermediate",
    duration: "2 weeks",
  },
  {
    id: "c5",
    title: "Basic Cybersecurity Awareness",
    description: "Essential security practices to keep your data and devices safe.",
    category: "security",
    minScore: 0,
    maxScore: 30,
    level: "Beginner",
    duration: "2 weeks",
  },
  {
    id: "c6",
    title: "Personal Cybersecurity and Privacy Protection ",
    description: "Comprehensive strategies to protect your digital life from threats.",
    category: "security",
    minScore: 31,
    maxScore: 50,
    level: "Intermediate",
    duration: "3 weeks",
  },
]; 