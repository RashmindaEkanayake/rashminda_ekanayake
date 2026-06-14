"use client";

import { motion, Variants } from "framer-motion";

interface ShowcaseSectionProps {
  mode: "eng" | "des";
}

import { PORTFOLIO_DATA } from "@/data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ShowcaseSection({ mode }: ShowcaseSectionProps) {
  const isEng = mode === "eng";

  return (
    <section
      id="showcase"
      className="relative w-full min-h-screen py-48 px-8 md:px-16 lg:px-32 z-20 flex flex-col justify-center items-center border-t overflow-hidden"
      style={{
        backgroundColor: isEng ? "#0b0d10" : "#f2efeb",
        borderColor: isEng ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
        transition: "background-color 0.8s ease"
      }}
    >
      {/* Header */}
      <div className="text-center mb-24 w-full flex flex-col items-center">
        <motion.h2
          className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
          style={{ fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-playfair), serif" }}
          animate={{ color: isEng ? "#ffffff" : "#1a1a1a" }}
        >
          Curated Works
        </motion.h2>
        <br></br>
        <motion.p
          className="text-sm tracking-widest font-bold opacity-60"
          style={{ fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-playfair), serif", fontStyle: isEng ? "normal" : "italic" }}
          animate={{ color: isEng ? "#00e5ff" : "#d43f33" }}
        >
          {isEng ? "// selected_repositories" : "( visual_portfolio )"}
        </motion.p>
      </div>


      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full max-w-6xl mx-auto px-12 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {isEng ? (
          PORTFOLIO_DATA.engineering.slice(0, 3).map((project, idx) => (
            <motion.a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="group relative flex flex-col justify-between items-center p-12 rounded-xl border-[0.5px] border-white/10 backdrop-blur-md overflow-hidden h-full min-h-[380px] text-center"
              style={{
                backgroundColor: "rgba(13,17,23,0.6)",
                fontFamily: "'JetBrains Mono', monospace",
                transformStyle: "preserve-3d"
              }}
              whileHover={{
                scale: 1.02,
                rotateX: 4,
                rotateY: -4,
                boxShadow: "0 0 25px rgba(0,229,255,0.2)",
                borderColor: "rgba(0,229,255,0.5)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-6 relative z-10 px-6">
                <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                <p className="text-sm text-white/60 leading-loose">{project.desc}</p>
                <button className="text-[#00e5ff] text-xs font-bold tracking-widest uppercase hover:text-white transition-colors mt-4">
                  View Project →
                </button>
              </div>

              <div className="flex justify-center z-10 mt-auto">
                <svg className="w-6 h-6 text-[#00e5ff] opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              {/* Cyan Glow Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{ background: "radial-gradient(circle at top right, rgba(0,229,255,0.08), transparent 70%)" }}
              />

              {/* Terminal Scanline Effect */}
              <motion.div
                className="absolute left-0 right-0 h-2 bg-cyan-400/20 blur-[2px] pointer-events-none opacity-0 group-hover:opacity-100 z-0"
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
          ))
        ) : (
          PORTFOLIO_DATA.design.slice(0, 3).map((project, idx) => (
            <motion.a
              key={idx}
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="group relative w-full aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-[#e5e5e5] p-4"
            >
              {/* Image filling card */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                <motion.h3
                  className="text-white text-3xl md:text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold text-center px-4"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {project.title}
                </motion.h3>
              </div>
            </motion.a>
          ))
        )}
      </motion.div>
      <br></br>
      {/* The More CTA Button */}
      <motion.div
        className="mt-32 flex justify-center w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <a href={isEng ? "/builds" : "/showcase"} className="outline-none flex justify-center">
          {isEng ? (
            <motion.button
              className="px-8 py-4 font-bold tracking-widest text-sm text-[#39ff14] bg-transparent flex items-center gap-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                border: "1px solid rgba(57, 255, 20, 0.4)",
                boxShadow: "0 0 15px rgba(57, 255, 20, 0.1), inset 0 0 15px rgba(57, 255, 20, 0.05)",
              }}
              whileHover={{
                backgroundColor: "rgba(57, 255, 20, 0.1)",
                borderColor: "#39ff14",
                boxShadow: "0 0 20px rgba(57, 255, 20, 0.4), inset 0 0 20px rgba(57, 255, 20, 0.1)"
              }}
            >
              [ VIEW_ALL_BUILDS -{'>'} ]
            </motion.button>
          ) : (
            <motion.button
              className="px-10 py-4 text-lg italic"
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#1a1a1a",
                border: "1px solid #1a1a1a",
                backgroundColor: "transparent",
              }}
              whileHover={{
                backgroundColor: "#1a1a1a",
                color: "#f2efeb"
              }}
              transition={{ duration: 0.4 }}
            >
              Explore Full Gallery &rarr;
            </motion.button>
          )}
        </a>
      </motion.div>
    </section>
  );
}
