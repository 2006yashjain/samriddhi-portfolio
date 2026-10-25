"use client";

import React, { useState } from "react";
import {
  Printer,
  ZoomIn,
  ZoomOut,
  FileText,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { contactData } from "@/data/contact";
import { skillGroups } from "@/data/skills";

export function ResumeApp() {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e24] select-text text-neutral-900">
      {/* Document Viewer Toolbar */}
      <div className="h-11 px-4 border-b border-white/10 bg-neutral-900/90 text-white flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-medium">Samriddhi_Sharma_Resume</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60">
            Overview
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/10">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(75, prev - 10))}
              className="p-1 rounded hover:bg-white/15 text-white/70 hover:text-white"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-2 text-white/80">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(125, prev + 10))}
              className="p-1 rounded hover:bg-white/15 text-white/70 hover:text-white"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="Print Resume"
            aria-label="Print resume"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

      {/* Main Document Viewer Canvas */}
      <div className="flex-1 overflow-auto p-6 flex flex-col items-center bg-neutral-950/40">
        {/* Structured Resume Sheet */}
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
          className="w-full max-w-2xl bg-white text-neutral-900 rounded-lg shadow-2xl p-8 md:p-10 font-sans transition-transform duration-150"
        >
          {/* Header */}
          <header className="border-b-2 border-neutral-800 pb-4 mb-5">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
              {profileData.name}
            </h1>
            <div className="text-sm font-semibold text-neutral-700 mt-0.5">
              Second-Year BTech CSE Student • JECRC University, Jaipur
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600 mt-2">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-neutral-500" />
                <span>{contactData.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Mail className="w-3 h-3 text-neutral-500" />
                <span>{contactData.email}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Phone className="w-3 h-3 text-neutral-500" />
                <span>{contactData.phone}</span>
              </span>
              <a href={contactData.github} target="_blank" rel="noreferrer" className="text-blue-700 underline">GitHub</a>
            </div>
          </header>

          {/* Education */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-200 pb-1 mb-2.5">
              Education
            </h2>
            {profileData.education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-neutral-950">{edu.degree}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium">{edu.period}</span>
                </div>
                <div className="text-xs font-medium text-neutral-700">{edu.institution}</div>
                <p className="text-[11px] text-neutral-600 mt-0.5">{edu.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-200 pb-1 mb-2.5">Skills</h2>
            <div className="space-y-1 text-xs text-neutral-700">{skillGroups.map((group) => <p key={group.category}><strong>{group.category}:</strong> {group.skills.join(", ")}</p>)}</div>
          </section>
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-200 pb-1 mb-2.5">Projects</h2>
            <ul className="space-y-1.5 text-xs text-neutral-800">{projectsData.map((project) => <li key={project.id}><strong>{project.name}</strong> — {project.language}</li>)}</ul>
          </section>

          {/* Academic & Competitive Achievements */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-200 pb-1 mb-2.5">
              Achievements
            </h2>
            <ul className="space-y-1.5 text-xs text-neutral-800">
              {profileData.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-neutral-400">•</span>
                  <span>
                    <strong>{item.title}:</strong> {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Interests */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-200 pb-1 mb-2">
              Interests
            </h2>
            <p className="text-xs text-neutral-700">
              {profileData.interests.join(" • ")}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
