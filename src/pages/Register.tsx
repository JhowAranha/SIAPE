import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, CheckCircle, Loader2 } from 'lucide-react';
import CardProfile from '../components/CardProfile';
import { supabase } from '../bd/supabase';

export default function Register() {
  const navigate = useNavigate();
  
  // Estados do Formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  
  // Estados de Imagem e UI
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('❌ Imagem muito grande! Máximo 5MB');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!imageFile) {
      showToast('⚠️ Adicione uma foto do produto!');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Obter o usuário logado para vincular ao item
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Usuário não autenticado.');

      // 2. Upload da Imagem para o Bucket 'items-images'
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`; // Caminho organizado por ID de usuário
      
      const { error: uploadError } = await supabase.storage
        .from('items-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // 3. Pegar a URL pública da imagem enviada
      const { data: { publicUrl } } = supabase.storage
        .from('items-images')
        .getPublicUrl(fileName);

      // 4. Salvar os dados completos na tabela 'items'
      const { error: insertError } = await supabase
        .from('itens')
        .insert([
          {
            name,
            description,
            color,
            category,
            location,
            date,
            image_url: publicUrl,
            user_id: user.id
          }
        ]);

      if (insertError) throw insertError;

      showToast('✅ Item registrado com sucesso!');
      setTimeout(() => navigate('/home'), 2000);

    } catch (error: any) {
      console.error(error);
      showToast(`❌ Erro ao registrar: ${error.message || 'Tente novamente.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center overflow-auto bg-slate-950 min-h-screen text-slate-100 relative">
      <div className="absolute top-6 right-6 z-20 animate-fade-up">
        <CardProfile />
      </div>
      
      <main className="relative z-10 w-full max-w-2xl py-12 px-6">
        <div className="flex items-center gap-4 mb-8 animate-fade-up">
          <button onClick={() => navigate('/home')} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-4xl font-extrabold text-white">Registrar Item</h2>
        </div>
        
        <form className="space-y-5 animate-fade-up-delay" onSubmit={handleSubmit}>
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-3">
            <label className="block text-cyan-300 font-semibold text-sm">Nome do Produto</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Mochila azul" 
              required 
              className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all" 
            />
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-3">
            <label className="block text-cyan-300 font-semibold text-sm">Descrição</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Forneça detalhes como marcas, amassados ou locais prováveis onde foi visto" 
              required 
              rows={3}
              className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all resize-none" 
            />
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-3">
            <label className="block text-cyan-300 font-semibold text-sm">Cor Principal</label>
            <input 
              type="text" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Ex: Azul, Preto e branco" 
              required 
              className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all" 
            />
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-3">
            <label className="block text-cyan-300 font-semibold text-sm">Local</label>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Cantina" 
              required 
              className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all" 
            />
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-3">
            <label className="block text-cyan-300 font-semibold text-sm">Categoria</label>
            <select 
              required 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all cursor-pointer"
            >
              <option value="" disabled>Selecione uma categoria</option>
              <option value="vestimenta" className="bg-slate-900 text-white">👕 Vestimenta</option>
              <option value="acessorio" className="bg-slate-900 text-white">📿 Acessório</option>
              <option value="materiais" className="bg-slate-900 text-white">✏️ Materiais</option>
              <option value="eletronicos" className="bg-slate-900 text-white">📱 Eletrônicos</option>
            </select>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-3">
            <label className="block text-cyan-300 font-semibold text-sm">Data do Fato</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required 
              className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all" 
            />
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-3">
            <label className="block text-cyan-300 font-semibold text-sm">Foto do Produto</label>
            {!imagePreview ? (
              <label className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all block">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <div className="flex flex-col items-center gap-3">
                  <ImagePlus className="w-8 h-8 text-cyan-300" />
                  <p className="text-gray-400 text-sm">Clique para adicionar imagem</p>
                </div>
              </label>
            ) : (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-slate-700" />
                <button 
                  type="button" 
                  onClick={() => { setImagePreview(null); setImageFile(null); }} 
                  className="mt-2 w-full text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Remover imagem
                </button>
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Registrando...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Registrar Item</span>
              </>
            )}
          </button>
        </form>

        {/* Toast Notification */}
        <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-500 z-50 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="inline-block px-6 py-3 rounded-lg text-white text-sm bg-slate-900/90 shadow-xl border border-cyan-500/40 backdrop-blur-md">
            {toast.message}
          </div>
        </div>
      </main>
    </div>
  );
}