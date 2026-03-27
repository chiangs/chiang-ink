import { Link } from "react-router";

// Stub data — replace with MDX content
const posts = [
  {
    slug: "post-one",
    number: "01",
    title: "On building product teams that ship",
    date: "Mar 2026",
    readTime: "6 min read",
  },
  {
    slug: "post-two",
    number: "02",
    title: "Design systems as organisational strategy",
    date: "Feb 2026",
    readTime: "8 min read",
  },
  {
    slug: "post-three",
    number: "03",
    title: "Why engineers should care about typography",
    date: "Jan 2026",
    readTime: "4 min read",
  },
];

export function WritingList() {
  return (
    <section className="section-padding border-b border-[#222220]">
      <div className="container-site">
        <div className="flex items-baseline justify-between mb-16">
          <p className="text-label text-[#5a5a58]">Writing</p>
          <Link
            to="/writing"
            className="text-label text-[#f5a020] hover:opacity-60 transition-opacity duration-200"
          >
            All posts →
          </Link>
        </div>

        <div>
          {posts.map((post) => (
            <WritingRow key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WritingRow({
  slug,
  number,
  title,
  date,
  readTime,
}: (typeof posts)[0]) {
  return (
    <Link
      to={`/writing/${slug}`}
      className="group relative flex items-center justify-between py-8 border-b border-[#222220] overflow-hidden"
    >
      {/* Hover bar slides in from left */}
      <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#f5a020] scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />

      {/* Ghost number */}
      <span
        className="font-display font-black text-[#f5a020] select-none pointer-events-none absolute left-0 transition-opacity duration-200 group-hover:opacity-[0.6]"
        style={{ fontSize: "48px", lineHeight: 1, opacity: 0.2 }}
        aria-hidden
      >
        {number}
      </span>

      {/* Title */}
      <span className="font-display font-bold text-[28px] md:text-[32px] text-[#efefec] group-hover:text-[#f5a020] transition-colors duration-200 relative z-10 ml-12">
        {title}
      </span>

      {/* Meta */}
      <div className="flex items-center gap-4 relative z-10 shrink-0 ml-8">
        <span className="text-label text-[#5a5a58]">{date}</span>
        <span className="text-label text-[#5a5a58]">{readTime}</span>
      </div>
    </Link>
  );
}
