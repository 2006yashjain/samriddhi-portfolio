import { profileData } from "./profile";
import { contactData } from "./contact";
import { skillGroups } from "./skills";
import { projectsData } from "./projects";

export type FileType = "folder" | "pdf" | "code" | "markdown" | "image" | "app";

export interface FinderItem {
  id: string;
  name: string;
  type: FileType;
  size?: string;
  dateModified: string;
  parentId: string | null;
  targetAppId?: string;
  content?: string;
  iconName?: string;
}

export const finderFavorites = [
  { id: "root", name: "All Files", icon: "folder-tree" },
  { id: "about", name: "About Me", icon: "user" },
  { id: "skills", name: "Skills", icon: "cpu" },
  { id: "projects", name: "Projects", icon: "briefcase" },
  { id: "github", name: "GitHub", icon: "git-branch" },
  { id: "resume", name: "Resume", icon: "file-badge" },
  { id: "contact", name: "Contact", icon: "mail" }
];

export const initialFinderItems: FinderItem[] = [
  // Top-level folders
  {
    id: "folder-about",
    name: "About Me",
    type: "folder",
    dateModified: "Today, 10:00 AM",
    parentId: "root",
    iconName: "folder"
  },
  {
    id: "folder-skills",
    name: "Skills",
    type: "folder",
    dateModified: "Today, 10:00 AM",
    parentId: "root",
    iconName: "folder"
  },
  {
    id: "folder-projects",
    name: "Projects",
    type: "folder",
    dateModified: "Today, 10:00 AM",
    parentId: "root",
    iconName: "folder"
  },
  {
    id: "folder-resume",
    name: "Resume",
    type: "folder",
    dateModified: "Today, 10:00 AM",
    parentId: "root",
    iconName: "folder"
  },
  {
    id: "folder-contact",
    name: "Contact",
    type: "folder",
    dateModified: "Today, 10:00 AM",
    parentId: "root",
    iconName: "folder"
  },

  // Inside About folder
  {
    id: "doc-about",
    name: "About_Samriddhi.txt",
    type: "markdown",
    size: "1.2 KB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-about",
    content: `# Samriddhi Sharma\nSecond-Year BTech CSE Student\nJECRC University, Jaipur\n\nBio:\n${profileData.bio.join("\n\n")}\n\nFocus Areas:\n${profileData.focusAreas.map(f => "- " + f).join("\n")}`
  },
  {
    id: "doc-achievements",
    name: "Achievements.txt",
    type: "markdown",
    size: "0.8 KB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-about",
    content: `# Verified Achievements\n\n${profileData.achievements.map(a => `• ${a.title}: ${a.detail}`).join("\n")}`
  },

  // Inside Skills folder
  {
    id: "app-skills",
    name: "Skills Browser.app",
    type: "app",
    size: "4.5 MB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-skills",
    targetAppId: "skills"
  },
  {
    id: "doc-skills-summary",
    name: "Skills_Summary.txt",
    type: "code",
    size: "1.1 KB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-skills",
    content: skillGroups.map(g => `[${g.category}]\n${g.skills.join(", ")}`).join("\n\n")
  },

  // Inside Projects folder
  {
    id: "app-projects-browser",
    name: "Projects Browser.app",
    type: "app",
    size: "5.2 MB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-projects",
    targetAppId: "projects"
  },
  {
    id: "doc-projects-info",
    name: "Repositories_Note.txt",
    type: "markdown",
    size: "0.5 KB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-projects",
    content: projectsData.map((project) => `${project.name}\n${project.description ?? ""}\n${project.githubUrl}`).join("\n\n") + `\n\nGitHub: ${contactData.github}`
  },

  // Inside Resume folder
  {
    id: "app-resume-viewer",
    name: "Resume Viewer.app",
    type: "app",
    size: "3.8 MB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-resume",
    targetAppId: "resume"
  },
  {
    id: "doc-resume-notice",
    name: "Resume_Status.txt",
    type: "markdown",
    size: "0.6 KB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-resume",
    content: "Resume overview is available in the Resume application. No downloadable resume file is provided."
  },

  // Inside Contact folder
  {
    id: "app-contact-mail",
    name: "Contact.app",
    type: "app",
    size: "4.0 MB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-contact",
    targetAppId: "contact"
  },
  {
    id: "doc-contact-card",
    name: "Contact_Card.txt",
    type: "markdown",
    size: "0.9 KB",
    dateModified: "Today, 10:00 AM",
    parentId: "folder-contact",
    content: `Samriddhi Sharma\nLocation: ${contactData.location}\nPhone: ${contactData.phone}\nEmail: ${contactData.email}\nLinkedIn: ${contactData.linkedin}\nGitHub: ${contactData.github}`
  }
];
