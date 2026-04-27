"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AboutSectionProps {
  mode: "eng" | "des";
}

export default function AboutSection({ mode }: AboutSectionProps) {
  const isEng = mode === "eng";

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden z-20 py-32"
      style={{
        backgroundColor: isEng ? "#050505" : "#f2efeb",
        transition: "background-color 0.8s ease"
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {isEng ? (
            <motion.div
              key="bg-eng"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {/* 3D Grid */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                  transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2.5)',
                  transformOrigin: 'top center',
                  opacity: 0.6,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-90" />
              
              {/* Floating Logic */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center mix-blend-screen opacity-[0.03]"
                initial={{ y: 20 }}
                animate={{ y: -20 }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <pre className="text-[8rem] font-black leading-tight whitespace-pre select-none" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff" }}>
                  {`if (logic) {\n  build();\n}\nwhile (true) {\n  scale();\n}\ndata.map(x => x);`}
                </pre>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="bg-des"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Fine Art Paper Texture via simple noise (or just solid + CSS) */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("/noise.png")', backgroundSize: '150px' }} />
              
              {/* Gradient Blob */}
              <motion.div
                className="absolute w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px]"
                style={{
                  background: "radial-gradient(circle, #f2efeb 0%, #c4a484 30%, rgba(255,255,255,0) 100%)",
                }}
                animate={{
                  scale: [1, 1.1, 0.9, 1],
                  rotate: [0, 90, 180, 360],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Middle About Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-[800px] w-[90%] mx-auto p-10 md:p-16 flex flex-col items-center text-center gap-12"
      >
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black flex flex-wrap justify-center items-center gap-x-4 gap-y-2 leading-tight">
          <span 
            className="tracking-tight"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: isEng ? "#00e5ff" : "#1a1a1a" }}
          >
            Solving with Logic,
          </span>
          <span 
            className="italic tracking-tighter"
            style={{ fontFamily: "var(--font-playfair), serif", color: isEng ? "#ffffff" : "#d43f33" }}
          >
            Crafting with Emotion.
          </span>
        </h2>

        {/* Narrative */}
        <div className="min-h-[140px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(4px)", y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
              style={{ 
                fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-inter), sans-serif",
                color: isEng ? "rgba(255, 255, 255, 0.7)" : "rgba(26, 26, 26, 0.75)"
              }}
            >
              {isEng 
                ? "As a Software Engineer, I treat code as a modular art form. I specialize in building high-performance systems where every line of logic serves a clear architectural purpose."
                : "As a Graphic Designer, I believe visual identity is a language. I craft minimalist, high-impact brands that bridge the gap between abstract concepts and human connection."
              }
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bridge Footer */}
        <div className="pt-10 border-t w-full max-w-sm flex justify-center mt-4" style={{ borderColor: isEng ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
          <p 
            className="text-sm md:text-base tracking-[0.15em] uppercase font-bold opacity-50"
            style={{ 
              fontFamily: "'JetBrains Mono', monospace",
              color: isEng ? "#ffffff" : "#1a1a1a"
            }}
          >
            The intersection of 0s and 1s with RGB and CMYK.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
