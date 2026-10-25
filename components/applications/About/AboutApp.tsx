"use client";

import React, { useState } from "react";
import {
  User,
  BookOpen,
  GraduationCap,
  Award,
  Heart,
  Target,
  Mail,
  MapPin,
  ExternalLink,
  Download,
  Phone,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { contactData } from "@/data/contact";
import { useSystem } from "@/lib/systemContext";

type AboutTab = "profile" | "bio" | "education" | "focus" | "achievements" | "interests";

export function AboutApp({ initialTab = "profile" }: { initialTab?: AboutTab }) {
  const [activeTab, setActiveTab] = useState<AboutTab>(initialTab);
  const { openWindow } = useSystem();

  const tabs: Array<{ id: AboutTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: "profile", label: "Profile", icon: User },
    { id: "bio", label: "About Samriddhi", icon: BookOpen },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "focus", label: "Focus Areas", icon: Target },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "interests", label: "Interests", icon: Heart },
  ];

  return (
    <div className="flex h-full bg-neutral-900/60 select-text text-white">
      {/* Sidebar Navigation */}
      <aside className="w-56 bg-neutral-950/40 border-r border-white/10 p-3 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* User profile badge */}
          <div className="flex items-center space-x-2.5 px-2 py-3 mb-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-sm shadow-md text-white">
              {profileData.avatarPlaceholder}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-xs truncate">{profileData.name}</div>
              <div className="text-[10px] text-white/50 truncate">JECRC University</div>
            </div>
          </div>

          <nav className="space-y-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white font-medium shadow-sm"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick action buttons */}
        <div className="space-y-1.5 pt-3 border-t border-white/10">
          <button
            onClick={() => openWindow("skills")}
            className="w-full py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>View Technical Skills</span>
          </button>
          <button
            onClick={() => openWindow("contact")}
            className="w-full py-1.5 px-2.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Samriddhi</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-xl border border-white/20">
                {profileData.avatarPlaceholder}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {profileData.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-medium">
                    Second Year
                  </span>
                </div>
                <div className="text-sm text-blue-400 font-medium mt-0.5">
                  Second-Year BTech CSE Student
                </div>
                <div className="text-xs text-white/70 font-medium mt-0.5">
                  JECRC University, Jaipur
                </div>
                <div className="text-xs text-white/50 flex items-center space-x-1 mt-1.5">
                  <MapPin className="w-3 h-3 text-white/40" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Profile Overview Card */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
              <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                Summary
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {profileData.bio[0]} {profileData.bio[1]}
              </p>
            </div>

            {/* Quick Education & University Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] text-white/40 uppercase font-semibold">Degree</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  BTech in Computer Science and Engineering
                </div>
                <div className="text-[11px] text-blue-400 mt-1">Second Year</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] text-white/40 uppercase font-semibold">Institution</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  JECRC University, Jaipur
                </div>
                <div className="text-[11px] text-white/60 mt-1">Jaipur, Rajasthan, India</div>
              </div>
            </div>

            {/* Social & Contact Connections */}
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2.5">
                Direct Channels
              </h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white/90 hover:text-white transition-colors"
                >
                  <span>LinkedIn:</span>
                  <span className="text-blue-400 font-mono">samriddhi-sharma</span>
                  <ExternalLink className="w-3 h-3 text-white/40" />
                </a>
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white/90 hover:text-white transition-colors"
                >
                  <span>GitHub:</span>
                  <span className="text-purple-400 font-mono">sharmasamriddhi05-blip</span>
                  <ExternalLink className="w-3 h-3 text-white/40" />
                </a>
                <a
                  href={contactData.emailLink}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white/90 hover:text-white transition-colors"
                >
                  <span>Email:</span>
                  <span className="text-emerald-400 font-mono">{contactData.email}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bio Tab */}
        {activeTab === "bio" && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-white tracking-tight border-b border-white/10 pb-2">
              About Samriddhi
            </h2>
            <div className="space-y-3 text-xs leading-relaxed text-white/85">
              {profileData.bio.map((paragraph, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 leading-relaxed text-white/90"
                >
                  {paragraph}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-white tracking-tight border-b border-white/10 pb-2">
              Academic Education
            </h2>
            {profileData.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                    <div className="text-xs text-blue-400 font-medium mt-0.5">
                      {edu.institution}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-mono">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Focus Areas Tab */}
        {activeTab === "focus" && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-white tracking-tight border-b border-white/10 pb-2">
              Current Focus Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {profileData.focusAreas.map((area) => (
                <div
                  key={area}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-center space-x-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">{area}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-white tracking-tight border-b border-white/10 pb-2">
              Verified Achievements
            </h2>
            <div className="space-y-3">
              {profileData.achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start space-x-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-white">{item.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 font-medium mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests Tab */}
        {activeTab === "interests" && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-white tracking-tight border-b border-white/10 pb-2">
              Interests & Hobbies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {profileData.interests.map((interest) => (
                <div
                  key={interest}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-center space-x-3 text-xs font-medium text-white/90"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
