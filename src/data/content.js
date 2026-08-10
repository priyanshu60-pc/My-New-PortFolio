// ─────────────────────────────────────────────────────────
// CONTENT.JS — Single source of truth for all CV data
// ─────────────────────────────────────────────────────────

export const personal = {
  name: 'Priyanshu Chakraborty',
  initials: 'PC',
  title: 'AI/ML Engineer & Full-Stack Developer',
  tagline: 'B.Tech CS (AI & ML) graduate | Building scalable ML systems and full-stack applications',
  email: 'priyanshuchakraborty60@gmail.com',
  phone: '+91-8509554213',
  location: 'Kolkata, India',
  resumeUrl: '/resume.pdf',
  links: {
    linkedin: 'https://linkedin.com/in/priyanshu-chakraborty-159b0a271',
    github: 'https://github.com/priyanshu60-pc',
    leetcode: 'https://leetcode.com/u/priyanshu20040402',
  },
};

export const about = {
  bio: `Hands-on experience in software development, machine learning, and Generative AI frameworks. 
  Solved 120+ DSA problems on LeetCode. Built applications spanning deep learning, computer vision, 
  and full-stack web development. Passionate about crafting scalable systems that blend intelligent 
  ML capabilities with clean, production-ready code.`,
  interests: [
    'Prompt Engineering',
    'Generative AI Systems',
    'Data Structures & Algorithms',
    'Object-Oriented Design',
  ],
  education: {
    degree: 'B.Tech in Computer Science',
    specialization: 'Artificial Intelligence & Machine Learning',
    institution: 'Narula Institute of Technology',
    location: 'Kolkata',
    period: '2022 – 2026',
    cgpa: '8.01 / 10',
  },
};

export const skills = [
  {
    category: 'Languages',
    icon: '{ }',
    color: 'cyan',
    items: ['Java (Core)', 'Python', 'SQL'],
  },
  {
    category: 'Generative AI & LLM Tools',
    icon: '⚡',
    color: 'violet',
    items: ['Hugging Face', 'GitHub Copilot', 'ChatGPT', 'Claude', 'Google AI Studio'],
  },
  {
    category: 'Databases',
    icon: '⬡',
    color: 'cyan',
    items: ['MySQL', 'JDBC Connectivity'],
  },
  {
    category: 'Tools & Platforms',
    icon: '◈',
    color: 'violet',
    items: ['Git', 'GitHub', 'VS Code', 'Google Colab', 'Jupyter Notebook'],
  },
  {
    category: 'Core Competencies',
    icon: '◎',
    color: 'cyan',
    items: ['Problem Solving', 'Analytical Thinking', 'Object-Oriented Design', 'System Architecture'],
  },
];

export const projects = [
  {
    id: 1,
    title: 'Pick Up',
    subtitle: 'Hyperlocal Delivery Platform',
    period: 'June 2026 – Present',
    role: 'Lead Full-Stack Developer',
    type: 'Solo Project',
    accentColor: 'cyan',
    description:
      'Complete hyperlocal delivery web platform built solo. Secure responsive dashboards for customers, shop merchants, delivery drivers, and admins. Firebase OTP-based authentication with role-based permissions for strict data isolation and security.',
    highlights: [
      'Firebase OTP-based auth + role-based permissions',
      'Responsive dashboards for 4 distinct user roles',
      'Real-time order tracking via Firebase Realtime DB',
      'Google Maps API integration for routing',
    ],
    stack: ['JavaScript', 'HTML', 'CSS', 'Firebase Auth', 'Firebase Realtime DB', 'Google Maps API', 'Vercel', 'Git'],
    aiTools: ['GitHub Copilot', 'Google AI Studio', 'ChatGPT', 'Claude'],
    repoUrl: null,
    liveUrl: null,
  },
  {
    id: 2,
    title: 'Parcl Buyer Intelligence',
    subtitle: 'AI Buyer Segmentation',
    period: 'March 2026',
    role: 'ML Engineer',
    type: 'Solo Project',
    accentColor: 'violet',
    description:
      'AI-powered buyer segmentation system using K-Means clustering to classify buyer personas across real estate market data. Features an interactive Streamlit dashboard with real-time filtering, geospatial visualization, and behavior analytics.',
    highlights: [
      'K-Means clustering (K=4) with Elbow Method + Silhouette Score',
      '4 distinct buyer personas identified and profiled',
      'Interactive Streamlit dashboard with real-time filtering',
      'Geospatial visualization and behavior analytics',
    ],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Plotly', 'Google Colab', 'Git'],
    aiTools: [],
    repoUrl: 'https://github.com/priyanshu60-pc/parcl-buyer-intelligence',
    liveUrl: null,
  },
  {
    id: 3,
    title: 'Crop Leaf Disease Detection',
    subtitle: 'CNN Computer Vision System',
    period: 'Academic Project',
    role: 'ML Engineer',
    type: 'Team Project',
    accentColor: 'cyan',
    description:
      'CNN-based computer vision system for automated crop leaf disease detection. Achieved 97% validation accuracy on 5,000+ training images using a full preprocessing pipeline with data augmentation.',
    highlights: [
      '97% validation accuracy on 5,000+ images',
      'CNN architecture with TensorFlow/Keras',
      'Full preprocessing pipeline with data augmentation',
      'Train-test split and model evaluation metrics',
    ],
    stack: ['Python', 'TensorFlow', 'CNN', 'NumPy', 'Pandas', 'Google Colab'],
    aiTools: [],
    repoUrl: 'https://github.com/priyanshu60-pc/Plant-Disease-Detection-CNN',
    liveUrl: null,
  },
];

export const certifications = [
  {
    id: 1,
    title: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    badge: 'HR',
    type: 'Certified Specialist',
    color: 'cyan',
    url: 'https://www.hackerrank.com/',
  },
  {
    id: 2,
    title: 'Object-Oriented Programming in Java',
    issuer: 'Coursera',
    badge: 'C',
    type: 'University Course Completion',
    color: 'violet',
    url: 'https://www.coursera.org/',
  },
  {
    id: 3,
    title: '120+ DSA Problems Solved',
    issuer: 'LeetCode',
    badge: 'LC',
    type: 'Achievement',
    color: 'cyan',
    url: 'https://leetcode.com/u/priyanshu20040402',
  },
];
