import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx'
import Search from './pages/Search.tsx'
import { PublicRoute, PrivateRoute, AuthProvider } from './components/AuthRoutes' // Importe o AuthProvider aqui

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  // 1. Grupo de Rotas Públicas (Usa o PublicRoute como pai)
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <App />
      }
    ]
  },
  // 2. Grupo de Rotas Privadas (Usa o PrivateRoute como pai)
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/register', // Mantive aqui se ele for privado, se for público mude para o grupo de cima!
        element: <Register />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 3. Envolva o RouterProvider com o AuthProvider aqui */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)