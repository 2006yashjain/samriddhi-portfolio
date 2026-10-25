"use client";

import React, { useState } from "react";
import {
  Palette,
  Volume2,
  Sliders,
  Info,
  Check,
} from "lucide-react";
import { useSystem } from "@/lib/systemContext";
import { WallpaperId, AccentColor } from "@/lib/types";
import { profileData } from "@/data/profile";

type SettingsTab = "appearance" | "sound" | "dock" | "about";

export function SettingsApp() {
  const { settings, updateSettings, setWallpaper, setAccentColor, addNotification } = useSystem();
  const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");

  const wallpapers: Array<{ id: WallpaperId; title: string; subtitle: string; previewClass: string }> = [
    {
      id: "dark-void",
      title: "Dark Void",
      subtitle: "Deep space obsidian with cosmic blue ambient glow",
      previewClass: "bg-gradient-to-tr from-slate-950 via-[#0a0f1d] to-indigo-950",
    },
    {
      id: "aurora-night",
      title: "Aurora Night",
      subtitle: "Dark northern lights with emerald and teal hues",
      previewClass: "bg-gradient-to-tr from-[#061014] via-emerald-950/60 to-teal-900/40",
    },
    {
      id: "minimal-dusk",
      title: "Minimal Dusk",
      subtitle: "Midnight plum and twilight indigo horizon",
      previewClass: "bg-gradient-to-tr from-[#0b0813] via-purple-950/60 to-rose-950/40",
    },
    {
      id: "cyber-nebula",
      title: "Cyber Nebula",
      subtitle: "Modern deep slate with subtle cyan & magenta mist",
      previewClass: "bg-gradient-to-tr from-[#080d14] via-cyan-950/60 to-fuchsia-950/40",
    },
  ];

  const accents: Array<{ id: AccentColor; name: string; bg: string }> = [
    { id: "blue", name: "System Blue", bg: "bg-blue-500" },
    { id: "purple", name: "Purple", bg: "bg-purple-500" },
    { id: "emerald", name: "Emerald", bg: "bg-emerald-500" },
    { id: "amber", name: "Amber", bg: "bg-amber-500" },
    { id: "rose", name: "Rose", bg: "bg-rose-500" },
  ];

  return (
    <div className="flex h-full bg-neutral-900/60 select-text text-white">
      {/* Sidebar Navigation */}
      <aside className="w-52 bg-neutral-950/40 border-r border-white/10 p-3 select-none shrink-0">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2 px-2">
          Preferences
        </div>
        <nav className="space-y-0.5">
          <button
            onClick={() => setActiveTab("appearance")}
            className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
              activeTab === "appearance"
                ? "bg-blue-600 text-white font-medium"
                : "text-white/70 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Appearance</span>
          </button>
          <button
            onClick={() => setActiveTab("sound")}
            className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
              activeTab === "sound"
                ? "bg-blue-600 text-white font-medium"
                : "text-white/70 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Sound & Feedback</span>
          </button>
          <button
            onClick={() => setActiveTab("dock")}
            className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
              activeTab === "dock"
                ? "bg-blue-600 text-white font-medium"
                : "text-white/70 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Dock & Desktop</span>
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
              activeTab === "about"
                ? "bg-blue-600 text-white font-medium"
                : "text-white/70 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About System</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h2 className="text-sm font-bold text-white">Desktop Wallpaper</h2>
              <p className="text-xs text-white/50 mt-0.5">
                Select an abstract dark theme wallpaper for Samriddhi&apos;s desktop.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-3">
                {wallpapers.map((wp) => (
                  <div
                    key={wp.id}
                    onClick={() => {
                      setWallpaper(wp.id);
                      addNotification("Wallpaper Changed", `Active: ${wp.title}`);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-28 relative overflow-hidden ${
                      settings.wallpaper === wp.id
                        ? "border-blue-500 ring-2 ring-blue-500/30"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className={`absolute inset-0 ${wp.previewClass} -z-10`} />
                    <div className="flex justify-end">
                      {settings.wallpaper === wp.id && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white drop-shadow">{wp.title}</div>
                      <div className="text-[10px] text-white/70 drop-shadow line-clamp-1">
                        {wp.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Color Chooser */}
            <div className="pt-4 border-t border-white/10">
              <h2 className="text-sm font-bold text-white">Accent Color</h2>
              <p className="text-xs text-white/50 mt-0.5">
                Set the highlight tone for controls and focus states.
              </p>
              <div className="flex items-center space-x-3 mt-3">
                {accents.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setAccentColor(acc.id)}
                    className={`w-7 h-7 rounded-full ${acc.bg} transition-all flex items-center justify-center ${
                      settings.accentColor === acc.id
                        ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-neutral-900"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    title={acc.name}
                  >
                    {settings.accentColor === acc.id && (
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sound Tab */}
        {activeTab === "sound" && (
          <div className="space-y-4 max-w-xl">
            <h2 className="text-sm font-bold text-white">Sound Effects</h2>
            <p className="text-xs text-white/50">
              Enable synthesized Web Audio API feedback for clicks, window actions, and notifications.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">UI Audio Feedback</div>
                <div className="text-[11px] text-white/50">Play sounds for actions and alerts</div>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Dock Tab */}
        {activeTab === "dock" && (
          <div className="space-y-4 max-w-xl">
            <h2 className="text-sm font-bold text-white">Dock Settings</h2>
            <p className="text-xs text-white/50">
              Configure dock animation and magnification characteristics.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Dock Magnification</div>
                <div className="text-[11px] text-white/50">Magnify icons on mouse hover</div>
              </div>
              <input
                type="checkbox"
                checked={settings.dockMagnification}
                onChange={(e) => updateSettings({ dockMagnification: e.target.checked })}
                className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* About System Tab */}
        {activeTab === "about" && (
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Samriddhi OS</h2>
                <div className="text-xs text-white/50">Version 2.0 (Interactive Personal Edition)</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-white/80">
              <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                <span className="text-white/50">Owner</span>
                <span className="font-mono">{profileData.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                <span className="text-white/50">Education</span>
                <span className="font-mono">Second-Year BTech CSE, JECRC University</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                <span className="text-white/50">Location</span>
                <span className="font-mono">{profileData.location}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                <span className="text-white/50">Architecture</span>
                <span className="font-mono">Next.js 14 / React 18 / Tailwind CSS</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
