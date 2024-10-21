import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Usuarios from './pages/usuarios/Usuarios'
import Login from './pages/auth/Login'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/dash/home" element={<Home />} />
      <Route path="/dash/users" element={<Usuarios />} />
    </Routes>
  )
}

export default App
