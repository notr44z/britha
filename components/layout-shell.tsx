"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_40%),linear-gradient(135deg,_#06070a_0%,_#0b0c10_50%,_#11131a_100%)] text-stone-200">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="font-serif text-xl tracking-[0.4em] text-stone-100">
            BRITHA
          </Link>
          <nav className="hidden gap-6 text-sm text-stone-400 md:flex">
            <Link href="/self" className="transition hover:text-stone-100">The Self</Link>
            <Link href="/archive" className="transition hover:text-stone-100">The Archive</Link>
            <Link href="/fiction" className="transition hover:text-stone-100">The Fiction House</Link>
            <Link href="/admin/dashboard" className="transition hover:text-stone-100">Admin</Link>
          </nav>
        </div>
      </header>
      <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {children}
      </motion.main>
    </div>
  );
}
