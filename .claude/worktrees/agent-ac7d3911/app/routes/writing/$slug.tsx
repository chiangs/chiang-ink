import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";
import type { Route } from "./+types/$slug";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.slug} — Stephen Chiang` }];
}

export default function Article({ params }: Route.ComponentProps) {
  return (
    <>
      <Nav />
      <main className="section-padding">
        <div className="container-site max-w-[720px]">
          <p className="text-label text-[#5a5a58] mb-8">
            <a href="/writing" className="hover:text-[#f5a020] transition-colors duration-200">Writing</a>
            {" / "}
            {params.slug}
          </p>
          <h1 className="font-display font-black text-[clamp(32px,5vw,56px)] text-[#efefec] leading-[1.05] mb-8">
            Article title
          </h1>
          {/* MDX content goes here */}
          <p className="text-[#5a5a58]">Content coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
