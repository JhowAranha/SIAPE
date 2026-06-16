import {createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
        redirectTo: `${window.location.origin}/dashboard` // Rota após o login
        }
    });

    if (error) {
        console.error('Erro ao fazer login:', error.message);
    }
}
