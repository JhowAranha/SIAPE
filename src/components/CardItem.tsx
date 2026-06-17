export default function CardItem(name: string, description: string, color: string, category: string, date: string) {
    // Função para formatar a data que vem do banco (AAAA-MM-DD para DD/MM/AAAA)
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

    return (
        <div className="flex flex-col flex-1 justify-between">
            <div>
                <h3 className="text-xl font-bold text-white mt-1 line-clamp-1">{name}</h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2 min-h-[40px]">{description}</p>
                </div>
                
                <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-slate-800/60">
                <span className="text-sm text-gray-300">
                    <strong className="text-cyan-300 font-semibold">Cor:</strong> {color}
                </span>
                <span className="text-sm text-gray-300">
                    <strong className="text-cyan-300 font-semibold">Categoria:</strong> {category}
                </span>
                <span className="text-xs text-gray-500 mt-2">
                    Encontrado em: {formatDate(date)}
                </span>
            </div>
        </div>
    )
}