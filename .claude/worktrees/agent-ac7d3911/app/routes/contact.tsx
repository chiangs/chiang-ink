import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";

export function meta() {
  return [{ title: "Contact — Stephen Chiang" }];
}

export default function Contact() {
  return (
    <>
      <Nav />
      <main className="section-padding">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            {/* Left */}
            <div>
              <p className="text-label text-[#5a5a58] mb-6">Contact</p>
              <h1 className="font-display font-black text-[clamp(40px,6vw,72px)] text-[#efefec] leading-[0.95] mb-8">
                Let&apos;s talk.
              </h1>
              <p className="text-[16px] text-[#5a5a58] leading-[1.75] mb-8">
                Available for consulting engagements, advisory roles, and
                interesting problems. Based in Stavanger, Norway — CET timezone.
              </p>
              <a
                href="mailto:stephen@chiang.studio"
                className="text-label text-[#f5a020] border-b border-[#f5a020] pb-0.5 hover:opacity-60 transition-opacity duration-200"
              >
                stephen@chiang.studio
              </a>
            </div>

            {/* Right — form */}
            <form className="flex flex-col gap-10 bg-[#1a1a1a] p-10">
              <div className="flex flex-col gap-2">
                <label className="text-label text-[#5a5a58]">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="bg-transparent border-0 border-b border-[#f5a020] text-[#efefec] text-[16px] py-2 outline-none focus:border-[#f5a020] placeholder:text-[#5a5a58]"
                  placeholder="Your name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label text-[#5a5a58]">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="bg-transparent border-0 border-b border-[#f5a020] text-[#efefec] text-[16px] py-2 outline-none focus:border-[#f5a020] placeholder:text-[#5a5a58]"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label text-[#5a5a58]">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="bg-transparent border-0 border-b border-[#f5a020] text-[#efefec] text-[16px] py-2 outline-none focus:border-[#f5a020] placeholder:text-[#5a5a58] resize-none"
                  placeholder="Tell me what you're working on…"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f5a020] text-[#0c0c0c] font-display font-bold text-[14px] uppercase tracking-[0.15em] py-4 hover:bg-[#0c0c0c] hover:text-[#f5a020] border border-[#f5a020] transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
