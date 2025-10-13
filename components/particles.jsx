"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const count = prefersReduced
      ? 300
      : Math.min(1500, Math.floor((w * h) / 2000));

    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: 0,
      baseY: 0,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      r: Math.random() * 2.5 + 1,

      repelX: 0,
      repelY: 0,
      dampening: 0.92,
      hue: Math.random() * 60 + 200,
      saturation: Math.random() * 40 + 20,
      lightness: Math.random() * 25 + 5,
    }));

    particles.forEach((p) => {
      p.baseX = p.x;
      p.baseY = p.y;
    });

    function draw() {
      ctx.fillStyle = "rgba(2, 2, 8, 1)";
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.baseX += p.vx;
        p.baseY += p.vy;

        if (p.baseX < -10) p.baseX = w + 10;
        if (p.baseX > w + 10) p.baseX = -10;
        if (p.baseY < -10) p.baseY = h + 10;
        if (p.baseY > h + 10) p.baseY = -10;

        const dx = mouseRef.current.x - p.baseX;
        const dy = mouseRef.current.y - p.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 180;

        if (distance < repelRadius && distance > 0) {
          const force = (repelRadius - distance) / repelRadius;
          const repelStrength = force * force * 40;

          p.repelX -= (dx / distance) * repelStrength;
          p.repelY -= (dy / distance) * repelStrength;
        }

        p.repelX *= p.dampening;
        p.repelY *= p.dampening;

        p.x = p.baseX + p.repelX;
        p.y = p.baseY + p.repelY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        const repelIntensity = Math.min(
          1,
          (Math.abs(p.repelX) + Math.abs(p.repelY)) * 0.05
        );
        const alpha = 0.6 + repelIntensity * 0.4;

        ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${
          p.lightness + repelIntensity * 15
        }%, ${alpha})`;
        ctx.fill();
      }

      if (!prefersReduced) rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}
