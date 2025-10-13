"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, ChevronDown } from "lucide-react";

export default function Editor3D() {
  const snippets = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++ 👋" << endl;
    return 0;
}`,
    python: `def hello(name):
    return f"Hello, {name} 👋"

print(hello("world"))`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java 👋");
    }
}`,
  };

  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState(snippets["cpp"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const funnyOutputs = [
    "Oops, you tried to rewrite the matrix! Here's a cookie instead 🍪",
    "Code rebellion detected! The compiler is laughing too hard to run this 😂",
    "Whoa, that's some creative coding! Here's a virtual high-five ✋",
    "The code gods are confused! Let's stick to printing for now 😉",
    "Syntax error: Too much awesomeness detected! Try again 😜",
  ];

  const handleRun = () => {
    let result = "";
    let extracted = null;

    // Regex patterns for each language
    const patterns = {
      cpp: /cout\s*<<\s*["']([^"']+)["']\s*<<\s*endl\s*;/,
      python: /print\s*\(\s*hello\s*\(\s*["']([^"']+)["']\s*\)\s*\)/,
      java: /System\.out\.println\s*\(\s*["']([^"']+)["']\s*\)\s*;/,
    };

    // Check if code structure is valid (only print string changed)
    const isCodeValid = () => {
      const original = snippets[language].replace(
        patterns[language],
        language === "python" ? 'print(hello("REPLACED"))' : language === "cpp" ? 'cout << "REPLACED" << endl;' : 'System.out.println("REPLACED");'
      );
      const modified = value.replace(
        patterns[language],
        language === "python" ? 'print(hello("REPLACED"))' : language === "cpp" ? 'cout << "REPLACED" << endl;' : 'System.out.println("REPLACED");'
      );
      return original.trim() === modified.trim();
    };

    // Extract string from print statement
    const match = value.match(patterns[language]);
    extracted = match ? match[1] : null;

    // If code structure is unchanged and print statement is valid, use extracted string
    if (extracted && isCodeValid()) {
      result = language === "python" ? `Hello, ${extracted} 👋` : extracted;
    } else {
      // If code structure is modified or no valid print statement, use funny output
      result = funnyOutputs[Math.floor(Math.random() * funnyOutputs.length)];
    }

    setOutput(result);
    setShowOutput(true);
  };

  const handleReset = () => {
    setValue(snippets[language]);
    setShowOutput(false);
    setOutput("");
  };

  const languages = [
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const extensions = {
    cpp: "cpp",
    python: "py",
    java: "java",
  };

  return (
    <div className="relative w-full overflow-visible">
      <div className="flex gap-4 transition-all duration-700 ease-in-out">
        {/* Editor Container */}
        <motion.div
          className="relative flex-shrink-0"
          animate={{
            y: showOutput ? 0 : [0, -6, 0],
            rotateX: showOutput ? 0 : [0, 1.2, 0],
            rotateY: showOutput ? 0 : [0, -1.2, 0],
            width: showOutput ? "50%" : "100%",
          }}
          transition={{
            y: {
              duration: 6,
              repeat: showOutput ? 0 : Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            rotateX: {
              duration: 6,
              repeat: showOutput ? 0 : Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            rotateY: {
              duration: 6,
              repeat: showOutput ? 0 : Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            width: { duration: 0.7, ease: "easeInOut" },
          }}
          style={{ perspective: 1200 }}
        >
          <div
            className="group relative mx-auto w-full max-w-xl rounded-xl border border-white/12 bg-white/[0.03] p-0.5 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.6)]"
            style={{
              transform: showOutput
                ? "rotateX(0deg) rotateY(0deg) translateZ(0)"
                : "rotateX(8deg) rotateY(-6deg) translateZ(0)",
              transformStyle: "preserve-3d",
              transition: "transform 0.7s ease-in-out",
            }}
            aria-label="Code editor window"
            role="region"
          >
            {/* Window header */}
            <div className="flex items-center justify-between h-9 rounded-lg bg-white/[0.04] px-3">
              {/* Left: Mac-like dots + title */}
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
                <div className="ml-2 text-xs text-neutral-300/70">
                  main.{extensions[language]} — Editor
                </div>
              </div>

              {/* Middle: Language selector */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-md bg-[#0b111f] border border-white/10 px-3 py-1 pr-2 text-xs text-neutral-300 shadow-inner outline-none transition hover:border-cyan-400/40 focus:border-cyan-400/60"
                >
                  {languages.find((lang) => lang.value === language)?.label}
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                {/* Custom dropdown menu */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 w-full rounded-md border border-white/10 bg-[#0b111f] shadow-lg overflow-hidden"
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => {
                          setLanguage(lang.value);
                          setValue(snippets[lang.value]);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                          language === lang.value
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "text-neutral-300 hover:bg-white/5"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Right: Run & Reset icons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRun}
                  className="rounded-md p-1 text-neutral-300 hover:text-green-400 hover:bg-green-400/10 cursor-pointer"
                  title="Run"
                >
                  <Play size={16} />
                </button>
                <button
                  onClick={handleReset}
                  className="rounded-md p-1 text-neutral-300 hover:text-red-400 hover:bg-red-400/10 cursor-pointer"
                  title="Reset"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            {/* Editable code area */}
            <div className="relative">
              <textarea
                aria-label="Editable code area"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                spellCheck={false}
                className="min-h-[292px] w-full resize-none rounded-b-xl bg-[#0b111f] px-4 py-3 font-mono text-sm leading-6 text-blue-100 outline-none selection:bg-cyan-500/30 custom-scrollbar"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                  backgroundSize: "100% 24px, 24px 100%",
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-b-xl ring-1 ring-inset ring-white/5" />
            </div>
          </div>
        </motion.div>

        {/* Output Panel */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, x: 100, width: 0 }}
          animate={{
            opacity: showOutput ? 1 : 0,
            x: showOutput ? 0 : 100,
            width: showOutput ? "50%" : 0,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ perspective: 1200 }}
        >
          {showOutput && (
            <motion.div
              animate={{
                y: 0,
                rotateX: 0,
                rotateY: 0,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div
                className="group relative mx-auto w-full max-w-xl rounded-xl border border-white/12 bg-white/[0.03] p-0.5 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.6)]"
                style={{
                  transform: "rotateX(0deg) rotateY(0deg) translateZ(0)",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.7s ease-in-out",
                }}
                aria-label="Output window"
                role="region"
              >
                {/* Output header */}
                <div className="flex items-center justify-between h-9 rounded-lg bg-white/[0.04] px-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <span className="h-3 w-3 rounded-full bg-green-400/80" />
                    <div className="ml-2 text-xs text-neutral-300/70">
                      Output — Terminal
                    </div>
                  </div>
                  <div className="text-xs text-green-400/80">
                    Running {language}
                  </div>
                </div>

                {/* Output area */}
                <div className="relative">
                  <div
                    className="min-h-[296px] w-full rounded-b-xl bg-[#0b111f] px-4 py-3 font-mono text-sm leading-6 text-blue-100 resize-none overflow-auto custom-scrollbar"
                  >
                    <div className="text-green-400/60 mb-2">
                      $ Running your code...
                    </div>
                    <div className="text-blue-100">{output}</div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-b-xl ring-1 ring-inset ring-white/5" />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}