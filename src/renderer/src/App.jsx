import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Login from './pages/auth/Login'
import Connection from './pages/connection/Connection'
import Home from './pages/home/home'
import Pacientes from './pages/pacientes/Pacientes'
import Usuarios from './pages/usuarios/Usuarios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Citas from './pages/citas/Citas'
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dash/users" element={<Usuarios />} />
        <Route path="/dash/pacientes" element={<Pacientes />} />
        <Route path="/dash/citas" element={<Citas />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
