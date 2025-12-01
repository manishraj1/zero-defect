// src/components/footer.tsx
export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Zero-Defect Finetuning Pipeline (ÆON) — built end-to-end on a MacBook
          using CPU-first engineering.
        </p>
        <p className="text-[11px]">
          © {new Date().getFullYear()} Manish Raj Vangari. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
