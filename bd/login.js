import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';

// 1. Inicializar o cliente do Supabase
const SUPABASE_URL = "https://wtxaayanuqvlpmzzqukx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9jIlz0LPOI4C-y80WqQ2GQ_MyrTRoCE";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elementos do DOM
const btnGoogle = document.getElementById('btn-google');


// 2. Função para fazer Login com o Google
async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Redireciona de volta para a sua página atual após o login
            redirectTo: window.location.href
        }
    });

    if (error) console.error('Erro ao tentar logar:', error.message);
}

// 3. Função para fazer Logout
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Erro ao sair:', error.message);
}

// 4. Escutar o estado da autenticação (Se ligou, se deslogou, etc.)
supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
        // Usuário está logado
        // window.location.href = "dashboard";
        alert("logado!");
        
        // Pegando os dados do Google retornados no metadata
        const userMetadata = session.user.user_metadata;
        console.log(userMetadata.full_name || 'Usuário');
        console.log(session.user.email);
    } else {
        // Usuário deslogado
        console.log("deslogado");
    }
});

// Event Listeners dos botões
btnGoogle.addEventListener('click', signInWithGoogle);
// btnLogout.addEventListener('click', logout);