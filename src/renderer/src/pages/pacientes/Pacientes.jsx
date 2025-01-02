import { Modal, Toast } from 'bootstrap'
import { createContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Dash from '../../components/layouts/Dash'
import CardPaciente from './components/CardPaciente'
import ModalCreatePaciente from './components/ModalCreatePaciente'
import ModalDeletePaciente from './components/ModalDeletePaciente'
import ModalEditPaciente from './components/ModalEditPaciente'
import ModalTakePhoto from './components/ModalTakePhoto'

const PacientesContext = createContext({ pacientes: [], setPacientes: () => {} })

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([])
  const [pacienteSelected, setPacienteSelected] = useState(null)
  const [tipoPaciente, setTipoPaciente] = useState('T')

  // Search
  const [searchTerm, setSearchTerm] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(0)

  // Toast
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      setPacientes(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  useEffect(() => {
    fetchPacientes()
  }, [])

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToast')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  // Modals

  const openModalCreatePaciente = (tipoPaciente) => {
    setShowToast(false)
    setPacienteSelected(null)
    setTipoPaciente(tipoPaciente)
    new Modal(document.getElementById('modal-create-paciente')).show()
  }
  const closeModalCreatePaciente = (message) => {
    fetchPacientes()
    Modal.getInstance(document.getElementById('modal-create-paciente')).hide()
    if (message) {
      setToastMessage(message)
      setShowToast(true)
    }
  }

  const openModalEditPaciente = (paciente) => {
    setShowToast(false)
    setPacienteSelected(paciente)
    new Modal(document.getElementById('modal-edit-paciente')).show()
  }
  const closeModalEditPaciente = (message) => {
    fetchPacientes()
    Modal.getInstance(document.getElementById('modal-edit-paciente')).hide()
    if (message) {
      setToastMessage(message)
      setShowToast(true)
    }
  }

  const openModalDeletePaciente = (paciente) => {
    setShowToast(false)
    setPacienteSelected(paciente)
    new Modal(document.getElementById('modal-delete-paciente')).show()
  }
  const closeModalDeletePaciente = (message) => {
    fetchPacientes()
    Modal.getInstance(document.getElementById('modal-delete-paciente')).hide()
    if (message) {
      setToastMessage(message)
      setShowToast(true)
    }
  }

  const openModalTakePhoto = (paciente) => {
    setShowToast(false)
    setPacienteSelected(paciente)
    new Modal(document.getElementById('modal-take-photo')).show()
  }
  const closeModalTakePhoto = (message) => {
    fetchPacientes()
    Modal.getInstance(document.getElementById('modal-take-photo')).hide()
    if (message) {
      setToastMessage(message)
      setShowToast(true)
    }
  }

  // Search

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(0)
  }
  const filteredPacientes = pacientes.filter((paciente) =>
    `${paciente.nombres} ${paciente.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination

  const usersPerPage = 3
  const pagesVisited = currentPage * usersPerPage
  const displayUsers = filteredPacientes
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((paciente) => (
      <div className="col" key={paciente.id}>
        <CardPaciente
          paciente={paciente}
          handleOpenModalTakePhoto={openModalTakePhoto}
          handleOpenModalEditPaciente={openModalEditPaciente}
          handleOpenModalDeletePaciente={openModalDeletePaciente}
        />
      </div>
    ))

  const pageCount = Math.ceil(filteredPacientes.length / usersPerPage)

  const handleChangePage = ({ selected }) => setCurrentPage(selected)

  return (
    <Dash>
      <PacientesContext.Provider value={{ pacientes, setPacientes }}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title fs-3">Pacientes</h5>
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Nuevo Paciente
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item btn"
                onClick={() => openModalCreatePaciente('T')}
                type="button"
              >
                Trabajador
              </button>
            </li>
            <li>
              <button
                className="dropdown-item btn"
                onClick={() => openModalCreatePaciente('B')}
                type="button"
              >
                Beneficiario
              </button>
            </li>
          </ul>
        </div>

        {/* Modals */}
        <ModalCreatePaciente
          handleTipoPaciente={tipoPaciente}
          handleCloseModalCreatePaciente={closeModalCreatePaciente}
        />
        <ModalEditPaciente
          paciente={pacienteSelected}
          handleCloseModalEditPaciente={closeModalEditPaciente}
        />
        <ModalDeletePaciente
          paciente={pacienteSelected}
          handleCloseModalDeletePaciente={closeModalDeletePaciente}
        />
        <ModalTakePhoto
          paciente={pacienteSelected}
          handleCloseModalTakePhoto={closeModalTakePhoto}
        />

        <div className="container">
          <div className="form-floating mb-3 mt-3">
            <input
              type="search"
              className="form-control"
              placeholder="Buscar"
              aria-label="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <label htmlFor="floatingInput">Buscar Paciente</label>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">{displayUsers}</div>
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
      </PacientesContext.Provider>

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

export { PacientesContext }
