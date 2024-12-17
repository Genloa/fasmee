import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, Modal, Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Dash from '../../components/layouts/Dash'
import ModalCrearBeneficiario from './components/ModalCrearBeneficiario'
import ModalCrearTrabajador from './components/ModalCrearTrabajador'
import ModalEditBeneficiario from './components/ModalEditBeneficiario'
import ModalEditTrabajador from './components/ModalEditTrabajador'

const PacientesContext = createContext({ pacientes: [], setPacientes: () => {} })

function PacientesProvider({ children }) {
  const [pacientes, setPacientes] = useState([])

  return (
    <PacientesContext.Provider value={{ pacientes, setPacientes }}>
      {children}
    </PacientesContext.Provider>
  )
}

PacientesProvider.propTypes = {
  children: PropTypes.node.isRequired
}

function Pacientes() {
  //paginacion
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const pagesVisited = currentPage * usersPerPage

  const usersPerPage = 3

  //pacientes
  const [pacientes, setPacientes] = useState([])
  const [pacienteSelected, setPacienteSelected] = useState(null)
  const [toastMessagePa, setToastMessagePa] = useState('')

  //modales
  const [showModal, setShowModal] = useState(false)
  const [showModalTrabajador, setShowModalTrabajador] = useState(false)
  const [ShowTrabajadorEdit, setShowTrabajadorEdit] = useState(false)
  const [ShowBeneficiarioEdit, setShowBeneficiarioEdit] = useState(false)

  const modalDeletePacienteRef = document.getElementById('modal-delete-paciente')

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModalTrabajador = () => setShowModalTrabajador(true)
  const handleCloseModalTrabajador = () => setShowModalTrabajador(false)

  const handleShowTrabajadorEdit = (paciente) => {
    setPacienteSelected(paciente)
    setShowTrabajadorEdit(true)
  }

  const handleCloseTrabajadorEdit = () => {
    setShowTrabajadorEdit(false)
    setPacienteSelected(null)
  }

  const handleShowBeneficiarioEdit = (paciente) => {
    setPacienteSelected(paciente)
    setShowBeneficiarioEdit(true)
  }

  const handleCloseBeneficiarioEdit = () => {
    setShowBeneficiarioEdit(false)
    setPacienteSelected(null)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(0) // Reinicia la página actual al cambiar el término de búsqueda
  }

  // HOOK

  useEffect(() => {
    fetchPacientes()

    const dropdownMenus = document.querySelectorAll('.dropdown-toggle')
    dropdownMenus.forEach((dropdownMenu) => {
      new Dropdown(dropdownMenu)
    })
  }, [])

  // FETCH

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      setPacientes(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  // delete
  function openModalDeletePaciente(id) {
    let paciente = pacientes.find((paciente) => paciente.id === id)
    setPacienteSelected(paciente)
    let modal = new Modal(modalDeletePacienteRef)
    modal.show()
  }

  async function closeModalDeletePaciente() {
    try {
      // Eliminar el usuario
      const response = await window.api.deletePaciente(pacienteSelected.id)
      const beneficiariosEliminados = Array.isArray(response.beneficiariosEliminados)
        ? response.beneficiariosEliminados
        : []
      console.log(beneficiariosEliminados)

      // Actualizar el estado de usuarios falta
      setPacientes((prevPacientes) =>
        prevPacientes.filter(
          (paciente) =>
            paciente.id !== pacienteSelected.id && !beneficiariosEliminados.includes(paciente.id)
        )
      )
      setToastMessagePa('Paciente eliminado correctamente')

      // Cerrar el modal
      const modal = Modal.getInstance(modalDeletePacienteRef)
      modal.hide()

      // Mostrar el toast
      const toastElement = document.getElementById('liveToastPa')
      const toast = new Toast(toastElement)
      toast.show()
    } catch (error) {
      console.error('Error al eliminar el Paciente:', error)
      // Aquí podrías mostrar un toast de error si lo deseas
    }
  }

  //paginacion

  const filteredPacientes = pacientes.filter((paciente) =>
    `${paciente.nombres} ${paciente.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const displayUsers = filteredPacientes
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((paciente) => (
      <div className="col" key={paciente.id}>
        <div className="card border-white text-center shadow p-3 mb-5 bg-body-tertiary rounded">
          <div className="text-center">
            <img
              src="../../src/assets/img/paciente.jpg"
              width="60%"
              height="60%"
              alt="Logo"
              className="d-inline-block align-text-top rounded-circle mt-3"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {paciente.nombres} {paciente.apellidos}
            </h5>
            {paciente.enteId ? (
              <div className="card-text">Trabajador</div>
            ) : (
              <div className="card-text">Beneficiario</div>
            )}
            <div>
              <div
                className="btn-group btn-group-sm mt-2"
                role="group"
                aria-label="Button group name"
              >
                {paciente.enteId ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleShowTrabajadorEdit(paciente)}
                  >
                    <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleShowBeneficiarioEdit(paciente)}
                  >
                    <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => openModalDeletePaciente(paciente.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))

  const pageCount = Math.ceil(filteredPacientes.length / usersPerPage)

  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <>
      <PacientesProvider>
        <Dash>
          <ModalCrearBeneficiario
            show={showModal}
            handleClose={handleCloseModal}
            fetchPacientes={fetchPacientes}
          />
          <ModalCrearTrabajador
            show={showModalTrabajador}
            handleClose={handleCloseModalTrabajador}
            fetchPacientes={fetchPacientes}
          />
          {pacienteSelected && (
            <ModalEditBeneficiario
              show={ShowBeneficiarioEdit}
              handleClose={handleCloseBeneficiarioEdit}
              fetchPacientes={fetchPacientes}
              pacienteSelected={pacienteSelected}
            />
          )}

          {pacienteSelected && pacienteSelected.enteId && (
            <ModalEditTrabajador
              show={ShowTrabajadorEdit}
              handleClose={handleCloseTrabajadorEdit}
              fetchPacientes={fetchPacientes}
              pacienteSelected={pacienteSelected}
            />
          )}

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
                    Eliminar Paciente
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">{pacienteSelected?.nombres}</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => closeModalDeletePaciente()}
                    id="liveToastBtn"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center ">
                <h5 className="card-title">Pacientes</h5>

                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Nuevo Paciente
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item btn"
                      onClick={handleShowModalTrabajador}
                      type="button"
                    >
                      Trabajador
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item btn" onClick={handleShowModal} type="button">
                      Beneficiario
                    </button>
                  </li>
                </ul>
              </div>
              <div className="container">
                <div className="form-floating mb-3 mt-3">
                  <input
                    type="search"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Buscar"
                    aria-label="Buscar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <label htmlFor="floatingInput">Buscar Paciente</label>
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">{displayUsers}</div>
                <ReactPaginate
                  previousLabel={'Anterior'}
                  nextLabel={'Siguiente'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={'pagination'}
                  previousLinkClassName={'page-link'}
                  nextLinkClassName={'page-link'}
                  disabledClassName={'disabled'}
                  activeClassName={'active'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                />
              </div>
            </div>
          </div>
          {/* Toast */}
          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div
              id="liveToastPa"
              className="toast"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header">
                <strong className="me-auto">Notificacion</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
              <div className="toast-body">{toastMessagePa}</div>
            </div>
          </div>
        </Dash>{' '}
      </PacientesProvider>
    </>
  )
}

export default Pacientes
