import { retrieveContext } from './ragEngine';

// Intelligent Fallback & RAG AI Assistant Service (No external API key required!)
// This acts as a robust semantic matching & rule-based conversational model specifically trained on your portfolio data.

export async function askGeminiAssistant(userQuery, conversationHistory = []) {
  // Simulate network latency for natural feel
  await new Promise(resolve => setTimeout(resolve, 600));

  const query = userQuery.toLowerCase();
  const { contextText, sources } = retrieveContext(userQuery, 4);

  let responseText = '';

  // Intent classification & tailored intelligent responses
  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    responseText = "👋 Hello! I'm **Priyanshu AI**, your intelligent portfolio assistant. I can answer questions about Priyanshu's projects, AI/ML skills, backend experience, education, or how to contact him. What would you like to know?";
  } 
  else if (query.includes('project') || query.includes('pick up') || query.includes('hospital') || query.includes('crop') || query.includes('disease')) {
    responseText = `Here are the key projects built by Priyanshu:\n\n` +
      `1. **Pick Up**: Hyperlocal delivery web platform (Solo Project) featuring Firebase OTP authentication, 4 distinct user dashboards, and Google Maps integration.\n` +
      `2. **Hospital Management System**: Java backend console system with MySQL/JDBC integration, full CRUD operations, and real-time appointment booking.\n` +
      `3. **Crop Leaf Disease Detection**: Deep learning CNN model achieving 97% classification accuracy on 5,000+ images.\n\n` +
      `Would you like deeper technical details on any of these?`;
  }
  else if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('java') || query.includes('python') || query.includes('tensorflow') || query.includes('spring')) {
    responseText = `Priyanshu's core technical stack includes:\n\n` +
      `- **Languages**: Java, Python, SQL\n` +
      `- **Backend**: Spring Boot, REST APIs, JDBC, MySQL\n` +
      `- **AI & ML**: TensorFlow, Scikit-learn, Pandas, NumPy, CNNs, Generative AI & RAG\n` +
      `- **Frontend**: JavaScript, React, HTML, CSS\n` +
      `- **Tools**: Git, GitHub, Firebase, Vercel, VS Code\n\n` +
      `He has also solved 120+ DSA problems on LeetCode!`;
  }
  else if (query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('cgpa') || query.includes('university') || query.includes('narula')) {
    responseText = `🎓 **Education Details:**\n` +
      `- **Degree**: B.Tech in Computer Science (Artificial Intelligence & Machine Learning)\n` +
      `- **Institution**: Narula Institute of Technology, Kolkata\n` +
      `- **Period**: 2022 – 2026\n` +
      `- **CGPA**: 8.01 / 10`;
  }
  else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('hire') || query.includes('job') || query.includes('reach')) {
    responseText = `📬 **Get in Touch with Priyanshu:**\n` +
      `- **Email**: priyanshuchakraborty60@gmail.com\n` +
      `- **Phone**: +91-8509554213\n` +
      `- **LinkedIn**: [linkedin.com/in/priyanshu-chakraborty-159b0a271](https://linkedin.com/in/priyanshu-chakraborty-159b0a271)\n` +
      `- **GitHub**: [github.com/priyanshu60-pc](https://github.com/priyanshu60-pc)\n\n` +
      `He is actively open for full-time AI/ML Engineer, Full-Stack, and Java Backend roles!`;
  }
  else if (query.includes('resume') || query.includes('cv')) {
    responseText = `📄 You can download Priyanshu's official resume directly using the download button in the Hero section or [click here](https://drive.google.com/uc?export=download&id=1AoYUQmljk0vkeN1BVk6MjsTWt-kg7ibF).`;
  }
  else {
    // General RAG synthesis based on retrieved context
    responseText = `Based on Priyanshu Chakraborty's portfolio knowledge base:\n\n${contextText.substring(0, 600)}...\n\nIs there anything specific you would like to know about his projects, skills, or career goals?`;
  }

  return {
    text: responseText,
    sources,
  };
}

export function getGeminiApiKey() {
  return 'LOCAL_RAG_ACTIVE';
}

export function saveGeminiApiKey() {}
