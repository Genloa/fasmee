import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './hooks/useAuth'
import Login from './pages/auth/Login'
import Conexion from './pages/conexion/Conexion'
import Home from './pages/home/home'
import Pacientes from './pages/pacientes/Pacientes'
import Usuarios from './pages/usuarios/Usuarios'
import Login from './pages/auth/Login'
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Conexion />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dash/users"
          element={
            <ProtectedRoute>
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dash/pacientes"
          element={
            <ProtectedRoute>
              <Pacientes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
