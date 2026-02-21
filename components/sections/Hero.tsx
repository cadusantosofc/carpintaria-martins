
import React from 'react';
import { motion } from 'framer-motion';
import { SectionContent } from '../../types';
import { Check } from 'lucide-react';

interface HeroProps {
  content: SectionContent;
  whatsapp: string;
}

const Hero: React.FC<HeroProps> = ({ content, whatsapp }) => {
  const whatsappUrl = `https://wa.me/${whatsapp}?text=Olá! Vi o site da Carpintaria Martins e gostaria de solicitar um orçamento.`;

  const features = [
    "Estruturas resistentes",
    "Acabamento fino",
    "Projetos exclusivos"
  ];

  return (
    <section id="início" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black py-20 md:py-0">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 grayscale-[20%]"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589939705384-5185138a0470?q=80&w=2000&auto=format&fit=crop)' }}
      />
      
      {/* Overlay escuro sólido para melhorar o contraste */}
      <div className="absolute inset-0 z-1 bg-black/60" />

      <div className="container mx-auto px-6 relative z-10 pt-12 md:pt-20 pb-16 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-[#D4AF37] text-sm md:text-base font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 md:mb-6 block">
            Samuel Alves Martins
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-white font-serif font-bold mb-4 md:mb-6 leading-tight">
            {content.heroTitle}
          </h1>
          <p className="text-white/90 text-base md:text-xl lg:text-2xl font-serif italic mb-6 md:mb-8 max-w-2xl mx-auto px-4 md:px-0">
            {content.heroSubtitle}
          </p>
          
          <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4 md:px-0">
            Na Carpintaria Martins, cada detalhe é pensado para valorizar seu espaço com elegância e durabilidade. Atendemos Assis e região com excelência e compromisso.
          </p>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-12">
            {features.map((f, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-white/90 font-medium text-sm md:text-base">
                <div className="bg-[#D4AF37] p-1 rounded-full shrink-0">
                  <Check size={12} className="text-white" strokeWidth={4} />
                </div>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-[#D4AF37] text-white text-[11px] md:text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[#b8962c] transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              Solicite seu orçamento agora
            </a>
            <a 
              href="#projetos"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#projetos');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-4 border-2 border-white text-white text-[11px] md:text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-white hover:text-black transition-all flex items-center justify-center cursor-pointer"
            >
              Ver projetos realizados
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
