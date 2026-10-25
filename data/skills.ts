export interface SkillItem {
  name: string;
  category: "Programming Languages" | "Web Development" | "Tools & Technologies" | "Soft Skills";
}

export interface SkillGroup {
  category: "Programming Languages" | "Web Development" | "Tools & Technologies" | "Soft Skills";
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming Languages",
    description: "Core algorithmic and systems programming languages",
    skills: ["C", "C++", "Python"]
  },
  {
    category: "Web Development",
    description: "Foundational web standards and frontend scripting",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    category: "Tools & Technologies",
    description: "Developer tooling, version control, editor, and database management",
    skills: ["Git", "GitHub", "VS Code", "MySQL"]
  },
  {
    category: "Soft Skills",
    description: "Collaborative, communicative, and problem-solving abilities",
    skills: ["Communication", "Teamwork", "Problem-Solving"]
  }
];

// Flat list for global search and terminal
export const allSkillsList: string[] = [
  "C",
  "C++",
  "Python",
  "HTML",
  "CSS",
  "JavaScript",
  "Git",
  "GitHub",
  "VS Code",
  "MySQL",
  "Communication",
  "Teamwork",
  "Problem-Solving"
];
