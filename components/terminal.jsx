"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function Terminal() {
  const [lines, setLines] = useState([
    "Welcome to the terminal. Type 'help' to see available commands.",
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef(null)
  const hasRun = useRef(false) // ✅ guard to prevent double-run in dev

  const print = (text) => setLines((prev) => [...prev, String(text)])

  const run = (cmd) => {
    const [name, ...rest] = cmd.trim().split(" ")
    const arg = rest.join(" ")
    switch (name) {
      case "help":
        print(
          "Available: help, echo <text>, date, clear, about, playground, skills, projects, contact"
        )
        break
      case "echo":
        print(arg)
        break
      case "date":
        print(new Date().toString())
        break
      case "clear":
        setLines([])
        break
      case "whoami":
        print("pratham mittal - web developer")
        break
      case "playground":
      case "skills":
      case "about":
      case "projects":
      case "contact": {
        const target = document.getElementById(name)
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        else print(`Section '#${name}' not found.`)
        break
      }
      case "":
        break
      default:
        print(`Command not found: ${name}`)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const cmd = input
    if (cmd.trim().length > 0) {
      setLines((prev) => [...prev, `> ${cmd}`])
      run(cmd)
    } else {
      setLines((prev) => [...prev, ">"])
    }
    setInput("")
  }

  useEffect(() => {
    if (hasRun.current) return // ✅ prevents double effect in dev
    hasRun.current = true

    // auto-run fake command on mount
    setTimeout(() => {
      setLines((prev) => [...prev, "> whoami"])
      run("whoami")
    }, 1000)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -10, 0, 10, 0],
        rotateX: [0, 2, 0, -2, 0],
        rotateY: [0, -2, 0, 2, 0],
        rotateZ: [0, 1, 0, -1, 0],
        translateZ: [0, 20, 0, -20, 0],
        boxShadow: [
          "0 10px 50px -20px rgba(0,0,0,0.6)",
          "0 15px 60px -15px rgba(0,0,0,0.7)",
          "0 10px 50px -20px rgba(0,0,0,0.6)",
          "0 5px 40px -25px rgba(0,0,0,0.5)",
          "0 10px 50px -20px rgba(0,0,0,0.6)",
        ],
      }}
      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      style={{ perspective: 2000 }}
    >
      <div
        className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-white/12 bg-black/40"
        style={{
          transform: "rotateX(8deg) rotateY(-6deg) translateZ(50px)",
          transformStyle: "preserve-3d",
          filter: "brightness(1.1)",
        }}
        role="region"
        aria-label="Terminal"
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <div className="ml-2 text-xs text-neutral-300/70">
            bash — pratham@portfolio
          </div>
        </div>

        {/* Output */}
        <div
          ref={scrollRef}
          className="h-[280px] overflow-y-auto bg-[#06090f] p-3 font-mono text-sm leading-6 text-neutral-200"
          style={{ transform: "translateZ(20px)" }}
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {l}
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 border-t border-white/10 bg-[#06090f] p-3"
          style={{ transform: "translateZ(20px)" }}
        >
          <span className="font-mono text-sm text-cyan-300">pratham@pm</span>
          <span className="font-mono text-sm text-neutral-400">:</span>
          <span className="font-mono text-sm text-emerald-300">~</span>
          <span className="font-mono text-sm text-neutral-400">$</span>
          <input
            aria-label="Terminal input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="grow bg-transparent font-mono text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
            placeholder="type a command (try: help)"
            autoComplete="off"
          />
        </form>
      </div>
    </motion.div>
  )
}