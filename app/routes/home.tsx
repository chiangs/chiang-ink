import type { Route } from "./+types/home";
import { useLoaderData } from "react-router";
import { getFeaturedProjects, getFeaturedArticles } from "~/lib/mdx.server";
import {
  Hero,
  CredentialsBar,
  WorkRows,
  AboutStrip,
  WritingList,
  ContactStrip,
} from "~/components/home";

export async function loader() {
  const [projects, articles] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedArticles(),
  ]);
  return { projects, articles };
}

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
  const { projects, articles } = useLoaderData<typeof loader>();

  return (
    <main>
      <Hero />
      <CredentialsBar />
      <WorkRows projects={projects} />
      <AboutStrip />
      <WritingList articles={articles} />
      <ContactStrip />
    </main>
  );
}
