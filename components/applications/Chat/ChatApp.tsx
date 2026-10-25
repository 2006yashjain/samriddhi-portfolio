"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Bot,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import {
  defaultChatContact,
  quickQuestions,
  initialMessages,
  getChatBotResponse,
  ChatMessage,
} from "@/data/chat";
import { useSystem } from "@/lib/systemContext";
import { AppId } from "@/lib/types";

export function ChatApp() {
  const { openWindow } = useSystem();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    setIsTyping(true);

    setTimeout(() => {
      const botReply = getChatBotResponse(text);
      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: botReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        action: botReply.action,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full bg-neutral-900/60 select-text text-white">
      {/* Left Sidebar */}
      <aside className="w-56 bg-neutral-950/40 border-r border-white/10 p-3 flex flex-col justify-between shrink-0 select-none">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2 px-2">
            Conversations
          </div>

          <div className="p-2.5 rounded-xl bg-blue-600/25 border border-blue-500/30 flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
                {defaultChatContact.avatarText}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-neutral-900 rounded-full animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold truncate text-white">
                {defaultChatContact.name}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium truncate">
                {defaultChatContact.statusText}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/5 text-[10px] text-white/50 leading-relaxed">
          Grounded exclusively on Samriddhi Sharma&apos;s verified portfolio information.
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between bg-neutral-900/40 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="text-xs font-bold text-white">{defaultChatContact.name}</div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
              {defaultChatContact.role}
            </span>
          </div>
        </div>

        {/* Quick Questions Chips */}
        <div className="px-4 py-2 border-b border-white/[0.06] bg-neutral-950/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] text-white/40 shrink-0 mr-1 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Ask:</span>
          </span>
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] text-white/80 hover:text-white transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isUser
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white/10 border border-white/10 text-white/95 rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-white/15">
                      <button
                        onClick={() => openWindow(msg.action!.appId as AppId)}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/30 hover:bg-blue-500/50 border border-blue-400/40 text-[11px] text-blue-200 font-medium flex items-center space-x-1.5 transition-colors"
                      >
                        <span>{msg.action.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-white/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl bg-white/10 border border-white/10 w-16">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-white/10 bg-neutral-950/40 shrink-0">
          <div className="flex items-center space-x-2 bg-neutral-800/80 rounded-xl px-3 py-1.5 border border-white/10 focus-within:border-blue-500">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Samriddhi's education, skills, achievements..."
              className="flex-1 bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim()}
              className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
