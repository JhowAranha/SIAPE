import siapeLogo from './assets/logo-siape.png';
import {} from 'lucide-react';
import googleLogo from './assets/google.png';
import { supabase } from './bd/supabase';

export default function App() {
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

  return (
    <div className="flex flex-col min-h-screen w-full bg-dark">
      <div className="flex items-center h-max mx-auto my-10 text-center">
        <img src={siapeLogo} className='object-contain size-28'></img>
        <h1 className='text-6xl text-center bg-linear-to-r from-button to-bluelight bg-clip-text text-transparent'>Siape</h1>
      </div>
      <h2 className='text-center text-2xl text-white'>
        Conectando <label className='text-bluelight'>pessoas</label><br/>
        aos seus <label className='text-bluelight'>pertences.</label>
      </h2>

      <div className='w-full m-auto flex flex-col'>
        
        <button className='p-4 bg-button rounded-4xl w-80 m-auto text-white text-xl flex gap-4 text-center cursor-pointer hover:scale-105 transition tra' onClick={handleGoogleLogin}>
          <img src={googleLogo} className='size-10'></img>
          <span className='text-center m-auto'>Entrar com o Google</span>
        </button>
      </div>
    </div>
  )
}