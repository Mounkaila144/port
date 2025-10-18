export interface Profile {
  name: string;
  role: string;
  photo: string;
  about: string;
  location: string;
  email: string;
  phone: string;
  github: string;
}

export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  company: string;
  kind: "Entreprise" | "Freelance" | "Personnel";
  year: string;
  cover: string;
  description: string;
  tags: string[];
  links: {
    site: string;
    repo: string;
  };
}

export interface Company {
  id: string;
  name: string;
  role: string;
  years: string;
  logo: string;
  desc: string;
  site: string;
}
