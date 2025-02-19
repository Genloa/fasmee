import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Toast } from 'bootstrap'
import { useEffect, useState } from 'react'
import Dash from '../../components/layouts/Dash'
import Can from '../../helpers/Can'
import { useAuth } from '../../hooks/useAuth'
import ModalConsulta from './components/ModalConsulta'
import ModalEmergencia from './components/ModalEmergencia'

export default function AtenderPaciente() {
  const [colaPacientes, setColaPacientes] = useState([])
  const [citaPacientes, setCitaPaciente] = useState([])
  const [showConsulta, setShowConsulta] = useState(false)
  const [showEmergencia, setShowEmergencia] = useState(false)
  const [selectedPaciente, setSelectedPaciente] = useState(null)

  const { session } = useAuth()
  const usuario = {
    nombre: session.user.perfil.nombres,
    apellidos: session.user.perfil.apellidos,
    id: session.user.perfil.id,
    departamentoId: session.user.perfil.departamentoId
  }
  useEffect(() => {
    fetchColaPacientes()
    fetchCitaPacientes()
  }, [])

  const fetchColaPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getColaPacientesMedico(
        usuario.id,
        usuario.departamentoId
      )

      // Ordenar los pacientes por colasMedicos[0].createdAt
      const sortedPacientes = fetchedPacientes.sort(
        (a, b) => new Date(a.colasMedicos[0].createdAt) - new Date(b.colasMedicos[0].createdAt)
      )
      setColaPacientes(sortedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  const fetchCitaPacientes = async () => {
    try {
      const fetchedCitaPacientes = await window.api.getCitaPacientesMedico(
        usuario.id,
        usuario.departamentoId
      )
      setCitaPaciente(fetchedCitaPacientes)
    } catch (error) {
      console.error('Error fetching citas pacientes:', error)
    }
  }

  const handleAtenderClick = (paciente) => {
    setSelectedPaciente(paciente)
    setShowConsulta(true)
  }

  const handleEmergenciaClick = () => {
    setShowEmergencia(true)
  }

  const handleCloseConsulta = () => {
    setShowConsulta(false)
    setSelectedPaciente(null)
  }

  const handleCloseEmergencia = () => {
    setShowEmergencia(false)
    setSelectedPaciente(null)
  }

  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleShowToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToast')
      const toast = new Toast(toastEl)
      toast.show()
      // Restablecer el estado showToast a false después de que el toast se haya mostrado
      const timeout = setTimeout(() => {
        setShowToast(false)
      }, 3000) // Ajusta el tiempo según sea necesario

      return () => clearTimeout(timeout)
    }
  }, [showToast])

  return (
    <Dash>
      {/* Modal Consulta */}
      {showConsulta && selectedPaciente && (
        <ModalConsulta
          show={showConsulta}
          handleClose={handleCloseConsulta}
          pacienteId={selectedPaciente.id}
          usuario={usuario}
          handleShowToast={handleShowToast}
        />
      )}
      {/* Modal Emergencia */}
      {showEmergencia && (
        <ModalEmergencia
          show={showEmergencia}
          handleClose={handleCloseEmergencia}
          usuario={usuario}
          handleShowToast={handleShowToast}
        />
      )}
      <div className="card border-white">
        <div className="card-body">
          <h5 className="card-title fs-3">Atender Pacientes</h5>
          <Can permission="atender.emergencia">
            <div className="text-end">
              <button type="button" className="btn btn-danger" onClick={handleEmergenciaClick}>
                Emergencia
              </button>
            </div>
          </Can>
          <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card mb-3 border-danger">
                  <div className="card-header">
                    <h5>Citas de Hoy</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <ul className="list-group">
                        {citaPacientes.map((paciente, index) => (
                          <li
                            key={paciente.id}
                            className="list-group-item text-danger d-flex justify-content-between align-items-center"
                          >
                            {index + 1}. {paciente.nombres} {paciente.apellidos}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card mb-3 border-primary">
                  <div className="card-header">
                    <div className="d-flex justify-content-between">
                      <h5>Cola Pacientes</h5>
                      <button
                        type="button"
                        className="btn  btn-sm  text-primary "
                        onClick={fetchColaPacientes}
                      >
                        <FontAwesomeIcon icon={faArrowsRotate} className="fs-5" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <ul className="list-group">
                        {colaPacientes.map((paciente, index) => (
                          <li
                            key={paciente.id}
                            className="list-group-item text-primary d-flex justify-content-between align-items-center"
                          >
                            <span>
                              {index + 1}. {paciente.nombres} {paciente.apellidos}
                            </span>
                            <Can permission="atender.atender">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => handleAtenderClick(paciente)}
                              >
                                Atender
                              </button>
                            </Can>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Notificación</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </Dash>
  )
}
