"use client";

import React from "react";
import { useSystem } from "@/lib/systemContext";

export function Wallpaper() {
  const { settings } = useSystem();

  const getWallpaperBackground = () => {
    switch (settings.wallpaper) {
      case "aurora-night":
        return (
          <div className="absolute inset-0 bg-[#061014] overflow-hidden pointer-events-none select-none">
            {/* Ambient gradients */}
            <div className="absolute -top-[20%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-emerald-900/25 blur-[120px] mix-blend-screen" />
            <div className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-teal-900/20 blur-[130px] mix-blend-screen" />
            <div className="absolute -bottom-[25%] left-[20%] w-[70vw] h-[50vw] rounded-full bg-indigo-950/40 blur-[140px]" />
            {/* Subtle landscape silhouette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            {/* Fine grain overlay */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        );

      case "minimal-dusk":
        return (
          <div className="absolute inset-0 bg-[#0b0813] overflow-hidden pointer-events-none select-none">
            <div className="absolute -top-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/25 blur-[130px]" />
            <div className="absolute bottom-[0%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/20 blur-[140px]" />
            <div className="absolute top-[40%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-rose-950/20 blur-[120px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        );

      case "cyber-nebula":
        return (
          <div className="absolute inset-0 bg-[#080d14] overflow-hidden pointer-events-none select-none">
            <div className="absolute -top-[20%] left-[15%] w-[55vw] h-[55vw] rounded-full bg-cyan-900/20 blur-[140px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-950/25 blur-[130px]" />
            <div className="absolute top-[25%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/25 blur-[120px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        );

      case "dark-void":
      default:
        return (
          <div className="absolute inset-0 bg-[#090b10] overflow-hidden pointer-events-none select-none">
            {/* Elegant deep space lighting */}
            <div className="absolute -top-[25%] -left-[15%] w-[70vw] h-[70vw] rounded-full bg-blue-950/30 blur-[150px]" />
            <div className="absolute top-[20%] -right-[15%] w-[65vw] h-[65vw] rounded-full bg-indigo-950/25 blur-[160px]" />
            <div className="absolute -bottom-[20%] left-[25%] w-[60vw] h-[50vw] rounded-full bg-slate-900/40 blur-[130px]" />
            {/* Subtle soft horizon lighting */}
            <div className="absolute bottom-0 inset-x-0 h-[45vh] bg-gradient-to-t from-[#040608] via-[#090b10]/60 to-transparent" />
            {/* Fine texture */}
            <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
        );
    }
  };

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
      style={{
        filter: `brightness(${settings.brightness}%)`,
      }}
    >
      {getWallpaperBackground()}
    </div>
  );
}
