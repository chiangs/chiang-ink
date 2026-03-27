import type { Route } from "./+types/home";
import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";
import { Hero } from "~/components/home/Hero";
import { WorkRows } from "~/components/home/WorkRows";
import { AboutStrip } from "~/components/home/AboutStrip";
import { WritingList } from "~/components/home/WritingList";
import { ContactStrip } from "~/components/home/ContactStrip";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Stephen Chiang — Design Technologist" },
    {
      name: "description",
      content:
        "Engineering the strategy behind how products get built. Design Technologist and Product & Technology Leader based in Stavanger, Norway.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkRows />
        <AboutStrip />
        <WritingList />
        <ContactStrip />
      </main>
      <Footer />
    </>
  );
}
