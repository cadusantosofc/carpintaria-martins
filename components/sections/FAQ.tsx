
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={`text-lg font-serif font-bold transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-[#4B3621]'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full transition-all ${isOpen ? 'bg-[#D4AF37] text-white rotate-180' : 'bg-gray-100 text-[#4B3621]'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed font-light">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Vocês atendem fora de Assis/SP?",
      answer: "Sim! Além de Assis, atendemos toda a região. Entre em contato para verificarmos a disponibilidade para sua localidade específica."
    },
    {
      question: "Qual o prazo médio para entrega de um projeto?",
      answer: "O prazo varia de acordo com a complexidade da obra (ex: um portão vs um telhado completo). No entanto, prezamos pelo cumprimento rigoroso dos prazos acordados no orçamento."
    },
    {
      question: "O orçamento é cobrado?",
      answer: "Não. Realizamos orçamentos sem compromisso. Samuel Alves Martins faz a análise técnica para garantir que o valor reflita a melhor solução para sua necessidade."
    },
    {
      question: "Quais tipos de madeira vocês utilizam?",
      answer: "Trabalhamos predominantemente com madeiras de lei e madeira maciça de alta durabilidade (como Ipê, Cumaru, Garapa, entre outras), sempre focando na resistência e no acabamento de elite."
    },
    {
      question: "Fazem projetos personalizados ou apenas modelos prontos?",
      answer: "Todos os nossos projetos são 100% personalizados. Adaptamos o design e a estrutura ao seu espaço e ao seu gosto pessoal, garantindo exclusividade."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4 block">Dúvidas Frequentes</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#4B3621]">Perguntas e Respostas</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
