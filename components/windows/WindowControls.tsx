"use client";

import React, { useState } from "react";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

export function WindowControls({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}: WindowControlsProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center space-x-2 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Close Button (Red) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-black/80 hover:opacity-90 active:opacity-75 focus:outline-none"
        aria-label="Close Window"
        title="Close"
      >
        {isHovered && <X className="w-2 h-2 text-neutral-900" />}
      </button>

      {/* Minimize Button (Yellow) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-black/80 hover:opacity-90 active:opacity-75 focus:outline-none"
        aria-label="Minimize Window"
        title="Minimize"
      >
        {isHovered && <Minus className="w-2 h-2 text-neutral-900" />}
      </button>

      {/* Maximize / Restore Button (Green) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
        className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-black/80 hover:opacity-90 active:opacity-75 focus:outline-none"
        aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
        title={isMaximized ? "Restore" : "Maximize"}
      >
        {isHovered &&
          (isMaximized ? (
            <Minimize2 className="w-1.5 h-1.5 text-neutral-900" />
          ) : (
            <Maximize2 className="w-1.5 h-1.5 text-neutral-900" />
          ))}
      </button>
    </div>
  );
}
