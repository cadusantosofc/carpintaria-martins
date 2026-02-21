
import React from 'react';
import { motion } from 'framer-motion';
import { SectionContent } from '../../types';
import { useCMS } from '../../CMSContext';

const About: React.FC<{ content: SectionContent }> = ({ content }) => {
  const { data } = useCMS();
  return (
    <section id="sobre" className="py-24 bg-[#F9F7F2] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white">
              <img src={content.aboutImage} alt="Samuel Alves Martins" className="w-full h-80 md:h-96 object-cover object-center grayscale-[30%] transition-all duration-700" />
            </div>
            <div className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 z-20 hidden md:flex flex-col justify-center items-center text-center">
              <img src={data.company.logo} className="w-48 md:w-64 h-48 md:h-64 object-cover rounded-[1000px] shadow-2xl" alt="Logo" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8 order-1 lg:order-2"
          >
            <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-6 block">Sobre a Carpintaria Martins</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-[#4B3621] mb-6 md:mb-8 leading-tight">
              Artesanato que constrói o futuro
            </h2>
            <div className="space-y-6 text-sm md:text-base text-gray-600 leading-relaxed">
              <p>
                A Carpintaria Martins nasceu da paixão de Samuel Alves Martins pela madeira e pela construção de estruturas sólidas e duradouras. Com experiência consolidada, transformamos madeira maciça em soluções que unem estética, segurança e funcionalidade.
              </p>
              <p>
                Cada projeto é único e recebe atenção especial em cada detalhe, desde a seleção da matéria-prima até o acabamento final. Nossa missão é entregar estruturas que não apenas atendam às necessidades funcionais, mas que também agreguem valor estético aos seus ambientes.
              </p>
              <p>
                Atendemos Assis e toda a região com compromisso, qualidade e o orgulho de quem sabe que está construindo algo que vai durar gerações.
              </p>
            </div>
            
            <div className="mt-12 p-8 bg-white shadow-sm border-l-4 border-[#D4AF37]">
              <p className="text-gray-600 italic font-serif text-xl">
                "Mais do que construir estruturas, entregamos a realização de um sonho em madeira maciça, com a garantia de quem assina cada obra."
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-[#4B3621]">Samuel Alves Martins</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
