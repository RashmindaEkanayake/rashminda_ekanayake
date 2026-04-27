"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactSectionProps {
  mode: "eng" | "des";
}

function MagneticLink({ children, isEng, href }: { children: React.ReactNode, isEng: boolean, href: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a
      href={href}
      className="relative cursor-pointer inline-block w-max"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ color: isEng ? "rgba(255,255,255,0.7)" : "rgba(15,27,53,0.7)" }}
      whileHover={{ color: isEng ? "#00e5ff" : "#e07a5f" }}
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-[1px]"
        style={{ backgroundColor: isEng ? "#00e5ff" : "#e07a5f" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.a>
  );
}

export default function ContactSection({ mode }: ContactSectionProps) {
  const isEng = mode === "eng";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative w-full mt-40 py-32 z-50 flex flex-col items-center justify-center min-h-screen border-t"
      style={{
        backgroundColor: isEng ? "#000000" : "#fafaf9",
        borderColor: isEng ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
        color: isEng ? "#ffffff" : "#0f1b35",
        transition: "background-color 0.8s ease, color 0.8s ease"
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full px-8 md:px-16 max-w-6xl mx-auto">

        {/* Headline */}
        <motion.h2
          className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 text-center tracking-tight relative z-10"
          style={{ fontFamily: "var(--font-playfair), serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {isEng ? "> LET'S COLLABORATE_" : "LET'S COLLABORATE."}
        </motion.h2>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="mailto:hello@rashminda.me"
            className="text-2xl md:text-4xl border-b-[1px] pb-1 transition-colors duration-300 italic relative z-10"
            style={{
              fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-inter), sans-serif",
              borderColor: isEng ? "rgba(0,229,255,0.4)" : "rgba(224,122,95,0.4)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isEng ? "#00e5ff" : "#e07a5f";
              e.currentTarget.style.borderColor = isEng ? "#00e5ff" : "#e07a5f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "inherit";
              e.currentTarget.style.borderColor = isEng ? "rgba(0,229,255,0.4)" : "rgba(224,122,95,0.4)";
            }}
          >
            hello@rashminda.me
          </a>
        </motion.div>
        <br></br><br></br>
        {/* Secondary Links Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 mt-32 text-center md:text-left w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-inter), sans-serif" }}
        >
          {/* Col 1 */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-xs tracking-widest font-bold opacity-40 uppercase">Socials</h4>
            <div className="flex flex-col gap-3 text-sm">
              <MagneticLink isEng={isEng} href="https://linkedin.com">LinkedIn</MagneticLink>
              <MagneticLink isEng={isEng} href="https://github.com">GitHub</MagneticLink>
              <MagneticLink isEng={isEng} href="https://instagram.com">Instagram</MagneticLink>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-xs tracking-widest font-bold opacity-40 uppercase">Location</h4>
            <p className="text-sm opacity-80 leading-relaxed text-center md:text-left">
              Kandy,<br />Sri Lanka.
            </p>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-xs tracking-widest font-bold opacity-40 uppercase">Availability</h4>
            <p className="text-sm opacity-80 leading-relaxed text-center md:text-left">
              Available for<br />new projects.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Footer Signature */}
      <footer
        className="absolute bottom-0 w-full border-t flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-8 text-[10px] md:text-xs tracking-widest z-10"
        style={{
          borderColor: isEng ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-inter), sans-serif"
        }}
      >
        <div className="opacity-60 mb-6 md:mb-0">
          &copy; 2026 RASHMINDA EKANAYAKE.
        </div>

        <div className="opacity-60 font-bold mb-6 md:mb-0 text-center">
          {isEng ? "[ SYS: ENG_MODE_ACTIVE // LATENCY: 24ms ]" : '"Design is thinking made visual."'}
        </div>

        <button
          onClick={scrollToTop}
          className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 uppercase group"
        >
          Back to Top
          <motion.span
            className="inline-block"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            &uarr;
          </motion.span>
        </button>
      </footer>
    </section>
  );
}
