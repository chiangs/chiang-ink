/**
 * NdaDisclosure
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendered automatically by work/$slug.tsx when frontmatter nda: true.
 * Sits above the footer nav — after the work has spoken, before the CTA.
 */

const NDA_COPY = `Senior enterprise work comes with NDAs. The client and identifying details are anonymised.\nThe problems solved, the decisions made, and the outcomes delivered are real.`;
const NDA_LABEL = "CONFIDENTIALITY NOTE";

export function NdaDisclosure() {
  return (
    <div className="max-w-container mx-auto px-margin-mob md:px-margin py-8 flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
      <span className="font-body font-medium text-sm uppercase tracking-[0.15em] text-text-muted shrink-0">
        {NDA_LABEL}
      </span>
      <p
        className="font-body text-sm text-text-primary whitespace-pre-line"
        style={{ lineHeight: 1.75, opacity: 0.75 }}
      >
        {NDA_COPY}
      </p>
    </div>
  );
}
