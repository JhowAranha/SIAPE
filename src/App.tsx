import React, { useState, useEffect } from 'react';
import { User, Item } from './types';
import { MOCK_USERS, INITIAL_ITEMS } from './mockData';
import { handleGoogleLogin } from './bd/supabase';

export default function App() {
  // --- ESTADOS DO SISTEMA ---
  const [loading, setLoading] = useState<boolean>(true);
  
  
  // Login Inputs
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');



  // // --- EFEITOS (Simulando o ciclo de vida antigo) ---
  useEffect(() => {
    // 1. Loader de Inicialização (1.8 segundos)
    const timer = setTimeout(() => setLoading(false), 1800);

    return () => clearTimeout(timer);
  }, []);

  // --- FUNÇÕES DE INTERAÇÃO ---
  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const user = MOCK_USERS.find(u => u.email === email);
  //   // Simulação do comportamento de aceitar o password '123456' ou igual ao email como estava no código original
  //   if (user && (password === '123456' || password === 'demo')) {
  //     setCurrentUser(user);
  //     sessionStorage.setItem('siape_logged_user', JSON.stringify(user));
  //     setLoginError('');
  //   } else {
  //     setLoginError('Credenciais inválidas. Use os emails de exemplo.');
  //   }
  // };

  // const handleLogout = () => {
  //   setCurrentUser(null);
  //   sessionStorage.removeItem('siape_logged_user');
  // };
  // --- RENDER DO LOADER INICIAL ---
  if (loading) {
    return (
      <div className="fixed inset-0 bg-bgDeep flex flex-col items-center justify-center z-50 transition-all duration-500">
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full animate-spin-slow"></div>
          <div className="absolute inset-2 border-2 border-accent/10 border-b-accent rounded-full animate-spin-reverse"></div>
          <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-wider text-white">SIAPE</h1>
        <p className="text-textMuted text-sm mt-1">Sistema de Achados e Perdidos Escolar</p>
      </div>
    );
  }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-bgDeep relative">
        {/* Efeito de círculos luminosos de fundo (Tailwind puro) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md bg-bgDark/60 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-3 text-primary">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Acessar o SIAPEE</h2>
            <p className="text-textMuted text-sm mt-1">Insira suas credenciais escolares</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-textMuted">E-mail</label>
              <input 
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="ex: admin@escola.edu.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-textMuted">Senha</label>
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {loginError && <p className="text-accent2 text-xs font-medium">{loginError}</p>}

            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-primary/20">
              Entrar no Painel
            </button>
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-primary/20" onClick={handleGoogleLogin}>
              Entrar com o Google
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <p className="text-xs text-textMuted">Contas de teste: <span className="text-primary-light">admin@escola.edu.br</span> (senha: 123456)</p>
          </div>
        </div>
      </div>
    );
  }