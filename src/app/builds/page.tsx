"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DualToggle from "@/components/DualToggle";
import { useRouter } from "next/navigation";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function BuildsPage() {
  const router = useRouter();

  const handleToggle = () => {
    router.push("/showcase");
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-[#00e5ff] overflow-x-hidden flex flex-col items-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Background Code Scrolling - Centered and visible enough */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center overflow-hidden mix-blend-screen">
        <motion.pre 
          className="text-[3rem] md:text-[5rem] font-black leading-tight whitespace-pre select-none text-center"
          animate={{ y: [0, -1000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {Array(20).fill(`func serve() {\n  listen("0.0.0.0:8080")\n  handle(req)\n}\nwhile(true) {\n  poll()\n}`).join('\n')}
        </motion.pre>
      </div>

      {/* Main Content Container - Restricted Width & Centered */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center min-h-screen pt-32">
        
        {/* Header Navigation - Aligned to 5xl edges */}
        <header className="flex justify-between items-center w-full mb-24">
          <Link href="/">
            <motion.div 
              className="group flex items-center gap-2 cursor-pointer text-white/50 hover:text-white transition-colors"
              whileHover={{ x: -5 }}
            >
              <span>&larr;</span>
              <span className="tracking-widest uppercase text-xs font-bold border-b border-transparent group-hover:border-white transition-colors pb-0.5">Back to Home</span>
            </motion.div>
          </Link>

          {/* Toggle acting as a route switcher */}
          <div className="scale-75 origin-right">
            <DualToggle mode="eng" onToggle={handleToggle} />
          </div>
        </header>

        {/* Page Title - Center Stacked */}
        <div className="mb-20 text-center flex flex-col items-center w-full">
          <p className="text-white/40 mb-6 tracking-widest text-sm">[root] / builds</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">Engineering Archive</h1>
        </div>

        {/* Project List - Balanced Width & Centered */}
        <motion.div 
          className="flex flex-col w-full max-w-4xl mb-32"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-6 pb-4 border-b border-white/10 text-white/40 text-[10px] tracking-widest uppercase font-bold mb-8 hidden md:grid text-center">
            <div className="col-span-4 text-left">Project</div>
            <div className="col-span-3">Repository</div>
            <div className="col-span-3">Stack</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {/* Rows */}
          {PORTFOLIO_DATA.engineering.map((proj, idx) => (
            <motion.a 
              key={idx}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center py-6 border-b border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-colors group cursor-pointer text-center"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="col-span-4 text-white font-bold group-hover:text-cyan-400 transition-colors text-lg md:text-base text-left">
                {proj.title}
              </div>
              <div className="col-span-3 text-white/60 text-xs flex items-center justify-center gap-2 mb-2 md:mb-0">
                <svg className="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                {proj.repo}
              </div>
              <div className="col-span-3 flex flex-wrap justify-center gap-2 mb-2 md:mb-0">
                {proj.stack.map(s => (
                  <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/70 whitespace-nowrap">{s}</span>
                ))}
              </div>
              <div className="col-span-2 md:text-right text-xs">
                <span className={`uppercase tracking-widest font-bold ${proj.status === "Completed" ? "text-[#00e5ff]" : "text-amber-500"}`}>
                  [{proj.status}]
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
