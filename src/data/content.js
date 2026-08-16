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
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1AoYUQmljk0vkeN1BVk6MjsTWt-kg7ibF',
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
    category: 'Programming Languages',
    icon: '{ }',
    color: 'cyan',
    items: ['Java', 'Python', 'SQL'],
  },
  {
    category: 'Backend',
    icon: '⬡',
    color: 'violet',
    items: ['Spring Boot', 'REST APIs', 'JDBC'],
  },
  {
    category: 'Frontend',
    icon: '◈',
    color: 'cyan',
    items: ['HTML', 'CSS', 'JavaScript', 'React (Basics)'],
  },
  {
    category: 'AI & ML',
    icon: '⚡',
    color: 'violet',
    items: ['TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'CNN', 'OpenAI API','Machine Learning','LLMs','RaG',],
  },
  {
    category: 'Developer Tools',
    icon: '◎',
    color: 'cyan',
    items: ['Git', 'GitHub', 'Firebase', 'Vercel', 'VS Code', 'Jupyter Notebook'],
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
      'Complete hyperlocal delivery web platform engineered from scratch as a solo developer. Architected distinct, secure, and responsive user dashboards tailored for customers, shop merchants, delivery drivers, and administrators. Successfully implemented robust access controls by integrating Firebase OTP-based authentication and role-based permissions, which isolated user data profiles and significantly enhanced the overall system security architecture.',
    highlights: [
      'Firebase OTP-based auth + role-based permissions for strict security',
      'Architected 4 distinct responsive dashboards for different user types',
      'Real-time order tracking and management via Firebase Realtime DB',
      'Integrated Google Maps API for optimized routing and location tracking',
    ],
    stack: ['JavaScript', 'HTML', 'CSS', 'Firebase Auth', 'Firebase Realtime DB', 'Google Maps API', 'Vercel', 'Git'],
    aiTools: ['GitHub Copilot', 'Google AI Studio', 'Antigravity', 'Anthropic'],
    repoUrl: null,
    liveUrl: null,
  },
  {
    id: 2,
    title: 'Hospital Management System',
    subtitle: 'Java Backend System',
    period: 'Academic Project',
    role: 'Java Backend Developer',
    type: 'Solo Project',
    accentColor: 'violet',
    description:
      'Engineered a comprehensive Java console-based Hospital Management System seamlessly integrated with MySQL to effectively manage patients, doctors, and appointments. The system supports full CRUD operations. I specifically implemented a robust appointment booking mechanism that features real-time doctor availability checks, ensuring that no scheduling conflicts can occur by leveraging complex JDBC-driven database queries.',
    highlights: [
      'Built full CRUD operations for patients, doctors, and appointments',
      'Implemented robust appointment booking with real-time availability checks',
      'Prevented scheduling conflicts using complex JDBC-driven queries',
      'Seamlessly integrated core Java application with MySQL database',
    ],
    stack: ['Java (Core)', 'MySQL', 'JDBC (MySQL Connector/J)', 'VS Code'],
    aiTools: [],
    repoUrl: 'https://github.com/priyanshu60-pc/HOSPITAL-MANAGMENT-SYSTEM-',
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
      'Co-developed a sophisticated computer vision system utilizing Convolutional Neural Networks (CNN) to automatically and accurately detect crop leaf diseases from digital images, thereby facilitating early agricultural interventions. The model achieved an impressive 97% classification accuracy on a rigorous validation dataset of over 5,000 images. I successfully executed end-to-end data preprocessing pipelines, which included implementing strict train-test splits and data augmentation techniques to effectively prevent model overfitting.',
    highlights: [
      'Achieved 97% classification accuracy on a validation dataset of 5,000+ images',
      'Co-developed a deep learning CNN architecture to automate disease detection',
      'Executed end-to-end data preprocessing pipelines and train-test splits',
      'Implemented data augmentation techniques to prevent model overfitting',
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
    url: 'https://drive.google.com/file/d/1HVRzsBPnh3idCd_EKpVKRt5bBag4AuM_/view',
  },
  {
    id: 2,
    title: 'Object-Oriented Programming in Java',
    issuer: 'Coursera',
    badge: 'C',
    type: 'University Course Completion',
    color: 'violet',
    url: 'https://drive.google.com/file/d/16eEoX_VumfWsgF7zLNoJS9g3tctaVhgT/view',
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
