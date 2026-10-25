"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Globe,
  Wrench,
  Users,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { skillGroups } from "@/data/skills";

interface SkillsAppProps {
  initialCategory?: string;
}

export function SkillsApp({ initialCategory }: SkillsAppProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "Programming Languages"
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming Languages":
        return <Code className="w-4 h-4 text-blue-400" />;
      case "Web Development":
        return <Globe className="w-4 h-4 text-emerald-400" />;
      case "Tools & Technologies":
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case "Soft Skills":
        return <Users className="w-4 h-4 text-purple-400" />;
      default:
        return <Cpu className="w-4 h-4 text-sky-400" />;
    }
  };

  const activeGroup =
    skillGroups.find((g) => g.category === selectedCategory) || skillGroups[0];

  return (
    <div className="flex h-full bg-neutral-900/60 select-text text-white">
      {/* Category Sidebar */}
      <aside className="w-60 bg-neutral-950/40 border-r border-white/10 p-3 flex flex-col justify-between shrink-0 select-none">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2 px-2">
            Skill Categories
          </div>
          <nav className="space-y-1">
            {skillGroups.map((group) => {
              const isSelected = selectedCategory === group.category;
              return (
                <button
                  key={group.category}
                  onClick={() => setSelectedCategory(group.category)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white font-medium shadow-sm"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    {getCategoryIcon(group.category)}
                    <span className="truncate">{group.category}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {group.skills.length}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Footer Status */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
          <div className="text-[10px] text-white/40 uppercase font-semibold">
            Technical Stack
          </div>
          <div className="text-xs text-white/80 font-medium">
            13 Verified Competencies
          </div>
        </div>
      </aside>

      {/* Main Skills Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2">
                {getCategoryIcon(activeGroup.category)}
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {activeGroup.category}
                </h2>
              </div>
              <p className="text-xs text-white/50 mt-1">
                {activeGroup.description}
              </p>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-medium">
              Verified
            </span>
          </div>

          {/* Animated Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
            >
              {activeGroup.skills.map((skill) => (
                <div
                  key={skill}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.07] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white tracking-tight">
                        {skill}
                      </div>
                      <div className="text-[10px] text-white/40">
                        {activeGroup.category}
                      </div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Quick Summary Pill Row */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
              Full Spectrum Overview
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGroups.flatMap((g) =>
                g.skills.map((s) => (
                  <span
                    key={s}
                    onClick={() => setSelectedCategory(g.category)}
                    className={`px-3 py-1 rounded-lg text-xs cursor-pointer transition-all border ${
                      activeGroup.skills.includes(s)
                        ? "bg-blue-600/30 border-blue-500/40 text-white font-medium"
                        : "bg-white/[0.04] border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    {s}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
