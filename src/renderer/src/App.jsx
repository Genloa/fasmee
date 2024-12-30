import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'

import Login from './pages/auth/Login'
import Citas from './pages/citas/Citas'
import Connection from './pages/connection/Connection'
import Home from './pages/home/Home'
import Pacientes from './pages/pacientes/Pacientes'
import Usuarios from './pages/usuarios/Usuarios'
import ColaPacientes from './pages/colaPacientes/ColaPacientes'
import AtenderPaciente from './pages/atenderPaciente/AtenderPaciente'
import Inventario from './pages/Inventario/Inventario'
import Cronograma from './pages/cronograma/Cronograma'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

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
        <Route path="/dash/ColaPacientes" element={<ColaPacientes />} />
        <Route path="/dash/atenderPaciente" element={<AtenderPaciente />} />
        {/*  <Route
          path="/dash/atenderPaciente/:departamentoId/:pacienteId"
          element={<AtenderPaciente />}
        />*/}
        <Route path="/dash/inventario" element={<Inventario />} />
        <Route path="/dash/cronograma" element={<Cronograma />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
