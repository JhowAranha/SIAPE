import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, Sparkles } from 'lucide-react';
import { supabase } from "./bd/supabase";

// Imagens
import siapeLogo from './assets/logo-siape.png';
import siapeLogoText from './assets/logo-siape-texto.png'

export default function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: string }>({ 
    show: false, message: '', type: 'success' 
  });

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/home` // Rota para onde o usuário será redirecionado após o login
      }
    });

    if (error) {
      console.error('Erro ao fazer login com o Google:', error.message);
    }
  }

  const showToast = (message: string, type: string = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast('⚠️ Preencha todos os campos!', 'error');
      return;
    }

    showToast('✅ Login realizado com sucesso!');
    setTimeout(() => navigate('/'), 1500);
  };



  return (
    <div className="h-full w-full flex items-center justify-center overflow-auto">
      <main className="relative z-10 w-full max-w-md py-12 px-6">

        {/* Logo + Title */}
        <div className="text-center mb-8 animate-fade-up-delay flex flex-col">
          <div className="flex h-20 m-auto gap-4">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg bg-linear-to-br from-white to gray-100">
                <img src={siapeLogo} alt="Logo do projeto SIAPE" className='w-10' />
                
              </div>
            </div>

            <img src={siapeLogoText} alt="Logo do texto do projeto SIAPE" className="w-auto h-auto" />
          </div>
           
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            Bem-vindo!
          </h1>
          <p className="text-cyan-300 text-sm font-light italic">
            Acesse sua conta para continuar
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5 animate-fade-up-delay2" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="glass rounded-xl space-y-3">
            <label className="block text-cyan-300 font-semibold text-sm">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300/60" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@etec.sp.gov.br" 
                required 
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all" 
              />
            </div>
          </div>
          
          {/* Senha */}
          <div className="glass rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-cyan-300 font-semibold text-sm">
                Senha
              </label>
              <button 
                type="button"
                onClick={() => showToast('🔑 Em breve!')}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300/60" />
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha" 
                required 
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/10 transition-all"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-cyan-300/60" />
                ) : (
                  <Eye className="w-4 h-4 text-cyan-300/60" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-3 cursor-pointer select-none px-2">
            <div className="relative">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 bg-white/10 border border-white/20 rounded-md peer-checked:bg-cyan-500 peer-checked:border-cyan-400 transition-all flex items-center justify-center">
                {rememberMe && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-300">Manter-me conectado</span>
          </label>
          
          {/* Submit */}
          <button
          disabled 
            type="submit" 
            className="w-full btn-primary bg-linear-to-r from-gray-500 to-gray-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all"
          >
            <LogIn className="w-5 h-5" />
            <span>Entrar</span>
          </button>

          {/* Google */}
          <button 
            type='button'
            onClick={handleGoogleLogin}
            className="w-full btn-primary bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all"
          >
            <LogIn className="w-5 h-5" />
            <span>Entrar com o Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Register Link */}
          <button 
          disabled
            type="button"
            onClick={() => navigate('/register-account')}
            className="w-full btn-primary bg-linear-to-r  from-gray-500 to-gray-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>Criar nova conta</span>
          </button>
        </form>

        {/* Trust badges */}
        <div className="flex justify-center gap-6 mt-8 animate-fade-up-delay3">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            <span>Conexão segura</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Dados protegidos</span>
          </div>
        </div>

        {/* Toast Notification */}
        <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className={`inline-block px-6 py-3 rounded-lg text-white text-sm shadow-lg backdrop-blur border ${
            toast.type === 'error' 
              ? 'bg-red-500/20 border-red-400/50' 
              : 'bg-cyan-500/20 border-cyan-400/50'
          }`}>
            {toast.message}
          </div>
        </div>
      </main>
    </div>
  );
}