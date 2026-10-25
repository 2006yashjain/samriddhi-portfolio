import { contactData } from "./contact";

export interface Repository {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars?: number;
  forks?: number;
  url: string;
  topics: string[];
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

// Repositories will be provided in the next prompt.
// No fake repositories or fabricated stats.
export const githubRepositories: Repository[] = [];
