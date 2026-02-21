
import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyInfo } from '../../types';
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';

const Footer: React.FC<{ company: CompanyInfo }> = ({ company }) => {
  return (
    <footer id="contato" className="bg-[#1A1A1A] text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img src={company.logo} alt="Carpintaria Martins" className="w-16 h-16 rounded-full border-2 border-[#D4AF37] object-cover" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] tracking-[0.3em] font-semibold text-[#D4AF37] uppercase">CARPINTARIA</span>
                <span className="text-2xl font-serif font-bold tracking-widest">MARTINS</span>
              </div>
            </div>
            <p className="text-gray-400 font-light leading-relaxed">
              Carpintaria Martins – Estruturas que duram gerações. Excelência em madeira maciça com a assinatura de Samuel Alves Martins em Assis/SP.
            </p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              CNPJ: {company.cnpj}
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/_carpintaria__martins_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all">
                <Instagram size={18} />
              </a>
              <a href={`https://wa.me/${company.whatsapp}?text=Olá! Vi o site da Carpintaria Martins e gostaria de mais informações.`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all">
                <Phone size={18} />
              </a>
              <a href={`mailto:${company.email}?subject=Contato via Site&body=Olá! Vi o site da Carpintaria Martins e gostaria de mais informações.`} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-base md:text-lg font-serif font-bold mb-6 md:mb-8 text-[#D4AF37]">Navegação</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm uppercase tracking-widest">
              <li><a href="#início" className="hover:text-[#D4AF37] transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-[#D4AF37] transition-colors">Quem Somos</a></li>
              <li><a href="#serviços" className="hover:text-[#D4AF37] transition-colors">Serviços</a></li>
              <li><a href="#projetos" className="hover:text-[#D4AF37] transition-colors">Portfólio</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base md:text-lg font-serif font-bold mb-6 md:mb-8 text-[#D4AF37]">Onde Estamos</h4>
            <ul className="space-y-6 text-gray-400 font-light text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="text-[#D4AF37] shrink-0" size={18} />
                <span>{company.address}<br />Centro - {company.city} / {company.state}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-[#D4AF37] shrink-0" size={18} />
                <span>(18) 99684-7303</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-[#D4AF37] shrink-0" size={18} />
                <span className="break-all">{company.email}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base md:text-lg font-serif font-bold mb-6 md:mb-8 text-[#D4AF37]">Atendimento</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li className="flex items-center gap-4">
                <Clock className="text-[#D4AF37] shrink-0" size={18} />
                <div>
                  <p className="font-bold text-white mb-1">Segunda a Sexta:</p>
                  <p>08:00 às 18:00</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="text-[#D4AF37] shrink-0" size={18} />
                <div>
                  <p className="font-bold text-white mb-1">Sábado:</p>
                  <p>08:00 às 12:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} {company.name}. Todos os direitos reservados.</p>
          <p>Assis - SP | Samuel Alves Martins</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
