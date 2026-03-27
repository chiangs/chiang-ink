export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center border-b border-[#222220] overflow-hidden">
      <div className="container-site w-full grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-0 items-stretch">
        {/* Left — text */}
        <div className="flex flex-col justify-center py-20 pr-0 md:pr-16">
          <p className="text-label text-[#5a5a58] mb-8">
            Design Technologist / Product &amp; Technology Leader
          </p>

          <h1 className="font-display font-black text-[clamp(48px,7vw,80px)] leading-[0.9] text-[#efefec] mb-6">
            Engineering
            <br />
            the strategy
            <br />
            <span className="text-[#f5a020]">behind</span> how
            <br />
            products get
            <br />
            built.
          </h1>

          <p className="text-[18px] text-[#5a5a58] leading-[1.75] max-w-sm">
            Based in Stavanger, Norway — working across product, design, and
            engineering to build things that matter.
          </p>
        </div>

        {/* Right — portrait placeholder */}
        <div className="relative hidden md:block bg-[#141414] min-h-[90vh]">
          {/* Portrait image goes here — duotone treatment applied via CSS */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-label text-[#5a5a58]">PORTRAIT</span>
          </div>

          {/* Live time */}
          <div className="absolute top-6 right-6">
            <span className="text-[11px] font-[Inter] text-[#efefec]/60 tracking-widest">
              CET
            </span>
          </div>

          {/* Vertical text */}
          <div
            className="absolute bottom-8 right-0 text-[10px] text-[#5a5a58] tracking-[0.2em]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            STEPHEN CHIANG © 2026
          </div>
        </div>
      </div>
    </section>
  );
}
