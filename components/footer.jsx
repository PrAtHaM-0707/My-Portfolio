"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Pratham Mittal. All rights reserved.</p>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#about" className="text-slate-300 hover:text-white">
              About
            </a>
            <a href="#playground" className="text-slate-300 hover:text-white">
              Playground
            </a>
            <a href="#projects" className="text-slate-300 hover:text-white">
              Projects
            </a>
            {/* <Link href="/projects" className="text-cyan-300 hover:text-white">
              All Projects
            </Link> */}
          </nav>
        </div>
      </div>
    </footer>
  )
}
