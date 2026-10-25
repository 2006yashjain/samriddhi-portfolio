"use client";

import React, { useState } from "react";
import {
  Folder,
  FileText,
  FileCode,
  Image as ImageIcon,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Search,
  ExternalLink,
  Briefcase,
  GitBranch,
  Trash2,
  FolderTree,
  FileBadge,
  Cpu,
  User,
  Mail,
} from "lucide-react";
import {
  finderFavorites,
  initialFinderItems,
  FinderItem,
} from "@/data/finder";
import { useSystem } from "@/lib/systemContext";
import { AppId } from "@/lib/types";

export function FinderApp() {
  const { openWindow } = useSystem();
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [history, setHistory] = useState<string[]>(["root"]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<FinderItem | null>(null);

  // Navigate to folder
  const navigateTo = (folderId: string) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(folderId);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setCurrentFolderId(folderId);
    setSelectedItemId(null);
    setPreviewContent(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setCurrentFolderId(history[newIdx]);
      setSelectedItemId(null);
      setPreviewContent(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setCurrentFolderId(history[newIdx]);
      setSelectedItemId(null);
      setPreviewContent(null);
    }
  };

  const currentItems = initialFinderItems.filter((item) => {
    if (currentFolderId === "root") {
      return item.parentId === "root";
    }
    // Check direct parent or favorites shortcut mapping
    if (currentFolderId === "about") return item.parentId === "folder-about";
    if (currentFolderId === "skills") return item.parentId === "folder-skills";
    if (currentFolderId === "projects") return item.parentId === "folder-projects";
    if (currentFolderId === "resume") return item.parentId === "folder-resume";
    if (currentFolderId === "contact") return item.parentId === "folder-contact";
    return item.parentId === currentFolderId;
  });

  const displayedItems = searchQuery.trim()
    ? initialFinderItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : currentItems;

  const handleItemDoubleClick = (item: FinderItem) => {
    if (item.type === "folder") {
      navigateTo(item.id);
    } else if (item.targetAppId) {
      openWindow(item.targetAppId as AppId);
    } else if (item.content) {
      setPreviewContent(item);
    }
  };

  const getItemIcon = (item: FinderItem) => {
    switch (item.type) {
      case "folder":
        return <Folder className="w-9 h-9 text-blue-400 fill-blue-500/20" />;
      case "pdf":
        return <FileBadge className="w-9 h-9 text-rose-400 fill-rose-500/10" />;
      case "code":
        return <FileCode className="w-9 h-9 text-emerald-400" />;
      case "markdown":
        return <FileText className="w-9 h-9 text-amber-400" />;
      case "image":
        return <ImageIcon className="w-9 h-9 text-purple-400" />;
      case "app":
        return <ExternalLink className="w-9 h-9 text-cyan-400" />;
      default:
        return <FileText className="w-9 h-9 text-white/60" />;
    }
  };

  const getFavoriteIcon = (iconName: string) => {
    switch (iconName) {
      case "user":
        return <User className="w-3.5 h-3.5 text-indigo-400" />;
      case "cpu":
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case "briefcase":
        return <Briefcase className="w-3.5 h-3.5 text-blue-400" />;
      case "file-text":
        return <FileText className="w-3.5 h-3.5 text-amber-400" />;
      case "file-badge":
        return <FileBadge className="w-3.5 h-3.5 text-rose-400" />;
      case "mail":
        return <Mail className="w-3.5 h-3.5 text-sky-400" />;
      case "git-branch":
        return <GitBranch className="w-3.5 h-3.5 text-purple-400" />;
      case "trash-2":
        return <Trash2 className="w-3.5 h-3.5 text-neutral-400" />;
      case "layout-grid":
        return <LayoutGrid className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return <FolderTree className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  return (
    <div className="flex h-full bg-neutral-900/60 select-none text-xs text-white">
      {/* Sidebar / Favorites */}
      <aside className="w-48 bg-neutral-950/40 border-r border-white/10 p-3 flex flex-col justify-between shrink-0">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2 px-2">
            Favorites
          </div>
          <nav className="space-y-0.5">
            {finderFavorites.map((fav) => (
              <button
                key={fav.id}
                onClick={() => navigateTo(fav.id)}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-left transition-colors ${
                  currentFolderId === fav.id
                    ? "bg-blue-600/30 text-white font-medium"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {getFavoriteIcon(fav.icon)}
                <span className="truncate">{fav.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* System identity status */}
        <div className="px-2.5 py-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
          <div className="text-[10px] text-white/40 uppercase font-semibold">User</div>
          <div className="text-[11px] font-medium text-white/80 truncate">Samriddhi Sharma</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation Toolbar */}
        <div className="h-11 px-3 border-b border-white/10 flex items-center justify-between bg-neutral-900/40 shrink-0">
          {/* Back & Forward & Breadcrumbs */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <button
                onClick={goBack}
                disabled={historyIndex === 0}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Back"
                aria-label="Back"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goForward}
                disabled={historyIndex >= history.length - 1}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Forward"
                aria-label="Forward"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-white/50 text-[11px] font-medium pl-1">
              Location: <span className="text-white capitalize">{currentFolderId}</span>
            </div>
          </div>

          {/* View mode toggle and search */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-black/30 rounded-lg p-0.5 border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded ${
                  viewMode === "grid" ? "bg-white/20 text-white" : "text-white/40 hover:text-white"
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded ${
                  viewMode === "list" ? "bg-white/20 text-white" : "text-white/40 hover:text-white"
                }`}
                title="List view"
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Folder Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="pl-7 pr-2 py-1 w-36 focus:w-48 transition-all bg-black/30 rounded-lg border border-white/10 text-[11px] text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Items Container */}
        <div className="flex-1 overflow-auto p-4 relative">
          {displayedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/40">
              <Folder className="w-12 h-12 stroke-[1.2] mb-2 opacity-50" />
              <p>No items found</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all ${
                    selectedItemId === item.id
                      ? "bg-blue-600/30 border border-blue-400/40"
                      : "hover:bg-white/[0.06] border border-transparent"
                  }`}
                >
                  <div className="mb-2">{getItemIcon(item)}</div>
                  <div className="text-[11px] font-medium text-center truncate max-w-full">
                    {item.name}
                  </div>
                  {item.size && (
                    <div className="text-[10px] text-white/40 text-center">{item.size}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Kind</th>
                  <th className="pb-2 font-medium">Date Modified</th>
                  <th className="pb-2 font-medium">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {displayedItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    className={`cursor-pointer transition-colors ${
                      selectedItemId === item.id
                        ? "bg-blue-600/30 text-white"
                        : "hover:bg-white/[0.05] text-white/80"
                    }`}
                  >
                    <td className="py-2 flex items-center space-x-2">
                      <span className="scale-75">{getItemIcon(item)}</span>
                      <span className="font-medium truncate">{item.name}</span>
                    </td>
                    <td className="py-2 capitalize text-white/50">{item.type}</td>
                    <td className="py-2 text-white/50">{item.dateModified}</td>
                    <td className="py-2 text-white/50">{item.size || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Quick Preview Slide-in */}
          {previewContent && (
            <div className="absolute inset-y-0 right-0 w-80 bg-neutral-900/95 backdrop-blur-2xl border-l border-white/15 p-4 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-semibold text-xs truncate">{previewContent.name}</span>
                  <button
                    onClick={() => setPreviewContent(null)}
                    className="text-white/40 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-3 font-mono text-[11px] text-white/80 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                  {previewContent.content}
                </div>
              </div>
              <div className="text-[10px] text-white/40 pt-3 border-t border-white/10">
                Quick Look Preview
              </div>
            </div>
          )}
        </div>

        {/* Footer Status Bar */}
        <div className="h-6 px-3 border-t border-white/10 bg-neutral-950/40 flex items-center justify-between text-[10px] text-white/40 shrink-0">
          <span>{displayedItems.length} items</span>
          <span>Double-click to open</span>
        </div>
      </div>
    </div>
  );
}
