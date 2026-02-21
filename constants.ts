
import { CMSData } from './types';

export const INITIAL_DATA: CMSData = {
  company: {
    name: "Carpintaria Martins",
    cnpj: "45.904.134/0001-75",
    address: "Rua General Carneiro, 389",
    city: "Assis",
    state: "SP",
    whatsapp: "5518996847303",
    email: "samuelalvesmartins18@gmail.com",
    logo: "https://s3.galaxychat.com.br/carpintaria/1771710316501-file-_4_.png"
  },
  sectionNames: {
    hero: "Início",
    about: "Sobre Nós",
    services: "Serviços",
    projects: "Portfólio",
    contact: "Contato"
  },
  categories: ["Estruturas", "Portões", "Escadas", "Decks"],
  gallery: [
    { id: '1', url: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1200&auto=format&fit=crop', title: 'Estrutura de Telhado', category: 'Estruturas' },
    { id: '2', url: 'https://images.unsplash.com/photo-1596439534244-65d107263681?q=80&w=1200&auto=format&fit=crop', title: 'Portão de Ipê', category: 'Portões' },
    { id: '3', url: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=1200&auto=format&fit=crop', title: 'Pergolado Gourmet', category: 'Estruturas' },
  ],
  services: [
    { id: '1', title: 'Estruturas de Telhado e Pergolados', description: 'Projetos robustos, resistentes e feitos para durar anos.', icon: 'Hammer' },
    { id: '2', title: 'Escadas Personalizadas', description: 'Design exclusivo com segurança e acabamento impecável.', icon: 'Home' },
    { id: '3', title: 'Decks, Painéis e Áreas Externas', description: 'Valorização do seu espaço com sofisticação e durabilidade.', icon: 'RotateCcw' },
    { id: '4', title: 'Portões e Estruturas Especiais', description: 'Beleza rústica com precisão e qualidade profissional.', icon: 'Shield' },
  ],
  content: {
    heroTitle: "Carpintaria Martins - Madeira de Qualidade",
    heroSubtitle: "Estruturas, portões, escadas e projetos personalizados em Assis e região.",
    aboutText: "A Carpintaria Martins nasceu da paixão de Samuel Alves Martins pela madeira e pela construção de estruturas sólidas e duradouras. Com experiência em carpintaria estrutural e acabamentos de alto padrão, transformamos madeira maciça em soluções que unem estética, segurança e funcionalidade. Mais do que construir, entregamos confiança em cada projeto.",
    aboutImage: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1200&auto=format&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop"
  }
};
