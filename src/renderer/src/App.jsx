import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Login from './pages/auth/Login'
import Home from './pages/home/home'
import Usuarios from './pages/usuarios/Usuarios'
import Pacientes from './pages/pacientes/Pacientes'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dash/users" element={<Usuarios />} />
        <Route path="/dash/pacientes" element={<Pacientes />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
