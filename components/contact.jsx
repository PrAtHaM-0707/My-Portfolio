"use client"
import { useState } from "react"
import emailjs from "emailjs-com"

export default function Contact() {
  const [status, setStatus] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.target

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      setStatus("✅ Message sent successfully!")
      form.reset()
    } catch (error) {
      console.error(error)
      setStatus("❌ Failed to send message. Try again later.")
    }

    setTimeout(() => {
      setStatus(null)
    }, 2000)
  }

  return (
    <section id="contact" className="relative z-10 border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Contact</h2>
          <p className="mt-2 text-neutral-300">Let’s build something great together.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6"
          >
            <label className="block text-sm text-slate-300">
              Name
              <input
                name="name"
                required
                className="mt-1 w-full rounded-md bg-black/60 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-cyan-400/40"
                placeholder="Your Name"
              />
            </label>
            <label className="mt-4 block text-sm text-slate-300">
              Email
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-md bg-black/60 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-cyan-400/40"
                placeholder="you@example.com"
              />
            </label>
            <label className="mt-4 block text-sm text-slate-300">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="mt-1 w-full rounded-md bg-black/60 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-cyan-400/40"
                placeholder="Tell me about your project…"
              />
            </label>
            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-md border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:border-cyan-400/50 hover:text-white transition cursor-pointer"
            >
              Send Message
            </button>
            {status && <p className="mt-3 text-sm text-emerald-300">{status}</p>}
          </form>

          <div className="rounded-xl border border-white/10 bg-black/30 p-5 md:p-6">
            <h3 className="text-xl font-medium text-white">Elsewhere</h3>
            <ul className="mt-3 space-y-2 text-slate-300">
              <li>
                Email:{" "}
                <a className="text-cyan-300 hover:underline" href="mailto:prathamm4402@gmail.com">
                  prathamm4402@gmail.com
                </a>
              </li>
              <li>
                GitHub:{" "}
                <a className="text-cyan-300 hover:underline" href="https://github.com/PrAtHaM-0707" target="_blank" rel="noreferrer">
                  PrAtHaM-0707
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a className="text-cyan-300 hover:underline" href="https://www.linkedin.com/in/pratham-mittal07/" target="_blank" rel="noreferrer">
                  pratham-mittal07
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
