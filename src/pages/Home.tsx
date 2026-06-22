import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, ShieldCheck, Zap, Users } from 'lucide-react';
import CardProfile from '../components/CardProfile';

// Imagens
import siapeLogo from '../assets/logo-siape.png';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex items-center justify-center overflow-auto">
      <div className="absolute top-6 right-6 z-20 animate-fasde-up">
        <CardProfile />
      </div>
      <main className="max-w-2xl w-full mx-10 flex flex-col gap-4">
        <div className="flex items-center h-max mx-auto my-10 text-center">
          <img src={siapeLogo} className='object-contain size-28'></img>
          <h1 className='text-6xl text-center bg-linear-to-r from-button to-bluelight bg-clip-text text-transparent'>Siape</h1>
        </div>

        <h2 className='text-center text-2xl text-white'>
          Conectando <label className='text-bluelight'>pessoas</label><br/>
          aos seus <label className='text-bluelight'>pertences.</label>
        </h2>
        
        <div className="animate-fade-up-delay3 flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-8">
          <button onClick={() => navigate('/register')} className="btn-primary bg-linear-to-r from-bluelight to-button hover:scale-105 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all cursor-pointer">
            <PlusCircle className="w-5 h-5" />
            <span>Registrar Item</span>
          </button>
          <button onClick={() => navigate('/search')} className="btn-primary bg-linear-to-r from-secondlight to-seconddark hover:scale-105 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all cursor-pointer">
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