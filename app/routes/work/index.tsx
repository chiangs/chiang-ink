import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";

export function meta() {
  return [{ title: "Work — Stephen Chiang" }];
}

export default function WorkIndex() {
  return (
    <>
      <Nav />
      <main className="section-padding">
        <div className="container-site">
          <p className="text-label text-[#5a5a58] mb-4">Work</p>
          <h1 className="font-display font-black text-[clamp(48px,7vw,80px)] text-[#efefec] leading-[0.9]">
            Selected
            <br />
            <span className="text-[#f5a020]">Projects</span>
          </h1>
          {/* Work index content goes here */}
        </div>
      </main>
      <Footer />
    </>
  );
}
