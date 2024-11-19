import { createHashRouter } from 'react-router-dom'

// Pages
import { AuthProvider } from '../hooks/useAuth'
import ProtectedRoute from '../middleware/ProtectedRoute'
import Login from '../pages/auth/Login'
import Connection from '../pages/Connection/Connection'
import Home from '../pages/home/home'
import Pacientes from '../pages/pacientes/Pacientes'
import Usuarios from '../pages/usuarios/Usuarios'

const router = createHashRouter([
  {
    path: '/',
    element: <Connection />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'dash',
        element: (
          <AuthProvider>
            <ProtectedRoute />
          </AuthProvider>
        ),
        children: [
          {
            path: 'home',
            element: <Home />
          },
          {
            path: 'users',
            element: <Usuarios />
          },
          {
            path: 'pacientes',
            element: <Pacientes />
          }
        ]
      }
    ]
  }
])

export default router
