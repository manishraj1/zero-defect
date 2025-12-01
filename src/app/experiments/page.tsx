export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-50">
      {/* HERO / INTRO */}
      <section className="mx-auto max-w-5xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
          Study of Analysis
        </p>

        <h1 className="text-3xl font-semibold leading-tight text-emerald-300 sm:text-3xl md:text-3xl">
          Study of Analysis: Understanding the Zero-Defect Architecture
        </h1>

        <p className="text-sm text-slate-300 sm:text-sm">
          This page presents the analytical journey that shaped the Zero-Defect
          (ÆON) methodology. Instead of treating evaluation as a single number,
          we examined the model from multiple angles — behavior, structure,
          geometry, repairability, and internal stability — to understand{" "}
          <span className="font-semibold text-emerald-300">
            how and why
          </span>{" "}
          a transformer fails, and how it can be taught to self-correct.
        </p>

        <p className="text-sm text-slate-300 sm:text-sm">
          These analyses form the empirical backbone of the ÆON architecture.
          They guided each finetuning decision, every repair rule, and every
          structural constraint we introduced into the model.
        </p>
      </section>

      {/* ANALYSIS CARDS */}
      <section className="mx-auto mt-10 max-w-5xl space-y-6">
        {/* 1. Baseline Behavioral Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            1. Baseline Behavioral Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Understanding the raw model before any zero-defect guidance.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            We first observed the unmodified model on defect-focused prompts.
            This revealed its natural tendencies:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• Hallucination frequency and style.</li>
            <li>• JSON breakage and malformed structure.</li>
            <li>• Missing or unsafe fields in contract-style outputs.</li>
            <li>• Instability across long reasoning chains.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            This baseline model served as the control for all later analyses.
          </p>
        </div>

        {/* 2. Structural & Loss-Driven Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            2. Structural &amp; Loss-Driven Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Studying how the model reacts to structural requirements and
            contract-bound loss functions.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            We introduced structure-aware loss terms that penalize:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• Broken or malformed JSON.</li>
            <li>• Missing citations or justification where required.</li>
            <li>• Safety violations and ungrounded claims.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            This analysis showed how strongly the model could be guided toward
            correctness when structure and safety are treated as{" "}
            <span className="font-semibold text-emerald-300">
              first-class loss terms
            </span>
            .
          </p>
        </div>

        {/* 3. Ethical Geometry & Hidden-Layer Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            3. Ethical Geometry &amp; Hidden-Layer Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Measuring how each intervention alters the internal geometry of the
            network.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            We evaluated internal metrics such as:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• <span className="font-semibold text-emerald-300">hidden_state_norm</span> behavior.</li>
            <li>• <span className="font-semibold text-emerald-300">integrity_norm</span> across layers.</li>
            <li>• Geometric drift under adversarial prompts.</li>
            <li>• Differences between architectural variants (Plain, NoACC, NoSRFFN, NoIG, NoRIS, etc.).</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            This work mapped which variants were more stable and ethically
            aligned in their internal geometry.
          </p>
        </div>

        {/* 4. Stress-Pressure Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            4. Stress-Pressure Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Pushing the model to intentional breaking points.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            We designed stress categories specifically to provoke failures:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• Hallucination temptation prompts.</li>
            <li>• JSON-breaker and structure-sabotage prompts.</li>
            <li>• Recursive, conflicting instructions.</li>
            <li>• Attribution and citation ambiguity.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            The goal was not accuracy, but a detailed map of{" "}
            <span className="font-semibold text-emerald-300">
              how the model fails under pressure
            </span>
            .
          </p>
        </div>

        {/* 5. Self-Repairability Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            5. Self-Repairability Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Studying the model&apos;s ability to identify and fix its own
            defects.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            After introducing the self-repair loop, we measured:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• Percentage of defective outputs that were successfully repaired.</li>
            <li>• Validity of repaired JSON against the schema.</li>
            <li>• Ability to recover from heavily corrupted structure.</li>
            <li>• Stability of repair behavior over long prompts.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            This analysis validated the{" "}
            <span className="font-semibold text-emerald-300">
              repair-first behavior
            </span>{" "}
            at the heart of Stage 5.
          </p>
        </div>

        {/* 6. Comparative Pipeline Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            6. Comparative Pipeline Analysis (Stage 4 vs Stage 5)
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Measuring what self-repair adds beyond standard SFT.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            We compared SFT-only models with SFT + Self-Repair pipelines across:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• Structural correctness and JSON validity.</li>
            <li>• Hallucination resistance under stress prompts.</li>
            <li>• Geometry stability and integrity norms.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            The conclusion was clear:{" "}
            <span className="font-semibold text-emerald-300">
              self-verification and self-repair fundamentally change the model&apos;s behavior
            </span>
            , not just its scores.
          </p>
        </div>

        {/* 7. API-Aligned Behavioral Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            7. API-Aligned Behavioral Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Studying behavior behind a strict JSON output contract.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            With the model deployed behind the JSON API, we evaluated:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• Determinism and repeatability of outputs.</li>
            <li>• Structural discipline and required fields.</li>
            <li>• Quality and honesty of explicit error reporting.</li>
            <li>• Robustness to malformed or adversarial input payloads.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            This confirmed that the zero-defect contract can hold under
            deployment-style conditions.
          </p>
        </div>

        {/* 8. Optimization & System-Level Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            8. Optimization &amp; System-Level Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Ensuring modern optimizations do not compromise stability.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            We studied how system-level changes affected correctness:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• <span className="font-semibold text-emerald-300">torch.compile</span> integration.</li>
            <li>• Mixed-precision training and inference (AMP).</li>
            <li>• Gradient checkpointing for memory optimization.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            The focus was not speed, but verifying that these optimizations
            preserved zero-defect behavior.
          </p>
        </div>

        {/* 9. Final Comparison Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            9. Final Comparison Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Comparing all architecture variants across every metric.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            We built comparison tables across:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• Structural correctness and JSON validity.</li>
            <li>• Hallucination resistance and safety behavior.</li>
            <li>• Internal geometry stability and integrity norms.</li>
            <li>• Repair success rates under diverse prompts.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            This produced a clear map of which variants were stable, ethical, or
            brittle — and which configuration best represented the ÆON ideal.
          </p>
        </div>

        {/* 10. Goal-Verification Analysis */}
        <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-100 ring-1 ring-slate-800/80">
          <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
            10. Goal-Verification Analysis
          </h2>
          <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
            Confirming that ÆON meets its defining objectives.
          </p>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            In the final study, we verified that the Zero-Defect architecture
            delivers:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300 sm:text-sm">
            <li>• Stronger structural correctness under stress.</li>
            <li>• Stronger hallucination resistance.</li>
            <li>• Measurable improvements in internal geometric stability.</li>
            <li>• Reliable, repair-first behavior across domains.</li>
            <li>• Deterministic, contract-safe outputs suitable for deployment.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm">
            Together, these analyses confirm that ÆON is not just a collection
            of techniques, but a{" "}
            <span className="font-semibold text-emerald-300">
              coherent zero-defect architecture
            </span>{" "}
            ready to support mission-critical applications.
          </p>
        </div>
      </section>
    </main>
  );
}
