export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">

        {/* LEFT SIDE – MAIN CONTENT */}
        <div className="w-full max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
            Finetuning Architecture
          </p>

          <h1 className="text-3xl font-semibold leading-tight text-emerald-300 sm:text-3xl md:text-3xl">
            Zero-Defect Finetuning Architecture
          </h1>

          <p className="text-sm text-slate-300 sm:text-sm">
            The Zero-Defect (ÆON) pipeline is more than a sequence of stages. It is a
            multi-layer finetuning architecture engineered to teach a transformer how
            to reason, verify, repair, and report its answers under a strict
            zero-defect contract. Instead of optimizing a model to “sound correct,”
            ÆON shapes how it <span className="font-semibold text-emerald-300">thinks</span>.
          </p>

          <p className="text-sm text-slate-300 sm:text-sm">
            At each layer of this architecture, the model is exposed to defects,
            challenged on its own outputs, and guided toward structured,
            self-accountable behavior. Some mechanisms are openly described; others
            form our private recipe — the internal alignment patterns, geometric
            constraints, and role-based strategies that enable ÆON to behave unlike a
            conventional LLM.
          </p>

          {/* Section: What the architecture does */}
          <h2 className="pt-4 text-xl font-semibold text-slate-100">
            What This Architecture Is Designed to Do
          </h2>

          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              • <span className="font-semibold text-emerald-300">Turn defects into
              training signal</span>: hallucinations, JSON breakage, missing fields,
              and unsafe answers are treated as structured learning examples.
            </li>

            <li>
              • <span className="font-semibold text-emerald-300">Teach the model to
              think in roles</span>: generator, verifier, and repair agent — all
              embedded into the same transformer through conditioning patterns.
            </li>

            <li>
              • <span className="font-semibold text-emerald-300">Align hidden-layer
              geometry</span> with stable internal reasoning pathways, ensuring the
              model’s representations remain coherent across transformations.
            </li>

            <li>
              • <span className="font-semibold text-emerald-300">Embed
              self-verification</span> into decoding, enabling structured self-checks
              before finalizing an output.
            </li>

            <li>
              • <span className="font-semibold text-emerald-300">Unify reasoning with
              structure</span> so JSON, citations, and required fields are treated as
              part of correctness, not formatting.
            </li>
          </ul>

          {/* Section: What we keep private */}
          <h2 className="pt-4 text-xl font-semibold text-slate-100">
            What We Share
          </h2>

          <p className="text-sm text-slate-300 sm:text-base">
            We openly share the principles behind ÆON: defects as data, structure as
            a core requirement, and self-repair as a native behavior. But the exact
            orchestration of these methods — the geometric constraints, the
            role-conditioned prompts, and the internal schedules — remains our
            private finetuning recipe. These techniques form the backbone of how ÆON
            achieves stability without sacrificing creativity.
          </p>

          {/* Section: Why This Architecture Matters */}
          <h2 className="pt-4 text-xl font-semibold text-slate-100">
            Why This Architecture Matters
          </h2>

          <p className="text-sm text-slate-300 sm:text-sm">
            As models move toward mission-critical domains, “good enough on average”
            stops being acceptable. Systems must be predictable under pressure,
            explicit about failure, and structurally honest about their limitations.
            ÆON’s finetuning architecture is built for this future — one where
            transformers can <span className="font-semibold text-emerald-300">
            understand, verify, repair</span> their own reasoning.
          </p>

          <p className="text-sm text-slate-300 sm:text-sm pb-4">
            It is a foundation for the next generation of safe, reliable intelligence —
            and a step toward the internal clarity AGI will require.
          </p>
        </div>

        {/* RIGHT SIDE – ARCHITECTURAL PILLARS */}
        <div className="w-full max-w-md rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-700/70">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-300/80">
            Architectural Pillars
          </p>

          <ul className="mt-4 space-y-3 text-xs text-slate-200">
            <li>
              • <span className="font-semibold text-emerald-300">Defect-aware SFT</span>:
              curated pairs of defective → repaired outputs train the model to
              recognize structure and correctness.
            </li>

            <li>
              • <span className="font-semibold text-emerald-300">Verifier-conditioned
              reasoning</span>: finetuning patterns that reward the model for
              checking its own work.
            </li>

            <li>
              • <span className="font-semibold text-emerald-300">Repair-first
              behavior</span>: the model learns to fix failures before generating
              final answers.
            </li>

            <li>
              • <span className="font-semibold text-emerald-300">Geometry-informed
              norms</span>: integrity scores that monitor hidden-state stability and
              guide architectural improvements.
            </li>

            <li>
              • <span className="font-semibold text-emerald-300">Strict output
              contract</span>: JSON correctness, required fields, structure, and
              explicit error reporting baked directly into finetuning.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
