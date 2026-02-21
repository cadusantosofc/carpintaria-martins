
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../CMSContext';
import { Lock, ArrowLeft, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const { data } = useCMS();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    // Simulação de delay para feedback visual premium
    setTimeout(() => {
      const authorizedUsers = [
        { email: 'samuelalvesmartins18@gmail.com', password: 'admin123' },
        { email: 'cadusantos.paiva@gmail.com', password: '@SrCaduher901' }
      ];

      const user = authorizedUsers.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('martins_auth', 'true');
        navigate('/admin/galeria');
      } else {
        setError('E-mail ou senha inválidos.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#4B3621]/10 rounded-full blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative border border-white/10">
          {/* Borda Dourada Superior */}
          <div className="h-2 w-full bg-gradient-to-r from-[#D4AF37] via-[#f2d06b] to-[#D4AF37]" />
          
          <div className="p-10">
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full scale-150" />
                <img 
                  src={data.company.logo} 
                  alt="Logo" 
                  className="w-20 h-20 rounded-full mx-auto relative z-10 border-2 border-[#D4AF37] object-cover bg-white" 
                />
              </div>
              <h1 className="text-3xl font-serif font-bold text-[#4B3621] mb-2 tracking-tight">Acesso ao Painel</h1>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Samuel Alves Martins — Adm</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#4B3621]/60 px-1">E-mail Corporativo</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all text-sm font-medium"
                    placeholder="exemplo@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#4B3621]/60 px-1">Senha Privada</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="text-red-500 text-[11px] font-bold mt-2 px-1 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full" /> {error}
                  </motion.p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#1A1A1A] hover:bg-[#D4AF37] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 group shadow-xl hover:shadow-[#D4AF37]/20 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Entrar no Painel</span>
                  </>
                )}
              </button>
            </form>

            <button 
              onClick={() => navigate('/')}
              className="mt-10 flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest transition-colors mx-auto group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Voltar para a Vitrine
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          Carpintaria Martins &copy; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
