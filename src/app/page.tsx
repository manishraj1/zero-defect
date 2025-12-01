// app/page.tsx  (Overview)

export default function OverviewPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-8">
        {/* Small label */}
        <p className="text-xs font-semibold tracking-[0.22em] text-emerald-400">
          ÆON OVERVIEW
        </p>

        <div className="mt-4 grid gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-start">
          {/* Left column – main narrative */}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Zero-Defect Intelligence
            </h1>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300">
              <p>
                <span className="font-semibold text-emerald-300">ÆON</span> is an
                advanced zero-defect finetuning and evaluation methodology for
                next-generation large language models — a pipeline engineered to
                bring reliability, internal reasoning discipline, and structural
                integrity to the heart of modern AI systems. It unifies
                self-verification, self-repair, stress resilience, and deep
                geometric analysis into a single philosophy of intelligence:{' '}
                <span className="font-semibold text-emerald-300">
                  every answer must justify its own existence.
                </span>
              </p>

              <p>
                But ÆON is not simply an evaluation pipeline. It is built on a{' '}
                <span className="font-semibold text-emerald-300">
                  new interpretation of neural computation itself
                </span>
                . Our work begins at a level deeper than architectures, deeper
                than parameters — it begins with a new understanding of how
                hidden layers form meaning, how geometric transitions inside the
                network create reasoning pathways, and how these pathways can be
                shaped, corrected, and stabilized.
              </p>

              <p>
                We are building upon a neural principle that models can be
                taught not just to output text, but to{' '}
                <span className="font-semibold text-emerald-300">
                  develop internal structures that remain coherent across
                  transformations
                </span>
                . At the core of this philosophy is our invention:{' '}
                <span className="font-semibold text-emerald-300">
                  a high-level transformer framework
                </span>{' '}
                designed to work hand-in-hand with zero-defect reasoning. This
                evolving architecture treats each layer as a geometric state
                transition, enabling us to influence how representations
                stabilize, how failures propagate, and how the model internally
                verifies its own logic.
              </p>
            </div>

            {/* Stylish planned open-source badge */}
            <button
              type="button"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/5 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.35)] transition
                         hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-100 hover:shadow-[0_0_32px_rgba(16,185,129,0.7)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)] transition
                           group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(110,231,183,1)]"
              />
              <span>Planned Open-Source Release After Patent Completion</span>
            </button>
          </div>

          {/* Right column – what ÆON makes possible */}
          <aside className="rounded-3xl border border-slate-800 bg-slate-950/60 px-6 py-6 text-sm text-slate-300 shadow-[0_18px_60px_rgba(15,23,42,0.85)]">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-emerald-400">
              WHAT ÆON MAKES POSSIBLE
            </p>

            <ul className="mt-4 space-y-3 leading-relaxed">
              <li>
                • Maintain{' '}
                <span className="font-semibold text-emerald-300">
                  structural coherence
                </span>{' '}
                under high-stress reasoning.
              </li>
              <li>
                • Repair faulty{' '}
                <span className="font-semibold text-emerald-300">
                  internal computations
                </span>{' '}
                before they become outputs.
              </li>
              <li>
                • Preserve{' '}
                <span className="font-semibold text-emerald-300">
                  logical integrity
                </span>{' '}
                across long, complex chains of thought.
              </li>
              <li>
                • Align{' '}
                <span className="font-semibold text-emerald-300">
                  geometric transformations
                </span>{' '}
                inside the network with verifiable outcomes.
              </li>
              <li>
                • Produce{' '}
                <span className="font-semibold text-emerald-300">
                  richer, higher-quality data
                </span>{' '}
                through disciplined internal checks on the path to AGI.
              </li>
            </ul>

            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              ÆON is the first step of a larger journey — a journey toward AI
              systems that can{' '}
              <span className="font-semibold text-emerald-300">
                understand their own structure
              </span>
              , explain their own transitions, and maintain coherence even when
              navigating the deepest layers of abstraction.
            </p>

            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Zero-defect intelligence is not merely a safety layer; it is a{' '}
              <span className="font-semibold text-emerald-300">
                foundational technique
              </span>{' '}
              for building systems that exceed today&apos;s limitations and move
              us closer to true AGI.
            </p>

            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              This is only the beginning. ÆON marks the start of a new class of
              AI — reliable, introspective, and rooted in a precise
              understanding of the{' '}
              <span className="font-semibold text-emerald-300">
                geometry of thought
              </span>
              . We invite researchers, engineers, and builders to explore this
              frontier with us.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
