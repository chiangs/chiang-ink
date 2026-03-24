import { Link } from "react-router";

const SECTION_LABEL = "Get in touch";
const HEADING_LINE_1 = "Let's build";
const HEADING_LINE_2 = "something";
const HEADING_LINE_3 = "together.";
const EMAIL = "stephen@chiang.studio";
const HREF_EMAIL = `mailto:${EMAIL}`;
const LABEL_CONTACT_FORM = "OPEN CONTACT FORM →";
const HREF_CONTACT = "/contact";

export function ContactStrip() {
  return (
    <section className="section-padding bg-[#0c0c0c]">
      <div className="container-site flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        <div>
          <p className="text-label text-[#5a5a58] mb-6">{SECTION_LABEL}</p>
          <h2 className="font-display font-black text-[clamp(32px,5vw,64px)] text-[#efefec] leading-[0.95]">
            {HEADING_LINE_1}
            <br />
            <span className="text-[#f5a020]">{HEADING_LINE_2}</span>
            <br />
            {HEADING_LINE_3}
          </h2>
        </div>

        <div className="flex flex-col items-start gap-4">
          <a
            href={HREF_EMAIL}
            className="text-label text-[#f5a020] border-b border-[#f5a020] pb-0.5 hover:opacity-60 transition-opacity duration-200"
          >
            {EMAIL}
          </a>
          <Link
            to={HREF_CONTACT}
            className="text-label bg-[#f5a020] text-[#0c0c0c] px-8 py-4 font-bold hover:bg-[#0c0c0c] hover:text-[#f5a020] border border-[#f5a020] transition-colors duration-200"
          >
            {LABEL_CONTACT_FORM}
          </Link>
        </div>
      </div>
    </section>
  );
}
