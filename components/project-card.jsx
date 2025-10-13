"use client"

export default function ProjectCard({ title, desc }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.04]">
      <h3 className="mb-2 text-lg font-medium text-white">{title}</h3>
      <p className="text-neutral-300 leading-relaxed">{desc}</p>
    </div>
  )
}
