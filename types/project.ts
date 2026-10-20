export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  featured: boolean;
  type: "personal" | "team";
  role: string | null;
  features: string[];
  image: string;
};