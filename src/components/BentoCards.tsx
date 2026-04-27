"use client";

import { motion, AnimatePresence } from "framer-motion";

interface BentoCardsProps {
  mode: "eng" | "des";
}

interface CardType {
  id: string;
  title: string;
  icon: string;
  content: { key: string; value: string }[];
  isVisual?: boolean;
  isPalette?: boolean;
  is3D?: boolean;
  palette?: { swatch: string; label: string }[];
}

const engCards: CardType[] = [
  {
    id: "tech-stack",
    title: "Tech Stack",
    icon: "⬡",
    content: [
      { key: "frontend", value: "Next.js · React · TypeScript" },
      { key: "backend", value: "Node.js · Express · Go" },
      { key: "db", value: "PostgreSQL · Redis · MongoDB" },
      { key: "cloud", value: "AWS · Docker · K8s" },
    ],
  },
  {
    id: "github",
    title: "GitHub Activity",
    icon: "◈",
    content: [
      { key: "commits_ytd", value: "1,248" },
      { key: "pull_requests", value: "94 merged" },
      { key: "repos", value: "42 public" },
      { key: "streak", value: "63 days 🔥" },
    ],
  },
  {
    id: "cs",
    title: "CS Fundamentals",
    icon: "∑",
    content: [
      { key: "algorithms", value: "O(n log n) ✓" },
      { key: "data_structs", value: "Trees · Graphs · DP" },
      { key: "systems", value: "OS · Networks · Compilers" },
      { key: "patterns", value: "SOLID · DDD · CQRS" },
    ],
  },
];

const desCards: CardType[] = [
  {
    id: "visual-identity",
    title: "Visual Identity",
    icon: "◎",
    isVisual: true,
    palette: [],
    content: [],
  },
  {
    id: "color-palette",
    title: "Color Palette",
    icon: "◑",
    isPalette: true,
    palette: [
      { swatch: "#D4A574", label: "Warm Gold" },
      { swatch: "#F7C5B0", label: "Pastel Rose" },
      { swatch: "#C8B8E8", label: "Soft Lilac" },
      { swatch: "#B0D8F0", label: "Sky Mist" },
      { swatch: "#0F1B35", label: "Deep Navy" },
    ],
    content: [],
  },
  {
    id: "3d-icon",
    title: "3D Renders",
    icon: "◆",
    is3D: true,
    palette: [],
    content: [],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.3 } },
};

export default function BentoCards({ mode }: BentoCardsProps) {
  const isEng = mode === "eng";
  const cards = isEng ? engCards : desCards;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <AnimatePresence mode="popLayout">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="relative overflow-hidden rounded-xl p-4 flex flex-col gap-3 min-h-[150px]"
            style={{
              fontFamily: isEng ? "'JetBrains Mono', monospace" : "var(--font-playfair), serif",
              background: isEng
                ? "rgba(13,17,23,0.75)"
                : "rgba(255,255,255,0.58)",
              border: isEng
                ? "1px solid rgba(0,229,255,0.13)"
                : "1px solid rgba(212,165,116,0.25)",
              backdropFilter: "blur(14px)",
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.05, rotateX: 6, rotateY: -6, transition: { duration: 0.3 } }}
          >
            {/* Card header */}
            <div className="flex items-center gap-2">
              <motion.span
                className="text-lg leading-none"
                animate={{ color: isEng ? "#00e5ff" : "#d4a574" }}
                transition={{ duration: 0.5 }}
              >
                {card.icon}
              </motion.span>
              <motion.h3
                className="text-xs font-bold tracking-widest uppercase"
                animate={{ color: isEng ? "rgba(255,255,255,0.7)" : "#0f1b35" }}
                transition={{ duration: 0.5 }}
              >
                {card.title}
              </motion.h3>
            </div>

            {/* Eng: JSON key-value content */}
            {isEng && card.content.length > 0 && (
              <div className="flex flex-col gap-1.5 text-[10px] leading-relaxed">
                <span className="text-cyan-500/50">{"{"}</span>
                {card.content.map((item, j) => (
                  <div key={j} className="flex gap-2 pl-3">
                    <span className="text-green-400/80 shrink-0">&quot;{item.key}&quot;:</span>
                    <span className="text-white/60 truncate">&quot;{item.value}&quot;</span>
                  </div>
                ))}
                <span className="text-cyan-500/50">{"}"}</span>
              </div>
            )}

            {/* Des: Visual Identity mock */}
            {"isVisual" in card && card.isVisual && (
              <div className="flex-1 flex flex-col gap-2">
                {/* Logo mock */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 flex items-center justify-center text-white text-xs font-bold">R</div>
                  <div className="flex flex-col gap-0.5">
                    <div className="w-16 h-1.5 rounded-full bg-[#0f1b35]/20" />
                    <div className="w-10 h-1 rounded-full bg-[#d4a574]/40" />
                  </div>
                </div>
                {/* Type scale mock */}
                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 rounded-full bg-[#0f1b35]/12" />
                  <div className="w-3/4 h-1.5 rounded-full bg-[#0f1b35]/8" />
                  <div className="w-1/2 h-1 rounded-full bg-[#0f1b35]/6" />
                </div>
                {/* Layout grid mock */}
                <div className="grid grid-cols-3 gap-1">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="h-6 rounded bg-gradient-to-b from-[#d4a574]/20 to-[#f7c5b0]/15" />
                  ))}
                </div>
                <p className="text-[9px] text-[#0f1b35]/40 mt-auto">Branding · Typography · Grid</p>
              </div>
            )}

            {/* Des: Colour palette swatches */}
            {"isPalette" in card && card.isPalette && (
              <div className="flex flex-col gap-2">
                {card.palette.map((c, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: c.swatch, border: "1.5px solid rgba(0,0,0,0.08)" }}
                    />
                    <span className="text-[9px] text-[#0f1b35]/60 font-medium tracking-wide">{c.label}</span>
                    <span className="ml-auto text-[9px] text-[#0f1b35]/35 font-mono">{c.swatch}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Des: 3D icon placeholder */}
            {"is3D" in card && card.is3D && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                {/* Geometric 3D placeholder using pure CSS */}
                <div className="relative w-16 h-16">
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, #f7c5b0 0%, #c8b8e8 50%, #b0d8f0 100%)",
                      boxShadow: "6px 6px 0 rgba(212,165,116,0.3), -2px -2px 0 rgba(255,255,255,0.6)",
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-2xl">◆</div>
                  </motion.div>
                </div>
                <p className="text-[9px] text-[#0f1b35]/40 text-center">3D Icon Render<br/>Coming Soon</p>
              </div>
            )}

            {/* Eng: glow hover overlay */}
            {isEng && (
              <div className="absolute inset-0 pointer-events-none rounded-xl opacity-0 hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.06), transparent 70%)" }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
