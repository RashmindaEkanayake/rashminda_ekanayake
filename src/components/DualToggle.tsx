/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface DualToggleProps {
  mode: "eng" | "des";
  onToggle: () => void;
}

export default function DualToggle({ mode, onToggle }: DualToggleProps) {
  const [mounted, setMounted] = useState(false);
  const isEng = mode === "eng";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 296, height: 86 }} />; // Placeholder to prevent layout shift
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <motion.p
        className="text-[10px] tracking-widest uppercase opacity-80 font-bold ml-2"
        animate={{ color: isEng ? "#14b8a6" : "#0f1b35" }}
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        SELECT_IDENTITY
      </motion.p>

      <button
        onClick={onToggle}
        aria-label="Toggle between Engineer and Designer mode"
        className="relative flex items-center cursor-pointer select-none focus:outline-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Pill track */}
        <motion.div
          className="relative flex items-center rounded-full overflow-hidden z-50"
          style={{ width: 296, height: 60 }}
          animate={{
            backgroundColor: isEng ? "#0d1117" : "#f5f0e8",
            boxShadow: isEng
              ? "0 0 0 1px rgba(0,229,255,0.2), 0 0 30px rgba(0,229,255,0.1)"
              : "0 0 0 1px rgba(0,0,0,0.1), 0 0 30px rgba(212,165,116,0.15)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Sliding thumb */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full z-10"
            style={{ width: 142 }}
            animate={{ left: isEng ? 4 : 150 }}
            transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.9 }}
          >
            <motion.div
              className="w-full h-full rounded-full flex items-center justify-center gap-2"
              animate={{
                backgroundColor: isEng ? "#00e5ff" : "#e07a5f",
                boxShadow: isEng
                  ? "0 0 15px rgba(0,229,255,0.4)"
                  : "0 0 15px rgba(224,122,95,0.4)",
              }}
              transition={{ duration: 0.55 }}
            >
              <AnimatePresence mode="wait">
                {isEng ? (
                  <motion.div
                    key="eng"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-bold text-[#080c10] text-sm leading-none" style={{ fontFamily: "'Space Mono', monospace" }}>
                      {"</>"}
                    </span>
                    <span className="text-sm font-black text-[#080c10]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      SE
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="des"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-base font-bold text-white leading-none">

                    </span>
                    <span className="text-sm font-black text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      DS
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* SE label (left) */}
          <div className="absolute left-0 flex items-center justify-center z-0" style={{ width: 148, height: "100%" }}>
            <motion.span
              className="text-xs font-bold tracking-widest"
              style={{ fontFamily: "var(--font-playfair), serif" }}
              animate={{ color: isEng ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.4)" }}
              transition={{ duration: 0.4 }}
            >
              SE
            </motion.span>
          </div>

          {/* Design label (right) */}
          <div className="absolute right-0 flex items-center justify-center z-0" style={{ width: 148, height: "100%" }}>
            <motion.span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-playfair), serif" }}
              animate={{ color: isEng ? "rgba(255,255,255,0.4)" : "rgba(15,27,53,1)" }}
              transition={{ duration: 0.4 }}
            >
              DESIGNER
            </motion.span>
          </div>
        </motion.div>
      </button>
    </div >
  );
}
