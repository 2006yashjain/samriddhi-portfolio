"use client";

import React, { useRef, useEffect } from "react";
import {
  Wifi,
  Bluetooth,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Radio,
  Music,
  Palette,
  Bell,
  BellOff,
  Sparkles,
} from "lucide-react";
import { useSystem } from "@/lib/systemContext";
import { AccentColor } from "@/lib/types";

export function ControlCenter() {
  const {
    isControlCenterOpen,
    setControlCenterOpen,
    settings,
    updateSettings,
    setAccentColor,
    addNotification,
  } = useSystem();

  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('button[title="Control Center"]')
      ) {
        setControlCenterOpen(false);
      }
    };

    if (isControlCenterOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isControlCenterOpen, setControlCenterOpen]);

  if (!isControlCenterOpen) return null;

  const accentColors: Array<{ id: AccentColor; name: string; bg: string }> = [
    { id: "blue", name: "Blue", bg: "bg-blue-500" },
    { id: "purple", name: "Purple", bg: "bg-purple-500" },
    { id: "emerald", name: "Emerald", bg: "bg-emerald-500" },
    { id: "amber", name: "Amber", bg: "bg-amber-500" },
    { id: "rose", name: "Rose", bg: "bg-rose-500" },
  ];

  return (
    <div
      ref={panelRef}
      className="fixed top-8 right-3 w-80 rounded-2xl bg-neutral-900/85 backdrop-blur-3xl border border-white/15 shadow-2xl p-3 text-white z-50 select-none animate-slide-down"
      role="dialog"
      aria-label="Control Center"
    >
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Network & Connectivity Column */}
        <div className="rounded-xl bg-white/[0.06] border border-white/10 p-2.5 flex flex-col justify-between space-y-2">
          {/* Wi-Fi Toggle */}
          <button
            onClick={() => {
              const next = !settings.wifiEnabled;
              updateSettings({ wifiEnabled: next });
              addNotification("Wi-Fi", next ? "Connected to Portfolio_5G" : "Wi-Fi turned off");
            }}
            className="flex items-center space-x-2.5 text-left w-full group"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                settings.wifiEnabled ? "bg-blue-500 text-white" : "bg-white/15 text-white/50"
              }`}
            >
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold leading-tight">Wi-Fi</div>
              <div className="text-[10px] text-white/50">
                {settings.wifiEnabled ? "Portfolio_5G" : "Off"}
              </div>
            </div>
          </button>

          {/* Bluetooth Toggle */}
          <button
            onClick={() => {
              const next = !settings.bluetoothEnabled;
              updateSettings({ bluetoothEnabled: next });
              addNotification("Bluetooth", next ? "Bluetooth turned on" : "Bluetooth disabled");
            }}
            className="flex items-center space-x-2.5 text-left w-full group"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                settings.bluetoothEnabled ? "bg-blue-500 text-white" : "bg-white/15 text-white/50"
              }`}
            >
              <Bluetooth className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold leading-tight">Bluetooth</div>
              <div className="text-[10px] text-white/50">
                {settings.bluetoothEnabled ? "Magic Trackpad" : "Off"}
              </div>
            </div>
          </button>

          {/* AirDrop */}
          <div className="flex items-center space-x-2.5 text-left w-full">
            <div className="w-7 h-7 rounded-full bg-white/15 text-white/50 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold leading-tight">AirDrop</div>
              <div className="text-[10px] text-white/50">Contacts Only</div>
            </div>
          </div>
        </div>

        {/* Focus / DND & Sound Toggle Column */}
        <div className="flex flex-col space-y-2">
          {/* Do Not Disturb Toggle */}
          <button
            onClick={() => {
              const next = !settings.dndEnabled;
              updateSettings({ dndEnabled: next });
              addNotification(
                "Do Not Disturb",
                next ? "Focus Mode active" : "Focus Mode deactivated"
              );
            }}
            className={`flex-1 rounded-xl p-2.5 border transition-all text-left flex items-center space-x-2.5 ${
              settings.dndEnabled
                ? "bg-indigo-600/30 border-indigo-500/40 text-white"
                : "bg-white/[0.06] border-white/10 text-white/90 hover:bg-white/[0.09]"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                settings.dndEnabled ? "bg-indigo-500 text-white" : "bg-white/15 text-white/50"
              }`}
            >
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold leading-tight">Focus</div>
              <div className="text-[10px] text-white/50">
                {settings.dndEnabled ? "Do Not Disturb" : "Off"}
              </div>
            </div>
          </button>

          {/* Sound Synthesizer UI feedback */}
          <button
            onClick={() => {
              const next = !settings.soundEnabled;
              updateSettings({ soundEnabled: next });
              addNotification("Audio Feedback", next ? "UI sounds enabled" : "UI sounds muted");
            }}
            className={`flex-1 rounded-xl p-2.5 border transition-all text-left flex items-center space-x-2.5 ${
              settings.soundEnabled
                ? "bg-emerald-600/20 border-emerald-500/30 text-white"
                : "bg-white/[0.06] border-white/10 text-white/70 hover:bg-white/[0.09]"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                settings.soundEnabled ? "bg-emerald-500 text-white" : "bg-white/15 text-white/50"
              }`}
            >
              {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-xs font-semibold leading-tight">UI Sounds</div>
              <div className="text-[10px] text-white/50">
                {settings.soundEnabled ? "Enabled" : "Muted"}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Sliders Section */}
      <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3 mb-2 space-y-3">
        {/* Brightness Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="flex items-center space-x-1.5">
              <Sun className="w-3.5 h-3.5" />
              <span>Display Brightness</span>
            </span>
            <span className="font-mono text-[10px]">{settings.brightness}%</span>
          </div>
          <input
            type="range"
            min={40}
            max={100}
            value={settings.brightness}
            onChange={(e) => updateSettings({ brightness: Number(e.target.value) })}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Volume Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span>System Volume</span>
            </span>
            <span className="font-mono text-[10px]">{settings.volume}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={settings.volume}
            onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>

      {/* Accent Color Chooser */}
      <div className="rounded-xl bg-white/[0.06] border border-white/10 p-2.5 mb-2">
        <div className="text-[11px] font-medium text-white/60 mb-2 flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <Palette className="w-3 h-3" />
            <span>Accent Theme</span>
          </span>
          <span className="capitalize text-white/80">{settings.accentColor}</span>
        </div>
        <div className="flex items-center space-x-2">
          {accentColors.map((col) => (
            <button
              key={col.id}
              onClick={() => setAccentColor(col.id)}
              className={`w-6 h-6 rounded-full ${col.bg} transition-transform flex items-center justify-center ${
                settings.accentColor === col.id ? "scale-110 ring-2 ring-white" : "opacity-80 hover:opacity-100"
              }`}
              title={col.name}
              aria-label={`Select ${col.name} accent`}
            />
          ))}
        </div>
      </div>

      {/* Now Playing Widget */}
      <div className="rounded-xl bg-white/[0.06] border border-white/10 p-2.5 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
          <Music className="w-4 h-4 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold truncate">Focus Ambient Study Beats</div>
          <div className="text-[10px] text-white/50 truncate">Developer Flow State • 128 BPM</div>
        </div>
      </div>
    </div>
  );
}
