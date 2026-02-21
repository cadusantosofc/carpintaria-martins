
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useCMS } from '../CMSContext';
import { uploadToS3 } from '../services/s3Service';
import { 
  ImageIcon, 
  Info, 
  FileText, 
  Trash2, 
  LogOut, 
  Home, 
  Save, 
  CheckCircle2,
  Settings,
  Upload,
  Loader2,
  Type,
  Plus,
  MapPin,
  Phone,
  Mail,
  User,
  Layout,
  AlertTriangle,
  X,
  Tags,
  Edit2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENTES AUXILIARES ---

const ConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  type?: 'danger' | 'warning' | 'success';
}> = ({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Confirmar", type = "danger" }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} 
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl relative z-10 w-full max-w-md overflow-hidden"
        >
          <div className={`h-2 w-full ${type === 'danger' ? 'bg-red-500' : 'bg-[#D4AF37]'}`} />
          <div className="p-8 text-center">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 ${type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-[#F9F7F2] text-[#D4AF37]'}`}>
              {type === 'danger' ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#4B3621] mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-10">{message}</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 px-6 py-4 rounded-xl border border-gray-100 font-bold text-gray-400 hover:bg-gray-50 transition-colors uppercase text-[10px] tracking-widest">
                Cancelar
              </button>
              <button 
                onClick={() => { onConfirm(); onClose(); }} 
                className={`flex-1 px-6 py-4 rounded-xl font-bold text-white shadow-xl transition-all uppercase text-[10px] tracking-widest ${type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#1A1A1A] hover:bg-[#D4AF37]'}`}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// Estado global para newItem (fora do componente para evitar re-inicialização)
let globalNewItem = { title: '', category: '', url: '' };

const CategoryManagerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { data, updateCategories, syncData } = useCMS();
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<{old: string, new: string} | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newCategory.trim() || data.categories.includes(newCategory.trim())) return;
    updateCategories([...data.categories, newCategory.trim()]);
    setNewCategory('');
  };

  const handleRename = () => {
    if (!editingCategory || !editingCategory.new.trim() || editingCategory.old === editingCategory.new) {
      setEditingCategory(null);
      return;
    }

    // Lógica para renomear na lista e atualizar todos os projetos vinculados
    const updatedCategories = data.categories.map(c => c === editingCategory.old ? editingCategory.new : c);
    const updatedGallery = data.gallery.map(item => ({
      ...item,
      category: item.category === editingCategory.old ? editingCategory.new : item.category
    }));

    syncData({ ...data, categories: updatedCategories, gallery: updatedGallery });
    setEditingCategory(null);
  };

  const handleDelete = (cat: string) => {
    const updated = data.categories.filter(c => c !== cat);
    updateCategories(updated);
    setConfirmDelete(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[350] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white rounded-3xl shadow-2xl relative z-10 w-full max-w-lg overflow-hidden border border-gray-100">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#4B3621]">Categorias do Portfólio</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Gerencie os tipos de projetos</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-3">
              {data.categories.map(cat => (
                <div key={cat} className="flex items-center gap-2 group">
                  {editingCategory?.old === cat ? (
                    <div className="flex-1 flex gap-2">
                      <input 
                        autoFocus
                        value={editingCategory.new} 
                        onChange={e => setEditingCategory({...editingCategory, new: e.target.value})}
                        className="flex-1 p-3 bg-[#F9F7F2] border border-[#D4AF37] rounded-xl text-sm outline-none font-bold"
                      />
                      <button onClick={handleRename} className="bg-green-500 text-white p-3 rounded-xl"><Check size={18}/></button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 p-4 bg-gray-50 rounded-2xl flex justify-between items-center group-hover:bg-[#F9F7F2] transition-colors border border-transparent group-hover:border-[#D4AF37]/20">
                        <span className="font-bold text-[#4B3621] text-sm">{cat}</span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingCategory({old: cat, new: cat})} className="text-gray-400 hover:text-[#D4AF37] p-1"><Edit2 size={14}/></button>
                          <button onClick={() => setConfirmDelete(cat)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {data.categories.length === 0 && <p className="text-center py-10 text-gray-300 italic text-sm">Nenhuma categoria cadastrada.</p>}
            </div>

            <div className="p-8 bg-[#F9F7F2] border-t border-gray-50 flex gap-3">
              <input 
                placeholder="Nome da nova categoria..." 
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value)}
                className="flex-1 p-4 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
              />
              <button 
                onClick={handleAdd}
                className="bg-[#1A1A1A] text-white p-4 rounded-xl hover:bg-[#D4AF37] transition-all shadow-lg"
              >
                <Plus size={20} />
              </button>
            </div>
          </motion.div>

          <ConfirmModal 
            isOpen={!!confirmDelete} 
            onClose={() => setConfirmDelete(null)} 
            onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
            title="Remover Categoria?"
            message={`Tem certeza que deseja remover "${confirmDelete}"? As fotos existentes NÃO serão apagadas, mas ficarão sem categoria vinculada.`}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

const AdminDashboard: React.FC = () => {
  const { data, isLoading, updateCompany, updateContent, updateSectionNames, addGalleryItem, removeGalleryItem } = useCMS();
  const navigate = useNavigate();
  const location = useLocation();
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const showFeedback = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('martins_auth');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#141414] gap-4">
        <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
        <p className="text-white font-serif italic text-lg tracking-widest opacity-50">Sincronizando Banco de Dados...</p>
      </div>
    );
  }

  const Sidebar = () => (
    <div className="w-64 bg-[#141414] text-white h-screen flex flex-col p-6 fixed left-0 top-0 z-50 shadow-2xl border-r border-white/5">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-gradient-to-tr from-[#D4AF37] to-[#f2d06b] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 overflow-hidden">
          <img src={data.company.logo} className="w-full h-full object-cover" alt="Logo" />
        </div>
        <span className="font-serif font-bold text-lg tracking-widest">PAINEL</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {[
          { icon: ImageIcon, label: 'Galeria', path: '/admin/galeria' },
          { icon: Info, label: 'Perfil Empresa', path: '/admin/empresa' },
          { icon: FileText, label: 'Textos & Conteúdo', path: '/admin/conteudo' },
          { icon: Layout, label: 'Menu do Site', path: '/admin/secoes' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${location.pathname === item.path ? 'bg-[#D4AF37] text-white shadow-xl shadow-[#D4AF37]/10' : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}
          >
            <item.icon size={18} />
            <span className="text-[10px] font-bold tracking-widest uppercase">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
        <Link to="/" className="flex items-center gap-3 p-3 text-gray-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
          <Home size={14} />
          Ver Site Público
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-500/60 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest transition-colors w-full text-left">
          <LogOut size={14} />
          Encerrar Sessão
        </button>
      </div>
    </div>
  );

  const SectionManager = () => {
    const [names, setNames] = useState(data.sectionNames);
    const [isConfirming, setIsConfirming] = useState(false);

    return (
      <div className="space-y-8 animate-fadeIn">
        <h2 className="text-4xl font-serif font-bold text-[#4B3621]">Navegação do Site</h2>
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-2xl">
          <div className="space-y-6 mb-10">
            {Object.keys(names).map((key) => (
              <label key={key} className="block">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Nome da Página: {key}</span>
                <input 
                  type="text" 
                  value={(names as any)[key]} 
                  onChange={e => setNames({...names, [key]: e.target.value})}
                  className="w-full mt-2 p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold text-[#4B3621]"
                />
              </label>
            ))}
          </div>
          <button 
            onClick={() => setIsConfirming(true)}
            className="w-full bg-[#1A1A1A] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            <Save size={20} /> Atualizar Menu
          </button>
        </div>

        <ConfirmModal 
          isOpen={isConfirming} 
          onClose={() => setIsConfirming(false)} 
          onConfirm={() => { updateSectionNames(names); showFeedback('Menu atualizado!'); }}
          title="Salvar alterações no Menu?"
          message="Isso alterará os links de navegação para todos os usuários imediatamente."
          type="warning"
          confirmLabel="Sim, atualizar"
        />
      </div>
    );
  };

  const ContentManager = () => {
    const [content, setContent] = useState(data.content);
    const [isUploading, setIsUploading] = useState(false);

    const handleBackgroundImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      console.log("Arquivo selecionado para fundo:", file?.name);
      if (file) {
        setIsUploading(true);
        try {
          console.log("Iniciando upload da imagem de fundo...");
          const url = await uploadToS3(file);
          console.log("Upload concluído, URL da imagem de fundo:", url);
          const updatedContent = { ...content, backgroundImage: url };
          console.log("Conteúdo atualizado:", updatedContent);
          setContent(updatedContent);
          updateContent(updatedContent);
          showFeedback('Imagem de fundo atualizada e salva!');
        } catch (err) {
          console.error("Erro no upload da imagem de fundo:", err);
          alert("Erro no upload.");
        } finally {
          setIsUploading(false);
        }
      }
    };

    const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const url = await uploadToS3(file);
          const updatedContent = { ...content, aboutImage: url };
          setContent(updatedContent);
          updateContent(updatedContent);
          showFeedback('Imagem de fundo atualizada e salva!');
        } catch (err) {
          alert("Erro no upload.");
        } finally {
          setIsUploading(false);
        }
      }
    };

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-serif font-bold text-[#4B3621]">Editor de Textos</h2>
          <button 
            onClick={() => { updateContent(content); showFeedback('Conteúdo salvo!'); }}
            className="bg-[#D4AF37] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#b8962c] transition-all flex items-center gap-2 shadow-xl shadow-[#D4AF37]/20"
          >
            <Save size={20} /> Publicar Alterações
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#4B3621] border-b border-gray-50 pb-6 flex items-center gap-3">
              <Layout size={20} className="text-[#D4AF37]" /> Banner Principal
            </h3>
            <div className="space-y-6">
              <label className="block">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Título Principal</span>
                <input 
                  type="text" value={content.heroTitle} 
                  onChange={e => setContent({...content, heroTitle: e.target.value})}
                  className="w-full mt-2 p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-serif text-xl font-bold text-[#4B3621] focus:ring-2 focus:ring-[#D4AF37]"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Chamada (Subtítulo)</span>
                <textarea 
                  rows={3} value={content.heroSubtitle} 
                  onChange={e => setContent({...content, heroSubtitle: e.target.value})}
                  className="w-full mt-2 p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none italic text-gray-600 focus:ring-2 focus:ring-[#D4AF37]"
                />
              </label>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#4B3621] border-b border-gray-50 pb-6 flex items-center gap-3">
              <Info size={20} className="text-[#D4AF37]" /> Nossa História
            </h3>
            <div className="space-y-6">
               <label className="block">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Texto Institucional</span>
                <textarea 
                  rows={6} value={content.aboutText} 
                  onChange={e => setContent({...content, aboutText: e.target.value})}
                  className="w-full mt-2 p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none text-sm leading-relaxed text-gray-700 focus:ring-2 focus:ring-[#D4AF37]"
                />
              </label>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Foto Lateral</span>
                <div className="relative h-56 rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 group">
                  <img src={content.aboutImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <div className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-2xl">
                      {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                      Alterar Foto
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleAboutImageUpload} disabled={isUploading} />
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Imagem de Fundo</span>
                <div className="relative h-56 rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 group">
                  <img src={content.backgroundImage || 'https://via.placeholder.com/400x300?text=Imagem+de+Fundo'} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <div className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-2xl">
                      {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                      Alterar Fundo
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleBackgroundImageUpload} disabled={isUploading} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GalleryManager = () => {
    const [newItem, setNewItem] = useState(globalNewItem);
    const [isUploading, setIsUploading] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    
    // Sincroniza estado global com local
    const syncNewItem = () => {
      setNewItem(globalNewItem);
    };
    
    // Ref para manter o valor do newItem entre re-renderizações
    const newItemRef = useRef(newItem);
    newItemRef.current = newItem;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          console.log("Iniciando upload da imagem:", file.name);
          const url = await uploadToS3(file);
          console.log("Upload concluído, URL:", url);
          
          // Atualiza estado global
          globalNewItem = { ...globalNewItem, url };
          syncNewItem();
          
          // Força re-renderização após um ciclo
          setTimeout(() => {
            console.log("Verificação após timeout:", globalNewItem.url);
          }, 200);
          
          showFeedback('Upload completo!');
        } catch (err) {
          console.error("Erro no upload:", err);
          alert("Erro no upload.");
        } finally {
          setIsUploading(false);
        }
      }
    };

    const handleAddProject = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newItem.url || !newItem.category) return;
      addGalleryItem({ id: Date.now().toString(), ...newItem });
      
      // Limpa estado global
      globalNewItem = { title: '', category: data.categories[0] || '', url: '' };
      syncNewItem();
      
      showFeedback('Projeto adicionado!');
    };

    return (
      <div className="space-y-12 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-4xl font-serif font-bold text-[#4B3621]">Galeria de Projetos</h2>
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-3 px-8 py-4 border-2 border-[#D4AF37] text-[#4B3621] rounded-2xl font-bold hover:bg-[#D4AF37] hover:text-white transition-all shadow-xl shadow-[#D4AF37]/5 uppercase text-[10px] tracking-widest"
          >
            <Tags size={18} /> Gerenciar Categorias
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           {/* NOVO PROJETO */}
           <div className="lg:col-span-1 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-8 h-fit">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[#4B3621] border-b border-gray-50 pb-6 flex items-center gap-3">
              <Plus size={20} className="text-[#D4AF37]" /> Novo Trabalho
            </h3>
            <form onSubmit={handleAddProject} className="space-y-6">
              <label className="block">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome do Projeto</span>
                <input 
                  type="text" value={newItem.title} placeholder="Ex: Pergolado Gourmet"
                  onChange={e => setNewItem({...newItem, title: e.target.value})}
                  className="w-full mt-2 p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm font-bold"
                  required
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categoria</span>
                <select 
                  value={newItem.category} 
                  onChange={e => setNewItem({...newItem, category: e.target.value})}
                  className="w-full mt-2 p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm font-bold"
                  required
                >
                  <option value="" disabled>Selecionar...</option>
                  {data.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </label>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mídia do Projeto</span>
                <label className="w-full h-56 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors gap-3 overflow-hidden relative">
                  {newItem.url ? (
                    <>
                      <img src={newItem.url} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Imagem carregada
                      </div>
                    </>
                  ) : (
                    <>
                      {isUploading ? <Loader2 className="animate-spin text-[#D4AF37]" /> : <Upload className="text-gray-300" />}
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {isUploading ? 'Processando Imagem...' : 'Carregar Foto'}
                      </span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading || data.categories.length === 0} />
                </label>
                {/* Debug info */}
                
              </div>
              <button 
                type="submit" 
                disabled={isUploading || !newItem.url || data.categories.length === 0}
                className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-bold hover:bg-[#D4AF37] transition-all shadow-2xl shadow-[#D4AF37]/10 disabled:opacity-30 uppercase tracking-[0.2em] text-[11px]"
              >
                Salvar no Portfólio
              </button>
            </form>
          </div>

          {/* LISTA DE PROJETOS */}
          <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50">
               <h3 className="text-lg font-bold uppercase tracking-widest text-[#4B3621]">Portfólio Ativo</h3>
               <span className="text-[10px] bg-[#F9F7F2] text-[#D4AF37] px-4 py-2 rounded-full font-bold uppercase tracking-widest border border-[#D4AF37]/20">{data.gallery.length} Obras</span>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {data.gallery.map(item => (
                  <div key={item.id} className="relative aspect-square group rounded-2xl overflow-hidden shadow-sm bg-gray-50 border border-gray-100">
                    <img src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button 
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="bg-red-500 text-white p-4 rounded-full hover:scale-110 transition-transform shadow-2xl"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/40 to-transparent">
                      <p className="text-white text-[10px] font-bold truncate uppercase tracking-tighter">{item.title}</p>
                      <p className="text-[#D4AF37] text-[8px] font-bold uppercase tracking-widest">{item.category}</p>
                    </div>
                  </div>
                ))}
                {data.gallery.length === 0 && (
                   <div className="col-span-full h-80 flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-50 rounded-3xl">
                     <ImageIcon size={64} className="mb-4 opacity-10" />
                     <p className="font-bold text-xs uppercase tracking-widest opacity-40">Vitrine Vazia</p>
                   </div>
                )}
             </div>
          </div>
        </div>

        <ConfirmModal 
          isOpen={confirmDeleteId !== null} 
          onClose={() => setConfirmDeleteId(null)} 
          onConfirm={() => confirmDeleteId && removeGalleryItem(confirmDeleteId)}
          title="Excluir do Portfólio?"
          message="Esta foto será removida permanentemente do site."
        />

        <CategoryManagerModal 
          isOpen={isCategoryModalOpen} 
          onClose={() => setIsCategoryModalOpen(false)} 
        />
      </div>
    );
  };

  const CompanyManager = () => {
    const [info, setInfo] = useState(data.company);
    const [isUploading, setIsUploading] = useState(false);

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const url = await uploadToS3(file);
          const updatedInfo = {...info, logo: url};
          setInfo(updatedInfo);
          updateCompany(updatedInfo);
          showFeedback('Logotipo atualizado e salvo!');
        } catch (err) {
          alert("Erro no upload.");
        } finally {
          setIsUploading(false);
        }
      }
    };

    return (
      <div className="space-y-8 animate-fadeIn">
        <h2 className="text-4xl font-serif font-bold text-[#4B3621]">Dados da Empresa</h2>
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12 pb-12 border-b border-gray-50">
            <div className="relative group shrink-0">
              <div className="w-44 h-44 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                <img src={info.logo} className="w-full h-full object-cover" />
              </div>
              {isUploading && <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm"><Loader2 className="text-white animate-spin" /></div>}
              <label className="absolute bottom-2 right-2 bg-gradient-to-tr from-[#D4AF37] to-[#f2d06b] p-4 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform text-white border-4 border-white">
                <Upload size={20} />
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={isUploading} />
              </label>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome Fantasia</span>
                  <input type="text" value={info.name} onChange={e => setInfo({...info, name: e.target.value})} className="w-full mt-2 p-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold" />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CNPJ Oficial</span>
                  <input type="text" value={info.cnpj} onChange={e => setInfo({...info, cnpj: e.target.value})} className="w-full mt-2 p-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold" />
                </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <label className="block">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Principal</span>
              <input type="text" value={info.whatsapp} onChange={e => setInfo({...info, whatsapp: e.target.value})} className="w-full mt-2 p-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold" />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">E-mail de Contato</span>
              <input type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} className="w-full mt-2 p-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold" />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Endereço da Oficina</span>
              <input type="text" value={info.address} onChange={e => setInfo({...info, address: e.target.value})} className="w-full mt-2 p-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold" />
            </label>
          </div>

          <button 
            onClick={() => { updateCompany(info); showFeedback('Dados salvos!'); }}
            className="mt-12 bg-[#1A1A1A] text-white px-12 py-5 rounded-2xl font-bold hover:bg-[#D4AF37] transition-all shadow-2xl flex items-center justify-center gap-3 w-full md:w-fit uppercase text-[11px] tracking-widest"
          >
            <Save size={20} /> Atualizar Perfil no Servidor
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F9F7F2]">
      <Sidebar />
      <main className="flex-1 ml-64 p-12">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="galeria" replace />} />
            <Route path="galeria" element={<GalleryManager />} />
            <Route path="empresa" element={<CompanyManager />} />
            <Route path="conteudo" element={<ContentManager />} />
            <Route path="secoes" element={<SectionManager />} />
          </Routes>
        </div>
      </main>
      
      <AnimatePresence>
        {saveStatus && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 right-10 z-[500] bg-green-600 text-white px-10 py-5 rounded-3xl shadow-2xl flex items-center gap-4 font-bold"
          >
            <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 size={24} /></div>
            <span className="uppercase tracking-widest text-sm">{saveStatus}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
