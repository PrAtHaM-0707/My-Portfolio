"use client"
import { FaCode, FaServer, FaTools, FaDatabase } from "react-icons/fa";

export default function Skills() {
  const frontendSkills = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "BootStrap","TailwindCSS"];
  const backendSkills = ["Node.js", "Express.js", "TypeScript", "Java", "Spring Boot", "JPA", "REST APIs"]
  const tools = ["Git", "GitHub", "VS Code", "Postman", "Netlify", "Docker", "Vercel"];
  const databases = ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "SQLite"];

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          Skills & Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Frontend */}
          <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-1 transition-all">
            <h3 className="text-xl font-bold mb-6 flex justify-center items-center gap-2">
              <FaCode /> Frontend
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {frontendSkills.map((tech, key) => (
                <span
                  key={key}
                  className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-1 transition-all">
            <h3 className="text-xl font-bold mb-6 flex justify-center items-center gap-2">
              <FaServer /> Backend
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {backendSkills.map((tech, key) => (
                <span
                  key={key}
                  className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-1 transition-all">
            <h3 className="text-xl font-bold mb-6 flex justify-center items-center gap-2">
              <FaTools /> Tools & Platforms
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {tools.map((tech, key) => (
                <span
                  key={key}
                  className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="rounded-xl p-6 border border-white/10 hover:-translate-y-1 transition-all">
            <h3 className="text-xl font-bold mb-6 flex justify-center items-center gap-2">
              <FaDatabase /> Databases
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {databases.map((tech, key) => (
                <span
                  key={key}
                  className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
