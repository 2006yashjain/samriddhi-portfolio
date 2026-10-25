export type AppId =
  | "finder"
  | "about"
  | "skills"
  | "projects"
  | "github"
  | "terminal"
  | "chat"
  | "resume"
  | "contact"
  | "settings";

export interface AppMetadata {
  id: AppId;
  title: string;
  iconName: string;
  defaultWidth: number;
  defaultHeight: number;
  minWidth?: number;
  minHeight?: number;
  canResize?: boolean;
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  previousBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  zIndex: number;
  minWidth: number;
  minHeight: number;
  canResize: boolean;
  customData?: any;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  icon?: string;
  timestamp: string;
  duration?: number;
}

export type WallpaperId = "dark-void" | "aurora-night" | "minimal-dusk" | "cyber-nebula";

export type AccentColor = "blue" | "purple" | "emerald" | "amber" | "rose";

export interface SystemSettings {
  wallpaper: WallpaperId;
  accentColor: AccentColor;
  soundEnabled: boolean;
  dockMagnification: boolean;
  brightness: number;
  volume: number;
  wifiEnabled: boolean;
  bluetoothEnabled: boolean;
  dndEnabled: boolean;
}
