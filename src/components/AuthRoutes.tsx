import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../bd/supabase';
import { Session } from '@supabase/supabase-js';

// 1. Criamos um Contexto para espalhar a sessão pelo app
const AuthContext = createContext<{ session: Session | null; loading: boolean }>({
  session: null,
  loading: true,
});

// 2. Provedor que vai envelopar a árvore de rotas no main.tsx / App.tsx
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso depois
export const useAuth = () => useContext(AuthContext);

// 3. Suas rotas agora ficam extremamente enxutas usando o useAuth()
export const PublicRoute: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) return <div className="text-white text-center mt-20">Carregando...</div>;
  
  // Usando <Outlet /> do react-router-dom, você pode envelopar grupos de rotas de forma mais limpa
  return session ? <Navigate to="/home" replace /> : <Outlet />;
};

export const PrivateRoute: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) return <div className="text-white text-center mt-20">Carregando...</div>;
  
  return !session ? <Navigate to="/login" replace /> : <Outlet />;
};