"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface NavbarProps {
  mode: "eng" | "des";
}

export default function Navbar({ mode }: NavbarProps) {
  const isEng = mode === "eng";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 z-[100] flex flex-col items-center pt-8 md:pt-10 w-full bg-transparent"
      initial={false}
      animate={{ opacity: 1 }}
    >
      {/* Top right icon */}
      <div className="absolute top-8 right-8 md:right-16 lg:right-32">
        <a 
          href="#" 
          className="block opacity-60 hover:opacity-100 transition-opacity duration-300"
          style={{ color: isEng ? "#ffffff" : "#0f1b35" }}
        >
          {isEng ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          )}
        </a>
      </div>

      {/* Main Name */}
      <motion.span
        className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase select-none"
        style={{ fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-syne), sans-serif" }}
        animate={{ color: isEng ? "#ffffff" : "#0f1b35" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        Rashminda Ekanayake
      </motion.span>

      {/* Sub Nav Links */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            className="flex items-center gap-6 mt-4"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <NavItem link="About" isEng={isEng} />
            
            <span style={{ color: isEng ? "rgba(255,255,255,0.2)" : "rgba(15,27,53,0.2)" }}>|</span>

            <div className="relative flex items-center justify-center min-w-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <DynamicNavItem isEng={isEng} />
                </motion.div>
              </AnimatePresence>
            </div>

            <span style={{ color: isEng ? "rgba(255,255,255,0.2)" : "rgba(15,27,53,0.2)" }}>|</span>

            <NavItem link="Contact" isEng={isEng} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavItem({ link, isEng }: { link: string; isEng: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={`#${link.toLowerCase()}`}
      className="relative text-xs tracking-widest uppercase cursor-pointer"
      style={{ 
        fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-inter), sans-serif",
        fontWeight: isEng ? 400 : 300,
      }}
      animate={{ color: isEng ? "rgba(255,255,255,0.6)" : "rgba(15,27,53,0.6)" }}
      whileHover={{ color: isEng ? "rgba(255,255,255,1)" : "rgba(15,27,53,1)" }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {link}
      
      {/* Center expanding underline */}
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

function DynamicNavItem({ isEng }: { isEng: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const linkText = isEng ? "[ engineering ]" : "( showcase )";

  return (
    <motion.a
      href="#showcase"
      className="relative text-sm tracking-widest cursor-pointer lowercase"
      style={{ 
        fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-playfair), serif",
        fontStyle: isEng ? "normal" : "italic",
        fontWeight: isEng ? 400 : 500,
      }}
      animate={{ color: isEng ? "rgba(255,255,255,0.8)" : "rgba(15,27,53,0.9)" }}
      whileHover={{ color: isEng ? "#00e5ff" : "#e07a5f" }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {linkText}
      
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
