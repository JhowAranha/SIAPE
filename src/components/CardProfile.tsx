import React, { useEffect, useState } from 'react';
import { supabase } from '../bd/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react';

export default function CardProfile(): React.JSX.Element | null {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-3 p-2 bg-cyan-950/20 border border-cyan-500/10 rounded-xl animate-pulse w-36 h-11" />
    );
  }

  if (!user) return null;

  // Tipagem segura para os metadados opcionais do Google
  const name = (user.user_metadata?.full_name as string) || 'Usuário';
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const firstName = name.split(' ')[0];

  return (
    <div className="flex items-center gap-3 p-1.5 pl-3 pr-2 rounded-xl bg-cyan-950/30 backdrop-blur-md border border-cyan-500/20 shadow-lg shadow-cyan-950/50 hover:border-cyan-400/40 transition-all group">
      <span className="text-sm font-medium text-cyan-100 tracking-wide select-none">
        {firstName}
      </span>
      
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt={`Foto de ${name}`} 
          className="w-8 h-8 rounded-lg object-cover border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs border border-cyan-400/30">
          {firstName.charAt(0).toUpperCase()}
        </div>
      )}

      <button 
        onClick={handleLogout}
        title="Sair da conta"
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        type="button"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
