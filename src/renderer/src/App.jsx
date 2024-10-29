import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Login from './pages/auth/Login'
import Home from './pages/home/home'
import Usuarios from './pages/usuarios/Usuarios'
import UsuarioCreate from './pages/usuarios/UsuarioCreate'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/dash/users" element={<Usuarios />} />
        <Route path="/dash/users/create" element={<UsuarioCreate />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
