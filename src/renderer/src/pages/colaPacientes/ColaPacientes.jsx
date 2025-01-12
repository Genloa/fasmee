import Dash from '../../components/layouts/Dash'
import { useState, useEffect, createContext } from 'react'
import { Toast, Modal } from 'bootstrap'
import ModalCrearCola from './components/ModalCrearCola'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const ColaPacientesContext = createContext({ ColaPacientes: [], setColaPacientes: () => {} })

export default function ColaPacientes() {
  const [ColaPacientes, setColaPacientes] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [medicos, setMedicos] = useState([])
  const [searchDepartamentoName, setSearchDepartamentoName] = useState('')

  //modal crear
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleShowToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
  }
  useEffect(() => {
    fetchColaPacientes()
    fetchDepartamentos()
    fetchMedicos()
  }, [])

  const fetchColaPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getColaPacientes()
      console.log('colaPacientes:', fetchedPacientes)

      setColaPacientes(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  const fetchDepartamentos = async () => {
    try {
      const fetchedDepartamentos = await window.api.getDepartamentos()
      setDepartamentos(fetchedDepartamentos)
    } catch (error) {
      console.error('Error fetching departamentos:', error)
    }
  }

  const fetchMedicos = async () => {
    try {
      const fetchedMedicos = await window.api.getMedicos()
      setMedicos(fetchedMedicos)
    } catch (error) {
      console.error('Error fetching medicos:', error)
    }
  }

  const handleDepartamentoNameChange = (event) => {
    setSearchDepartamentoName(event.target.value)
  }

  const filteredDepartamentos = departamentos.filter((departamento) =>
    departamento.nombre.toLowerCase().includes(searchDepartamentoName.toLowerCase())
  )

  const groupedPacientes = filteredDepartamentos
    .map((departamento) => {
      const pacientesPorDepartamento = ColaPacientes.filter((paciente) =>
        paciente.colasMedicos.some((colaMedico) => colaMedico.departamentoId === departamento.id)
      )

      const medicosPorDepartamento = medicos.filter(
        (medico) => medico.departamentoId === departamento.id
      )

      const medicosConPacientes = medicosPorDepartamento
        .map((medico) => ({
          medico,
          pacientes: pacientesPorDepartamento.filter((paciente) =>
            paciente.colasMedicos.some((colaMedico) => colaMedico.perfilId === medico.id)
          )
        }))
        .filter(({ pacientes }) => pacientes.length > 0)

      const pacientesSinMedico = pacientesPorDepartamento.filter((paciente) =>
        paciente.colasMedicos.some(
          (colaMedico) =>
            colaMedico.departamentoId === departamento.id && colaMedico.perfilId === null
        )
      )

      return {
        departamento,
        medicos: [1, 9, 10].includes(departamento.id)
          ? [{ medico: null, pacientes: pacientesSinMedico }]
          : medicosConPacientes
      }
    })
    .filter(({ medicos }) => medicos.length > 0)

  // Pagination
  const [currentPage, setCurrentPage] = useState(0)
  const usersPerPage = 6
  const pagesVisited = currentPage * usersPerPage

  const handleChangePage = ({ selected }) => setCurrentPage(selected)

  const modalDeletePacienteRef = document.getElementById('modal-delete-paciente')
  const [pacienteSelected, setPacienteSelected] = useState(null)

  const openModalDeletePaciente = (id) => {
    let paciente = ColaPacientes.find((p) => p.id === id)
    setPacienteSelected(paciente)
    console.log('Paciente seleccionado:', paciente)
    let modal = new Modal(modalDeletePacienteRef)
    modal.show()
  }

  const closeModalDeletePaciente = async () => {
    console.log(pacienteSelected.id)
    try {
      // Eliminar el paciente de la cola
      const paciente = await window.api.deleteColaPaciente(pacienteSelected.id)
      if (paciente) {
        fetchColaPacientes()
        setToastMessage('Paciente eliminado correctamente')
        setShowToast(true)

        // Cerrar el modal
        const modal = Modal.getInstance(modalDeletePacienteRef)
        modal.hide()
      } else {
        setToastMessage('no se pudo eliminar el Paciente')
      }
    } catch (error) {
      console.error('Error al eliminar el paciente:', error)
      // Aquí podrías mostrar un toast de error si lo deseas
    }
  }

  const displayPacientes = groupedPacientes
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(({ departamento, medicos }) => (
      <div className="col" key={departamento.id}>
        <div key={departamento.id} className="card mb-3 border-primary">
          <div className="card-header">
            <h5>{departamento.nombre}</h5>
          </div>
          <div className="card-body">
            {medicos.map(({ medico, pacientes }) => (
              <div key={medico ? medico.id : 'no-medico'} className="mb-3">
                <h6 className="text-primary">
                  {medico
                    ? `${medico.nombres} ${medico.apellidos}`
                    : departamento.id === 1
                      ? 'En la espera de Medico'
                      : 'En espera'}
                </h6>
                <ul className="list-group">
                  {pacientes
                    .sort(
                      (a, b) =>
                        new Date(a.colasMedicos[0].createdAt) -
                        new Date(b.colasMedicos[0].createdAt)
                    )
                    .map((paciente, index) => (
                      <li
                        key={paciente.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {index + 1}. {paciente.nombres} {paciente.apellidos}
                        <button
                          type="button"
                          className="btn btn--light btn-sm"
                          onClick={() => openModalDeletePaciente(paciente.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))

  const pageCount = Math.ceil(groupedPacientes.length / usersPerPage)

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToast')
      toastEl.classList.add('show')
      const toast = new Toast(toastEl)
      toast.show()
      const timeout = setTimeout(() => {
        setShowToast(false)
        toastEl.classList.remove('show')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showToast])

  return (
    <Dash>
      <ColaPacientesContext.Provider value={{ ColaPacientes, setColaPacientes }}>
        {departamentos && medicos && (
          <>
            <ModalCrearCola
              show={showModal}
              handleClose={handleCloseModal}
              fetchColaPacientes={fetchColaPacientes} // Pasa la prop fetchColaPacientes
              departamentos={departamentos}
              medicos={medicos}
              handleShowToast={handleShowToast} // Asegúrate de pasar esta prop
            />
          </>
        )}
        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title fs-3 ">Cola de Atención Pacientes</h5>
            <div className="text-end">
              <button type="button" className="btn btn-primary" onClick={handleShowModal}>
                Asignar Paciente a Cola
              </button>
            </div>
            <div className="container">
              <div className="form-floating mb-3 mt-3">
                <input
                  type="search"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Buscar por Departamento"
                  aria-label="Buscar por Departamento"
                  value={searchDepartamentoName}
                  onChange={handleDepartamentoNameChange}
                />
                <label htmlFor="floatingInput">Buscar por Departamento</label>
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4">{displayPacientes}</div>
            </div>
          </div>
        </div>
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          pageCount={pageCount}
          onPageChange={handleChangePage}
          containerClassName={'pagination'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
        />
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
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
        <div
          className="modal fade"
          id="modal-delete-paciente"
          tabIndex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title" id="modalTitleId">
                  Eliminar Paciente de Cola
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {pacienteSelected && (
                  <>
                    <p>
                      Paciente: {pacienteSelected.nombres} {pacienteSelected.apellidos}
                    </p>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => closeModalDeletePaciente()}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </ColaPacientesContext.Provider>
    </Dash>
  )
}

export { ColaPacientesContext }
