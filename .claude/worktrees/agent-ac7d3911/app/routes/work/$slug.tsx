import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";
import type { Route } from "./+types/$slug";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.slug} — Stephen Chiang` }];
}

export default function WorkProject({ params }: Route.ComponentProps) {
  return (
    <>
      <Nav />
      <main className="section-padding">
        <div className="container-site">
          <p className="text-label text-[#5a5a58] mb-8">
            <a href="/work" className="hover:text-[#f5a020] transition-colors duration-200">Work</a>
            {" / "}
            {params.slug}
          </p>
          <h1 className="font-display font-black text-[clamp(48px,7vw,80px)] text-[#efefec] leading-[0.9] mb-16">
            Project
          </h1>
          {/* MDX content goes here */}
          <p className="text-[#5a5a58]">Content coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
