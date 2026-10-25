export interface Project {
  id: string;
  name: string;
  category: string;
  tagline?: string;
  description?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  language: string;
  updatedAt: string;
  features?: string[];
  homepage?: string;
}

// Shared source for Projects, GitHub, Finder, Search, Terminal and the portfolio assistant.
export const projectsData: Project[] = [
  {
    id: "book-reading-list-application",
    name: "Book Reading List Application",
    category: "Web Application",
    description: "A reading list app where you can add books, set their reading status, filter them, delete them, and see summary counts. Your list is saved in the browser, so it is still there when you come back.",
    technologies: ["HTML", "CSS", "JavaScript"],
    language: "JavaScript",
    githubUrl: "https://github.com/sharmasamriddhi05-blip/Book-Reading-List-Application",
    updatedAt: "2026-10-25T18:32:37Z",
    features: ["Add books with an optional author and reading status", "Filter books by reading status", "Delete books and view summary counts", "Persist the list with localStorage"]
  },
  {
    id: "bug-fixing-using-cursor-ai",
    name: "Bug Fixing Using Cursor AI",
    category: "Python Project",
    description: "A project correcting six bugs in a Python program with help from an AI assistant. Each error was identified by comparing program output with the expected answer, then fixed and re-tested.",
    technologies: ["Python", "GitHub"],
    language: "Python",
    githubUrl: "https://github.com/sharmasamriddhi05-blip/Bug-Fixing-Using-Cursor-AI",
    updatedAt: "2026-10-25T18:25:31Z",
    features: ["Six documented bug fixes", "Original and corrected program versions", "A small test runner"]
  },
  {
    id: "python-program-collection",
    name: "Python Program Collection",
    category: "Python Project",
    description: "A collection of beginner Python programs, each with comments explaining how it works.",
    technologies: ["Python", "Git", "GitHub"],
    language: "Python",
    githubUrl: "https://github.com/sharmasamriddhi05-blip/Python-program-collection",
    updatedAt: "2026-10-25T15:02:09Z",
    features: ["Factorial using loops and recursion", "Fibonacci series using loops and recursion", "Converting a structure to a dictionary in three ways"]
  },
  {
    id: "messy-python-code-improvement",
    name: "Messy Python Code Improvement",
    category: "Python Project",
    description: "A messy but working Python program was improved with the help of AI to make it readable, safer, and easier to change. It reads student marks and prints totals, percentages, grades, the class average, and the topper.",
    technologies: ["Python", "GitHub"],
    language: "Python",
    githubUrl: "https://github.com/sharmasamriddhi05-blip/Messy-Python-Code-Improvement",
    updatedAt: "2026-10-25T18:19:56Z",
    features: ["Meaningful names and focused functions", "Student dataclass and constants", "Input validation", "Formatted reports and import-safe execution"]
  }
];
