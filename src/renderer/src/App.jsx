import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import ProtectedRoute from './middleware/ProtectedRoute'
import AtenderPaciente from './pages/atenderPaciente/AtenderPaciente'
import Login from './pages/auth/Login'
import Citas from './pages/citas/Citas'
import ColaPacientes from './pages/colaPacientes/ColaPacientes'
import Connection from './pages/connection/Connection'
import Cronograma from './pages/cronograma/Cronograma'
import Historias from './pages/historias/Historias'
import Home from './pages/home/Home'
import Inventario from './pages/Inventario/Inventario'
import Pacientes from './pages/pacientes/Pacientes'
import Servicios from './pages/servicios/Servicios'
import Usuarios from './pages/usuarios/Usuarios'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Connection />} />
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
        <Route
          path="/dash/citas"
          element={
            <ProtectedRoute>
              <Citas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dash/ColaPacientes"
          element={
            <ProtectedRoute>
              <ColaPacientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dash/atenderPaciente"
          element={
            <ProtectedRoute>
              <AtenderPaciente />
            </ProtectedRoute>
          }
        />
        {/*  <Route
          path="/dash/atenderPaciente/:departamentoId/:pacienteId"
          element={<AtenderPaciente />}
        />*/}
        <Route
          path="/dash/inventario"
          element={
            <ProtectedRoute>
              <Inventario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dash/cronograma"
          element={
            <ProtectedRoute>
              <Cronograma />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dash/servicios"
          element={
            <ProtectedRoute>
              <Servicios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dash/historias"
          element={
            <ProtectedRoute>
              <Historias />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
