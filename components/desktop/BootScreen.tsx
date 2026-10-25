"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  "Initializing system kernel...",
  "Loading desktop environment...",
  "Verifying academic & skills data...",
  "Connecting portfolio applications...",
  "System Ready.",
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (isSkipped) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 250);
          return 100;
        }
        const next = prev + 25;
        const stepIdx = Math.min(
          BOOT_STEPS.length - 1,
          Math.floor((next / 100) * BOOT_STEPS.length)
        );
        setCurrentStep(stepIdx);
        return next;
      });
    }, 240);

    return () => clearInterval(interval);
  }, [isSkipped, onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white select-none"
    >
      {/* OS Glyph */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/20 flex items-center justify-center shadow-2xl shadow-blue-500/10">
          <svg
            className="w-8 h-8 fill-current text-white animate-pulse"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>

      {/* OS Title */}
      <h1 className="text-xl font-bold tracking-widest uppercase text-white/95 mb-4">
        SAMRIDDHI OS
      </h1>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-4 border border-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
          style={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      {/* Boot Step Status */}
      <div className="text-xs font-mono text-white/50 h-5 mb-8">
        {BOOT_STEPS[currentStep]}
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white/80 transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Skip Boot
      </button>
    </motion.div>
  );
}
