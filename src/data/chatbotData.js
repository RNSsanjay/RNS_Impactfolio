export const chatbotData = {
    greetings: ["hello", "hi", "hey"],
    skills: ["python", "machine learning", "tensorflow", "react"],
    education: ["university", "degree", "college", "school"],
    experience: ["internship", "work", "job"],
    projects: ["project", "portfolio", "github"],
    contact: ["email", "phone", "reach", "contact"],
    certificates: ["certificate", "certification", "credentials"],

    responses: {
        greetings: "Hello! I'm Sanjay's virtual assistant. How can I help you today?",
        skills: "Sanjay is skilled in Machine Learning, Deep Learning, Python, and Web Development.",
        education: "Sanjay holds a B.Tech in Computer Science with specialization in AI & ML from Example University.",
        experience: "Sanjay has interned at Tech Corp and AI Solutions Ltd, working on AI projects.",
        projects: "Sanjay has worked on various projects including AI Emotion Recognition and Smart Traffic Management.",
        contact: "You can reach Sanjay at sanjay@example.com or +91 9876543210.",
        certificates: "Sanjay holds certifications in Deep Learning from Coursera, AWS Machine Learning, and is a certified TensorFlow Developer.",
        default: "I'm not sure about that. Could you please ask about Sanjay's skills, education, experience, projects, or contact?"
    },

    projectResponses: {
        "emotion recognition": "The AI Emotion Recognition project is a deep learning system that can detect 7 different emotions in real-time with 95% accuracy. It uses TensorFlow and OpenCV for processing.",
        "traffic management": "The Smart Traffic Management system uses computer vision to optimize traffic flow. It reduced average wait times by 25% and has been successfully tested at 5 major intersections."
    }
};

export default chatbotData;