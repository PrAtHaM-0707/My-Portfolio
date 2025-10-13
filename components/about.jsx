"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  // Array of image sources for the carousel
  const images = [
    '/certificates/cert2.jpg',
    '/certificates/cert1.png',
  ];

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handlers for arrow navigation
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Animation variants for image transitions
  const imageVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Text Section */}
          <div>
            <h2 id="about-title" className="text-3xl md:text-4xl font-semibold text-white text-balance">
              About Me
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              I’m Pratham Mittal — a passionate MERN Stack developer who loves building full-stack web applications that are fast, interactive, and scalable. I specialize in React, Node.js, Express, and MongoDB, creating clean, maintainable code and seamless user experiences. I thrive on designing responsive interfaces, crafting smooth micro-interactions, and turning complex ideas into functional products. Whether it’s dashboards, e-commerce platforms, or custom web apps, I deliver solutions with precision and creativity.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/10 px-3 py-2 text-sm text-white/85 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                • React, Node.js & Express APIs
              </li>
              <li className="rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/10 px-3 py-2 text-sm text-white/85 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                • Responsive Web Interfaces
              </li>
              <li className="rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/10 px-3 py-2 text-sm text-white/85 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                • Performance Optimized Apps
              </li>
              <li className="rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/10 px-3 py-2 text-sm text-white/85 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                • Scalable & Fast Web Apps
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-md border border-cyan-500/50 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 px-3 py-1.5 text-xs text-white shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200">
                Open to Freelance Projects
              </span>
              <span className="rounded-md border border-white/20 bg-gradient-to-r from-white/10 to-white/20 px-3 py-1.5 text-xs text-white/80 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                Open to Collaboration
              </span>
            </div>
          </div>

          {/* Right Carousel Section */}
          <div className="md:pl-6">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm">
              <div className="relative h-56 md:h-72">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`Developer workspace preview ${currentImageIndex + 1}`}
                    className="h-56 w-full object-contain md:h-72 rounded-xl"
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white shadow-md hover:bg-white/40 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white shadow-md hover:bg-white/40 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-3 w-3 rounded-full transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'bg-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.7)] scale-110'
                          : 'bg-white/40 hover:bg-cyan-400 hover:scale-105'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Badges */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/10 p-3 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                <div className="text-2xl font-semibold text-white">1+</div>
                <div className="text-xs text-white/70">Year Experience</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/10 p-3 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                <div className="text-2xl font-semibold text-white">10+</div>
                <div className="text-xs text-white/70">Projects</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/10 p-3 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                <div className="text-2xl font-semibold text-white">100+</div>
                <div className="text-xs text-white/70">Repositories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
