"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  Linkedin,
  Github,
  MapPin,
  ExternalLink,
  Copy,
  CheckCircle2,
  SendHorizontal,
} from "lucide-react";
import { contactData } from "@/data/contact";
import { useSystem } from "@/lib/systemContext";

export function ContactApp() {
  const { addNotification } = useSystem();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addNotification("Contact", "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      addNotification(
        "Message Drafted",
        `Thank you ${formData.name}. Mail ready to deliver to ${contactData.email}.`
      );
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    addNotification("Copied Email", contactData.email);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contactData.phone);
    addNotification("Copied Phone Number", contactData.phone);
  };

  return (
    <div className="flex h-full bg-neutral-900/60 select-text text-white">
      {/* Left Sidebar Info Card */}
      <aside className="w-64 bg-neutral-950/40 border-r border-white/10 p-5 flex flex-col justify-between shrink-0 select-none">
        <div className="space-y-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1">
              Contact Card
            </div>
            <h2 className="text-base font-bold text-white">{contactData.name}</h2>
            <div className="text-xs text-white/60 flex items-center space-x-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{contactData.location}</span>
            </div>
          </div>

          {/* Direct Action Buttons */}
          <div className="space-y-2">
            {/* Email Button */}
            <a
              href={contactData.emailLink}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-xs text-white font-medium transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Email</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/40" />
            </a>

            {/* Call Button */}
            <a
              href={contactData.phoneLink}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-xs text-white font-medium transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Phone</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/40" />
            </a>

            {/* LinkedIn Button */}
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs text-white font-medium transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/40" />
            </a>

            {/* GitHub Button */}
            <a
              href={contactData.github}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs text-white font-medium transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Github className="w-4 h-4 text-purple-400" />
                <span>GitHub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/40" />
            </a>
          </div>
        </div>

        {/* Copy Details Block */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <button
            onClick={handleCopyEmail}
            className="w-full py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white/70 hover:text-white transition-colors flex items-center justify-between"
          >
            <span className="truncate">{contactData.email}</span>
            <Copy className="w-3 h-3 text-white/40 ml-1 shrink-0" />
          </button>
          <button
            onClick={handleCopyPhone}
            className="w-full py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white/70 hover:text-white transition-colors flex items-center justify-between"
          >
            <span className="font-mono">{contactData.phone}</span>
            <Copy className="w-3 h-3 text-white/40 ml-1 shrink-0" />
          </button>
        </div>
      </aside>

      {/* Main Mail Compose Form */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-11 px-4 border-b border-white/10 flex items-center justify-between bg-neutral-900/40 shrink-0">
          <div className="text-xs font-bold text-white flex items-center space-x-2">
            <SendHorizontal className="w-4 h-4 text-blue-400" />
            <span>Send Direct Message</span>
          </div>
          <span className="text-[10px] text-white/40 font-mono">Mail Client</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isSent ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">Message Ready</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Your message has been processed. You can also contact Samriddhi directly at{" "}
                <span className="text-blue-400 font-mono">{contactData.email}</span>.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              {/* To field (read only) */}
              <div className="flex items-center text-xs border-b border-white/10 pb-2.5">
                <span className="w-16 text-white/40 font-medium">To:</span>
                <span className="font-mono text-white/90 bg-white/10 px-2 py-0.5 rounded text-[11px]">
                  {contactData.email}
                </span>
              </div>

              {/* Sender Name */}
              <div className="flex items-center text-xs border-b border-white/10 pb-2.5">
                <label htmlFor="contact-sender-name" className="w-16 text-white/40 font-medium">
                  Name:
                </label>
                <input
                  id="contact-sender-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-xs"
                />
              </div>

              {/* Sender Email */}
              <div className="flex items-center text-xs border-b border-white/10 pb-2.5">
                <label htmlFor="contact-sender-email" className="w-16 text-white/40 font-medium">
                  Email:
                </label>
                <input
                  id="contact-sender-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-xs"
                />
              </div>

              {/* Subject */}
              <div className="flex items-center text-xs border-b border-white/10 pb-2.5">
                <label htmlFor="contact-sender-subject" className="w-16 text-white/40 font-medium">
                  Subject:
                </label>
                <input
                  id="contact-sender-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Inquiry / Collaboration"
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-xs"
                />
              </div>

              {/* Message Body */}
              <div className="pt-2">
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ name: "", email: "", subject: "", message: "" })}
                  className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
