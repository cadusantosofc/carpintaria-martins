import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../../types';
import { X, Maximize2, Filter } from 'lucide-react';

const Gallery: React.FC<{ items: GalleryItem[] }> = ({ items }) => {
  const [filter, setFilter] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Obter categorias únicas presentes nos itens da galeria
  const categories = ['Todos', ...new Set(items.map(i => i.category))].filter(Boolean);

  const filteredItems = filter === 'Todos' ? items : items.filter(i => i.category === filter);

  // Função para parar auto-scroll
  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  // Função para iniciar auto-scroll
  const startAutoScroll = () => {
    if (window.innerWidth < 768 && filteredItems.length > 3 && !isUserInteracting) {
      stopAutoScroll(); // Garante que não há duplicatas
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIndex = (prev + 1) % filteredItems.length;
          scrollToIndex(nextIndex);
          return nextIndex;
        });
      }, 4000);
    }
  };

  // Função para rolar para um índice específico
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = 272; // Largura do card (256) + gap (16)
      const scrollAmount = index * itemWidth;
      
      // Centralizar o item na tela
      const containerWidth = container.offsetWidth;
      const centeredScrollAmount = scrollAmount - (containerWidth / 2) + (256 / 2);
      
      container.scrollTo({
        left: Math.max(0, centeredScrollAmount),
        behavior: 'smooth'
      });
    }
  };

  // Função para atualizar índice baseado na posição de scroll
  const updateCurrentIndexFromScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const itemWidth = 272;
      const centerOffset = container.offsetWidth / 2;
      
      // Calcula qual item está mais próximo do centro
      const centerPosition = scrollLeft + centerOffset;
      const estimatedIndex = Math.round(centerPosition / itemWidth);
      
      const newIndex = Math.max(0, Math.min(filteredItems.length - 1, estimatedIndex));
      setCurrentIndex(newIndex);
    }
  };

  // Auto-scroll com pausa/retomada
  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [filteredItems.length, filter, isUserInteracting]);

  // Listener para interações do usuário
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Pausa auto-scroll quando usuário interage
      setIsUserInteracting(true);
      updateCurrentIndexFromScroll();
      
      // Retoma auto-scroll após 5 segundos sem interação
      clearTimeout(autoScrollRef.current as any);
      setTimeout(() => {
        setIsUserInteracting(false);
      }, 5000);
    };

    const handleTouchStart = () => {
      setIsUserInteracting(true);
    };

    const handleTouchEnd = () => {
      setTimeout(() => setIsUserInteracting(false), 5000);
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [filteredItems.length]);

  return (
    <section id="projetos" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4 block">Portfólio</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-[#4B3621] mb-6 md:mb-8 leading-tight">
            Projetos que falam por si
          </h2>
          <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base px-4 md:px-0">
            Cada trabalho realizado carrega nossa identidade: resistência, beleza e precisão. Confira alguns dos nossos projetos e veja na prática a qualidade que entregamos em Assis e região.
          </p>
        </div>

        <div className="flex flex-col items-center mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-6 text-[#4B3621]/40">
            <Filter size={16} />
            <span className="text-xs md:text-sm font-medium uppercase tracking-widest">Filtrar por categoria</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setCurrentIndex(0); // Reset scroll position
                }}
                className={`px-3 py-2 md:px-6 md:py-4 rounded-full border-2 font-bold text-xs md:text-base uppercase tracking-wider md:tracking-widest transition-all duration-300 ${
                  filter === cat
                    ? 'bg-[#4B3621] text-white border-[#4B3621] shadow-lg scale-105' 
                    : 'bg-transparent text-[#4B3621] border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Galeria Desktop */}
        <div className="hidden md:block">
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative h-[450px] overflow-hidden bg-[#F9F7F2] shadow-lg cursor-pointer rounded-sm"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <div className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center text-white shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                       <Maximize2 size={24} />
                     </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-white text-2xl font-serif font-bold">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Galeria Mobile - Carrossel Horizontal */}
        <div className="md:hidden">
          <div className="relative">
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth'
              }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative flex-shrink-0 w-64 h-80 overflow-hidden bg-[#F9F7F2] shadow-lg cursor-pointer rounded-lg snap-center"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white shadow-xl">
                       <Maximize2 size={16} />
                     </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[#D4AF37] text-[8px] font-bold tracking-widest uppercase mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-white text-sm font-serif font-bold leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Indicadores de posição */}
            <div className="flex justify-center gap-2 mt-4">
              {filteredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    if (scrollRef.current) {
                      const container = scrollRef.current;
                      const itemWidth = 272; // Largura do card (256) + gap (16)
                      const scrollAmount = index * itemWidth;
                      
                      // Centralizar o item na tela com scroll snap
                      const containerWidth = container.offsetWidth;
                      const centeredScrollAmount = scrollAmount - (containerWidth / 2) + (256 / 2); // 256 é a largura do card
                      
                      container.scrollTo({
                        left: Math.max(0, centeredScrollAmount),
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-[#D4AF37] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <p>Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}

        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-4">
                <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-2 block">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-xl font-serif font-bold">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
