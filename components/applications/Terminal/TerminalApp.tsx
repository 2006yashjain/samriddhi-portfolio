"use client";

import React, { useState, useRef, useEffect } from "react";
import { terminalCommands, TerminalOutputLine } from "@/data/terminal";
import { useSystem } from "@/lib/systemContext";
import { AppId } from "@/lib/types";

interface HistoryEntry {
  command: string;
  output: TerminalOutputLine[];
}

export function TerminalApp() {
  const { openWindow, triggerConfetti } = useSystem();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "neofetch",
      output: terminalCommands["neofetch"].execute([]),
    },
    {
      command: "",
      output: [
        {
          type: "info",
          content: 'Samriddhi OS Terminal initialized. Type "help" to view all available commands.',
        },
      ],
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>(["neofetch"]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = inputVal.trim();
      if (!trimmed) {
        setHistory((prev) => [...prev, { command: "", output: [] }]);
        setInputVal("");
        return;
      }

      setCommandHistory((prev) => [trimmed, ...prev]);
      setHistoryPointer(-1);

      const parts = trimmed.split(" ").filter(Boolean);
      const cmdName = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (cmdName === "clear") {
        setHistory([]);
        setInputVal("");
        return;
      }

      const cmd = terminalCommands[cmdName];
      let output: TerminalOutputLine[] = [];

      if (cmd) {
        output = cmd.execute(args, {
          openApp: (app: string, customData?: any) => openWindow(app as AppId, customData),
          triggerConfetti,
          clearHistory: () => setHistory([]),
        });
      } else {
        output = [
          {
            type: "error",
            content: `zsh: command not found: ${cmdName}. Type "help" for a list of commands.`,
          },
        ];
      }

      setHistory((prev) => [...prev, { command: trimmed, output }]);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextPointer = Math.min(commandHistory.length - 1, historyPointer + 1);
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPointer = historyPointer - 1;
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer]);
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (current) {
        const match = Object.keys(terminalCommands).find((k) => k.startsWith(current));
        if (match) {
          setInputVal(match);
        }
      }
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="h-full bg-[#0c0d12]/95 p-4 font-mono text-xs overflow-y-auto select-text relative cursor-text text-white/90"
    >
      {/* History Items */}
      {history.map((entry, idx) => (
        <div key={idx} className="mb-2 leading-relaxed">
          {entry.command && (
            <div className="flex items-center space-x-2 text-white">
              <span className="text-emerald-400 font-semibold">samriddhi@portfolio</span>
              <span className="text-blue-400">~</span>
              <span className="text-white/60">%</span>
              <span className="text-white font-medium">{entry.command}</span>
            </div>
          )}

          {entry.output.map((line, lineIdx) => {
            if (line.type === "error") {
              return (
                <div key={lineIdx} className="text-rose-400 mt-0.5 whitespace-pre-wrap">
                  {line.content}
                </div>
              );
            }
            if (line.type === "success") {
              return (
                <div key={lineIdx} className="text-emerald-400 mt-0.5 whitespace-pre-wrap font-medium">
                  {line.content}
                </div>
              );
            }
            if (line.type === "info") {
              return (
                <div key={lineIdx} className="text-cyan-400 mt-0.5 whitespace-pre-wrap">
                  {line.content}
                </div>
              );
            }
            if (line.type === "ascii") {
              return (
                <pre key={lineIdx} className="text-amber-300 font-mono text-[10px] leading-tight my-1 overflow-x-auto">
                  {line.content}
                </pre>
              );
            }
            return (
              <div key={lineIdx} className="text-white/80 mt-0.5 whitespace-pre-wrap">
                {line.content}
              </div>
            );
          })}
        </div>
      ))}

      {/* Current Prompt Line */}
      <div className="flex items-center space-x-2 text-white">
        <span className="text-emerald-400 font-semibold">samriddhi@portfolio</span>
        <span className="text-blue-400">~</span>
        <span className="text-white/60">%</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white p-0 m-0 focus:ring-0"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
        />
      </div>

      <div ref={terminalEndRef} />
    </div>
  );
}
