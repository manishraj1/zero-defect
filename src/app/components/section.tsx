import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
};

export default function Section({
  id,
  title,
  eyebrow,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        border-b border-neutral-800/60
        py-16 md:py-20
        ${className ?? ""}
      `}
    >
      <div className="max-w-5xl mx-auto px-4">
        {eyebrow && (
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400 mb-2">
            {eyebrow}
          </p>
        )}

        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-50 mb-4">
          {title}
        </h2>

        <div className="text-sm md:text-base text-zinc-300 leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </section>
  );
}
