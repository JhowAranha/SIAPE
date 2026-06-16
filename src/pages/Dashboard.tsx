import { useState } from "react";
import { User, Item } from "../types";

export default function Dashboard() {
  // const [currentUser, setCurrentUser] = useState<User | null>(null);

  // const marcarComoDevolvido = (id: number) => {
  // const updated = items.map(item => item.id === id ? { ...item, status: 'devolvido' as const } : item);
  //   setItems(updated);
  //   localStorage.setItem('siape_items', JSON.stringify(updated));
  // };
  // // Itens & Filtros
  // const [items, setItems] = useState<Item[]>([]);
  // const [filterType, setFilterType] = useState<'todos' | 'achado' | 'perdido'>('todos');
  // const [searchTerm, setSearchTerm] = useState<string>('');

  // // Modais
  // const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  // const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // // Form de Novo Item
  // const [newItemName, setNewItemName] = useState('');
  // const [newItemType, setNewItemType] = useState<'achado' | 'perdido'>('achado');
  // const [newItemCategory, setNewItemCategory] = useState<Item['category']>('eletronicos');
  // const [newItemLocal, setNewItemLocal] = useState('');
  // const [newItemDesc, setNewItemDesc] = useState('');

  // const handleAddItem = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const createdItem: Item = {
  //     id: Date.now(),
  //     name: newItemName,
  //     type: newItemType,
  //     category: newItemCategory,
  //     local: newItemLocal,
  //     desc: newItemDesc,
  //     date: new Date().toISOString().split('T')[0],
  //     status: 'aguardando',
  //     by: currentUser?.name || 'Sistema'
  //   };
  //   const updated = [createdItem, ...items];
  //   setItems(updated);
  //   localStorage.setItem('siape_items', JSON.stringify(updated));
    
  //   // Reset inputs & fechar modal
  //   setNewItemName('');
  //   setNewItemLocal('');
  //   setNewItemDesc('');
  //   setIsAddModalOpen(false);
  // };

  // // --- FILTRAGEM DINÂMICA ---
  //   const filteredItems = items.filter(item => {
  //   const matchesType = filterType === 'todos' || item.type === filterType;
  //   const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
  //                           item.local.toLowerCase().includes(searchTerm.toLowerCase());
  //   return matchesType && matchesSearch;
  //   });

  // // Métricas calculadas em tempo real
  //   const countAchados = items.filter(i => i.type === 'achado').length;
  //   const countPerdidos = items.filter(i => i.type === 'perdido').length;
  //   const countDevolvidos = items.filter(i => i.status === 'devolvido').length;

  //   return (
  //   <div className="min-h-screen bg-bgDeep flex flex-col">
  //     {/* Topbar */}
  //     <header className="bg-bgDark/40 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
  //       <div className="flex items-center gap-3">
  //         <div className="text-xl font-bold text-primary tracking-wide">SIAPE</div>
  //         <span className="hidden sm:inline text-xs bg-white/5 px-2 py-1 rounded text-textMuted border border-white/5">v2.0 React</span>
  //       </div>

  //       <div className="flex items-center gap-4">
  //         <input 
  //           type="text" 
  //           placeholder="Buscar por item ou local..."
  //           className="hidden md:block bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-sm text-white focus:outline-none focus:border-primary w-64 transition-all"
  //           // value={searchTerm}
  //           // onChange={(e) => setSearchTerm(e.target.value)}
  //         />
          
  //         <div className="flex items-center gap-3 pl-4 border-l border-white/10">
  //           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm border border-primary/30">
              
  //           </div>
  //           <div className="hidden sm:block text-left leading-none">
  //             <div className="text-xs font-semibold text-white"></div>
  //             <span className="text-[10px] text-textMuted"></span>
  //           </div>
  //           <button className="text-textMuted hover:text-accent2 transition-colors text-xs p-1">
  //             Sair
  //           </button>
  //         </div>
          
  //       </div>
  //     </header>

  //     {/* Conteúdo Principal */}
  //     <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        
  //       {/* Linha Mobile de Busca */}
  //       <div className="md:hidden">
  //         <input 
  //           type="text" 
  //           placeholder="Buscar por item ou local..."
  //           className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
  //           value={searchTerm}
  //           onChange={(e) => setSearchTerm(e.target.value)}
  //         />
  //       </div>

  //       {/* Header Seção */}
  //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  //         <div>
  //           <h2 className="text-xl font-bold text-white">Resumo do Sistema</h2>
  //           <p className="text-xs text-textMuted">Gerenciamento e controle de achados na instituição</p>
  //         </div>
  //         <button 
  //           onClick={() => setIsAddModalOpen(true)}
  //           className="bg-primary hover:bg-primary-dark text-white text-sm px-4 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
  //         >
  //           <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
  //           Registrar Item
  //         </button>
  //       </div>

  //       {/* Grid de Métricas */}
  //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  //         <div className="bg-bgDark/60 border border-white/5 p-4 rounded-xl flex flex-col">
  //           <span className="text-xs text-textMuted font-medium">Itens Achados</span>
  //           <span className="text-2xl font-bold text-accent mt-1">{countAchados}</span>
  //         </div>
  //         <div className="bg-bgDark/60 border border-white/5 p-4 rounded-xl flex flex-col">
  //           <span className="text-xs text-textMuted font-medium">Itens Perdidos</span>
  //           <span className="text-2xl font-bold text-accent2 mt-1">{countPerdidos}</span>
  //         </div>
  //         <div className="bg-bgDark/60 border border-white/5 p-4 rounded-xl flex flex-col">
  //           <span className="text-xs text-textMuted font-medium">Devolvidos / Resolvidos</span>
  //           <span className="text-2xl font-bold text-accent3 mt-1">{countDevolvidos}</span>
  //         </div>
  //       </div>

  //       {/* Filtros por Categoria e Tabela de Registros */}
  //       <div className="bg-bgDark/40 border border-white/5 rounded-xl overflow-hidden shadow-xl">
  //         <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 bg-bgDark/20">
  //           <div className="flex gap-1.5">
  //             {(['todos', 'achado', 'perdido'] as const).map((type) => (
  //               <button
  //                 key={type}
  //                 onClick={() => setFilterType(type)}
  //                 className={`text-xs px-3 py-1.5 rounded-md font-medium capitalize transition-all ${
  //                   filterType === type 
  //                     ? 'bg-primary text-white shadow-md' 
  //                     : 'bg-white/5 text-textMuted hover:bg-white/10'
  //                 }`}
  //               >
  //                 {type === 'todos' ? 'Todos' : type + 's'}
  //               </button>
  //             ))}
  //           </div>
  //           <span className="text-xs text-textMuted">{filteredItems.length} registros listados</span>
  //         </div>

  //         <div className="overflow-x-auto">
  //           <table className="w-full text-left border-collapse">
  //             <thead>
  //               <tr className="border-b border-white/5 text-xs text-textMuted uppercase bg-bgDark/10">
  //                 <th className="p-4">Item</th>
  //                 <th className="p-4">Tipo</th>
  //                 <th className="p-4">Local</th>
  //                 <th className="p-4">Data</th>
  //                 <th className="p-4">Status</th>
  //                 <th className="p-4 text-right">Ações</th>
  //               </tr>
  //             </thead>
  //             <tbody className="divide-y divide-white/5 text-sm">
  //               {filteredItems.length === 0 ? (
  //                 <tr>
  //                   <td colSpan={6} className="p-8 text-center text-textMuted text-xs">
  //                     Nenhum registro encontrado correspondente aos filtros.
  //                   </td>
  //                 </tr>
  //               ) : (
  //                 filteredItems.map(item => (
  //                   <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
  //                     <td className="p-4 font-medium text-white">{item.name}</td>
  //                     <td className="p-4">
  //                       <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
  //                         item.type === 'achado' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-accent2/10 text-accent2 border border-accent2/20'
  //                       }`}>
  //                         {item.type}
  //                       </span>
  //                     </td>
  //                     <td className="p-4 text-textMuted">{item.local}</td>
  //                     <td className="p-4 text-textMuted">{item.date}</td>
  //                     <td className="p-4">
  //                       <span className={`text-xs font-semibold ${item.status === 'devolvido' ? 'text-accent' : 'text-accent3'}`}>
  //                         {item.status.toUpperCase()}
  //                       </span>
  //                     </td>
  //                     <td className="p-4 text-right space-x-2">
  //                       <button 
  //                         onClick={() => setSelectedItem(item)}
  //                         className="bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded text-xs transition-all text-white"
  //                       >
  //                         Ver
  //                       </button>
  //                       {item.status !== 'devolvido' && (
  //                         <button 
  //                           onClick={() => marcarComoDevolvido(item.id)}
  //                           className="bg-accent hover:bg-accent/80 text-bgDeep font-semibold px-2.5 py-1 rounded text-xs transition-all"
  //                         >
  //                           Resolver
  //                         </button>
  //                       )}
  //                     </td>
  //                   </tr>
  //                 ))
  //               )}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </main>

  //     {/* ===== MODAL: ADICIONAR ITEM ===== */}
  //     {isAddModalOpen && (
  //       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
  //         <div className="bg-bgDark border border-white/10 rounded-xl w-full max-w-lg p-6 relative shadow-2xl animate-fade-in">
  //           <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
  //             <h3 className="text-lg font-bold text-white">Registrar Novo Item</h3>
  //             <button onClick={() => setIsAddModalOpen(false)} className="text-textMuted hover:text-white text-xl">&times;</button>
  //           </div>
  //           <form onSubmit={handleAddItem} className="space-y-4">
  //             <div>
  //               <label className="block text-xs font-medium text-textMuted mb-1">Nome do Item</label>
  //               <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" value={newItemName} onChange={e => setNewItemName(e.target.value)} />
  //             </div>
  //             <div className="grid grid-cols-2 gap-4">
  //               <div>
  //                 <label className="block text-xs font-medium text-textMuted mb-1">Tipo de Registro</label>
  //                 <select className="w-full bg-bgDeep border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" value={newItemType} onChange={e => setNewItemType(e.target.value as 'achado' | 'perdido')}>
  //                   <option value="achado">Achado</option>
  //                   <option value="perdido">Perdido</option>
  //                 </select>
  //               </div>
  //               <div>
  //                 <label className="block text-xs font-medium text-textMuted mb-1">Categoria</label>
  //                 <select className="w-full bg-bgDeep border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" value={newItemCategory} onChange={e => setNewItemCategory(e.target.value as Item['category'])}>
  //                   <option value="eletronicos">Eletrônicos</option>
  //                   <option value="vestuario">Vestuário</option>
  //                   <option value="documentos">Documentos</option>
  //                   <option value="outros">Outros</option>
  //                 </select>
  //               </div>
  //             </div>
  //             <div>
  //               <label className="block text-xs font-medium text-textMuted mb-1">Local aproximado</label>
  //               <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" value={newItemLocal} onChange={e => setNewItemLocal(e.target.value)} />
  //             </div>
  //             <div>
  //               <label className="block text-xs font-medium text-textMuted mb-1">Descrição detalhada</label>
  //               <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" value={newItemDesc} onChange={e => setNewItemDesc(e.target.value)} />
  //             </div>
  //             <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-2">
  //               Salvar Registro
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     )}

  //     {/* ===== MODAL: DETALHES DO ITEM ===== */}
  //     {selectedItem && (
  //       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
  //         <div className="bg-bgDark border border-white/10 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
  //           <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
  //             <h3 className="text-lg font-bold text-white">Detalhes do Registro</h3>
  //             <button onClick={() => setSelectedItem(null)} className="text-textMuted hover:text-white text-xl">&times;</button>
  //           </div>
  //           <div className="space-y-2.5 text-sm text-white">
  //             <p><strong className="text-textMuted font-medium mr-1">Item:</strong> {selectedItem.name}</p>
  //             <p><strong className="text-textMuted font-medium mr-1">Tipo:</strong> <span className="capitalize text-primary-light">{selectedItem.type}</span></p>
  //             <p><strong className="text-textMuted font-medium mr-1">Local:</strong> {selectedItem.local}</p>
  //             <p><strong className="text-textMuted font-medium mr-1">Data:</strong> {selectedItem.date}</p>
  //             <p><strong className="text-textMuted font-medium mr-1">Status:</strong> <span className={selectedItem.status === 'devolvido' ? 'text-accent' : 'text-accent3'}>{selectedItem.status.toUpperCase()}</span></p>
  //             <p><strong className="text-textMuted font-medium mr-1">Registrado por:</strong> {selectedItem.by}</p>
  //             <hr className="border-white/5 my-3" />
  //             <p className="text-textMuted text-xs font-medium mb-1">Descrição Adicional:</p>
  //             <p className="bg-white/5 border border-white/5 p-3 rounded-lg text-xs leading-relaxed text-slate-300">
  //               {selectedItem.desc || 'Nenhuma descrição complementar registrada.'}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <h1>Dashboard</h1>
  )
}