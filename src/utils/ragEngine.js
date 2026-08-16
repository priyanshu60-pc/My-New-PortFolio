import { personal, about, skills, projects, certifications } from '../data/content';

// Knowledge base chunk generation from portfolio data
export const KNOWLEDGE_BASE = [
  {
    id: 'personal-bio',
    category: 'Personal Information',
    title: 'Profile & Contact Info',
    content: `Name: ${personal.name} (${personal.initials})
Title: ${personal.title}
Tagline: ${personal.tagline}
Email: ${personal.email}
Phone: ${personal.phone}
Location: ${personal.location}
Resume Download URL: ${personal.resumeUrl}
LinkedIn: ${personal.links.linkedin}
GitHub: ${personal.links.github}
LeetCode: ${personal.links.leetcode}
Open for hire: Yes, actively seeking full-time AI/ML Engineer, Full-Stack Developer, and Java Backend Developer opportunities.`,
  },
  {
    id: 'about-education',
    category: 'Education & Background',
    title: 'Education & Bio',
    content: `Bio: ${about.bio}
Degree: ${about.education.degree} in ${about.education.specialization}
Institution: ${about.education.institution}, ${about.education.location}
Period: ${about.education.period}
CGPA: ${about.education.cgpa}
Interests: ${about.interests.join(', ')}`,
  },
  {
    id: 'skills-overview',
    category: 'Skills',
    title: 'Technical Skills Overview',
    content: skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n'),
  },
  ...skills.map(s => ({
    id: `skill-${s.category.toLowerCase().replace(/\s+/g, '-')}`,
    category: 'Skills Detail',
    title: `${s.category} Skills`,
    content: `Category: ${s.category}\nTechnologies & Tools: ${s.items.join(', ')}`,
  })),
  ...projects.map(p => ({
    id: `project-${p.id}`,
    category: 'Project',
    title: `Project: ${p.title} (${p.subtitle})`,
    content: `Project Name: ${p.title}
Subtitle: ${p.subtitle}
Period: ${p.period}
Role: ${p.role} (${p.type})
Description: ${p.description}
Key Highlights:
- ${p.highlights.join('\n- ')}
Tech Stack: ${p.stack.join(', ')}
${p.aiTools && p.aiTools.length > 0 ? `AI Tools Used: ${p.aiTools.join(', ')}` : ''}
${p.repoUrl ? `GitHub Repo: ${p.repoUrl}` : ''}
${p.liveUrl ? `Live URL: ${p.liveUrl}` : ''}`,
  })),
  ...certifications.map(c => ({
    id: `cert-${c.id}`,
    category: 'Certification & Achievement',
    title: `${c.title} (${c.issuer})`,
    content: `Title: ${c.title}\nIssuer: ${c.issuer}\nType: ${c.type}\nLink: ${c.url}`,
  })),
  {
    id: 'faq-career-goals',
    category: 'Career & Work',
    title: 'Career Goals & Availability',
    content: `Priyanshu Chakraborty is a B.Tech Computer Science graduate specializing in AI & ML (2022-2026) with an 8.01 CGPA from Narula Institute of Technology, Kolkata.
He specializes in Generative AI, RAG (Retrieval-Augmented Generation), Prompt Engineering, Deep Learning (CNNs), Java Backend (Spring Boot, JDBC, MySQL), and React/JavaScript full-stack development.
He has solved 120+ Data Structures & Algorithms problems on LeetCode.
He is available for full-time roles, remote or hybrid, and willing to relocate for great opportunities.`,
  }
];

// Tokenizer helper
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1);
}

// Compute TF-IDF / BM25 style keyword matching with cosine-like weighting
export function retrieveContext(query, topK = 3) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return {
      contextText: KNOWLEDGE_BASE.slice(0, 3).map(k => `[${k.title}]\n${k.content}`).join('\n\n'),
      sources: KNOWLEDGE_BASE.slice(0, 3).map(k => k.title),
    };
  }

  const scores = KNOWLEDGE_BASE.map(doc => {
    const docText = `${doc.title} ${doc.category} ${doc.content}`;
    const docTokens = tokenize(docText);
    const docTokenFreq = {};
    
    docTokens.forEach(token => {
      docTokenFreq[token] = (docTokenFreq[token] || 0) + 1;
    });

    let score = 0;
    queryTokens.forEach(qToken => {
      if (docTokenFreq[qToken]) {
        // Frequency boost
        score += docTokenFreq[qToken] * 2;
      }
      // Exact title match boost
      if (doc.title.toLowerCase().includes(qToken)) {
        score += 5;
      }
      // Category match boost
      if (doc.category.toLowerCase().includes(qToken)) {
        score += 3;
      }
    });

    return { doc, score };
  });

  // Sort descending by relevance score
  scores.sort((a, b) => b.score - a.score);

  // Take topK matches or fallback to top general docs if no matches
  let topMatches = scores.filter(s => s.score > 0).slice(0, topK).map(s => s.doc);
  if (topMatches.length === 0) {
    topMatches = KNOWLEDGE_BASE.slice(0, topK);
  }

  const contextText = topMatches
    .map(doc => `=== SECTION: ${doc.title} (${doc.category}) ===\n${doc.content}`)
    .join('\n\n');

  const sources = topMatches.map(doc => doc.title);

  return {
    contextText,
    sources,
  };
}
