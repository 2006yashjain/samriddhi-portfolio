"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Cpu,
  Briefcase,
  GitBranch,
  FileText,
  Terminal,
  MessageSquare,
  Mail,
  Folder,
} from "lucide-react";
import { AppId } from "@/lib/types";
import { useSystem } from "@/lib/systemContext";

interface DesktopIconProps {
  id: AppId;
  label: string;
  iconName: string;
  defaultPosition: { x: number; y: number };
}

export function DesktopIcon({ id, label, iconName, defaultPosition }: DesktopIconProps) {
  const { openWindow } = useSystem();
  const [isSelected, setIsSelected] = useState(false);

  const getIcon = () => {
    switch (iconName) {
      case "User":
        return <User className="w-8 h-8 text-indigo-400" />;
      case "Cpu":
        return <Cpu className="w-8 h-8 text-cyan-400" />;
      case "Briefcase":
        return <Briefcase className="w-8 h-8 text-blue-400" />;
      case "GitBranch":
        return <GitBranch className="w-8 h-8 text-purple-400" />;
      case "FileText":
        return <FileText className="w-8 h-8 text-amber-400" />;
      case "Terminal":
        return <Terminal className="w-8 h-8 text-emerald-400" />;
      case "MessageSquare":
        return <MessageSquare className="w-8 h-8 text-teal-400" />;
      case "Mail":
        return <Mail className="w-8 h-8 text-sky-400" />;
      case "Folder":
      default:
        return <Folder className="w-8 h-8 text-blue-400" />;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openWindow(id);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: defaultPosition.x, y: defaultPosition.y }}
      className="absolute z-10 select-none cursor-pointer group"
      onClick={() => { setIsSelected(true); openWindow(id); }}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Open ${label}`}
    >
      <div
        className={`w-20 p-2 flex flex-col items-center justify-center rounded-xl transition-all ${
          isSelected
            ? "bg-blue-600/30 border border-blue-400/40 shadow-md ring-1 ring-blue-400/50"
            : "hover:bg-white/10 border border-transparent"
        }`}
      >
        <div className="w-12 h-12 rounded-xl bg-neutral-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
          {getIcon()}
        </div>
        <span className="mt-1.5 text-[11px] font-medium text-white/95 text-center leading-tight drop-shadow-md line-clamp-2 px-1">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
