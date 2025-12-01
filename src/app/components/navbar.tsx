// src/components/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/pipeline", label: "Finetuning Architecture" },
  { href: "/geometry", label: "Hidden Layer Geometry" },
  { href: "/experiments", label: "Analysis" },
  { href: "/proofs", label: "performance evidence" },
  { href: "/future", label: "Future Plan" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/40" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-slate-50">
              Zero-Defect
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              ÆON Pipeline
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-full px-3 py-1 transition " +
                  (active
                    ? "bg-slate-800 text-emerald-300"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-50")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
