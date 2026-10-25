"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowState } from "@/lib/types";
import { WindowHeader } from "./WindowHeader";
import { useSystem } from "@/lib/systemContext";

interface WindowProps {
  window: WindowState;
  children: ReactNode;
  headerAccessories?: ReactNode;
}

export function Window({ window: win, children, headerAccessories }: WindowProps) {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updatePosition,
    updateSize,
  } = useSystem();

  const isFocused = activeWindowId === win.id;
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const resizeStartRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  }>({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

  // Handle Resizing
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    focusWindow(win.id);

    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: win.size.width,
      startHeight: win.size.height,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const deltaX = e.clientX - resizeStartRef.current.startX;
      const deltaY = e.clientY - resizeStartRef.current.startY;

      const newWidth = Math.max(win.minWidth, resizeStartRef.current.startWidth + deltaX);
      const newHeight = Math.max(win.minHeight, resizeStartRef.current.startHeight + deltaY);

      updateSize(win.id, { width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
      }
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, updateSize, win.id, win.minWidth, win.minHeight]);

  if (win.isMinimized) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      }}
      onClick={() => focusWindow(win.id)}
      className={`flex flex-col rounded-xl overflow-hidden backdrop-blur-2xl transition-shadow ${
        isFocused
          ? "shadow-window-focused bg-neutral-900/90 border border-white/20 ring-1 ring-white/10"
          : "shadow-window bg-neutral-900/75 border border-white/10"
      }`}
    >
      {/* Draggable Window Header */}
      <motion.div
        drag={!win.isMaximized}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => {
          setIsDragging(true);
          focusWindow(win.id);
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
          const screenH = typeof window !== "undefined" ? window.innerHeight : 800;

          // Clamped within bounds (keeping at least 100px visible)
          const newX = Math.min(Math.max(-win.size.width + 100, win.position.x + info.offset.x), screenW - 100);
          const newY = Math.max(28, Math.min(win.position.y + info.offset.y, screenH - 100));

          updatePosition(win.id, { x: newX, y: newY });
        }}
      >
        <WindowHeader
          title={win.title}
          isFocused={isFocused}
          isMaximized={win.isMaximized}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onDoubleClick={() => maximizeWindow(win.id)}
        >
          {headerAccessories}
        </WindowHeader>
      </motion.div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto relative text-white/90 select-text">
        {children}
      </div>

      {/* Resize Grip (bottom-right) */}
      {win.canResize && !win.isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-20 group"
          title="Resize window"
        >
          <div className="w-2 h-2 border-r-2 border-b-2 border-white/20 group-hover:border-white/60 transition-colors" />
        </div>
      )}
    </motion.div>
  );
}
