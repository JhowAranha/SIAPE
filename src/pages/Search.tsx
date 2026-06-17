import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon, Loader2, PackageOpen, CheckSquare } from 'lucide-react';
import { supabase } from '../bd/supabase';

type Item = {
  id: string | number;
  name: string;
  description: string;
  color: string;
  category: string;
  date: string;
  image_url: string;
  status: string; // <-- Novo campo adicionado
  created_at?: string;
};

export default function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);

  // Função para buscar os itens
  async function fetchItems() {
    try {
      setLoading(true);
      // Buscamos apenas os itens cujo status seja 'disponivel'
      const { data, error } = await supabase
        .from('itens')
        .select('*')
        .eq('status', 'perdido') 
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setItems(data);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  // Lógica para Mudar o Status para 'devolvido'
  const handleDevolver = async (id: string | number) => {
    const confirmou = window.confirm("Confirmar que este item foi devolvido com sucesso ao dono?");
    if (!confirmou) return;

    try {
      setUpdatingId(id);

      // Atualiza o status do item no banco de dados
      const { error } = await supabase
        .from('itens')
        .update({ status: 'devolvido' })
        .eq('id', id);

      if (error) throw error;

      // Remove visualmente da lista sem precisar recarregar a página inteira
      setItems(prev => prev.filter(item => item.id !== id));
      alert("✅ Status atualizado: Item Devolvido!");

    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      alert(`❌ Erro ao processar: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredItems = items.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.color.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      (item.description && item.description.toLowerCase().includes(term))
    );
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="h-full w-full overflow-auto bg-slate-950 min-h-screen text-slate-100">
      <main className="relative z-10 max-w-5xl mx-auto py-12 px-6">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-8 animate-fade-up">
          <button onClick={() => navigate('/home')} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-4xl font-extrabold text-white">Procurar Itens</h2>
        </div>

        {/* Input de Busca */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-4 mb-8 animate-fade-up-delay flex items-center gap-3 focus-within:border-cyan-500/50 transition-all">
          <SearchIcon className="w-6 h-6 text-cyan-300" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por objeto, cor, categoria, descrição..." 
            className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:outline-none text-lg"
          />
        </div>

        {/* Estado de Carregamento */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            <p className="text-gray-400">Carregando itens achados...</p>
          </div>
        ) : (
          /* Grid de Resultados */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up-delay2">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-5 flex flex-col gap-3 transition-all hover:bg-slate-900/60 justify-between">
                <div>
                  {/* Imagem do Item */}
                  <div className="h-48 bg-slate-950 rounded-lg flex items-center justify-center border border-slate-800 overflow-hidden mb-3">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <PackageOpen className="w-16 h-16 text-slate-700" />
                    )}
                  </div>
                  
                  {/* Informações */}
                  <div>
                    <h3 className="text-xl font-bold text-white mt-1 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2 min-h-[40px]">{item.description}</p>
                  </div>
                  
                  <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-slate-800/60">
                    <span className="text-sm text-gray-300">
                      <strong className="text-cyan-300 font-semibold">Cor:</strong> {item.color}
                    </span>
                    <span className="text-sm text-gray-300">
                      <strong className="text-cyan-300 font-semibold">Categoria:</strong> {item.category}
                    </span>
                    <span className="text-xs text-gray-500 mt-2">
                      Encontrado em: {formatDate(item.date)}
                    </span>
                  </div>
                </div>

                {/* Botão Devolver (Sucesso) */}
                <button
                  onClick={() => handleDevolver(item.id)}
                  disabled={updatingId === item.id}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-slate-950 font-bold py-2.5 px-4 rounded-lg transition-all text-sm disabled:opacity-40"
                >
                  {updatingId === item.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckSquare className="w-4 h-4" />
                  )}
                  <span>Marcar como Devolvido</span>
                </button>

              </div>
            ))}

            {/* Sem resultados */}
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-16 flex flex-col items-center gap-2">
                <p className="text-gray-500 text-lg">Nenhum item pendente encontrado. :)</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}