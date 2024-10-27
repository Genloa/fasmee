import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Login from './pages/auth/Login'
import Home from './pages/home/home'
import Usuarios from './pages/usuarios/Usuarios'
import Register from './pages/auth/Register'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/dash/users" element={<Usuarios />} />
        <Route path="/dash/users/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
