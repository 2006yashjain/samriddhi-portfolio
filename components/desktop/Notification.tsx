"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Bell } from "lucide-react";
import { useSystem } from "@/lib/systemContext";

export function NotificationContainer() {
  const { notifications, removeNotification } = useSystem();

  return (
    <div
      className="fixed top-9 right-4 z-50 flex flex-col space-y-2 pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence>
        {notifications.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto w-80 rounded-2xl bg-neutral-900/90 backdrop-blur-2xl border border-white/15 p-3.5 shadow-2xl text-white flex items-start space-x-3"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white/95 truncate">
                  {item.title}
                </h4>
                <span className="text-[10px] text-white/40">{item.timestamp}</span>
              </div>
              <p className="text-xs text-white/75 mt-0.5 leading-relaxed break-words">
                {item.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(item.id)}
              className="text-white/40 hover:text-white transition-colors p-0.5 -mr-1 -mt-1"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
