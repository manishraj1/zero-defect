"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/target", label: "The Target" },
  { href: "/progress", label: "Current Progress" },
  { href: "/architecture", label: "Architecture" },
  { href: "/research", label: "Research" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-3xl border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/hilsa-logo.png" alt="HILSA" width={32} height={32} className="rounded" />
          <span className="text-2xl font-semibold tracking-tight text-white">HILSA</span>
        </div>

        <div className="flex items-center gap-10 text-white/90">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg transition-colors hover:text-white ${isActive ? "text-cyan-300" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <a href="https://github.com" target="_blank" className="text-white/70 hover:text-white flex items-center gap-1 text-sm">
          GitHub <span className="text-xs">↗</span>
        </a>
      </div>
    </nav>
  );
}
