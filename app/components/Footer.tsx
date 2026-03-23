export function Footer() {
  return (
    <footer className="border-t border-[#222220]">
      <div className="container-site flex items-center justify-between h-14">
        <span className="text-label text-[#5a5a58]">STEPHEN CHIANG 2026</span>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/chiangs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-[#5a5a58] hover:text-[#f5a020] transition-colors duration-200"
          >
            LINKEDIN
          </a>
          <a
            href="https://x.com/chiangs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-[#5a5a58] hover:text-[#f5a020] transition-colors duration-200"
          >
            X
          </a>
        </div>
      </div>
    </footer>
  );
}
