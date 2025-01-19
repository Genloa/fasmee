import Dash from '../../components/layouts/Dash'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faFileMedical, faTruckMedical } from '@fortawesome/free-solid-svg-icons'
import ModalRayosX from './components/ModalRayosX'
import ModalLaboratorios from './components/ModalLaboratorio'
import ModalAmbulancia from './components/ModalAmbulancia'
import { Toast } from 'bootstrap'

export default function Servicios() {
  const [colaPacientes, setColaPacientes] = useState([])

  const [nombreDepartamento, setNombreDepartamento] = useState('')
  const [showModalRayosX, setShowModalRayosX] = useState(false)
  const [showModalAmbulancia, setShowModalAmbulancia] = useState(false)
  const [showModalLaboratorios, setShowModalLaboratorios] = useState(false)
  //  const [selectedPaciente, setSelectedPaciente] = useState(null)

  const usuario = {
    nombre: 'heidy',
    apellidos: 'Sanchez',
    id: 2,
    departamentoId: 9
  }

  useEffect(() => {
    fetchColaPacientes()
    fetchDepartamentos()
  }, [])

  const fetchDepartamentos = async () => {
    const fetchedDepartamentos = await window.api.getDepartamentos()
    // Filtrar departamentos

    const departamento = fetchedDepartamentos.find((dep) => dep.id === usuario.departamentoId)
    if (departamento) {
      setNombreDepartamento(departamento.nombre)
    }
  }

  const fetchColaPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getColaPacientesMedico(null, usuario.departamentoId)

      console.log(fetchedPacientes)
      // Ordenar los pacientes por colasMedicos[0].createdAt
      const sortedPacientes = fetchedPacientes.sort(
        (a, b) => new Date(a.colasMedicos[0].createdAt) - new Date(b.colasMedicos[0].createdAt)
      )
      console.log('colaPacientes:', sortedPacientes)
      setColaPacientes(sortedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  const handleAtenderClick = () => {
    if (usuario.departamentoId === 9) {
      setShowModalRayosX(true)
    } else if (usuario.departamentoId === 10) {
      setShowModalLaboratorios(true)
    }
  }

  const handleAmbulanciaClick = () => {
    setShowModalAmbulancia(true)
  }

  const handleCloseModal = () => {
    setShowModalRayosX(false)
    setShowModalLaboratorios(false)
    setShowModalAmbulancia(false)
    // setSelectedPaciente(null)
  }

  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleShowToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToastAmbu')
      const toast = new Toast(toastEl)
      toast.show()
      // Restablecer el estado showToast a false después de que el toast se haya mostrado
      const timeout = setTimeout(() => {
        setShowToast(false)
      }, 3000) // Ajusta el tiempo según sea necesario

      return () => clearTimeout(timeout)
    }
  }, [showToast])

  const onSubmit = async (pacienteId) => {
    try {
      const data = {
        usuarioId: usuario.id,
        pacienteId: pacienteId,
        departamentoId: usuario.departamentoId
      }
      const consulta = await window.api.createHistoriaServicio(data)
      if (consulta) {
        fetchColaPacientes()
        handleShowToast('Servicio guardado correctamente')
      } else {
        handleShowToast('No se pudo guardar servicio')
      }
    } catch (error) {
      console.error('Error creando guardando la historia:', error)
    }
  }

  return (
    <>
      <Dash>
        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title fs-3">Servicios</h5>
            <div className="text-end">
              <button
                type="button"
                className="btn btn-success ms-2"
                onClick={() => handleAmbulanciaClick()}
              >
                <FontAwesomeIcon icon={faTruckMedical} className="fs-5" /> Ambulancia
              </button>
              <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={() => handleAtenderClick()}
              >
                <FontAwesomeIcon icon={faFileMedical} className="fs-5" /> Subir Resultado
              </button>
            </div>
            <div className="container mt-5">
              <div className="row">
                <div className="col">
                  <div className="card mb-3 border-primary">
                    <div className="card-header">
                      <div className="d-flex justify-content-between">
                        <h5>Cola Pacientes {nombreDepartamento}</h5>
                        <button
                          type="button"
                          className="btn btn-sm text-primary"
                          onClick={fetchColaPacientes}
                        >
                          <FontAwesomeIcon icon={faArrowsRotate} className="fs-5" />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Nombre</th>
                              <th>Acción</th>
                            </tr>
                          </thead>
                          <tbody>
                            {colaPacientes.map((paciente, index) => (
                              <tr key={paciente.id}>
                                <td>{index + 1}</td>
                                <td>
                                  {paciente.nombres} {paciente.apellidos}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => onSubmit(paciente.id)}
                                  >
                                    Realizar servicio
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <>
          <ModalRayosX
            show={showModalRayosX}
            handleClose={handleCloseModal}
            departamentoNombre={nombreDepartamento}
            usuario={usuario}
          />
          <ModalLaboratorios
            show={showModalLaboratorios}
            handleClose={handleCloseModal}
            departamentoNombre={nombreDepartamento}
            usuario={usuario}
          />
          <ModalAmbulancia
            show={showModalAmbulancia}
            handleClose={handleCloseModal}
            handleShowToast={handleShowToast}
          />
        </>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToastAmbu"
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
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
    </>
  )
}
