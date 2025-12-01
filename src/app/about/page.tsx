export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="mx-auto max-w-5xl px-6 py-20">

        {/* Founder */}
        <section className="mb-24">
          <h2 className="text-sm font-semibold tracking-wider text-emerald-400 mb-2">
            FOUNDER — MANISH RAJ VANGARI
          </h2>

          <p className="text-2xl font-semibold mb-6">
            About the Builder
          </p>

          <p className="leading-relaxed text-gray-300 max-w-4xl">
            This project is part of a long-term journey: a pursuit to understand intelligence deeply,
            engineer it responsibly, and push beyond today’s assumptions about how models behave.
            The aim is not praise or recognition, but clarity — to build systems that earn trust
            through precision, transparency, and rigorous reasoning.
          </p>
        </section>

        {/* Research */}
        <section className="mb-24">
          <h3 className="text-2xl font-semibold mb-4 text-white">Research</h3>

          <p className="leading-relaxed text-gray-300 mb-4 max-w-4xl">
            Every major advancement begins with asking the right questions. Research is the foundation
            of this work — it guides what we choose to build, what we challenge, and what insights we 
            aim to reveal.
          </p>

          <p className="leading-relaxed text-gray-300 mb-4 max-w-4xl">
            Two upcoming research papers reflect this direction. The first,
            <span className="text-emerald-400"> Operational Absolute Nothing</span>, explores a 
            foundational perspective on information, perception, and the conditions beneath 
            physical description. The second,
            <span className="text-emerald-400"> Framework Invitation</span>, examines how one reasons 
            about systems where the rules themselves are unknown — how one “invites” a solution when 
            the structure to contain it does not yet exist.
          </p>

          <p className="leading-relaxed text-gray-300 max-w-4xl">
            These inquiries tie directly into the deeper search behind intelligence, consciousness, 
            and computation — acknowledging that some questions may require stepping beyond classical 
            constraints toward hybrid or quantum-inspired approaches. Research remains the first step 
            before any engineering decision.
          </p>
        </section>

        {/* IP */}
        <section className="mb-24">
          <h3 className="text-2xl font-semibold mb-4 text-white">Intellectual Property</h3>

          <p className="leading-relaxed text-gray-300 max-w-4xl mb-4">
            All concepts, methods, datasets, and architectural ideas introduced in this project 
            are original work and are fully protected under copyright by 
            <span className="text-emerald-400"> Manish Raj Vangari</span>. This includes the 
            Zero-Defect (ÆON) pipeline, its training loops, geometry metrics, evaluation tooling, 
            and supporting research.
          </p>

          <p className="leading-relaxed text-gray-300 max-w-4xl">
            A formal patent application covering the system’s mechanisms, defect-driven training 
            process, and integrity-first architecture is currently being prepared. Once filed and 
            published, the project will be protected both as copyrighted material and as a patented 
            invention under the founder’s name.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-24">
          <h3 className="text-2xl font-semibold mb-4 text-white">Vision</h3>

          <p className="leading-relaxed text-gray-300 max-w-4xl mb-4">
            The long-term mission is clear: develop systems that reason with structure, respond with
            integrity, and reconstruct understanding the way humans refine thoughts. From memory 
            reconstruction frameworks to future explorations in artificial quantum intelligence, 
            the journey ahead is expansive — but grounded in careful engineering and measurable 
            scientific progress.
          </p>

          <p className="leading-relaxed text-gray-300 max-w-4xl">
            This work exists to move toward models that can analyze, correct, introspect, and 
            ultimately think with reliability.
          </p>
        </section>

      </div>
    </div>
  );
}
