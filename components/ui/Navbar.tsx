
import React, { useState, useEffect } from 'react';
import { useCMS } from '../../CMSContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { data } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: data.sectionNames.hero || 'Início', href: '#início', key: 'hero' },
    { label: data.sectionNames.about || 'Sobre', href: '#sobre', key: 'about' },
    { label: data.sectionNames.services || 'Serviços', href: '#serviços', key: 'services' },
    { label: data.sectionNames.projects || 'Projetos', href: '#projetos', key: 'projects' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    // Previne navegação do router e faz rolagem suave
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-white shadow-xl py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative">
               <img src={data.company.logo} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#D4AF37] object-cover shadow-lg" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-[9px] md:text-[10px] tracking-[0.3em] font-bold uppercase text-[#D4AF37]`}>
                CARPINTARIA
              </span>
              <span className={`text-lg md:text-xl font-serif font-bold tracking-widest transition-colors ${isScrolled || isMenuOpen ? 'text-[#4B3621]' : 'text-white'}`}>
                MARTINS
              </span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 items-center">
            {menuItems.map((item) => (
               (item.href !== '#projetos' || data.gallery.length > 0) && (
                <a 
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-[#D4AF37] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-[#D4AF37] hover:after:w-full after:transition-all ${isScrolled ? 'text-[#4B3621]' : 'text-white'}`}
                >
                  {data.sectionNames[item.key as keyof typeof data.sectionNames] || item.label}
                </a>
              )
            ))}
            <a 
              href={`https://wa.me/${data.company.whatsapp}?text=Olá! Vi o site da Carpintaria Martins e gostaria de solicitar um orçamento.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-3 rounded-sm transition-all text-[11px] font-bold tracking-widest uppercase shadow-lg ${isScrolled ? 'bg-[#4B3621] text-white hover:bg-[#D4AF37]' : 'bg-[#D4AF37] text-white hover:bg-white hover:text-black'}`}
            >
              {data.sectionNames.contact}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             {isMenuOpen ? (
               <X className="text-[#4B3621]" size={28} />
             ) : (
               <Menu className={isScrolled ? 'text-[#4B3621]' : 'text-white'} size={28} />
             )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            {menuItems.map((item) => (
              <a
                key={`mobile-${item.key}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="text-2xl font-serif font-bold text-[#4B3621] border-b border-gray-100 pb-4"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${data.company.whatsapp}?text=Olá! Vi o site da Carpintaria Martins e gostaria de solicitar um orçamento.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 bg-[#D4AF37] text-white py-4 rounded-sm text-center font-bold tracking-widest uppercase"
            >
              {data.sectionNames.contact}
            </a>
            
            <div className="mt-auto pb-12 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Samuel Alves Martins</p>
              <p className="text-[#4B3621] font-bold text-sm">Assis - SP</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
