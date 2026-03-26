import type { Route } from "./+types/$slug";
import { SITE_OWNER, HREF_WRITING } from "~/lib/constants";

const SITE_SUFFIX = `— ${SITE_OWNER}`;
const BREADCRUMB_LABEL = "Writing";
const BREADCRUMB_HREF = HREF_WRITING;
const BREADCRUMB_SEPARATOR = " / ";
const HEADING = "Article title";
const CONTENT_PLACEHOLDER = "Content coming soon.";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.slug} ${SITE_SUFFIX}` }];
}

export default function Article({ params }: Route.ComponentProps) {
  return (
    <main className="py-section-mob md:py-section">
      <div className="max-w-container mx-auto px-margin-mob md:px-margin max-w-180">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-text-muted mb-8">
          <a href={BREADCRUMB_HREF} className="hover:text-accent transition-colors duration-200">
            {BREADCRUMB_LABEL}
          </a>
          {BREADCRUMB_SEPARATOR}
          {params.slug}
        </p>
        <h1 className="font-display font-black text-[clamp(32px,5vw,56px)] text-text-primary leading-[1.05] mb-8">
          {HEADING}
        </h1>
        {/* MDX content goes here */}
        <p className="text-text-muted">{CONTENT_PLACEHOLDER}</p>
      </div>
    </main>
  );
}
