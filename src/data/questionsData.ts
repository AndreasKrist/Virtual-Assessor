// Define interfaces for question types
export interface BioQuestion {
  id: string;
  text: string;
  type: string;
  options?: string[];
  required?: boolean;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: string;
  options: string[];
  points: {
    [key: string]: number;
  };
  category: string;
}

// Bio data questions
export const bioDataQuestions: BioQuestion[] = [
  {
    id: "fullName",
    text: "Full Name",
    type: "text",
    required: true,
  },
  {
    id: "email",
    text: "Email Address",
    type: "email",
    required: true,
  },
  {
    id: "phone",
    text: "Phone Number",
    type: "tel",
    required: false,
  },
  {
    id: "ageGroup",
    text: "Age Group",
    type: "select",
    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
    required: true,
  },
];

// General IT questions
export const generalQuestions: AssessmentQuestion[] = [
  {
    id: "g1",
    text: "Do you know how to power up/down and operate a desktop computer or laptop?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "general",
  },
  {
    id: "g2",
    text: "Can you use a web browser (e.g., Chrome, Edge, Firefox) to access websites or search for information online?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "general",
  },
  {
    id: "g3",
    text: "Do you know how to connect to Wi-Fi or a wired internet connection?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "general",
  },
  {
    id: "g4",
    text: "Can you use email to send, receive, and reply to messages (e.g., Outlook, Gmail)?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "general",
  },
  {
    id: "g5",
    text: "Are you comfortable creating and saving documents using Microsoft Word, Google Docs, or a similar word processor?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "general",
  },
];

// Networking questions
export const networkingQuestions: AssessmentQuestion[] = [
  {
    id: "n1",
    text: "Do you know what Internet is and what is used for?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "networking",
  },
  {
    id: "n2",
    text: "Do you know the difference between a wired (Ethernet) and wireless (Wi-Fi) connection?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "networking",
  },
  {
    id: "n3",
    text: "Have you ever connected a device to a Wi-Fi network using a password?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "networking",
  },
  {
    id: "n4",
    text: "Do you know how to check if a device is connected to the internet?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "networking",
  },
  {
    id: "n5",
    text: "Have you ever restarted a modem or router to fix a network issue?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "networking",
  },
];

// Security questions
export const securityQuestions: AssessmentQuestion[] = [
  {
    id: "s1",
    text: "Do you understand the importance of passwords?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "security",
  },
  {
    id: "s2",
    text: "Have you ever been concerned about someone accessing your accounts without permission?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "security",
  },
  {
    id: "s3",
    text: "Do you understand why using public Wi-Fi can be risky?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "security",
  },
  {
    id: "s4",
    text: "Do you know what cyber security means?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "security",
  },
  {
    id: "s5",
    text: "Have you ever heard of Phishing or Malware?",
    type: "radio",
    options: ["Yes", "Somewhat", "No"],
    points: { "Yes": 10, "Somewhat": 5, "No": 0 },
    category: "security",
  },
];