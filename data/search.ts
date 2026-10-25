import { profileData } from "./profile";
import { contactData } from "./contact";
import { skillGroups } from "./skills";
import { projectsData } from "./projects";
import { AppId } from "@/lib/types";

export interface SearchResult {
  id: string;
  category: "Applications" | "Skills" | "Achievements" | "Education" | "Contact" | "Projects" | "Weather";
  title: string;
  subtitle: string;
  icon: string;
  appId: AppId;
  customData?: any;
}

export function getSearchIndex(): SearchResult[] {
  const index: SearchResult[] = [];

  // Applications
  const apps: Array<{ id: AppId; title: string; subtitle: string; icon: string }> = [
    { id: "about", title: "About Me", subtitle: "Samriddhi Sharma • JECRC University", icon: "user" },
    { id: "skills", title: "Skills", subtitle: "C, C++, Python, HTML, CSS, JavaScript, Tools", icon: "cpu" },
    { id: "projects", title: "Projects", subtitle: "GitHub Repositories & Software Work", icon: "briefcase" },
    { id: "github", title: "GitHub", subtitle: "Profile @sharmasamriddhi05-blip", icon: "git-branch" },
    { id: "resume", title: "Resume", subtitle: "Academic & Technical Overview", icon: "file-text" },
    { id: "terminal", title: "Terminal", subtitle: "Interactive Zsh Terminal", icon: "terminal" },
    { id: "chat", title: "AI Assistant", subtitle: "Ask questions about Samriddhi", icon: "message-square" },
    { id: "weather", title: "Weather", subtitle: "Current conditions and forecast for Jaipur", icon: "cloud-sun" },
    { id: "contact", title: "Contact", subtitle: "Email, Phone, LinkedIn, GitHub", icon: "mail" },
    { id: "finder", title: "Finder", subtitle: "File & Directory Browser", icon: "folder" },
    { id: "settings", title: "Settings", subtitle: "Wallpapers & Appearance", icon: "settings" }
  ];

  apps.forEach((app) => {
    index.push({
      id: `app-${app.id}`,
      category: "Applications",
      title: app.title,
      subtitle: app.subtitle,
      icon: app.icon,
      appId: app.id
    });
  });

  // Skills
  skillGroups.forEach((group) => {
    group.skills.forEach((skill) => {
      index.push({
        id: `skill-${skill}`,
        category: "Skills",
        title: skill,
        subtitle: `${group.category} • Samriddhi's Skill`,
        icon: "cpu",
        appId: "skills",
        customData: { category: group.category }
      });
    });
  });

  projectsData.forEach((project) => {
    index.push({ id: `project-${project.id}`, category: "Projects", title: project.name, subtitle: `${project.language} • ${project.description ?? "GitHub repository"}`, icon: "folder", appId: "projects", customData: { projectId: project.id } });
  });

  index.push({ id: "github-profile", category: "Applications", title: "Samriddhi on GitHub", subtitle: contactData.github, icon: "git-branch", appId: "github" });

  // Achievements
  profileData.achievements.forEach((ach, idx) => {
    index.push({
      id: `ach-${idx}`,
      category: "Achievements",
      title: ach.title,
      subtitle: ach.detail,
      icon: "award",
      appId: "about",
      customData: { tab: "achievements" }
    });
  });

  // Education / University
  index.push({
    id: "edu-jecrc",
    category: "Education",
    title: "JECRC University, Jaipur",
    subtitle: "BTech in Computer Science and Engineering (Second Year)",
    icon: "graduation-cap",
    appId: "about",
    customData: { tab: "education" }
  });

  index.push({ id: "about-bio", category: "Applications", title: "About Samriddhi", subtitle: profileData.bio.join(" "), icon: "user", appId: "about" });
  index.push({ id: "focus-areas", category: "Skills", title: "Current Focus", subtitle: profileData.focusAreas.join(" • "), icon: "cpu", appId: "about" });
  index.push({ id: "location-jaipur", category: "Contact", title: "Jaipur, Rajasthan, India", subtitle: "Location", icon: "external-link", appId: "contact" });

  // Contact links
  index.push({
    id: "contact-linkedin",
    category: "Contact",
    title: "LinkedIn Profile",
    subtitle: contactData.linkedin,
    icon: "external-link",
    appId: "contact"
  });

  index.push({
    id: "contact-email",
    category: "Contact",
    title: "Email",
    subtitle: contactData.email,
    icon: "mail",
    appId: "contact"
  });

  index.push({
    id: "contact-phone",
    category: "Contact",
    title: "Phone / Mobile",
    subtitle: contactData.phone,
    icon: "phone",
    appId: "contact"
  });

  return index;
}

export function searchSystem(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const all = getSearchIndex();

  return all.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }).slice(0, 10);
}
