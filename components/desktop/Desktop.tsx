"use client";

import React, { useEffect, useState } from "react";
import { Wallpaper } from "./Wallpaper";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { DesktopIcon } from "./DesktopIcon";
import { ControlCenter } from "./ControlCenter";
import { SpotlightSearch } from "./SpotlightSearch";
import { NotificationContainer } from "./Notification";
import { WindowManager } from "../windows/WindowManager";
import { MobileOS } from "../mobile/MobileOS";
import { BootScreen } from "./BootScreen";
import { useSystem } from "@/lib/systemContext";
import { AppId } from "@/lib/types";
import { profileData } from "@/data/profile";
import { MapPin } from "lucide-react";
import { WeatherWidget } from "./WeatherWidget";

interface DesktopIconItem {
  id: AppId;
  label: string;
  iconName: string;
  position: { x: number; y: number };
}

// Eight primary desktop applications; resume remains available through Finder/search.
const DESKTOP_ICONS: DesktopIconItem[] = [
  { id: "about", label: "About Me", iconName: "User", position: { x: 24, y: 48 } },
  { id: "projects", label: "Projects", iconName: "Briefcase", position: { x: 24, y: 148 } },
  { id: "github", label: "GitHub", iconName: "GitBranch", position: { x: 24, y: 248 } },
  { id: "skills", label: "Skills", iconName: "Cpu", position: { x: 24, y: 348 } },
  { id: "finder", label: "Finder", iconName: "Folder", position: { x: 120, y: 48 } },
  { id: "terminal", label: "Terminal", iconName: "Terminal", position: { x: 120, y: 148 } },
  { id: "chat", label: "AI Assistant", iconName: "MessageSquare", position: { x: 120, y: 248 } },
  { id: "contact", label: "Contact", iconName: "Mail", position: { x: 120, y: 348 } },
];

export function Desktop() {
  const { openWindow, addNotification } = useSystem();
  const [isBooted, setIsBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBootComplete = () => {
    setIsBooted(true);
    setTimeout(() => {
      addNotification(
        "Welcome to Samriddhi's OS",
        "Explore applications, terminal, or press Cmd + K to search.",
        undefined,
        5000
      );
    }, 400);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Boot sequence */}
      {!isBooted && <BootScreen onComplete={handleBootComplete} />}

      {/* Mobile OS for screens < 768px */}
      <MobileOS />

      {/* Desktop OS for screens >= 768px */}
      <div className="hidden md:block fixed inset-0 overflow-hidden select-none">
        {/* Dynamic Abstract Wallpaper */}
        <Wallpaper />

        {/* Subtle Desktop Profile Identity Area */}
        <div className="absolute top-14 right-10 z-0 pointer-events-auto select-text max-w-sm">
          <div className="p-5 rounded-2xl bg-neutral-900/35 backdrop-blur-xl border border-white/10 shadow-lg text-white">
            <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-blue-400 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Digital Portfolio OS</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-white drop-shadow">
              {profileData.name.toUpperCase()}
            </h1>
            <p className="text-xs font-semibold text-white/90 mt-0.5">
              {profileData.role}
            </p>
            <div className="text-[11px] text-white/60 font-medium mt-1">
              {profileData.subRole}
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] text-white/50 mt-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Jaipur, Rajasthan</span>
              <span>•</span>
              <span className="text-white/70">JECRC University</span>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={() => openWindow("about")}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium text-white transition-colors"
              >
                About Me
              </button>
              <button
                onClick={() => openWindow("skills")}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium text-white transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => openWindow("contact")}
                className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-[11px] font-medium text-blue-200 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        <WeatherWidget />

        {/* Top Menu Bar */}
        <MenuBar />

        {/* Draggable Desktop Icons Canvas */}
        <div className="absolute inset-0 pt-7 pb-20 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            {DESKTOP_ICONS.map((icon) => (
              <DesktopIcon
                key={icon.id}
                id={icon.id}
                label={icon.label}
                iconName={icon.iconName}
                defaultPosition={icon.position}
              />
            ))}
          </div>
        </div>

        {/* Multi-Window Manager */}
        <WindowManager />

        {/* Floating Bottom Dock */}
        <Dock />

        {/* Control Center Panel */}
        <ControlCenter />

        {/* Spotlight Global Search */}
        <SpotlightSearch />

        {/* Notifications Container */}
        <NotificationContainer />
      </div>
    </>
  );
}
