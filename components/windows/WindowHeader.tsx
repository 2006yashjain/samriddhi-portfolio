"use client";

import React, { ReactNode } from "react";
import { WindowControls } from "./WindowControls";

interface WindowHeaderProps {
  title: string;
  isFocused: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onDoubleClick?: () => void;
  children?: ReactNode;
}

export function WindowHeader({
  title,
  isFocused,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onDoubleClick,
  children,
}: WindowHeaderProps) {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className={`h-10 px-3.5 flex items-center justify-between border-b select-none transition-colors cursor-move rounded-t-xl ${
        isFocused
          ? "bg-neutral-800/90 border-white/15 text-white/90"
          : "bg-neutral-900/60 border-white/10 text-white/40"
      }`}
    >
      {/* Left traffic lights */}
      <div className="flex items-center space-x-3 w-28 shrink-0">
        <WindowControls
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          isMaximized={isMaximized}
        />
      </div>

      {/* Centered Title */}
      <div className="flex-1 text-center font-medium text-xs tracking-tight truncate px-2">
        {title}
      </div>

      {/* Right accessory slots (or balanced spacer) */}
      <div className="flex items-center justify-end w-28 shrink-0 space-x-1.5 text-xs">
        {children}
      </div>
    </div>
  );
}
