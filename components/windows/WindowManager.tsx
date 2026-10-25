"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { useSystem } from "@/lib/systemContext";
import { Window } from "./Window";
import { FinderApp } from "../applications/Finder/FinderApp";
import { AboutApp } from "../applications/About/AboutApp";
import { SkillsApp } from "../applications/Skills/SkillsApp";
import { ProjectsApp } from "../applications/Projects/ProjectsApp";
import { GitHubApp } from "../applications/GitHub/GitHubApp";
import { TerminalApp } from "../applications/Terminal/TerminalApp";
import { ChatApp } from "../applications/Chat/ChatApp";
import { ResumeApp } from "../applications/Resume/ResumeApp";
import { ContactApp } from "../applications/Contact/ContactApp";
import { SettingsApp } from "../applications/Settings/SettingsApp";

export function WindowManager() {
  const { windows } = useSystem();

  const renderAppContent = (win: any) => {
    switch (win.appId) {
      case "finder":
        return <FinderApp />;
      case "about":
        return <AboutApp initialTab={win.customData?.tab} />;
      case "skills":
        return <SkillsApp initialCategory={win.customData?.category} />;
      case "projects":
        return <ProjectsApp />;
      case "github":
        return <GitHubApp />;
      case "terminal":
        return <TerminalApp />;
      case "chat":
        return <ChatApp />;
      case "resume":
        return <ResumeApp />;
      case "contact":
        return <ContactApp />;
      case "settings":
        return <SettingsApp />;
      default:
        return (
          <div className="p-6 text-center text-white/50">
            Application {win.appId} content not found.
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      <AnimatePresence>
        {windows.map((win) => {
          if (!win.isOpen || win.isMinimized) return null;

          return (
            <div key={win.id} className="pointer-events-auto">
              <Window window={win}>
                {renderAppContent(win)}
              </Window>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
