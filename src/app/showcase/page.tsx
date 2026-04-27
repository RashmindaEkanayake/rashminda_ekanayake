"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import DualToggle from "@/components/DualToggle";
import { useRouter } from "next/navigation";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function ShowcasePage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleToggle = () => {
    router.push("/builds");
  };

  return (
    <main className="relative min-h-screen w-full bg-[#f2efeb] text-[#1a1a1a] flex flex-col items-center overflow-x-hidden" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("/noise.png")', backgroundSize: '150px' }} />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center min-h-screen pt-32 pb-32">
        
        {/* Header Navigation - Aligned to 5xl edges */}
        <header className="flex justify-between items-center w-full mb-24">
          <Link href="/">
            <motion.div 
              className="group flex items-center gap-2 cursor-pointer text-black/50 hover:text-black transition-colors"
              whileHover={{ x: -5 }}
            >
              <span>&larr;</span>
              <span className="tracking-widest uppercase text-xs font-bold border-b border-transparent group-hover:border-black transition-colors pb-0.5">Back to Home</span>
            </motion.div>
          </Link>

          {/* Toggle acting as a route switcher */}
          <div className="scale-75 origin-right">
            <DualToggle mode="des" onToggle={handleToggle} />
          </div>
        </header>

        {/* Page Title - Center Stacked */}
        <div className="mb-24 text-center flex flex-col items-center w-full">
          <p className="text-black/40 mb-6 tracking-widest text-sm uppercase">Selected Works</p>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
            VISUAL ARCHIVE.
          </h1>
        </div>

        {/* Masonry Grid - Centered & Balanced */}
        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 w-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {PORTFOLIO_DATA.design.map((item, idx) => (
            <motion.div 
              key={idx}
              className={`relative w-full rounded-xl overflow-hidden group cursor-zoom-in break-inside-avoid ${item.aspect}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              onClick={() => setSelectedImage(item.image)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Hover Info */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-bold text-[10px] tracking-widest uppercase mb-1">{item.year} | {item.category}</p>
                <h3 className="text-white text-2xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-[200] bg-[#f2efeb]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              src={selectedImage} 
              alt="Expanded view" 
              className="max-w-full max-h-full object-contain shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
