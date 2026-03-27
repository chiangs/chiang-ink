import { Link } from "react-router";

// Stub data — replace with MDX/CMS content
const projects = [
  {
    slug: "project-one",
    number: "01",
    name: "Project One",
    category: "Product Strategy",
    outcome: "Reduced time-to-ship by 40%",
    featured: false,
  },
  {
    slug: "project-two",
    number: "02",
    name: "Project Two",
    category: "Design Systems",
    outcome: "Unified design language across 6 products",
    featured: true,
  },
  {
    slug: "project-three",
    number: "03",
    name: "Project Three",
    category: "Engineering",
    outcome: "Scaled platform to 2M users",
    featured: false,
  },
];

export function WorkRows() {
  return (
    <section className="section-padding border-b border-[#222220]">
      <div className="container-site">
        <p className="text-label text-[#5a5a58] mb-16">Selected Work</p>
        <div>
          {projects.map((project) => (
            <WorkRow key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkRow({
  slug,
  number,
  name,
  category,
  outcome,
  featured,
}: (typeof projects)[0]) {
  return (
    <Link
      to={`/work/${slug}`}
      className={[
        "group relative flex items-center justify-between py-8 border-b border-[#222220] transition-colors duration-200",
        featured
          ? "bg-[#141414] border-y border-y-[#f5a020] -mx-4 px-4 md:-mx-20 md:px-20"
          : "hover:bg-[#1e1e1e]",
      ].join(" ")}
    >
      {/* Ghost number */}
      <span
        className="font-display font-black text-[#f5a020] select-none pointer-events-none absolute left-0 transition-opacity duration-200"
        style={{
          fontSize: "160px",
          lineHeight: 1,
          opacity: 0.08,
        }}
        aria-hidden
      >
        {number}
      </span>

      {/* Project name */}
      <span
        className="font-display font-bold text-[36px] text-[#efefec] group-hover:text-[#f5a020] transition-colors duration-200 relative z-10 ml-4"
      >
        {name}
      </span>

      {/* Right side */}
      <div className="flex flex-col items-end gap-1 relative z-10">
        <span className="text-label text-[#5a5a58]">{category}</span>
        <span className="text-[14px] text-[#5a5a58]">{outcome}</span>
      </div>
    </Link>
  );
}
