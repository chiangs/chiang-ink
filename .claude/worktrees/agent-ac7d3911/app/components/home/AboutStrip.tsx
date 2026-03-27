export function AboutStrip() {
  return (
    <section className="relative overflow-hidden bg-[#f5a020] section-padding">
      {/* Ghost number clips left */}
      <span
        className="font-display font-black text-[#0c0c0c] select-none pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2"
        style={{ fontSize: "120px", lineHeight: 1, opacity: 0.12 }}
        aria-hidden
      >
        001
      </span>

      <div className="container-site relative z-10">
        <p className="text-label text-[#0c0c0c]/60 mb-8">About</p>

        <p className="text-[28px] md:text-[32px] font-[500] text-[#0c0c0c] leading-[1.4] max-w-3xl">
          I operate at the intersection of product strategy, design systems, and
          engineering leadership — helping organisations build faster and smarter
          without sacrificing craft.
        </p>

        <div className="mt-12 flex items-center gap-6">
          <a
            href="mailto:stephen@chiang.studio"
            className="text-label text-[#0c0c0c] border-b border-[#0c0c0c] pb-0.5 hover:opacity-60 transition-opacity duration-200"
          >
            stephen@chiang.studio
          </a>
          <span className="text-label text-[#0c0c0c]/40">Stavanger, Norway</span>
        </div>
      </div>
    </section>
  );
}
