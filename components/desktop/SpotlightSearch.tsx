"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Folder,
  User,
  Briefcase,
  GitBranch,
  Terminal,
  MessageSquare,
  FileText,
  Mail,
  Settings,
  Code,
  Cpu,
  GraduationCap,
  Award,
  Phone,
  ExternalLink,
  CloudSun,
} from "lucide-react";
import { useSystem } from "@/lib/systemContext";
import { searchSystem, SearchResult, getSearchIndex } from "@/data/search";

export function SpotlightSearch() {
  const { isSpotlightOpen, setSpotlightOpen, openWindow } = useSystem();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isSpotlightOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSpotlightOpen]);

  const results: SearchResult[] = query.trim()
    ? searchSystem(query)
    : getSearchIndex().slice(0, 8);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setSpotlightOpen(false);
    }
  };

  const handleSelect = (item: SearchResult) => {
    openWindow(item.appId, item.customData);
    setSpotlightOpen(false);
  };

  const getResultIcon = (iconName: string) => {
    switch (iconName) {
      case "folder":
        return <Folder className="w-4 h-4 text-blue-400" />;
      case "user":
        return <User className="w-4 h-4 text-indigo-400" />;
      case "briefcase":
        return <Briefcase className="w-4 h-4 text-sky-400" />;
      case "git-branch":
      case "github":
        return <GitBranch className="w-4 h-4 text-purple-400" />;
      case "terminal":
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case "message-square":
        return <MessageSquare className="w-4 h-4 text-teal-400" />;
      case "file-text":
        return <FileText className="w-4 h-4 text-amber-400" />;
      case "mail":
        return <Mail className="w-4 h-4 text-sky-400" />;
      case "phone":
        return <Phone className="w-4 h-4 text-emerald-400" />;
      case "cloud-sun":
        return <CloudSun className="w-4 h-4 text-sky-400" />;
      case "settings":
        return <Settings className="w-4 h-4 text-zinc-400" />;
      case "code":
        return <Code className="w-4 h-4 text-cyan-400" />;
      case "cpu":
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case "graduation-cap":
        return <GraduationCap className="w-4 h-4 text-yellow-400" />;
      case "award":
        return <Award className="w-4 h-4 text-amber-400" />;
      case "external-link":
        return <ExternalLink className="w-4 h-4 text-blue-400" />;
      default:
        return <Search className="w-4 h-4 text-blue-400" />;
    }
  };

  if (!isSpotlightOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] bg-black/40 backdrop-blur-sm"
      onClick={() => setSpotlightOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-neutral-900/95 backdrop-blur-3xl border border-white/20 shadow-spotlight overflow-hidden text-white"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-white/50 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search Samriddhi's skills, education, achievements, links..."
            className="w-full bg-transparent text-sm md:text-base text-white placeholder-white/40 focus:outline-none"
            aria-label="Spotlight Search Input"
          />
          <div className="flex items-center space-x-1 text-[11px] text-white/40 font-mono bg-white/10 px-2 py-0.5 rounded">
            <span>ESC</span>
          </div>
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-white/40">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                  selectedIndex === idx
                    ? "bg-blue-600 text-white"
                    : "hover:bg-white/[0.06] text-white/90"
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      selectedIndex === idx ? "bg-white/20" : "bg-white/10"
                    }`}
                  >
                    {getResultIcon(item.icon)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate">{item.title}</div>
                    <div
                      className={`text-[11px] truncate ${
                        selectedIndex === idx ? "text-white/80" : "text-white/50"
                      }`}
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <div className="shrink-0 ml-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium ${
                      selectedIndex === idx
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 bg-black/30 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-medium">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
          </div>
          <span>Samriddhi OS Spotlight</span>
        </div>
      </motion.div>
    </div>
  );
}
