import type { ProjectFrontmatter } from "~/types/content";
import { WorkRow } from "~/components/common";

const SECTION_LABEL = "Selected Work";

type Props = {
  projects: ProjectFrontmatter[];
};

export function WorkRows({ projects }: Props) {
  return (
    <section className="py-section-mob md:py-section">
      <div className="max-w-container mx-auto px-margin-mob md:px-margin">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-text-muted mb-16">
          {SECTION_LABEL}
        </p>
        <div>
          {projects.map((project, i) => (
            <WorkRow key={project.slug} project={project} index={i} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
