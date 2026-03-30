import { Link } from "react-router";
import type { ReactNode } from "react";

// -----------------------------------------------------------------------------
// MdxLink — anchor override for MDX articles
//
// Registered in createMdxComponents() as the `a` element override.
// Automatically distinguishes internal from external links by href.
//
// Links use --color-viz-blue (#4DA6FF) rather than the copper accent system.
// This is a deliberate exception to the "no viz colours in UI chrome" rule —
// article prose links are inline functional elements, not chrome. Using blue
// creates immediate visual separation from every Highlight variant (all of
// which are copper/amber). The reader can distinguish "this is actionable"
// from "this is emphasised" at a glance.
//
// Internal  (/writing/..., /work/...)
//   Uses React Router <Link> for client-side navigation.
//   Blue at rest, no underline. Underline appears on hover only —
//   distinguishes from Highlight cite (always underlined).
//
// External  (https://, http://, mailto:)
//   Plain <a> with target="_blank" rel="noopener noreferrer".
//   Slightly dimmed blue at rest, always underlined in faint blue
//   (the persistent underline is the external signal).
//   Hover sharpens to full blue + full-opacity underline.
//   Appends a hairline ↗ that does not break line rhythm.
//
// Rules:
//   - Never use copper/amber for links — that is the Highlight colour space
//   - Never use border-b — use text-decoration to preserve baseline
//   - External ↗ is aria-hidden — screen readers read the link text only
//   - Internal links use React Router Link, never plain <a>
// -----------------------------------------------------------------------------

type MdxLinkProps = {
  href?: string;
  children?: ReactNode;
};

// Shared base — explicit properties only, no shorthand `transition-colors`
// which can pull in colour inheritance from prose wrappers unexpectedly.
const BASE =
  "transition-[color,text-decoration-color] duration-200 ease-out cursor-pointer";

// Internal — full blue at rest, underline on hover only.
// No underline at rest keeps it distinct from Highlight cite and external links.
const INTERNAL_CLASSES = `${BASE} !text-[rgba(77,166,255,0.75)] font-medium no-underline hover:!text-viz-blue hover:underline hover:decoration-[#4DA6FF] hover:underline-offset-[3px] hover:decoration-[1.5px]`;

// External — dimmed blue at rest with a faint persistent underline.
// The always-on underline signals "this leaves the site" without hover.
// Hover brings the text and underline to full blue.
const EXTERNAL_CLASSES = `${BASE} !text-[rgba(77,166,255,0.75)] underline decoration-[rgba(77,166,255,0.3)] underline-offset-[3px] decoration-[1.5px] hover:!text-viz-blue hover:decoration-[#4DA6FF]`;

function isExternal(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

export function MdxLink({ href = "", children }: MdxLinkProps) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={EXTERNAL_CLASSES}
      >
        {children}
        <span
          aria-hidden="true"
          className="inline-block ml-[2px] text-[0.7em] translate-y-[-0.1em] opacity-50"
        >
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link to={href} className={INTERNAL_CLASSES}>
      {children}
    </Link>
  );
}
