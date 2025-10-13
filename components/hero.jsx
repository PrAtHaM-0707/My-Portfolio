"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import Editor3D from "./editor-3d"

export default function Hero() {
  const taglineControls = useAnimation()
  const taglineText = "Building sleek, interactive web experiences with motion and craft."

  useEffect(() => {
    const typeEffect = async () => {
      await taglineControls.start((i) => ({
        opacity: 1,
        transition: { delay: 0.1 + i * 0.1 },
      }))
    }
    typeEffect()
  }, [taglineControls])

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 pb-24 pt-28 md:flex-row md:items-center md:gap-14 md:pb-28 md:pt-36">
      {/* Left: Name + Tagline */}
      <div className="flex-1">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl"
        >
          Pratham Mittal
        </motion.h1>
        <div className="mt-4 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
          {taglineText.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              initial={{ opacity: 0 }}
              animate={taglineControls}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
          className="mt-8 flex items-center gap-3"
        >
          <a
            href="#terminal"
            className="rounded-full bg-cyan-500/90 px-4 py-2 text-sm font-medium text-black transition hover:bg-cyan-400"
          >
            Try the Terminal
          </a>
          <a
            href="#home"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:text-white"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Right: Editor */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="w-full flex-1"
      >
        <Editor3D />
      </motion.div>
    </div>
  )
}