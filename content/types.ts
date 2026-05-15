export type LocalizedText = {
  en: string;
  zh: string;
};

export type Project = {
  slug: string;
  title: LocalizedText;
  year: string;
  category: string;
  status?: string;
  image?: string;
  detailImages?: {
    cover: string;
    galleryOne: string;
    galleryTwo: string;
    wide: string;
  };
  summary: LocalizedText;
  description: LocalizedText[];
  stack: string[];
  featured: boolean;
};

export type Post = {
  slug: string;
  title: LocalizedText;
  date: string;
  dateDisplay?: string;
  kind: string;
  kindZh?: string;
  metaLabel?: string;
  metaLabelZh?: string;
  image?: string;
  readTime: string;
  excerpt: LocalizedText;
  body: LocalizedText[];
  featured: boolean;
};

export type ToolSection = {
  slug: "hardware" | "software" | "tech-stack";
  label: LocalizedText;
  intro: LocalizedText;
  items: Array<{
    name: string;
    badge: string;
    description: LocalizedText;
  }>;
};
