export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  status: string;
  githubUrl: string;
  liveUrl?: string;
  features?: string[];
}

// Ready for next prompt when GitHub repository links will be provided.
// Currently empty state as strictly instructed.
export const projectsData: Project[] = [];
