"use client";

import React, { useState, useEffect } from "react";
import {
  Folder,
  User,
  Cpu,
  Briefcase,
  GitBranch,
  Terminal,
  MessageSquare,
  FileText,
  Mail,
  Settings,
  ChevronLeft,
  Search,
  Wifi,
  BatteryCharging,
  CloudSun,
} from "lucide-react";
import { AppId } from "@/lib/types";
import { APPS_REGISTRY } from "@/lib/appsRegistry";
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
import { WeatherApp } from "../desktop/WeatherWidget";
import { SpotlightSearch } from "../desktop/SpotlightSearch";
import { useSystem } from "@/lib/systemContext";
import { profileData } from "@/data/profile";

export function MobileOS() {
  const { setSpotlightOpen } = useSystem();
  const [activeMobileApp, setActiveMobileApp] = useState<AppId | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })
      );
      setCurrentDate(
        now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps: Array<{ id: AppId; name: string; icon: React.ComponentType<{ className?: string }>; gradient: string }> = [
    { id: "about", name: "About Me", icon: User, gradient: "from-indigo-600 to-purple-600" },
    { id: "skills", name: "Skills", icon: Cpu, gradient: "from-cyan-600 to-blue-600" },
    { id: "projects", name: "Projects", icon: Briefcase, gradient: "from-blue-600 to-indigo-600" },
    { id: "github", name: "GitHub", icon: GitBranch, gradient: "from-slate-700 to-neutral-900" },
    { id: "resume", name: "Resume", icon: FileText, gradient: "from-amber-600 to-orange-500" },
    { id: "terminal", name: "Terminal", icon: Terminal, gradient: "from-neutral-800 to-zinc-950" },
    { id: "chat", name: "AI Assistant", icon: MessageSquare, gradient: "from-emerald-600 to-teal-500" },
    { id: "weather", name: "Weather", icon: CloudSun, gradient: "from-sky-500 to-blue-600" },
    { id: "contact", name: "Contact", icon: Mail, gradient: "from-sky-600 to-blue-700" },
    { id: "finder", name: "Finder", icon: Folder, gradient: "from-blue-500 to-indigo-600" },
    { id: "settings", name: "Settings", icon: Settings, gradient: "from-zinc-600 to-neutral-700" },
  ];

  const renderActiveApp = () => {
    switch (activeMobileApp) {
      case "finder":
        return <FinderApp />;
      case "about":
        return <AboutApp />;
      case "skills":
        return <SkillsApp />;
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
      case "weather":
        return <WeatherApp />;
      default:
        return null;
    }
  };

  return (
    <div className="md:hidden fixed inset-0 z-40 bg-[#090b10] text-white flex flex-col justify-between overflow-hidden">
      {/* If an app is open on mobile, show full-screen app sheet with back bar */}
      {activeMobileApp ? (
        <div className="flex-1 flex flex-col h-full bg-neutral-900 z-50">
          {/* Top navigation bar */}
          <div className="h-12 px-3 border-b border-white/10 bg-neutral-950 flex items-center justify-between shrink-0">
            <button
              onClick={() => setActiveMobileApp(null)}
              className="flex items-center space-x-1 text-xs text-blue-400 font-medium py-1 px-2 rounded-lg hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="text-xs font-semibold text-white">
              {APPS_REGISTRY[activeMobileApp]?.title}
            </div>
            <div className="w-12" />
          </div>

          {/* App Body */}
          <div className="flex-1 overflow-hidden relative">{renderActiveApp()}</div>
        </div>
      ) : (
        /* Mobile Home Screen / App Launcher */
        <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
          {/* Top Status & Date */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-white/70 mb-4">
              <span className="font-semibold">{currentTime}</span>
              <div className="flex items-center space-x-2">
                <Wifi className="w-3.5 h-3.5" />
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            <div className="text-center my-3">
              <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow">
                {profileData.name}
              </h1>
              <p className="text-xs text-white/70 mt-0.5">
                Second-Year BTech CSE • JECRC University
              </p>
              <p className="text-[11px] text-white/50">{profileData.location}</p>
            </div>

            {/* Mobile Search Bar */}
            <button
              onClick={() => setSpotlightOpen(true)}
              className="w-full mt-3 py-2.5 px-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 text-xs text-white/60 flex items-center space-x-2.5"
            >
              <Search className="w-4 h-4 text-white/40" />
              <span>Search skills, achievements, contact...</span>
            </button>
          </div>

          {/* Main App Grid */}
          <div className="grid grid-cols-4 gap-4 my-auto py-5">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveMobileApp(app.id)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.gradient} p-3 flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform`}
                  >
                    <Icon className="w-full h-full drop-shadow" />
                  </div>
                  <span className="text-[11px] font-medium text-white/90 mt-1.5 truncate max-w-[68px]">
                    {app.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Bottom Dock */}
          <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/15 p-3 flex items-center justify-around shadow-2xl">
            {[
              { id: "about" as AppId, icon: User, gradient: "from-indigo-600 to-purple-600" },
              { id: "skills" as AppId, icon: Cpu, gradient: "from-cyan-600 to-blue-600" },
              { id: "chat" as AppId, icon: MessageSquare, gradient: "from-emerald-500 to-teal-600" },
              { id: "contact" as AppId, icon: Mail, gradient: "from-blue-600 to-indigo-700" },
            ].map((dockApp) => {
              const Icon = dockApp.icon;
              return (
                <button
                  key={dockApp.id}
                  onClick={() => setActiveMobileApp(dockApp.id)}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${dockApp.gradient} p-2.5 flex items-center justify-center text-white shadow-md active:scale-95 transition-transform`}
                >
                  <Icon className="w-full h-full drop-shadow" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Global Spotlight Search modal for mobile */}
      <SpotlightSearch />
    </div>
  );
}
