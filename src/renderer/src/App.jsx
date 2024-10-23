import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Home from './pages/home/home'
import Usuarios from './pages/usuarios/Usuarios'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dash/home" element={<Home />} />
      <Route path="/dash/users" element={<Usuarios />} />
    </Routes>
  )
}

export default App
