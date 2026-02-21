
export interface CompanyInfo {
  name: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  whatsapp: string;
  email: string;
  logo: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SectionNames {
  hero: string;
  about: string;
  services: string;
  projects: string;
  contact: string;
}

export interface SectionContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  aboutImage: string;
  backgroundImage: string;
}

export interface CMSData {
  company: CompanyInfo;
  gallery: GalleryItem[];
  categories: string[]; // Nova propriedade para gerenciar categorias dinamicamente
  services: Service[];
  content: SectionContent;
  sectionNames: SectionNames;
}
