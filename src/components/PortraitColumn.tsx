"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface PortraitColumnProps {
  mode: "eng" | "des";
}

export default function PortraitColumn({ mode }: PortraitColumnProps) {
  const isEng = mode === "eng";
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 400]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.6]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0.2]);

  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
      <motion.div
        className="relative w-[150%] max-w-[850px] h-[120%] object-cover origin-bottom"
        style={{ y, scale, opacity }}
        animate={{
          filter: isEng
            ? "grayscale(0%) contrast(105%) brightness(0.95) drop-shadow(3px 0px 0px rgba(255,0,0,0.5)) drop-shadow(-3px 0px 0px rgba(0,255,255,0.5))"
            : "grayscale(0%) contrast(100%) drop-shadow(0px 20px 40px rgba(224, 122, 95, 0.2))",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Image
          src="/pro.png"
          alt="Rashminda Ekanayake Portrait"
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />

        {/* Thin flickering scanline (SE Mode) */}
        {isEng && (
          <motion.div
            className="absolute left-0 right-0 h-1 pointer-events-none z-20 mix-blend-screen"
            style={{
              background: "#00e5ff",
              boxShadow: "0 0 10px #00e5ff, 0 0 20px #00e5ff",
            }}
            animate={{ 
              top: ["0%", "100%", "0%"],
              opacity: [0.8, 1, 0.5, 1, 0.7, 0.9]
            }}
            transition={{ 
              top: { duration: 3, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.15, repeat: Infinity, ease: "linear" }
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
