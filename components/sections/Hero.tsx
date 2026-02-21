
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
          <span className="text-[#D4AF37] text-xs md:text-sm lg:text-base font-bold tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.4em] uppercase mb-3 md:mb-4 lg:mb-6 block">
            Samuel Alves Martins
          </span>
          <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-6xl text-white font-serif font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
            {content.heroTitle}
          </h1>
          <p className="text-white/90 text-sm md:text-lg lg:text-xl xl:text-2xl font-serif italic mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto px-4 md:px-0">
            {content.heroSubtitle}
          </p>
          
          <p className="text-gray-300 text-xs md:text-sm lg:text-base max-w-2xl mx-auto mb-6 md:mb-8 lg:mb-10 leading-relaxed px-4 md:px-0">
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

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-4 sm:px-0">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 sm:px-6 sm:py-4 bg-[#D4AF37] text-white text-[10px] sm:text-[11px] md:text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[#b8962c] transition-all shadow-xl flex items-center justify-center gap-2 group"
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
              className="px-4 py-3 sm:px-6 sm:py-4 border border-white/30 text-white text-[10px] sm:text-[11px] md:text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
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
