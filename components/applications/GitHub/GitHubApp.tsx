"use client";

import React from "react";
import {
  Github,
  ExternalLink,
  BookMarked,
  MapPin,
  GitBranch,
} from "lucide-react";
import { githubProfile, githubRepositories } from "@/data/github";
import { contactData } from "@/data/contact";

export function GitHubApp() {
  return (
    <div className="flex flex-col h-full bg-[#0d1117] select-text text-[#c9d1d9] font-sans">
      {/* GitHub Top Profile Bar */}
      <div className="p-6 border-b border-[#30363d] bg-[#161b22] shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-900 border-2 border-[#30363d] flex items-center justify-center text-white shadow-md">
              <Github className="w-9 h-9 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white leading-tight">
                  {githubProfile.name}
                </h2>
                <span className="text-xs text-[#8b949e]">@{githubProfile.username}</span>
              </div>
              <p className="text-xs text-[#8b949e] mt-1 max-w-md">
                {githubProfile.bio}
              </p>
              <div className="flex items-center space-x-1.5 text-xs text-[#8b949e] mt-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{githubProfile.location}</span>
              </div>
            </div>
          </div>

          <a
            href={contactData.github}
            target="_blank"
            rel="noreferrer"
            className="self-start sm:self-center px-4 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-semibold text-white flex items-center space-x-2 transition-colors shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>Open Profile on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8b949e]" />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
        {githubRepositories.length === 0 ? (
          <div className="max-w-md text-center p-8 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#21262d] border border-[#30363d] flex items-center justify-center text-white mx-auto">
              <GitBranch className="w-7 h-7 text-[#58a6ff]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">Repository Browser Ready</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Repository architecture is connected to <strong className="text-white">@{githubProfile.username}</strong>. Real repository showcases will be populated once links are supplied.
              </p>
            </div>

            <a
              href={contactData.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-xs font-semibold text-white transition-colors"
            >
              <span>Explore github.com/sharmasamriddhi05-blip</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="w-full">
            {/* Repositories when provided */}
          </div>
        )}
      </div>
    </div>
  );
}
