"use client"
import Link from "next/link"

function ProjectCard({ title, desc, tech = [], live, repo }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6 h-full">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-slate-300">{desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/15 bg-black/40 px-3 py-1.5 text-sm text-white hover:border-cyan-400/40 hover:text-cyan-200 transition"
          >
            Live
          </a>
        )}
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/15 bg-black/40 px-3 py-1.5 text-sm text-white hover:border-cyan-400/40 hover:text-cyan-200 transition"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  )
}

export default function ProjectsIndex() {
  const list = [
    {
      title: "Interactive Web App",
      desc: "Animated dashboard with charts and real‑time updates.",
      tech: ["Next.js", "Tailwind", "Recharts"],
      live: "#",
      repo: "#",
    },
    {
      title: "Landing Page Kit",
      desc: "Sleek marketing site with reusable sections and great a11y.",
      tech: ["React", "Framer Motion"],
      live: "#",
      repo: "#",
    },
    {
      title: "Interactive Portfolio",
      desc: "Portfolio with particles, smooth scroll, and playground.",
      tech: ["Next.js", "Tailwind"],
      live: "#",
      repo: "#",
    },
    // Add more here as needed
  ]

  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-[#0b1020] to-[#0a0f1f]">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">All Projects</h1>
          <Link href="/" className="text-cyan-300 hover:text-white">
            ← Back
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {list.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </main>
  )
}
