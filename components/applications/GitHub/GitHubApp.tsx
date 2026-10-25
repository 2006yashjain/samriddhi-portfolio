"use client";

import React, { useState } from "react";
import { ArrowLeft, ExternalLink, Folder, Github, MapPin, Clock3 } from "lucide-react";
import { githubProfile, githubRepositories, Repository } from "@/data/github";

function RepositoryDetails({ repository, onBack }: { repository: Repository; onBack: () => void }) {
  return (
    <div className="h-full overflow-y-auto bg-[#0d1117] p-5 sm:p-7 text-[#c9d1d9]">
      <button onClick={onBack} className="mb-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#58a6ff] hover:bg-white/5"><ArrowLeft size={15}/> Back to repositories</button>
      <div className="flex items-start gap-3"><Folder className="mt-1 text-amber-400"/><div><h2 className="text-xl font-semibold text-white">{repository.name}</h2><p className="mt-1 text-xs text-[#8b949e]">{repository.language}</p></div></div>
      {repository.description && <section className="mt-6"><h3 className="text-xs font-semibold uppercase tracking-wide text-[#8b949e]">Overview</h3><p className="mt-2 text-sm leading-6">{repository.description}</p></section>}
      <section className="mt-6"><h3 className="text-xs font-semibold uppercase tracking-wide text-[#8b949e]">Technologies</h3><div className="mt-2 flex flex-wrap gap-2">{repository.technologies.map((tech) => <span key={tech} className="rounded-full border border-[#30363d] bg-[#161b22] px-3 py-1 text-xs">{tech}</span>)}</div></section>
      {repository.features?.length ? <section className="mt-6"><h3 className="text-xs font-semibold uppercase tracking-wide text-[#8b949e]">Features</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">{repository.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section> : null}
      <div className="mt-7 flex items-center gap-2"><a href={repository.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#238636] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#2ea043]">Open GitHub <ExternalLink size={14}/></a>{repository.homepage && <a href={repository.homepage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#30363d] px-4 py-2.5 text-xs hover:bg-white/5">Live Demo <ExternalLink size={14}/></a>}</div>
    </div>
  );
}

export function GitHubApp() {
  const [selected, setSelected] = useState<Repository | null>(null);
  return (
    <div className="flex h-full flex-col bg-[#0d1117] text-[#c9d1d9]">
      <div className="shrink-0 border-b border-[#30363d] bg-[#161b22] p-5">
        <div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#21262d]"><Github size={25} className="text-white"/></div><div className="min-w-0"><h2 className="font-semibold text-white">{githubProfile.name}</h2><p className="text-xs text-[#8b949e]">@{githubProfile.username}</p></div></div><a href={githubProfile.githubUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub profile" className="rounded-lg border border-[#30363d] p-2 hover:bg-white/5"><ExternalLink size={16}/></a></div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#8b949e]"><MapPin size={13}/>{githubProfile.location}<span className="mx-1">·</span>{githubRepositories.length} repositories</div>
      </div>
      {selected ? <RepositoryDetails repository={selected} onBack={() => setSelected(null)}/> : <div className="flex-1 overflow-y-auto p-4 sm:p-5"><div className="mb-3 text-xs font-semibold text-[#8b949e]">Repositories</div><div className="divide-y divide-[#30363d] rounded-xl border border-[#30363d]">{githubRepositories.map((repo) => <button key={repo.id} onClick={() => setSelected(repo)} className="flex w-full items-center gap-3 p-4 text-left transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-[#161b22]"><Folder className="shrink-0 text-amber-400" size={20}/><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-[#58a6ff]">{repo.name}</span><span className="mt-1 block truncate text-xs text-[#8b949e]">{repo.description}</span><span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#8b949e]"><span>{repo.language}</span><span className="inline-flex items-center gap-1"><Clock3 size={11}/>Updated {new Date(repo.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span></span></span><span className="text-xs text-[#8b949e]">Details →</span></button>)}</div></div>}
    </div>
  );
}
