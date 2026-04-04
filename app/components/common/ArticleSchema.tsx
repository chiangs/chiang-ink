const AUTHOR_URL = "https://www.chiang.ink";
const AUTHOR_NAME = "Stephen Chiang";
const AUTHOR_JOB_TITLE = "Design Technologist";
const AUTHOR_LINKEDIN = "https://www.linkedin.com/in/chiangs";
const SITE_NAME = "Stephen Chiang — Design Technologist";
const SITE_IMAGE = "https://www.chiang.ink/images/portrait/stephen-chiang.jpg";
const BASE_WRITING_URL = "https://www.chiang.ink/writing";

type ArticleSchemaProps = {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  category: string;
  readTime: string;
};

export function ArticleSchema({
  title,
  description,
  slug,
  publishedDate,
  category,
  readTime,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: `${BASE_WRITING_URL}/${slug}`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      jobTitle: AUTHOR_JOB_TITLE,
      sameAs: AUTHOR_LINKEDIN,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    image: SITE_IMAGE,
    articleSection: category,
    timeRequired: readTime,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: AUTHOR_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
