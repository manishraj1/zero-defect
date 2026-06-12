"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Overview" },
  { href: "/target", label: "The Target" },
  { href: "/progress", label: "Current Progress" },
  { href: "/architecture", label: "Architecture" },
  { href: "/research", label: "Research" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-8 py-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500 rounded-xl opacity-80 group-hover:rotate-12 transition-transform" />
            <div className="absolute inset-[2px] bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-semibold text-2xl tracking-tighter text-white">AEON</span>
            <span className="text-[10px] text-slate-500 block -mt-1">Pipeline</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                pathname === link.href 
                  ? "bg-white text-black" 
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a href="https://github.com/yourusername/aeon" target="_blank" className="text-sm text-slate-400 hover:text-white flex items-center gap-2">
          GitHub <span className="text-xs">↗</span>
        </a>
      </nav>
    </header>
  );
}