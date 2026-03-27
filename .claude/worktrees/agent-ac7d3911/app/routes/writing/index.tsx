import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";

export function meta() {
  return [{ title: "Writing — Stephen Chiang" }];
}

export default function WritingIndex() {
  return (
    <>
      <Nav />
      <main className="section-padding">
        <div className="container-site">
          <p className="text-label text-[#5a5a58] mb-4">Writing</p>
          <h1 className="font-display font-black text-[clamp(48px,7vw,80px)] text-[#efefec] leading-[0.9]">
            Essays &amp;
            <br />
            <span className="text-[#f5a020]">Notes</span>
          </h1>
          {/* Writing list goes here */}
        </div>
      </main>
      <Footer />
    </>
  );
}
