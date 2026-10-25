"use client";

import React, { useState } from "react";
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
  CloudSun,
} from "lucide-react";
import { useSystem } from "@/lib/systemContext";
import { AppId } from "@/lib/types";

interface DockItemDef {
  id: AppId;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const DOCK_ITEMS: DockItemDef[] = [
  {
    id: "about",
    title: "About Me",
    icon: User,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "skills",
    title: "Skills",
    icon: Cpu,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "projects",
    title: "Projects",
    icon: Briefcase,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: "github",
    title: "GitHub",
    icon: GitBranch,
    gradient: "from-slate-700 to-neutral-900",
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: Terminal,
    gradient: "from-zinc-800 to-stone-900",
  },
  {
    id: "chat",
    title: "AI Assistant",
    icon: MessageSquare,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "finder",
    title: "Finder",
    icon: Folder,
    gradient: "from-blue-500 to-cyan-400",
  },
  { id: "weather", title: "Weather", icon: CloudSun, gradient: "from-sky-500 to-blue-600" },
];

export function Dock() {
  const { windows, activeAppId, openWindow, minimizeWindow, restoreWindow, settings } = useSystem();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bouncingAppId, setBouncingAppId] = useState<AppId | null>(null);

  const handleClick = (item: DockItemDef) => {
    const openWin = windows.find((w) => w.appId === item.id);

    setBouncingAppId(item.id);
    setTimeout(() => setBouncingAppId(null), 800);

    if (openWin) {
      if (openWin.isMinimized) {
        restoreWindow(openWin.id);
      } else if (activeAppId === item.id) {
        minimizeWindow(openWin.id);
      } else {
        openWindow(item.id);
      }
    } else {
      openWindow(item.id);
    }
  };

  return (
    <nav
      className="fixed bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none select-none"
      aria-label="Application Dock"
    >
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        className="pointer-events-auto flex items-end gap-2 px-3 py-2 rounded-2xl backdrop-blur-2xl bg-neutral-950/40 border border-white/15 shadow-dock"
      >
        {DOCK_ITEMS.map((item, idx) => {
          const isOpen = windows.some((w) => w.appId === item.id);
          const isActive = activeAppId === item.id;
          const isBouncing = bouncingAppId === item.id;

          let scale = 1;
          if (settings.dockMagnification && hoveredIndex !== null) {
            const distance = Math.abs(hoveredIndex - idx);
            if (distance === 0) scale = 1.35;
            else if (distance === 1) scale = 1.18;
            else if (distance === 2) scale = 1.06;
          }

          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              <div
                className="absolute -top-10 px-2.5 py-1 rounded-md bg-neutral-900/90 backdrop-blur-lg border border-white/15 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50"
                role="tooltip"
              >
                {item.title}
              </div>

              <button
                onClick={() => handleClick(item)}
                style={{
                  transform: `scale(${scale}) translateY(${scale > 1 ? -((scale - 1) * 20) : 0}px)`,
                }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-2.5 flex items-center justify-center text-white shadow-lg transition-transform duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isBouncing ? "animate-bounce" : ""
                }`}
                aria-label={`Open ${item.title}`}
                title={item.title}
              >
                <IconComponent className="w-full h-full drop-shadow" />
              </button>

              <div className="h-1.5 flex items-center justify-center mt-1">
                {isOpen && (
                  <span
                    className={`w-1 h-1 rounded-full transition-colors ${
                      isActive ? "bg-white w-2.5" : "bg-white/60"
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
