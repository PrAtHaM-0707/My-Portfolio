"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#playground", label: "Playground" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [elevated, setElevated] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setElevated(window.scrollY > 12)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onClick = useCallback((e, href) => {
    e.preventDefault()
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-[9999] flex justify-center">
      <nav
        className={[
          "flex items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-md transition-all duration-500",
          elevated ? "border-white/15 bg-black/40 shadow-xl shadow-black/20" : "border-white/10 bg-black/30",
        ].join(" ")}
      >
        {links.map((l, idx) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => onClick(e, l.href)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative rounded-full px-4 py-1.5 text-sm text-neutral-200 transition-all duration-300"
            style={{
              transform: hoveredIndex === idx ? "translateY(-2px) scale(1.05)" : "translateY(0) scale(1)",
            }}
          >
            {/* Animated gradient background */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 blur-sm transition-opacity duration-300"
              style={{
                opacity: hoveredIndex === idx ? 0.3 : 0,
              }}
            />
            
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300"
              style={{
                opacity: hoveredIndex === idx ? 0.2 : 0,
                backgroundSize: "200% 100%",
                animation: hoveredIndex === idx ? "shimmer 1.5s infinite" : "none",
              }}
            />
            
            {/* Glow effect */}
            <div
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 blur-md transition-opacity duration-300"
              style={{
                opacity: hoveredIndex === idx ? 0.6 : 0,
              }}
            />
            
            {/* Border shine */}
            <div
              className="absolute inset-0 rounded-full border border-white/40 opacity-0 transition-opacity duration-300"
              style={{
                opacity: hoveredIndex === idx ? 1 : 0,
              }}
            />
            
            <span
              className="relative z-10 transition-all duration-300"
              style={{
                color: hoveredIndex === idx ? "#ffffff" : "#d4d4d4",
                textShadow: hoveredIndex === idx ? "0 0 20px rgba(96, 165, 250, 0.5)" : "none",
                fontWeight: hoveredIndex === idx ? 600 : 400,
              }}
            >
              {l.label}
            </span>
          </a>
        ))}
      </nav>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </header>
  )
}