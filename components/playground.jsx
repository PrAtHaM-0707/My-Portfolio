"use client";
import dynamic from "next/dynamic";

// Lazy-load editor (no SSR)
const Editor3D = dynamic(() => import("./editor-3d"), { ssr: false });

export default function Playground() {
  return (
    <section
      id="playground"
      aria-labelledby="playground-title"
      className="relative pt-10 md:pt-16 pb-20 md:pb-28 border-t border-white/5"
    >
      {/* Decorative background elements */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Header with improved styling */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-12">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <h2
                id="playground-title"
                className="text-2xl md:text-3xl font-semibold text-white"
              >
                Code Playground
              </h2>
            </div>
            <p className="text-sm text-white/60 mt-2 max-w-lg">
              Experiment with code snippets in multiple languages. Try out ideas
              and see immediate results.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-sm text-white/60">Live editing enabled</p>
          </div>
        </div>

        {/* Editor container with enhanced styling */}
        <div className="relative">
          <Editor3D fileName="main.js" />
        </div>
      </div>
    </section>
  );
}
