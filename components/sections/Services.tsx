
import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../../types';
import { Hammer, Home, RotateCcw, Shield, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Hammer: Hammer,
  Home: Home,
  RotateCcw: RotateCcw,
  Shield: Shield
};

const Services: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <section id="serviços" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4 block">Nossos Serviços</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-[#4B3621] mb-6 md:mb-8 leading-tight">
            Soluções em Madeira Maciça
          </h2>
          <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base px-4 md:px-0">
            Oferecemos serviços completos de carpintaria estrutural, desde projetos personalizados até execução com acabamento profissional. Cada obra é única e recebe nossa expertise em madeira maciça.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#D4AF37]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#F9F7F2] group-hover:bg-[#D4AF37] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                {React.createElement(iconMap[service.icon] || Shield, { 
                  size: 24, 
                  className: "text-gray-600 group-hover:text-white transition-colors" 
                })}
              </div>
              <h3 className="text-lg md:text-xl font-serif font-bold text-[#4B3621] mb-4 leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
