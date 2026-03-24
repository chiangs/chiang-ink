import { NavLink } from "react-router";

const LABEL_OPEN_MENU = "Open menu";

const NAV_LINKS = [
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
];

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "text-label text-[#efefec] relative group transition-colors duration-200",
    isActive ? "text-[#f5a020]" : "hover:text-[#f5a020]",
  ].join(" ");
}

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#222220] bg-[#0c0c0c]/80 backdrop-blur-sm">
      <div className="container-site flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-display font-bold text-[#f5a020] text-base tracking-tight"
        >
          SC
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={getNavLinkClass}>
                {label}
                {/* Underline slide-in */}
                <span className="absolute -bottom-0.5 left-0 h-px w-full bg-[#f5a020] scale-x-0 group-hover:scale-x-100 transition-transform duration-[250ms] ease-out origin-left" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger — stub */}
        <button aria-label={LABEL_OPEN_MENU} className="md:hidden text-[#efefec] p-2">
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </div>
    </nav>
  );
}
