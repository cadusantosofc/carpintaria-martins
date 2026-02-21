
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useCMS } from '../../CMSContext';

const Differentials: React.FC = () => {
  const { data } = useCMS();
  const diffs = [
    "Madeira de alta qualidade selecionada",
    "Acabamento profissional e detalhista",
    "Projetos sob medida para cada cliente",
    "Atendimento direto com o carpinteiro",
    "Compromisso com prazo e qualidade"
  ];

  return (
    <section className="py-24 bg-[#F9F7F2]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4 block">Diferenciais</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#4B3621] mb-8">Por que escolher a Carpintaria Martins?</h2>
            <div className="space-y-4">
              {diffs.map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white shadow-sm rounded-sm"
                >
                  <CheckCircle className="text-[#D4AF37]" size={24} />
                  <span className="font-semibold text-[#4B3621]">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-[#4B3621] rounded-sm overflow-hidden shadow-2xl relative">
              <img 
                src={data.content.backgroundImage || "https://images.unsplash.com/photo-1590053132232-474026600c82?q=80&w=1200&auto=format&fit=crop"} 
                alt="Madeira Maciça" 
                className="w-full h-full object-cover opacity-60 grayscale"
              />
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <p className="text-white font-serif text-3xl italic">
                  "Resistência que atravessa gerações."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
