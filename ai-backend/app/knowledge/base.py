"""
Knowledge base for Priyanshu Chakraborty's portfolio AI.

All facts sourced from src/data/content.js — no invented information.
To update: edit the knowledge dicts below, matching any changes in content.js.
"""
from functools import lru_cache


# ── Personal ───────────────────────────────────────────────────────────────────
PERSONAL = {
    "name": "Priyanshu Chakraborty",
    "title": "AI/ML Engineer & Full-Stack Developer",
    "tagline": "B.Tech CS (AI & ML) graduate | Building scalable ML systems and full-stack applications",
    "email": "priyanshuchakraborty60@gmail.com",
    "phone": "+91-8509554213",
    "location": "Kolkata, India",
    "links": {
        "linkedin": "https://linkedin.com/in/priyanshu-chakraborty-159b0a271",
        "github": "https://github.com/priyanshu60-pc",
        "leetcode": "https://leetcode.com/u/priyanshu20040402",
    },
    "resume": "https://drive.google.com/uc?export=download&id=1AoYUQmljk0vkeN1BVk6MjsTWt-kg7ibF",
}

# ── About ──────────────────────────────────────────────────────────────────────
ABOUT = {
    "bio": (
        "Hands-on experience in software development, machine learning, and Generative AI frameworks. "
        "Solved 120+ DSA problems on LeetCode. Built applications spanning deep learning, computer vision, "
        "and full-stack web development. Passionate about crafting scalable systems that blend intelligent "
        "ML capabilities with clean, production-ready code."
    ),
    "interests": [
        "Prompt Engineering",
        "Generative AI Systems",
        "Data Structures & Algorithms",
        "Object-Oriented Design",
    ],
}

# ── Education ──────────────────────────────────────────────────────────────────
EDUCATION = {
    "degree": "B.Tech in Computer Science",
    "specialization": "Artificial Intelligence & Machine Learning",
    "institution": "Narula Institute of Technology",
    "location": "Kolkata, India",
    "period": "2022 – 2026",
    "cgpa": "8.01 / 10",
}

# ── Skills ─────────────────────────────────────────────────────────────────────
SKILLS = [
    {
        "category": "Languages",
        "items": ["Java (Core)", "Python", "SQL"],
    },
    {
        "category": "Generative AI & LLM Tools",
        "items": ["Hugging Face", "GitHub Copilot", "ChatGPT", "Claude", "Google AI Studio"],
    },
    {
        "category": "Databases",
        "items": ["MySQL", "JDBC Connectivity"],
    },
    {
        "category": "Tools & Platforms",
        "items": ["Git", "GitHub", "VS Code", "Google Colab", "Jupyter Notebook"],
    },
    {
        "category": "Core Competencies",
        "items": [
            "Problem Solving",
            "Analytical Thinking",
            "Object-Oriented Design",
            "System Architecture",
        ],
    },
    {
        "category": "Web & Frontend (Portfolio project)",
        "items": ["React", "Vite", "HTML", "CSS", "JavaScript", "Firebase", "Google Maps API"],
    },
]

# ── Projects ───────────────────────────────────────────────────────────────────
PROJECTS = [
    {
        "title": "Pick Up",
        "subtitle": "Hyperlocal Delivery Platform",
        "period": "June 2026 – Present",
        "role": "Lead Full-Stack Developer",
        "type": "Solo Project",
        "description": (
            "Complete hyperlocal delivery web platform built solo. Secure responsive dashboards for "
            "customers, shop merchants, delivery drivers, and admins. Firebase OTP-based authentication "
            "with role-based permissions for strict data isolation and security."
        ),
        "highlights": [
            "Firebase OTP-based auth + role-based permissions",
            "Responsive dashboards for 4 distinct user roles",
            "Real-time order tracking via Firebase Realtime DB",
            "Google Maps API integration for routing",
        ],
        "stack": [
            "JavaScript", "HTML", "CSS", "Firebase Auth",
            "Firebase Realtime DB", "Google Maps API", "Vercel", "Git",
        ],
        "ai_tools": ["GitHub Copilot", "Google AI Studio", "ChatGPT", "Claude"],
        "repo": None,
        "live": None,
        "status": "In development",
    },
    {
        "title": "Parcl Buyer Intelligence",
        "subtitle": "AI Buyer Segmentation",
        "period": "March 2026",
        "role": "ML Engineer",
        "type": "Solo Project",
        "description": (
            "AI-powered buyer segmentation system using K-Means clustering to classify buyer personas "
            "across real estate market data. Features an interactive Streamlit dashboard with real-time "
            "filtering, geospatial visualization, and behavior analytics."
        ),
        "highlights": [
            "K-Means clustering (K=4) with Elbow Method + Silhouette Score",
            "4 distinct buyer personas identified and profiled",
            "Interactive Streamlit dashboard with real-time filtering",
            "Geospatial visualization and behavior analytics",
        ],
        "stack": ["Python", "Scikit-learn", "Pandas", "Streamlit", "Plotly", "Google Colab", "Git"],
        "ai_tools": [],
        "repo": "https://github.com/priyanshu60-pc/parcl-buyer-intelligence",
        "live": None,
    },
    {
        "title": "Crop Leaf Disease Detection",
        "subtitle": "CNN Computer Vision System",
        "period": "Academic Project",
        "role": "ML Engineer",
        "type": "Team Project",
        "description": (
            "CNN-based computer vision system for automated crop leaf disease detection. "
            "Achieved 97% validation accuracy on 5,000+ training images using a full "
            "preprocessing pipeline with data augmentation."
        ),
        "highlights": [
            "97% validation accuracy on 5,000+ images",
            "CNN architecture with TensorFlow/Keras",
            "Full preprocessing pipeline with data augmentation",
            "Train-test split and model evaluation metrics",
        ],
        "stack": ["Python", "TensorFlow", "CNN", "NumPy", "Pandas", "Google Colab"],
        "ai_tools": [],
        "repo": "https://github.com/priyanshu60-pc/Plant-Disease-Detection-CNN",
        "live": None,
    },
]

# ── Certifications ─────────────────────────────────────────────────────────────
CERTIFICATIONS = [
    {
        "title": "SQL (Intermediate)",
        "issuer": "HackerRank",
        "type": "Certified Specialist",
    },
    {
        "title": "Object-Oriented Programming in Java",
        "issuer": "Coursera",
        "type": "University Course Completion",
    },
    {
        "title": "120+ DSA Problems Solved",
        "issuer": "LeetCode",
        "type": "Achievement",
    },
]

# ── Experience ─────────────────────────────────────────────────────────────────
EXPERIENCE = {
    "note": (
        "Priyanshu is a fresh graduate (Class of 2026) actively seeking his first professional "
        "role in AI/ML engineering or full-stack development. He has strong project experience "
        "and academic achievements but has not held formal employment yet."
    )
}


# ── Context builder ────────────────────────────────────────────────────────────
@lru_cache(maxsize=1)
def build_knowledge_context() -> str:
    """
    Assemble all knowledge into a structured text block for the system prompt.
    Cached after first build — restart server if content changes.
    """
    lines = []

    # Personal
    p = PERSONAL
    lines += [
        "## ABOUT PRIYANSHU",
        f"Name: {p['name']}",
        f"Title: {p['title']}",
        f"Location: {p['location']}",
        f"Email: {p['email']}",
        f"Phone: {p['phone']}",
        f"LinkedIn: {p['links']['linkedin']}",
        f"GitHub: {p['links']['github']}",
        f"LeetCode: {p['links']['leetcode']}",
        f"Resume Download: {p['resume']}",
        "",
        "## BIO",
        ABOUT["bio"],
        "",
        f"Interests: {', '.join(ABOUT['interests'])}",
        "",
    ]

    # Education
    e = EDUCATION
    lines += [
        "## EDUCATION",
        f"Degree: {e['degree']} — Specialization: {e['specialization']}",
        f"Institution: {e['institution']}, {e['location']}",
        f"Period: {e['period']} | CGPA: {e['cgpa']}",
        "",
    ]

    # Skills
    lines.append("## SKILLS")
    for s in SKILLS:
        lines.append(f"- {s['category']}: {', '.join(s['items'])}")
    lines.append("")

    # Projects
    lines.append("## PROJECTS")
    for proj in PROJECTS:
        lines += [
            f"### {proj['title']} ({proj['subtitle']})",
            f"Period: {proj['period']} | Role: {proj['role']} | Type: {proj['type']}",
            f"Description: {proj['description']}",
            f"Tech Stack: {', '.join(proj['stack'])}",
        ]
        if proj.get("ai_tools"):
            lines.append(f"AI Tools Used: {', '.join(proj['ai_tools'])}")
        lines.append(f"Highlights:")
        for h in proj["highlights"]:
            lines.append(f"  - {h}")
        if proj.get("repo"):
            lines.append(f"GitHub: {proj['repo']}")
        if proj.get("live"):
            lines.append(f"Live: {proj['live']}")
        lines.append("")

    # Certifications
    lines.append("## CERTIFICATIONS")
    for cert in CERTIFICATIONS:
        lines.append(f"- {cert['title']} ({cert['type']}) — {cert['issuer']}")
    lines.append("")

    # Experience
    lines += [
        "## WORK EXPERIENCE",
        EXPERIENCE["note"],
        "",
    ]

    return "\n".join(lines)
