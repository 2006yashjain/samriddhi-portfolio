import { profileData } from "./profile";
import { contactData } from "./contact";
import { projectsData } from "./projects";
import { skillGroups } from "./skills";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  action?: {
    type: "open_app";
    appId: string;
    label: string;
  };
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatarText: string;
  isOnline: boolean;
  statusText: string;
}

// Portfolio-only assistant identity
export const defaultChatContact: ChatContact = {
  id: "assistant",
  name: "Samriddhi AI",
  role: "Portfolio Assistant",
  avatarText: "SAI",
  isOnline: true,
  statusText: "Ready to assist"
};

export const quickQuestions: string[] = [
  "Who is Samriddhi?",
  "Where does Samriddhi study?",
  "What does she know?",
  "What are Samriddhi's achievements?",
  "What is her GitHub?",
  "How can I contact Samriddhi?",
  "What is she currently focusing on?",
  "Show me her projects.",
  "Where is she located?"
];

export const initialMessages: ChatMessage[] = [
  {
    id: "m-init-1",
    sender: "bot",
    text: "Hello! I am Samriddhi's Portfolio Assistant. You can ask me about her background, university, skills, achievements, or contact details.",
    timestamp: "Just now"
  }
];

export function getChatBotResponse(query: string): {
  text: string;
  action?: { type: "open_app"; appId: string; label: string };
} {
  const q = query.toLowerCase().trim();

  // Who is Samriddhi / background / intro
  if (
    q.includes("who is") ||
    q.includes("about") ||
    q.includes("intro") ||
    q.includes("samriddhi") && (q.includes("tell") || q.includes("who") || q.length < 15)
  ) {
    return {
      text: `${profileData.bio.join(" ")} ${profileData.education[0]?.institution}.`,
      action: { type: "open_app", appId: "about", label: "Open About Me" }
    };
  }

  // Where does she study / college / university / education
  if (
    q.includes("study") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("jecrc") ||
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("year")
  ) {
    return {
      text: "Samriddhi is currently in her Second Year pursuing a BTech in Computer Science and Engineering at JECRC University, Jaipur.",
      action: { type: "open_app", appId: "about", label: "View Education" }
    };
  }

  // Skills / what does she know / technologies
  if (
    q.includes("know") ||
    q.includes("skill") ||
    q.includes("technolog") ||
    q.includes("language") ||
    q.includes("stack")
  ) {
    return {
      text: `Samriddhi's skills include ${skillGroups.map((group) => `${group.category}: ${group.skills.join(", ")}`).join("; ")}.`,
      action: { type: "open_app", appId: "skills", label: "Open Skills App" }
    };
  }

  // Currently learning / focus areas
  if (
    q.includes("learning") ||
    q.includes("learn") ||
    q.includes("focus") ||
    q.includes("current")
  ) {
    return {
      text: "Samriddhi's core focus areas are C++, Data Structures and Algorithms, Web Development, and Software Engineering.",
      action: { type: "open_app", appId: "about", label: "View Focus Areas" }
    };
  }

  // Achievements
  if (
    q.includes("achievement") ||
    q.includes("jee") ||
    q.includes("cds") ||
    q.includes("class 10") ||
    q.includes("class 12") ||
    q.includes("board") ||
    q.includes("rank") ||
    q.includes("percentile")
  ) {
    return {
      text: "Samriddhi's verified achievements include: 92 percentile in JEE Mains, 95% in Class 10, 95% in Class 12, and Recommended twice in CDS.",
      action: { type: "open_app", appId: "about", label: "View Achievements" }
    };
  }

  // Project listing
  if (q.includes("project") || q.includes("repository") || q.includes("repositories")) {
    return { text: `Samriddhi's projects include: ${projectsData.map((project) => `${project.name} (${project.language})`).join("; ")}.`, action: { type: "open_app", appId: "projects", label: "View Projects" } };
  }

  // GitHub / code / repos
  if (
    q.includes("github") ||
    q.includes("repo") ||
    q.includes("code") ||
    q.includes("git")
  ) {
    return {
      text: `You can check out Samriddhi's GitHub profile at: ${contactData.github}`,
      action: { type: "open_app", appId: "github", label: "Open GitHub App" }
    };
  }

  // LinkedIn
  if (q.includes("linkedin")) {
    return {
      text: `You can connect with Samriddhi on LinkedIn at: ${contactData.linkedin}`,
      action: { type: "open_app", appId: "contact", label: "Open Contact Info" }
    };
  }

  // Contact / email / phone / phone number / mobile
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("reach") ||
    q.includes("hire") ||
    q.includes("call")
  ) {
    return {
      text: `You can reach Samriddhi via email at ${contactData.email} or by phone at ${contactData.phone}. She is based in Jaipur, Rajasthan.`,
      action: { type: "open_app", appId: "contact", label: "Open Contact App" }
    };
  }

  if (q.includes("location") || q.includes("where is she") || q.includes("where does she live")) return { text: `Samriddhi is based in ${contactData.location}.` };

  // Interests / hobbies
  if (
    q.includes("interest") ||
    q.includes("hobby") ||
    q.includes("hobbies") ||
    q.includes("nature") ||
    q.includes("reading")
  ) {
    return {
      text: `Samriddhi enjoys ${profileData.interests.join(", ")}.`,
      action: { type: "open_app", appId: "about", label: "View Interests" }
    };
  }

  // Strict fallback when information is unavailable per specification
  return {
    text: "I don't have that information in Samriddhi's portfolio yet."
  };
}
