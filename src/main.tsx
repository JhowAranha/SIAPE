import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx'
import Search from './pages/Search.tsx'
import { PublicRoute, PrivateRoute } from './components/AuthRoutes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace /> // Redireciona a rota raiz para o login
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <App />
      </PublicRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PrivateRoute>
        <Register />
      </PrivateRoute>
    )
  },
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    )
  },
  {
    path: '/search',
    element: (
      <PrivateRoute>
        <Search />
      </PrivateRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/login" replace /> // Captura rotas inexistentes
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
