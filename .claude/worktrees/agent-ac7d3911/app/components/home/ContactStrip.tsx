import { Link } from "react-router";

export function ContactStrip() {
  return (
    <section className="section-padding bg-[#0c0c0c]">
      <div className="container-site flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        <div>
          <p className="text-label text-[#5a5a58] mb-6">Get in touch</p>
          <h2 className="font-display font-black text-[clamp(32px,5vw,64px)] text-[#efefec] leading-[0.95]">
            Let&apos;s build
            <br />
            <span className="text-[#f5a020]">something</span>
            <br />
            together.
          </h2>
        </div>

        <div className="flex flex-col items-start gap-4">
          <a
            href="mailto:stephen@chiang.studio"
            className="text-label text-[#f5a020] border-b border-[#f5a020] pb-0.5 hover:opacity-60 transition-opacity duration-200"
          >
            stephen@chiang.studio
          </a>
          <Link
            to="/contact"
            className="text-label bg-[#f5a020] text-[#0c0c0c] px-8 py-4 font-bold hover:bg-[#0c0c0c] hover:text-[#f5a020] border border-[#f5a020] transition-colors duration-200"
          >
            OPEN CONTACT FORM →
          </Link>
        </div>
      </div>
    </section>
  );
}
