"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Wifi,
  WifiOff,
  BatteryCharging,
  Search,
  Sliders,
} from "lucide-react";
import { useSystem } from "@/lib/systemContext";
import { APPS_REGISTRY } from "@/lib/appsRegistry";

export function MenuBar() {
  const {
    activeAppId,
    openWindow,
    settings,
    updateSettings,
    setSpotlightOpen,
    isControlCenterOpen,
    setControlCenterOpen,
    addNotification,
    restartPortfolio,
  } = useSystem();

  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Live Clock & Date
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close open dropdown menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeAppName = activeAppId ? APPS_REGISTRY[activeAppId]?.title || "Finder" : "Finder";

  const handleMenuClick = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <header
      ref={menuRef}
      className="fixed top-0 inset-x-0 h-7 z-50 select-none flex items-center justify-between px-3 text-xs font-medium text-white/90 backdrop-blur-xl bg-black/35 border-b border-white/10 shadow-sm"
      role="banner"
    >
      {/* Left Menu Items */}
      <div className="flex items-center space-x-1">
        {/* System Logo Menu */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("system")}
            className={`p-1 px-1.5 rounded hover:bg-white/15 transition-colors flex items-center justify-center ${
              activeMenu === "system" ? "bg-white/20" : ""
            }`}
            aria-label="System Menu"
            title="Samriddhi OS"
          >
            <svg
              className="w-3.5 h-3.5 fill-current text-white"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </button>

          {/* System Dropdown */}
          {activeMenu === "system" && (
            <div className="absolute left-0 mt-1 w-52 rounded-xl bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl py-1 text-xs text-neutral-200 z-50">
              <button
                onClick={() => {
                  openWindow("about");
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
              >
                <span>About This Portfolio</span>
                <span className="text-[10px] text-white/50">v2.0</span>
              </button>
              <button
                onClick={() => {
                  openWindow("settings");
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Settings...
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => {
                  restartPortfolio();
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors text-amber-300"
              >
                Restart Portfolio
              </button>
            </div>
          )}
        </div>

        {/* Active Application Name */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("app")}
            className="font-bold px-2 py-0.5 rounded hover:bg-white/15 transition-colors"
          >
            {activeAppName}
          </button>
          {activeMenu === "app" && (
            <div className="absolute left-0 mt-1 w-48 rounded-xl bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl py-1 text-xs text-neutral-200 z-50">
              <div className="px-3 py-1 text-[11px] text-white/40 uppercase font-semibold">
                {activeAppName}
              </div>
              <button
                onClick={() => {
                  if (activeAppId) openWindow(activeAppId);
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Open {activeAppName}
              </button>
              <button
                onClick={() => {
                  openWindow("settings");
                  setActiveMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Preferences...
              </button>
            </div>
          )}
        </div>

        {/* Standard Desktop Menus */}
        <div className="hidden sm:flex items-center space-x-0.5 text-white/80">
          <button
            onClick={() => handleMenuClick("file")}
            className={`px-2 py-0.5 rounded hover:bg-white/15 transition-colors ${
              activeMenu === "file" ? "bg-white/20 text-white" : ""
            }`}
          >
            File
          </button>
          <button
            onClick={() => handleMenuClick("view")}
            className={`px-2 py-0.5 rounded hover:bg-white/15 transition-colors ${
              activeMenu === "view" ? "bg-white/20 text-white" : ""
            }`}
          >
            View
          </button>
          <button
            onClick={() => handleMenuClick("help")}
            className={`px-2 py-0.5 rounded hover:bg-white/15 transition-colors ${
              activeMenu === "help" ? "bg-white/20 text-white" : ""
            }`}
          >
            Help
          </button>
        </div>

        {/* Dropdowns for File / Help */}
        {activeMenu === "file" && (
          <div className="absolute left-24 top-7 w-48 rounded-xl bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl py-1 text-xs text-neutral-200 z-50">
            <button
              onClick={() => {
                openWindow("finder");
                setActiveMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
            >
              New Finder Window
            </button>
            <button
              onClick={() => {
                openWindow("terminal");
                setActiveMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
            >
              New Terminal Tab
            </button>
          </div>
        )}

        {activeMenu === "view" && (
          <div className="absolute left-32 top-7 w-48 rounded-xl bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl py-1 text-xs text-neutral-200 z-50">
            <button
              onClick={() => {
                openWindow("skills");
                setActiveMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Skills Overview
            </button>
            <button
              onClick={() => {
                openWindow("projects");
                setActiveMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Projects Showcase
            </button>
          </div>
        )}

        {activeMenu === "help" && (
          <div className="absolute left-44 top-7 w-52 rounded-xl bg-neutral-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl py-1 text-xs text-neutral-200 z-50">
            <button
              onClick={() => {
                openWindow("chat");
                setActiveMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Ask Portfolio Assistant
            </button>
            <button
              onClick={() => {
                addNotification(
                  "Spotlight Shortcut",
                  "Press Cmd + K or Ctrl + K anytime to open quick search!"
                );
                setActiveMenu(null);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Keyboard Shortcuts
            </button>
          </div>
        )}
      </div>

      {/* Right Menu Items */}
      <div className="flex items-center space-x-1.5 text-white/85">
        {/* Wi-Fi Indicator */}
        <button
          onClick={() => {
            updateSettings({ wifiEnabled: !settings.wifiEnabled });
            addNotification(
              "Wi-Fi",
              settings.wifiEnabled ? "Wi-Fi turned off" : "Connected to Portfolio_5G"
            );
          }}
          className="p-1 rounded hover:bg-white/15 transition-colors"
          title={settings.wifiEnabled ? "Wi-Fi: Connected" : "Wi-Fi: Off"}
          aria-label="Toggle Wi-Fi"
        >
          {settings.wifiEnabled ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5 text-white/40" />}
        </button>

        {/* Battery Indicator */}
        <div
          className="hidden sm:flex items-center space-x-1 px-1 py-0.5 rounded hover:bg-white/15 transition-colors cursor-default"
          title="Battery: 100% (Plugged In)"
        >
          <span className="text-[11px] font-mono">100%</span>
          <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        {/* Spotlight Search Trigger */}
        <button
          onClick={() => setSpotlightOpen(true)}
          className="p-1 rounded hover:bg-white/15 transition-colors flex items-center space-x-1"
          aria-label="Open Spotlight Search"
          title="Search (Cmd + K)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center Toggle */}
        <button
          onClick={() => setControlCenterOpen((prev) => !prev)}
          className={`p-1 rounded hover:bg-white/15 transition-colors ${
            isControlCenterOpen ? "bg-white/20 text-white" : ""
          }`}
          aria-label="Control Center"
          title="Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Date and Live Clock */}
        <div
          className="flex items-center space-x-1.5 px-1.5 py-0.5 rounded hover:bg-white/15 transition-colors cursor-default text-[11px]"
          title={new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        >
          <span className="hidden md:inline text-white/70">{currentDate}</span>
          <span className="font-medium tracking-tight">{currentTime || "12:00 PM"}</span>
        </div>
      </div>
    </header>
  );
}
