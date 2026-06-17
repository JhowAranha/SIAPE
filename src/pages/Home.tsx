import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, ShieldCheck, Zap, Users } from 'lucide-react';
import CardProfile from '../components/CardProfile';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex items-center justify-center overflow-auto">
      <div className="absolute top-6 right-6 z-20 animate-fade-up">
        <CardProfile />
      </div>
      <main className="relative z-10 text-center px-6 max-w-2xl w-full py-12">
        <div className="animate-fade-up mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 pulse-ring"></div>
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-cyan-300/50">
              <svg viewBox="0 0 48 48" className="w-12 h-12">
                <circle cx="20" cy="20" r="8" stroke="#ffffff" strokeWidth="2.5" fill="none" />
                <line x1="26" y1="26" x2="36" y2="36" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M34 12 L38 8 L40 10 L36 14 Z" fill="#ffffff" opacity="1" />
                <circle cx="38" cy="34" r="3" fill="#ffffff" opacity="1" />
              </svg>
            </div>
          </div>
        </div>
        <h1 className="animate-fade-up text-6xl font-[800] text-white tracking-tight mb-3">SIAPE</h1>
        <p className="animate-fade-up-delay text-xl font-light text-cyan-300 mb-2 italic">Encontre o que perdeu. Devolva o que achou.</p>
        <p className="animate-fade-up-delay2 text-gray-400 text-base font-light mb-12">Sistema de Achados e Perdidos</p>
        
        <div className="animate-fade-up-delay3 flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button onClick={() => navigate('/register')} className="btn-primary bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all">
            <PlusCircle className="w-5 h-5" />
            <span>Registrar Item</span>
          </button>
          <button onClick={() => navigate('/search')} className="btn-primary bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all">
            <Search className="w-5 h-5" />
            <span>Procurar Item</span>
          </button>
        </div>
        
        <div className="animate-fade-up-delay4 flex justify-center gap-8 mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-300" />
            </div>
            <p className="text-gray-400 text-xs font-medium">Seguro</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-300" />
            </div>
            <p className="text-gray-400 text-xs font-medium">Rápido</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-300" />
            </div>
            <p className="text-gray-400 text-xs font-medium">Comunitário</p>
          </div>
        </div>

      </main>

      
    </div>
  );
}