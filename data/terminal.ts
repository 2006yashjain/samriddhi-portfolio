import { profileData } from "./profile";
import { contactData } from "./contact";
import { skillGroups } from "./skills";

export interface TerminalOutputLine {
  type: "text" | "error" | "success" | "info" | "ascii";
  content: string;
}

export interface CommandContext {
  openApp?: (appId: string, customData?: any) => void;
  triggerConfetti?: () => void;
  clearHistory?: () => void;
}

export interface TerminalCommand {
  name: string;
  description: string;
  usage?: string;
  hidden?: boolean;
  execute: (args: string[], context?: CommandContext) => TerminalOutputLine[];
}

export const terminalCommands: Record<string, TerminalCommand> = {
  help: {
    name: "help",
    description: "Display list of all available commands",
    execute: () => [
      { type: "info", content: "Samriddhi OS Terminal — Available Commands:" },
      { type: "text", content: "  help          — Display this help menu" },
      { type: "text", content: "  whoami        — Print active identity & college" },
      { type: "text", content: "  about         — Print bio and focus areas" },
      { type: "text", content: "  skills        — List technical & soft skills" },
      { type: "text", content: "  achievements  — View academic & exam achievements" },
      { type: "text", content: "  github        — Display GitHub profile link" },
      { type: "text", content: "  linkedin      — Display LinkedIn profile link" },
      { type: "text", content: "  contact       — Display direct contact channels" },
      { type: "text", content: "  projects      — Check project repository status" },
      { type: "text", content: "  neofetch      — Display system specs & OS banner" },
      { type: "text", content: "  open <app>    — Open GUI app (e.g., open skills, open contact)" },
      { type: "text", content: "  date          — Print current system date and time" },
      { type: "text", content: "  clear         — Clear terminal screen" },
      { type: "info", content: "\nTip: Try hidden command 'coffee' or 'sudo hire'!" }
    ]
  },

  whoami: {
    name: "whoami",
    description: "Print current logged in identity",
    execute: () => [
      { type: "success", content: profileData.name },
      { type: "text", content: profileData.role },
      { type: "text", content: "JECRC University" },
      { type: "text", content: "Jaipur, Rajasthan" }
    ]
  },

  about: {
    name: "about",
    description: "Display biography and background",
    execute: () => [
      { type: "info", content: `=== ${profileData.name} ===` },
      { type: "text", content: `${profileData.role} — ${profileData.education[0]?.institution}` },
      { type: "text", content: `Year: ${profileData.education[0]?.period} | Location: ${profileData.location}\n` },
      ...profileData.bio.map((paragraph) => ({
        type: "text" as const,
        content: paragraph
      })),
      { type: "info", content: `\nFocus Areas: ${profileData.focusAreas.join(", ")}` },
      { type: "text", content: `Interests: ${profileData.interests.join(", ")}` }
    ]
  },

  skills: {
    name: "skills",
    description: "List verified skills by category",
    execute: () => [
      { type: "info", content: "=== Technical & Soft Skills ===" },
      ...skillGroups.map((group) => ({
        type: "text" as const,
        content: `\n• ${group.category.toUpperCase()}:\n  ${group.skills.join("  •  ")}`
      })),
      { type: "info", content: "\nRun 'open skills' to view the interactive Skills visual browser." }
    ]
  },

  achievements: {
    name: "achievements",
    description: "Display academic and competitive achievements",
    execute: () => [
      { type: "info", content: "=== Verified Achievements ===" },
      ...profileData.achievements.map((item) => ({
        type: "success" as const,
        content: `★ ${item.title}: ${item.detail}`
      }))
    ]
  },

  github: {
    name: "github",
    description: "Display GitHub profile link",
    execute: () => [
      { type: "info", content: "=== GitHub Profile ===" },
      { type: "success", content: contactData.github },
      { type: "text", content: "Actual repository links will be integrated in the next phase." }
    ]
  },

  linkedin: {
    name: "linkedin",
    description: "Display LinkedIn profile link",
    execute: () => [
      { type: "info", content: "=== LinkedIn Profile ===" },
      { type: "success", content: contactData.linkedin }
    ]
  },

  contact: {
    name: "contact",
    description: "Get contact information",
    execute: () => [
      { type: "info", content: `=== Contact: ${profileData.name} ===` },
      { type: "text", content: `Location: ${contactData.location}` },
      { type: "text", content: `Phone:    ${contactData.phone}` },
      { type: "text", content: `Email:    ${contactData.email}` },
      { type: "text", content: `LinkedIn: ${contactData.linkedin}` },
      { type: "text", content: `GitHub:   ${contactData.github}` },
      { type: "info", content: "\nRun 'open contact' to open the direct Mail application." }
    ]
  },

  projects: {
    name: "projects",
    description: "Check projects status",
    execute: () => [
      { type: "info", content: "=== Projects ===" },
      { type: "text", content: "No projects loaded yet. GitHub repositories will appear here." },
      { type: "text", content: `GitHub: ${contactData.github}` },
      { type: "info", content: "\nRun 'open projects' to open the visual Projects window." }
    ]
  },

  neofetch: {
    name: "neofetch",
    description: "Display system specifications and ASCII logo",
    execute: () => [
      {
        type: "ascii",
        content: `
       /\\_\\_            SAMRIDDHI OS
      / /   \\           ────────────────────────
     / /     \\          User       : Samriddhi Sharma
    / /       \\         Role       : CSE Student
   / /         \\        University : JECRC University
  / /           \\       Location   : Jaipur, Rajasthan
 / /_____________\\      Year       : Second Year
/_/               \\     Focus      : C++ / DSA / Web Development
                        Status     : Building
                        Shell      : zsh 5.9 (macOS inspired)
                        Host       : Next.js 14 / React 18
                        Terminal   : xterm-web-glass
`
      }
    ]
  },

  date: {
    name: "date",
    description: "Print current date and time",
    execute: () => [
      { type: "text", content: new Date().toString() }
    ]
  },

  open: {
    name: "open",
    description: "Open an OS application window",
    usage: "open <app_name> (e.g. open about, open skills, open contact)",
    execute: (args, context) => {
      const app = args[0]?.toLowerCase();
      const validApps = [
        "finder",
        "about",
        "skills",
        "projects",
        "github",
        "terminal",
        "chat",
        "resume",
        "contact",
        "settings"
      ];
      if (!app || !validApps.includes(app)) {
        return [
          { type: "error", content: `Application '${app || ""}' not found.` },
          { type: "text", content: `Available: ${validApps.join(", ")}` }
        ];
      }
      if (context?.openApp) {
        context.openApp(app);
        return [{ type: "success", content: `Launching ${app}.app...` }];
      }
      return [{ type: "text", content: `Requested to open ${app}.app` }];
    }
  },

  clear: {
    name: "clear",
    description: "Clear the terminal screen",
    execute: (_, context) => {
      if (context?.clearHistory) {
        context.clearHistory();
      }
      return [];
    }
  },

  // Easter Eggs
  coffee: {
    name: "coffee",
    description: "Brew a cup of developer coffee",
    hidden: true,
    execute: () => [
      {
        type: "ascii",
        content: `
        (  )   (   )  )
         ) (   )  (  (
         ( )  (    ) )
         _____________
        <_____________> ___
        |             |/ _ \\
        |  SAMRIDDHI  | | | |
        |   COFFEE    |\\_\\_/
        |             |
        \\_____________/
`
      },
      { type: "success", content: "Fresh artisanal coffee brewed! ☕ Ready to code." }
    ]
  },

  "sudo": {
    name: "sudo",
    description: "Elevated administrative command execution",
    hidden: true,
    execute: (args, context) => {
      const fullCmd = args.join(" ").toLowerCase();
      if (fullCmd.includes("hire")) {
        if (context?.triggerConfetti) {
          context.triggerConfetti();
        }
        return [
          { type: "info", content: "[sudo] password for samriddhi: ••••••••" },
          { type: "success", content: "Access Granted!" },
          { type: "success", content: "🎉 Initiating contact protocol for Samriddhi Sharma..." },
          { type: "text", content: `Direct Email: ${contactData.email}` },
          { type: "text", content: `Direct Phone: ${contactData.phone}` },
          { type: "text", content: `LinkedIn:     ${contactData.linkedin}` }
        ];
      }
      return [
        { type: "error", content: `sudo: command '${fullCmd}' not recognized. Try 'sudo hire'.` }
      ];
    }
  }
};
