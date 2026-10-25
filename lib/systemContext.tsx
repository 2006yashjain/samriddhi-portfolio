"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import {
  AppId,
  WindowState,
  NotificationItem,
  SystemSettings,
  WallpaperId,
  AccentColor,
} from "./types";
import { APPS_REGISTRY } from "./appsRegistry";
import { sounds } from "./soundEffects";

interface SystemContextType {
  // Windows
  windows: WindowState[];
  activeWindowId: string | null;
  activeAppId: AppId | null;
  openWindow: (appId: AppId, customData?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  restartPortfolio: () => void;

  // Settings
  settings: SystemSettings;
  updateSettings: (partial: Partial<SystemSettings>) => void;
  setWallpaper: (wallpaper: WallpaperId) => void;
  setAccentColor: (accent: AccentColor) => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, icon?: string, duration?: number) => void;
  removeNotification: (id: string) => void;

  // Spotlight & Control Center
  isSpotlightOpen: boolean;
  setSpotlightOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isControlCenterOpen: boolean;
  setControlCenterOpen: (open: boolean | ((prev: boolean) => boolean)) => void;

  // Quick Action / Confetti
  triggerConfetti: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [topZIndex, setTopZIndex] = useState<number>(100);

  const [settings, setSettings] = useState<SystemSettings>({
    wallpaper: "dark-void",
    accentColor: "blue",
    soundEnabled: true,
    dockMagnification: true,
    brightness: 100,
    volume: 85,
    wifiEnabled: true,
    bluetoothEnabled: true,
    dndEnabled: false,
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isSpotlightOpen, setSpotlightOpen] = useState(false);
  const [isControlCenterOpen, setControlCenterOpen] = useState(false);

  // Sync sound setting with SoundEffects engine
  useEffect(() => {
    sounds.setEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  const updateSettings = useCallback((partial: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const setWallpaper = useCallback((wallpaper: WallpaperId) => {
    setSettings((prev) => ({ ...prev, wallpaper }));
  }, []);

  const setAccentColor = useCallback((accentColor: AccentColor) => {
    setSettings((prev) => ({ ...prev, accentColor }));
  }, []);

  // Notifications
  const addNotification = useCallback(
    (title: string, message: string, icon?: string, duration: number = 5000) => {
      const id = "notif-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);
      const newNotif: NotificationItem = {
        id,
        title,
        message,
        icon,
        timestamp: "Just now",
        duration,
      };

      setNotifications((prev) => [newNotif, ...prev.slice(0, 4)]);
      sounds.playMessageChime();

      if (duration > 0) {
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, duration);
      }
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Confetti trigger
  const triggerConfetti = useCallback(async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      sounds.playConfetti();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0A84FF", "#30D158", "#FF9F0A", "#FF375F", "#BF5AF2"],
      });
    } catch {
      // ignore
    }
  }, []);

  // Window Focus
  const focusWindow = useCallback(
    (id: string) => {
      setActiveWindowId(id);
      setTopZIndex((prev) => {
        const nextZ = prev + 1;
        setWindows((wins) =>
          wins.map((w) => (w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w))
        );
        return nextZ;
      });
    },
    []
  );

  // Open Window
  const openWindow = useCallback(
    (appId: AppId, customData?: any) => {
      sounds.playWindowOpen();

      // Check if an existing window for this app already exists
      const existing = windows.find((w) => w.appId === appId);
      if (existing) {
        // Bring to front and restore if minimized
        setTopZIndex((prevZ) => {
          const nextZ = prevZ + 1;
          setWindows((wins) =>
            wins.map((w) =>
              w.id === existing.id
                ? {
                    ...w,
                    isMinimized: false,
                    zIndex: nextZ,
                    customData: customData !== undefined ? customData : w.customData,
                  }
                : w
            )
          );
          setActiveWindowId(existing.id);
          return nextZ;
        });
        return;
      }

      // Create new window
      const meta = APPS_REGISTRY[appId];
      if (!meta) return;

      const winId = `win-${appId}-${Date.now()}`;

      // Calculate initial cascade position
      const offsetIndex = windows.length % 6;
      const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;

      const width = Math.min(meta.defaultWidth, screenWidth - 40);
      const height = Math.min(meta.defaultHeight, screenHeight - 120);

      // Centered with cascade offset
      const baseX = Math.max(20, Math.floor((screenWidth - width) / 2) + offsetIndex * 24);
      const baseY = Math.max(50, Math.floor((screenHeight - height) / 2 - 20) + offsetIndex * 24);

      setTopZIndex((prevZ) => {
        const nextZ = prevZ + 1;
        const newWindow: WindowState = {
          id: winId,
          appId,
          title: meta.title,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position: { x: baseX, y: baseY },
          size: { width, height },
          zIndex: nextZ,
          minWidth: meta.minWidth || 480,
          minHeight: meta.minHeight || 320,
          canResize: meta.canResize ?? true,
          customData,
        };

        setWindows((prev) => [...prev, newWindow]);
        setActiveWindowId(winId);
        return nextZ;
      });
    },
    [windows]
  );

  // Close Window
  const closeWindow = useCallback(
    (id: string) => {
      sounds.playClick();
      setWindows((prev) => {
        const remaining = prev.filter((w) => w.id !== id);
        if (activeWindowId === id) {
          // Focus the highest remaining open window
          const openWins = remaining.filter((w) => !w.isMinimized);
          if (openWins.length > 0) {
            const nextActive = openWins.reduce((max, w) => (w.zIndex > max.zIndex ? w : max));
            setActiveWindowId(nextActive.id);
          } else {
            setActiveWindowId(null);
          }
        }
        return remaining;
      });
    },
    [activeWindowId]
  );

  // Minimize Window
  const minimizeWindow = useCallback(
    (id: string) => {
      sounds.playClick();
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
      );
      if (activeWindowId === id) {
        // Choose next active
        const openWins = windows.filter((w) => w.id !== id && !w.isMinimized);
        if (openWins.length > 0) {
          const nextActive = openWins.reduce((max, w) => (w.zIndex > max.zIndex ? w : max));
          setActiveWindowId(nextActive.id);
        } else {
          setActiveWindowId(null);
        }
      }
    },
    [activeWindowId, windows]
  );

  // Maximize / Toggle Maximize
  const maximizeWindow = useCallback((id: string) => {
    sounds.playClick();
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized) {
          // Restore
          return {
            ...w,
            isMaximized: false,
            position: w.previousBounds
              ? { x: w.previousBounds.x, y: w.previousBounds.y }
              : w.position,
            size: w.previousBounds
              ? { width: w.previousBounds.width, height: w.previousBounds.height }
              : w.size,
          };
        } else {
          // Maximize to full desktop minus menu bar and dock
          const menuBarHeight = 32;
          const dockHeight = 74;
          const fullW = typeof window !== "undefined" ? window.innerWidth : 1200;
          const fullH = typeof window !== "undefined" ? window.innerHeight : 800;

          return {
            ...w,
            isMaximized: true,
            previousBounds: {
              x: w.position.x,
              y: w.position.y,
              width: w.size.width,
              height: w.size.height,
            },
            position: { x: 0, y: menuBarHeight },
            size: { width: fullW, height: fullH - menuBarHeight - dockHeight },
          };
        }
      })
    );
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
    );
    focusWindow(id);
  }, [focusWindow]);

  // Update Position
  const updatePosition = useCallback((id: string, pos: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: pos, isMaximized: false } : w))
    );
  }, []);

  // Update Size
  const updateSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size, isMaximized: false } : w))
    );
  }, []);

  // Restart Portfolio safely without full page refresh
  const restartPortfolio = useCallback(() => {
    setWindows([]);
    setActiveWindowId(null);
    setSpotlightOpen(false);
    setControlCenterOpen(false);
    setNotifications([]);
    sounds.playWindowOpen();

    setTimeout(() => {
      addNotification(
        "Portfolio Restarted",
        "Samriddhi's OS environment has been cleanly reinitialized.",
        undefined,
        4000
      );
      openWindow("about");
    }, 300);
  }, [addNotification, openWindow]);

  // Compute active AppId from activeWindowId
  const activeWindow = windows.find((w) => w.id === activeWindowId && !w.isMinimized);
  const activeAppId = activeWindow ? activeWindow.appId : null;

  // Keyboard shortcut listener: Cmd/Ctrl + K for Spotlight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SystemContext.Provider
      value={{
        windows,
        activeWindowId,
        activeAppId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        updatePosition,
        updateSize,
        restartPortfolio,
        settings,
        updateSettings,
        setWallpaper,
        setAccentColor,
        notifications,
        addNotification,
        removeNotification,
        isSpotlightOpen,
        setSpotlightOpen,
        isControlCenterOpen,
        setControlCenterOpen,
        triggerConfetti,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystem must be used within a SystemProvider");
  }
  return context;
}
