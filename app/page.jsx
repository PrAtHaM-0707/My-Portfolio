"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import Navbar from "../components/navbar";
import ParticleBackground from "../components/particles";
import Terminal from "../components/terminal";
import About from "../components/about";
import Playground from "../components/playground";
import Skills from "../components/skills";
import Contact from "../components/contact";
import Footer from "../components/footer";
import { LoadingScreen } from "../components/LoadingScreen";

// Helper component for project preview window (Mac-like chrome)
function PreviewWindow({ alt, src }) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-black/20">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <span className="ml-3 text-[11px] text-white/60">preview</span>
      </div>
      <img
        src={
          src || "/placeholder.svg?height=320&width=720&query=project%20preview"
        }
        alt={alt}
        className="h-40 w-full object-cover md:h-56"
      />
    </div>
  );
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const taglineControls = useAnimation();
  const cursorControls = useAnimation();
  const taglineText =
    "Building thoughtful web experiences at the intersection of design and engineering.";

  useEffect(() => {
    try {
      const html = document.documentElement;
      if (html) html.style.scrollBehavior = "smooth";
    } catch {}
  }, []);

  useEffect(() => {
    const typeEffect = async () => {
      if (!isLoading) {
        await taglineControls.start((i) => ({
          opacity: 1,
          transition: { delay: 0.05 + i * 0.05 },
        }));
        await cursorControls.start({
          opacity: [1, 0, 1],
          transition: {
            opacity: {
              repeat: Infinity,
              duration: 1,
              ease: "steps(2, start)",
            },
          },
        });
      }
    };
    typeEffect();
  }, [isLoading, taglineControls, cursorControls]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[radial-gradient(1200px_800px_at_20%_-10%,#0b1326_0%,transparent_60%),radial-gradient(1000px_700px_at_90%_10%,#0c182f_0%,transparent_60%),linear-gradient(180deg,#05070d_0%,#04060b_100%)] text-neutral-200">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      <Navbar />

      <section
        id="home"
        className="relative z-10 flex min-h-[92vh] items-center"
      >
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-1">
                <motion.span
                  className="text-sm md:text-base text-neutral-400"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Hello, I’m
                </motion.span>
                <motion.h1
                  className="font-sans text-4xl md:text-6xl font-semibold leading-tight 
                             bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 
                             bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  Pratham Mittal
                </motion.h1>
              </div>

              <div className="max-w-xl text-pretty text-neutral-300 leading-relaxed md:text-lg">
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
                <motion.span
                  className="blinking-cursor"
                  initial={{ opacity: 0 }}
                  animate={cursorControls}
                  style={{
                    display: "inline-block",
                    width: "1ch",
                    marginLeft: "2px",
                    color: "#22d3ee",
                  }}
                >
                  |
                </motion.span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="translate-y-6"
            >
              <Terminal />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-border mt-13">
        <About />
      </div>

      <div className="section-border">
        <Playground />
      </div>

      <div className="section-border -mt-8">
        <Skills />
      </div>

      <section
        id="projects"
        className="relative z-10 py-24 section-border mt-34"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Projects
            </h2>
            <p className="mt-3 max-w-3xl text-neutral-300 leading-relaxed">
              Three highlights. Each shows a quick preview and a description
              card with links.
            </p>
          </div>

          <div className="flex flex-col gap-10 md:gap-14">
            <div className="grid items-stretch gap-6 md:grid-cols-2">
              <PreviewWindow
                alt="Project One preview"
                src="/image.png"
              />
              <div className="w-full h-full rounded-xl border border-white/10 bg-white/5 p-4 md:p-5 flex flex-col">
                <h3 className="text-white text-xl font-semibold">
                  YapYard
                </h3>
                <p className="text-white/70 mt-2 text-sm leading-relaxed">
                  A modern chat app built with React and Node.js, featuring real-time messaging, authentication, profile management, and smooth UI.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    React
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Tailwind CSS
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Node.js
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    MongoDB
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Socket.io
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Arcjet
                  </span>
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://yapyard.vercel.app/" target="_blank"
                    className="inline-flex items-center rounded-md bg-cyan-500/90 hover:bg-cyan-400 text-black px-3 py-1.5 text-sm font-medium transition-colors"
                  >
                    Live
                  </a>
                  <a
                    href="https://github.com/PrAtHaM-0707/yapyard" target="_blank"
                    className="inline-flex items-center rounded-md border border-white/15 hover:border-white/30 text-white px-3 py-1.5 text-sm font-medium transition-colors"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>

            <div className="grid items-stretch gap-6 md:grid-cols-2">
              <div className="md:order-2">
                <PreviewWindow
                  alt="Project Two preview"
                  src="/landing-page-hero-preview.png"
                />
              </div>
              <div className="w-full h-full rounded-xl border border-white/10 bg-white/5 p-4 md:p-5 flex flex-col md:order-1">
                <h3 className="text-white text-xl font-semibold">
                  Shopzi
                </h3>
                <p className="text-white/70 mt-2 text-sm leading-relaxed">
                  A feature-rich e-commerce web application that lets users browse products, manage carts, apply discounts, and complete purchases through a seamless and responsive interface.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    React
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    TailwindCSS
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Node.js
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    MongoDB
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Redis
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Razorpay
                  </span>
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://shopzi-syz4.onrender.com/" target="_blank"
                    className="inline-flex items-center rounded-md bg-cyan-500/90 hover:bg-cyan-400 text-black px-3 py-1.5 text-sm font-medium transition-colors"
                  >
                    Live
                  </a>
                  <a
                    href="https://github.com/PrAtHaM-0707/Shopzi" target="_blank"
                    className="inline-flex items-center rounded-md border border-white/15 hover:border-white/30 text-white px-3 py-1.5 text-sm font-medium transition-colors"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>

            <div className="grid items-stretch gap-6 md:grid-cols-2">
              <PreviewWindow
                alt="Project Three preview"
                src="/iris.png"
              />
              <div className="w-full h-full rounded-xl border border-white/10 bg-white/5 p-4 md:p-5 flex flex-col">
                <h3 className="text-white text-xl font-semibold">
                  Iris AI
                </h3>
                <p className="text-white/70 mt-2 text-sm leading-relaxed">
                  A modern AI-powered chat app built with React and Node.js, featuring real-time conversations, secure authentication, profile management, subscription-based credits, and a sleek, responsive UI.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    React
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    TypeScript
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Node.js
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    TypeORM
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    PostgreSQL
                  </span>
                  <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                    Razorpay
                  </span>
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://iris-rho-three.vercel.app/" target="_blank"
                    className="inline-flex items-center rounded-md bg-cyan-500/90 hover:bg-cyan-400 text-black px-3 py-1.5 text-sm font-medium transition-colors"
                  >
                    Live
                  </a>
                  <a
                    href="https://github.com/PrAtHaM-0707/iris" target="_blank"
                    className="inline-flex items-center rounded-md border border-white/15 hover:border-white/30 text-white px-3 py-1.5 text-sm font-medium transition-colors"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex">
            <a
              href="#"
              className="inline-flex items-center rounded-md border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:border-cyan-400/50 hover:text-white transition"
            >
              View more projects →
            </a>
          </div>
        </div>
      </section>

      <div className="section-border">
        <Contact />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent"
      />

      <div className="relative z-10 section-border">
        <Footer />
      </div>
    </main>
  );
}