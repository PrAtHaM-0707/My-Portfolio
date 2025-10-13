"use client"

function PreviewWindow({ alt, query }) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-black/20">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <span className="ml-3 text-[11px] text-white/60">preview</span>
      </div>
      <img
        src={`/abstract-geometric-shapes.png?height=420&width=720&query=${encodeURIComponent(
          query || "project preview website",
        )}`}
        alt={alt}
        className="w-full h-auto"
      />
    </div>
  )
}

function ProjectCard({ title, description, tags = [], live, repo }) {
  return (
    <div className="w-full h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col">
      <h3 className="text-white text-xl font-semibold">{title}</h3>
      <p className="text-white/70 mt-2 text-sm leading-relaxed">{description}</p>

      {!!tags.length && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex gap-3">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md bg-cyan-500/90 hover:bg-cyan-400 text-black px-3 py-1.5 text-sm font-medium transition-colors"
          >
            Live
          </a>
        )}
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-white/15 hover:border-white/30 text-white px-3 py-1.5 text-sm font-medium transition-colors"
          >
            Code
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const items = [
    {
      side: "preview-left",
      title: "YapYard",
      description: "A modern, responsive web app with smooth animations and a clean, accessible design.",
      tags: ["React", "Next.js", "UI/UX"],
      query: "modern web app dashboard preview",
      live: "#",
      repo: "#",
    },
    {
      side: "preview-right",
      title: "Project Two",
      description: "High-performance frontend with focus on accessibility, performance, and DX.",
      tags: ["Performance", "Accessibility", "Tailwind"],
      query: "landing page hero preview",
      live: "#",
      repo: "#",
    },
    {
      side: "preview-left",
      title: "Project Three",
      description: "Interactive experience featuring micro-interactions and delightful motion.",
      tags: ["Framer Motion", "Interactions", "Design"],
      query: "interactive website preview",
      live: "#",
      repo: "#",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Projects</h2>
          <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
            A selection of work. Each project includes a quick preview and a description card with links.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          {items.map((p, idx) => {
            const isReverse = p.side === "preview-right"
            return (
              <div
                key={p.title}
                className={`grid items-stretch gap-6 md:grid-cols-2 ${isReverse ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <PreviewWindow alt={`${p.title} preview`} query={p.query} />
                <ProjectCard title={p.title} description={p.description} tags={p.tags} live={p.live} repo={p.repo} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
