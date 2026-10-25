import { contactData } from "./contact";

export interface AchievementItem {
  title: string;
  detail: string;
  category: "National Exam" | "Academic" | "Defense Services";
}

export interface ProfileData {
  name: string;
  role: string;
  subRole: string;
  location: string;
  email: string;
  phone: string;
  status: string;
  avatarPlaceholder: string;
  bio: string[];
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;
  focusAreas: string[];
  achievements: AchievementItem[];
  interests: string[];
  socials: Array<{
    platform: string;
    username: string;
    url: string;
  }>;
}

export const profileData: ProfileData = {
  name: "Samriddhi Sharma",
  role: "Computer Science Engineering Student",
  subRole: "Developer • Problem Solver • Learner",
  location: "Jaipur, Rajasthan, India",
  email: contactData.email,
  phone: contactData.phone,
  status: "Second Year BTech • JECRC University",
  avatarPlaceholder: "SS",
  bio: [
    "Hello, I'm Samriddhi, a second-year BTech student in Computer Science and Engineering at JECRC University, Jaipur.",
    "I'm passionate about building creative solutions, learning new technologies, and growing as a software engineer.",
    "I enjoy coding, exploring new ideas, reading, and spending time in nature."
  ],
  education: [
    {
      degree: "BTech in Computer Science and Engineering",
      institution: "JECRC University, Jaipur",
      period: "Second Year (Ongoing)",
      description: "Undergraduate degree focusing on computer science fundamentals, algorithm design, and software engineering."
    }
  ],
  focusAreas: [
    "C++",
    "Data Structures and Algorithms",
    "Web Development",
    "Software Engineering"
  ],
  achievements: [
    {
      title: "JEE Mains",
      detail: "92 percentile in JEE Mains.",
      category: "National Exam"
    },
    {
      title: "Class 10 Board",
      detail: "95% in Class 10.",
      category: "Academic"
    },
    {
      title: "Class 12 Board",
      detail: "95% in Class 12.",
      category: "Academic"
    },
    {
      title: "CDS Recommendation",
      detail: "Recommended twice in CDS.",
      category: "Defense Services"
    }
  ],
  interests: [
    "Coding",
    "Exploring new ideas",
    "Reading",
    "Spending time in nature"
  ],
  socials: [
    {
      platform: "LinkedIn",
      username: "samriddhi-sharma-243102381",
      url: contactData.linkedin
    },
    {
      platform: "GitHub",
      username: "sharmasamriddhi05-blip",
      url: contactData.github
    },
    {
      platform: "Email",
      username: contactData.email,
      url: contactData.emailLink
    },
    {
      platform: "Mobile",
      username: contactData.phone,
      url: contactData.phoneLink
    }
  ]
};
