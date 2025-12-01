export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <section className="mx-auto max-w-5xl space-y-6">
        {/* HEADER */}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
          Future Plans
        </p>

        <h1 className="text-3xl font-semibold leading-tight text-emerald-300 sm:text-3xl md:text-3xl">
          The Future of ÆON
        </h1>

        {/* INTRO */}
        <p className="text-sm text-slate-300 sm:text-sm">
          ÆON is not the final destination — it is the first stable platform we
          stand on to reach far more difficult challenges. Our future plans focus
          on one idea: truly reliable intelligence will emerge only when{" "}
          <span className="font-semibold text-emerald-300">
            architecture, training, and hardware
          </span>{" "}
          are designed as a unified system. We aim to build AI systems that do
          not just run on hardware, but{" "}
          <span className="font-semibold text-emerald-300">
            cooperate with it
          </span>{" "}
          at every level.
        </p>

        {/* HARDWARE AWARE INTELLIGENCE */}
        <div className="rounded-3xl bg-slate-900/80 p-6 ring-1 ring-slate-800/80 space-y-4">
          <h2 className="text-lg font-semibold text-slate-100">
            Hardware-Aware Intelligence
          </h2>

          <p className="text-sm text-slate-300">
            Our next iterations bring models and chips closer together. Instead
            of treating hardware as a constraint, we treat it as an{" "}
            <span className="font-semibold text-emerald-300">
              active ingredient
            </span>{" "}
            in the design of zero-defect intelligence. Every decision in ÆON —
            from layer structure to repair frequency — will be aligned with real
            hardware behavior.
          </p>

          <ul className="text-sm text-slate-300 space-y-1">
            <li>
              • Chip-aware training loops that learn optimal schedules, batch
              shapes, and precision modes for each device.
            </li>
            <li>
              • Geometry-preserving compression, maintaining internal integrity
              even at lower precision.
            </li>
            <li>
              • New studies of latency–reliability tradeoffs, allowing users to
              pick the operating point they need.
            </li>
          </ul>

          <p className="text-sm text-slate-300">
            Our goal is simple: build models that extract{" "}
            <span className="font-semibold text-emerald-300">
              the full value of a chip
            </span>
            — not only in FLOPs, but in the{" "}
            <span className="font-semibold text-emerald-300">
              quality of reasoning per watt.
            </span>
          </p>
        </div>

        {/* TRAINING EVOLUTION */}
        <div className="rounded-3xl bg-slate-900/80 p-6 ring-1 ring-slate-800/80 space-y-4">
          <h2 className="text-lg font-semibold text-slate-100">
            Next-Generation Training & Evaluation
          </h2>

          <p className="text-sm text-slate-300">
            ÆON will evolve from a single pipeline into a family of{" "}
            <span className="font-semibold text-emerald-300">
              specialized training systems
            </span>{" "}
            targeting the hardest dimensions of reliability.
          </p>

          <ul className="text-sm text-slate-300 space-y-1">
            <li>
              • Curricula built entirely around failure modes, exposing models to
                the toughest reasoning scenarios.
            </li>
            <li>
              • Category-level stress systems that test reasoning, planning,
                memory, and structural safety simultaneously.
            </li>
            <li>
              • Self-diagnosing loops where models detect uncertainty or
                structural instability before it appears in the output.
            </li>
          </ul>

          <p className="text-sm text-slate-300">
            Our training tools aim not just for higher accuracy, but systematic{" "}
            <span className="font-semibold text-emerald-300">
              expansion of the model’s capability boundary.
            </span>
          </p>
        </div>

        {/* MEMORY & THOUGHT RECONSTRUCTION */}
        <div className="rounded-3xl bg-slate-900/80 p-6 ring-1 ring-slate-800/80 space-y-4">
          <h2 className="text-lg font-semibold text-slate-100">
            Beyond Output: Intelligence & Memory
          </h2>

          <p className="text-sm text-slate-300">
            As we move deeper, our research expands beyond improving model
            outputs. We explore systems that allow AI models to{" "}
            <span className="font-semibold text-emerald-300">
              regenerate thoughts
            </span>{" "}
            and refine them over time, closer to how human cognition operates.
          </p>

          <ul className="text-sm text-slate-300 space-y-1">
            <li>
              • Treating hidden-state geometry as internal memory traces that a
                model can revisit and improve.
            </li>
            <li>
              • Early prototypes exploring memory reconstruction — not just
                storing data, but rebuilding coherent chains of reasoning.
            </li>
          </ul>

          <p className="text-sm text-slate-300">
            We do not reveal every direction here, but the message is clear:
            ÆON is the foundation for a sequence of increasingly ambitious
            prototypes.
          </p>
        </div>

        {/* INVITATION */}
        <div className="rounded-3xl bg-slate-900/80 p-6 ring-1 ring-slate-800/80 space-y-4 mb-12">
          <h2 className="text-lg font-semibold text-slate-100">
            An Invitation to the Future
          </h2>

          <p className="text-sm text-slate-300">
            Our aim is to build systems that use hardware intelligently, train
            on the most difficult categories, and move toward models that can{" "}
            <span className="font-semibold text-emerald-300">
              understand, inspect, and improve their own structure.
            </span>
          </p>

          <p className="text-sm text-slate-300">
            ÆON is only the beginning. The future belongs to systems that are
            reliable, self-aware in their structure, and deeply optimized for
            both geometry and silicon.
          </p>
        </div>
      </section>
    </main>
  );
}
