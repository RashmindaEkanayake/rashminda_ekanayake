/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import DualToggle from "@/components/DualToggle";
import PortraitColumn from "@/components/PortraitColumn";
import AboutSection from "@/components/AboutSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ContactSection from "@/components/ContactSection";

type Mode = "eng" | "des";

const engLines = [
  "Building Logic-Driven",
  "Architecture.",
];
const desLines = [
  "Crafting Emotion-Driven",
  "Visuals.",
];

const ROLE_LABELS = {
  eng: "Software Engineer",
  des: "Graphic Designer",
};

export default function HeroSection() {
  const [mode, setMode] = useState<Mode>("eng");
  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const isEng = mode === "eng";
  const lines = isEng ? engLines : desLines;
  const fullText = lines[lineIndex] ?? "";

  // Typewriter reset on mode switch
  useEffect(() => {
    setTypedText("");
    setLineIndex(0);
    setCharIndex(0);
  }, [mode]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter tick
  useEffect(() => {
    if (charIndex < fullText.length) {
      const id = setTimeout(() => {
        setTypedText((t) => t + fullText[charIndex]);
        setCharIndex((c) => c + 1);
      }, isEng ? 42 : 55);
      return () => clearTimeout(id);
    } else if (lineIndex < lines.length - 1) {
      const id = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setTypedText("");
        setCharIndex(0);
      }, 180);
      return () => clearTimeout(id);
    }
  }, [charIndex, fullText, lineIndex, lines.length, isEng]);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroBgOpacity = useTransform(scrollY, [0, 400], [0.03, 0]);

  if (!mounted) return null;

  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col"
      animate={{
        backgroundColor: isEng ? "#0b0d10" : "#f2efeb", // Ivory for Designer
      }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Background depth (Grid & Grain) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          animate={{ opacity: isEng ? 0.4 : 0 }}
        />
        <motion.div
          className="grainy absolute inset-0 z-10"
          animate={{ opacity: isEng ? 0.3 : 0.8 }}
        />
      </div>

      <Navbar mode={mode} />

      {/* Floating Mode Toggle */}
      <div className="fixed bottom-8 left-8 lg:bottom-12 lg:left-12 z-[100]">
        <DualToggle mode={mode} onToggle={() => setMode(isEng ? "des" : "eng")} />
      </div>

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col pt-[88px] overflow-hidden">
        {/* Large Background Typography (low opacity, pushed back) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none"
          style={{ opacity: heroBgOpacity }}
          animate={{ color: isEng ? "rgba(0, 229, 255, 1)" : "rgba(18, 18, 18, 1)" }}
        >
          <span
            className="text-[22vw] font-black tracking-tighter whitespace-nowrap"
            style={{ fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-playfair), serif" }}
          >
            {isEng ? "ENGINEER" : "DESIGNER"}
          </span>
        </motion.div>

        {/* Blueprint Lines */}
        <motion.div className="hidden lg:block absolute top-[88px] left-0 w-full h-px z-10 pointer-events-none" style={{ opacity: heroOpacity }} animate={{ backgroundColor: isEng ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
        <motion.div className="hidden lg:block absolute top-0 bottom-0 left-[35%] w-px z-10 pointer-events-none" style={{ opacity: heroOpacity }} animate={{ backgroundColor: isEng ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
        <motion.div className="hidden lg:block absolute top-0 bottom-0 left-[75%] w-px z-10 pointer-events-none" style={{ opacity: heroOpacity }} animate={{ backgroundColor: isEng ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />

        <div className="flex flex-col lg:flex-row w-full flex-1 relative z-20">

          {/* LEFT: Text */}
          <motion.div
            className="flex-1 lg:w-[35%] px-8 md:px-16 lg:px-32 py-12 flex flex-col justify-center relative"
            style={{ opacity: heroOpacity }}
          >
            <div className="flex flex-col gap-y-6 flex-1 justify-center">
              <motion.h1
                className="text-6xl md:text-7xl xl:text-8xl font-black leading-tight tracking-tight"
                style={{ fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-playfair), serif" }}
                animate={{ color: isEng ? "#ffffff" : "#1a1a1a" }}
              >
                Rashminda<br />Ekanayake
              </motion.h1>

              <div
                className="text-2xl md:text-3xl font-semibold leading-snug min-h-[4rem]"
                style={{ fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-playfair), serif" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {isEng && (
                      <span className="text-cyan-400/50 text-base mr-1">&gt;&nbsp;</span>
                    )}
                    <motion.span
                      animate={{ color: isEng ? "rgba(255,255,255,0.88)" : "#1a1a1a" }}
                      transition={{ duration: 0.6 }}
                    >
                      {lines.slice(0, lineIndex).join(" ")}{" "}
                      {typedText}
                      <span className="cursor-blink inline-block w-0.5 h-6 ml-0.5 align-middle"
                        style={{ backgroundColor: isEng ? "#00e5ff" : "#d43f33" }}
                      />
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Circuit Lines in SE */}
            {isEng && (
              <div className="absolute bottom-12 left-32 w-1/2 h-px bg-cyan-500/30 shadow-[0_0_8px_rgba(0,229,255,0.5)] pointer-events-none" />
            )}
          </motion.div>

          {/* CENTER: Portrait */}
          <motion.div
            className="relative lg:w-[40%] flex items-end justify-center pointer-events-none z-10"
          >
            <PortraitColumn mode={mode} />
          </motion.div>

          {/* RIGHT: Stats/Socials */}
          <motion.div
            className="flex-1 lg:w-[25%] px-12 lg:px-24 pb-16 flex flex-col gap-6 justify-center relative"
            style={{ opacity: heroOpacity }}
          >
            <StatusCard mode={mode} label="STATUS" value="Available for work" dot />
            <StatusCard mode={mode} label="LOCATION" value="Sri Lanka" />
            <StatusCard mode={mode} label="LATEST" value="v2.0 Portfolio" />
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <AboutSection mode={mode} />

      {/* SECTION 3: SHOWCASE */}
      <ShowcaseSection mode={mode} />



      {/* SECTION 5: CONTACT & FOOTER */}
      <ContactSection mode={mode} />
    </motion.div>
  );
}

function StatusCard({ mode, label, value, dot }: { mode: Mode, label: string, value: string, dot?: boolean }) {
  const isEng = mode === "eng";
  return (
    <motion.div
      className="p-5 border flex flex-col gap-3 relative overflow-hidden group backdrop-blur-md"
      animate={{
        borderColor: isEng ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        backgroundColor: isEng ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
        color: isEng ? "#ffffff" : "#1a1a1a"
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-2">
        {dot && (
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            animate={{ backgroundColor: isEng ? "#39ff14" : "#e07a5f" }}
          />
        )}
        <span
          className="text-[10px] uppercase tracking-widest font-mono"
          style={{ color: isEng ? "rgba(255,255,255,0.4)" : "rgba(15,27,53,0.5)" }}
        >
          {label}
        </span>
      </div>
      <span
        className="text-sm font-semibold tracking-wide"
        style={{ fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-playfair), serif" }}
      >
        {value}
      </span>
      {/* Connecting dots design for SE */}
      {isEng && (
        <div className="absolute top-0 right-0 w-2 h-2 border-l border-b border-cyan-500/40" />
      )}
    </motion.div>
  );
}
