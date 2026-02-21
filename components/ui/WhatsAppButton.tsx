
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone: string;
  name: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phone, name }) => {
  const url = `https://wa.me/${phone}?text=Olá ${name}! Vi seu site e gostaria de saber mais sobre seus serviços.`;
  
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-colors"
    >
      <MessageCircle size={32} />
      <span className="absolute right-20 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
        Fale conosco agora!
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
