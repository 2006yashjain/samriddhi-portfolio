"use client";

import React from "react";
import { FolderGit2, ExternalLink, Github, Sparkles } from "lucide-react";
import { projectsData } from "@/data/projects";
import { contactData } from "@/data/contact";

export function ProjectsApp() {
  return (
    <div className="flex flex-col h-full bg-neutral-900/60 select-text text-white">
      {/* Top Header */}
      <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between bg-neutral-950/40 shrink-0">
        <div className="flex items-center space-x-2">
          <FolderGit2 className="w-4 h-4 text-blue-400" />
          <h2 className="text-xs font-bold text-white">Projects</h2>
        </div>
        <span className="text-[10px] text-white/40 font-mono">
          Phase 2 • Ready for GitHub Integration
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
        {projectsData.length === 0 ? (
          /* Clean empty state as required */
          <div className="max-w-md text-center p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
              <FolderGit2 className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white">Projects</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                No projects loaded yet. GitHub repositories will appear here.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={contactData.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/50" />
              </a>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {/* If projects exist */}
          </div>
        )}
      </div>
    </div>
  );
}
