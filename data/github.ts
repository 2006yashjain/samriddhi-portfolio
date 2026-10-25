import { contactData } from "./contact";
import { projectsData } from "./projects";

export interface Repository {
  id: string;
  name: string;
  description?: string;
  language: string;
  url: string;
  updatedAt: string;
  topics: string[];
  technologies: string[];
  features?: string[];
  homepage?: string;
}

export interface GitHubProfile {
  username: string;
  name: string;
  bio: string;
  location: string;
  githubUrl: string;
}

export const githubProfile: GitHubProfile = {
  username: "sharmasamriddhi05-blip",
  name: "Samriddhi Sharma",
  bio: "Second-year BTech student in Computer Science and Engineering at JECRC University, Jaipur.",
  location: "Jaipur, Rajasthan",
  githubUrl: contactData.github
};

export const githubRepositories: Repository[] = projectsData.map((project) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  language: project.language,
  url: project.githubUrl,
  updatedAt: project.updatedAt,
  topics: [],
  technologies: project.technologies,
  features: project.features,
  homepage: project.homepage
}));
