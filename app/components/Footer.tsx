const COPY_RIGHT = "STEPHEN CHIANG 2026";
const LABEL_LINKEDIN = "LINKEDIN";
const LABEL_X = "X";
const HREF_LINKEDIN = "https://linkedin.com/in/chiangs";
const HREF_X = "https://x.com/chiangs";

export function Footer() {
  return (
    <footer className="border-t border-[#222220]">
      <div className="container-site flex items-center justify-between h-14">
        <span className="text-label text-[#5a5a58]">{COPY_RIGHT}</span>
        <div className="flex items-center gap-6">
          <a
            href={HREF_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-[#5a5a58] hover:text-[#f5a020] transition-colors duration-200"
          >
            {LABEL_LINKEDIN}
          </a>
          <a
            href={HREF_X}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-[#5a5a58] hover:text-[#f5a020] transition-colors duration-200"
          >
            {LABEL_X}
          </a>
        </div>
      </div>
    </footer>
  );
}
