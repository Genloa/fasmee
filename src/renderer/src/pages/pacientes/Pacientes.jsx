import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, Toast, Modal } from 'bootstrap'
import { createContext, useEffect, useState } from 'react'
import Dash from '../../components/layouts/Dash'
import FormPacienteTrabajador from '../../forms/TrabajadorForm'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'
import FormPacienteBeneficiario from '../../forms/BeneficiarioForm'

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
  const usersPerPage = 3
  const pagesVisited = currentPage * usersPerPage

  //pacientes
  const [pacientes, setPacientes] = useState([])
  const [pacienteSelected, setPacienteSelected] = useState(null)
  const [toastMessagePa, setToastMessagePa] = useState('')
  //modales
  const [showModal, setShowModal] = useState(false)
  const [showModalTrabajador, setShowModalTrabajador] = useState(false)
  const [ShowBeneficiarioEdit, setShowBeneficiarioEdit] = useState(false)
  const modalDeletePacienteRef = document.getElementById('modal-delete-paciente')
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModalTrabajador = () => setShowModalTrabajador(true)
  const handleCloseModalTrabajador = () => setShowModalTrabajador(false)
  const handleShowBeneficiarioEdit = (paciente) => {
    setPacienteSelected(paciente)
    setShowBeneficiarioEdit(true)
  }

  const handleCloseBeneficiarioEdit = () => {
    setShowBeneficiarioEdit(false)
    setPacienteSelected(null)
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
      console.log(fetchedPacientes)
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
      /*
      //queda pendiente
      if (beneficiariosEliminados) {
        console.log(beneficiariosEliminados)
        setToastMessagePa('Paciente Trabajador y Beneficiarios eliminado correctamente')
      } else {
        setToastMessagePa('Paciente eliminado correctamente')
      }*/

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
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(0) // Reinicia la página actual al cambiar el término de búsqueda
  }

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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleShowBeneficiarioEdit(paciente)}
                >
                  <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                </button>
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
                    <a className="dropdown-item" href="#" onClick={handleShowModalTrabajador}>
                      Trabajador
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleShowModal}>
                      Beneficiario
                    </a>
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

function ModalCrearBeneficiario({ show, handleClose, fetchPacientes }) {
  const [pacientes, setPacientes] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const [trabajadores, setTrabajadores] = useState([])

  // HOOK

  useEffect(() => {
    fetchTrabajadores()
  }, [])

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToastCrear')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  const trabajadorOptions = trabajadores.map((trabajador) => ({
    value: trabajador.id,
    label: trabajador.cedula
  }))

  // FETCH
  const fetchTrabajadores = async () => {
    const fetchedTrabajadores = await window.api.getTrabajadores()
    setTrabajadores(fetchedTrabajadores)
  }

  // FORM VALIDATION
  const defaultValues = {
    nombres: '',
    apellidos: '',
    tipoCedula: 'V',
    cedula: '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
    trabajadorId: '',
    patologias: '',
    alergias: '',
    cirugias: '',
    medicamentos: '',
    peso: 0.0,
    altura: 0.0
  }

  const onSubmitBeneficiario = async (data) => {
    console.log(pacientes)
    let pacienteBeneficiario = await window.api.createPacienteBeneficiario(data)
    fetchPacientes()
    if (pacienteBeneficiario) {
      setPacientes([...pacientes, pacienteBeneficiario])
      setToastMessage('Beneficiario creado correctamente')
    } else {
      setToastMessage('No se pudo crear el usuario')
    }
    setShowToast(true)
    handleClose(true)
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-create-trabajador"
        tabIndex="-1"
        aria-labelledby="modal-create-paciente-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-paciente-label">
                Crear Paciente Beneficiario
              </h1>
              <button
                type="submit"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <FormPacienteBeneficiario
                onSubmit={onSubmitBeneficiario}
                defaultValues={defaultValues}
                trabajadorOptions={trabajadorOptions}
                mode="create"
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastCrear"
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
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </>
  )
}

ModalCrearBeneficiario.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchPacientes: PropTypes.func.isRequired
}

function ModalEditBeneficiario({ show, handleClose, fetchPacientes, pacienteSelected }) {
  const [pacientes, setPacientes] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const [trabajadores, setTrabajadores] = useState([])

  // HOOK

  useEffect(() => {
    fetchTrabajadores()
  }, [])

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToastCrear')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  const trabajadorOptions = trabajadores.map((trabajador) => ({
    value: trabajador.id,
    label: trabajador.cedula
  }))

  // FETCH
  const fetchTrabajadores = async () => {
    const fetchedTrabajadores = await window.api.getTrabajadores()
    setTrabajadores(fetchedTrabajadores)
  }

  // FORM VALIDATION colocar algo que me traiga el trabajador id puede ser con el trabajador.beneficiarios.id
  const defaultValues = {
    nombres: pacienteSelected?.nombres,
    apellidos: pacienteSelected?.apellidos,
    tipoCedula: pacienteSelected?.tipoCedula,
    cedula: pacienteSelected?.cedula,
    fechaNacimiento: pacienteSelected?.fechaNacimiento,
    telefono: pacienteSelected?.telefono,
    correo: pacienteSelected?.correo,
    trabajadorId: 1,
    patologias: pacienteSelected?.patologias,
    alergias: pacienteSelected?.alergias,
    cirugias: pacienteSelected?.cirugias,
    medicamentos: pacienteSelected?.medicamentos,
    peso: pacienteSelected?.peso,
    altura: pacienteSelected?.altura
  }

  const findBeneficiarioInObjects = (dataArray, beneficiarioId) => {
    for (const obj of dataArray) {
      const beneficiario = obj.beneficiarios.find((b) => b.id === beneficiarioId)
      if (beneficiario) {
        return obj.id
      }
    }
    return null // Devuelve null si no se encuentra el beneficiario en ningún objeto
  }

  // Uso de la función
  const objetoId = findBeneficiarioInObjects(pacientes, pacienteSelected.id)
  console.log(objetoId)
  const onSubmitBeneficiario = async (data) => {
    console.log(pacientes)
    let pacienteBeneficiario = await window.api.createPacienteBeneficiario(data)
    fetchPacientes()
    if (pacienteBeneficiario) {
      setPacientes([...pacientes, pacienteBeneficiario])
      setToastMessage('Beneficiario creado correctamente')
    } else {
      setToastMessage('No se pudo crear el usuario')
    }
    setShowToast(true)
    handleClose(true)
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-create-trabajador"
        tabIndex="-1"
        aria-labelledby="modal-create-paciente-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-paciente-label">
                Crear Paciente Beneficiario
              </h1>
              <button
                type="submit"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <FormPacienteBeneficiario
                onSubmit={onSubmitBeneficiario}
                defaultValues={defaultValues}
                trabajadorOptions={trabajadorOptions}
                mode="edit"
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastCrear"
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
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </>
  )
}

ModalEditBeneficiario.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchPacientes: PropTypes.func.isRequired,
  pacienteSelected: PropTypes.shape({
    id: PropTypes.number,
    nombres: PropTypes.string,
    apellidos: PropTypes.string,
    tipoCedula: PropTypes.string,
    cedula: PropTypes.string,
    fechaNacimiento: PropTypes.string,
    telefono: PropTypes.string,
    correo: PropTypes.string,
    //trabajadorId: PropTypes.number,
    patologias: PropTypes.string,
    alergias: PropTypes.string,
    cirugias: PropTypes.string,
    medicamentos: PropTypes.string,
    peso: PropTypes.number,
    altura: PropTypes.number
  }).isRequired
}

function ModalCrearTrabajador({ show, handleClose, fetchPacientes }) {
  const [pacientes, setPacientes] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  const [showToastTrabajador, setShowToastTrabajador] = useState(false)
  const [entes, setEntes] = useState([])

  // HOOK

  useEffect(() => {
    fetchEntes()
  }, [])

  useEffect(() => {
    if (showToastTrabajador) {
      const toastdor = document.getElementById('liveToastCrearTrabajdor')
      const toast = new Toast(toastdor)
      toast.show()
    }
  }, [showToastTrabajador])

  const enteOptions = entes.map((ente) => ({
    value: ente.id,
    label: ente.nombre
  }))

  // FETCH
  const fetchEntes = async () => {
    const fetchedEntes = await window.api.getEntes()
    setEntes(fetchedEntes)
  }

  // FORM VALIDATION
  const defaultValues = {
    nombres: '',
    apellidos: '',
    tipoCedula: 'V',
    cedula: '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
    ente: '',
    patologias: '',
    alergias: '',
    cirugias: '',
    medicamentos: '',
    peso: 0.0,
    altura: 0.0
  }

  const onSubmitTrabajador = async (data) => {
    let pacienteTrabajador = await window.api.createPacienteTrabajador(data)
    fetchPacientes()
    if (pacienteTrabajador) {
      setPacientes([...pacientes, pacienteTrabajador])
      setToastMessage('Trabajador creado correctamente')
      console.log(pacientes)
    } else {
      setToastMessage('No se pudo crear el usuario')
    }
    setShowToastTrabajador(true)
    handleClose(true)
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-create-trabajador"
        tabIndex="-1"
        aria-labelledby="modal-create-trabajador-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-trabajador-label">
                Crear Paciente Trabajador
              </h1>
              <button
                type="submit"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <FormPacienteTrabajador
                onSubmit={onSubmitTrabajador}
                defaultValues={defaultValues}
                enteOptions={enteOptions}
                mode="create"
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastCrearTrabajdor"
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
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </>
  )
}

ModalCrearTrabajador.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchPacientes: PropTypes.func.isRequired
}

/*function ModalEditarPaciente() {
  return <></>
}*/

export default Pacientes
