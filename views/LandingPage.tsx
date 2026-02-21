
import React from 'react';
import { useCMS } from '../CMSContext';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Differentials from '../components/sections/Differentials';
import Gallery from '../components/sections/Gallery';
import FAQ from '../components/sections/FAQ';
import Footer from '../components/sections/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import Navbar from '../components/ui/Navbar';

const LandingPage: React.FC = () => {
  const { data } = useCMS();

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main>
        <Hero content={data.content} whatsapp={data.company.whatsapp} />
        <About content={data.content} />
        <Services services={data.services} />
        <Differentials />
        {data.gallery.length > 0 && <Gallery items={data.gallery} />}
        <FAQ />
        
        {/* CTA Final */}
        <section className="py-24 bg-[#4B3621] text-white text-center">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">
              Transforme sua ideia em realidade com quem entende de madeira
            </h2>
            <p className="text-white/80 text-lg mb-12">
              Fale diretamente com Samuel Alves Martins e peça seu orçamento sem compromisso. Atendemos Assis e toda a região.
            </p>
            <a 
              href={`https://wa.me/${data.company.whatsapp}?text=Olá Samuel! Gostaria de um orçamento.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#D4AF37] px-10 py-5 rounded-sm font-bold tracking-widest uppercase hover:bg-[#b8962c] transition-all shadow-2xl"
            >
              Solicitar orçamento agora
            </a>
          </div>
        </section>
      </main>
      <Footer company={data.company} />
      <WhatsAppButton phone={data.company.whatsapp} name={data.company.name} />
    </div>
  );
};

export default LandingPage;
