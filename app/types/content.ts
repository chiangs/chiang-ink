export type ArticleFrontmatter = {
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  order: number;
  slug?: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectStack = {
  frameworks: string[];
  languages: string[];
  platforms: string[];
};

export type ProjectFrontmatter = {
  title: string;
  client: string;
  clientContext: string;
  roles: string[];
  year: string;
  status: string;
  tags: string[];
  industry: string[];
  industries?: string[];
  solutionType: string[];
  metrics: ProjectMetric[];
  stack?: ProjectStack;
  heroImage: string;
  featured: boolean;
  order: number;
  slug?: string;
};
