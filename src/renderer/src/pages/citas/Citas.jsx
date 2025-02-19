import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Toast } from 'bootstrap'
import { createContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import momentDate from '../../../../main/utils/momentDate'
import Dash from '../../components/layouts/Dash'
import Can from '../../helpers/can'
import ModalCrearCita from './components/ModalCrearCita'
import ModalEditCita from './components/ModalEditCita'

const CitasPacientesContext = createContext({ citasPacientes: [], setCitasPacientes: () => {} })

export default function Citas() {
  const [departamentos, setDepartamentos] = useState([])
  const [citasPacientes, setCitasPaciente] = useState([])
  const [medicos, setMedicos] = useState([])

  //modal crear
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  // Modal Eliminar Cita
  const modalDeleteCitaRef = document.getElementById('modal-delete-cita')
  const [citaSelected, setCitaSelected] = useState(null)

  const openModalDeleteCita = (id) => {
    let cita = citasPacientes
      .flatMap((paciente) => paciente.citasSolicitadas.map((c) => ({ ...c, paciente })))
      .find((cita) => cita.id === id)
    setCitaSelected(cita)
    let modal = new Modal(modalDeleteCitaRef)
    modal.show()
  }

  const closeModalDeleteCita = async () => {
    try {
      // Eliminar la cita
      await window.api.deleteCita(citaSelected.id)
      setCitasPaciente((prevCitas) =>
        prevCitas.map((paciente) => ({
          ...paciente,
          citasSolicitadas: paciente.citasSolicitadas.filter((cita) => cita.id !== citaSelected.id)
        }))
      )
      setToastMessage('Cita eliminada correctamente')
      setShowToast(true)

      // Cerrar el modal
      const modal = Modal.getInstance(modalDeleteCitaRef)
      modal.hide()
    } catch (error) {
      console.error('Error al eliminar la cita:', error)
      // Aquí podrías mostrar un toast de error si lo deseas
    }
  }

  useEffect(() => {
    fetchCitasPacientes()
    fetchDepartamentos()
    fetchMedicos()
  }, [])

  const fetchCitasPacientes = async () => {
    try {
      const fetchedCitasPacientes = await window.api.getCitasPacientes()
      setCitasPaciente(fetchedCitasPacientes)
    } catch (error) {
      console.error('Error fetching citas pacientes:', error)
    }
  }

  const fetchDepartamentos = async () => {
    const fetchedDepartamentos = await window.api.getDepartamentos()
    // Filtrar departamentos
    const excludedIds = [12, 13, 14]
    const departamentosFil = fetchedDepartamentos.filter((d) => !excludedIds.includes(d.id))

    setDepartamentos(departamentosFil)
  }

  const fetchMedicos = async () => {
    try {
      const fetchedMedicos = await window.api.getMedicos()
      setMedicos(fetchedMedicos)
    } catch (error) {
      console.error('Error fetching Medicos:', error)
    }
  }

  const [currentPage, setCurrentPage] = useState(0)
  const usersPerPage = 10
  const pagesVisited = currentPage * usersPerPage

  const [searchDate, setSearchDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0] // Formato YYYY-MM-DD
  })

  const [searchDepartamentoName, setSearchDepartamentoName] = useState('')
  const [searchMedicoName, setSearchMedicoName] = useState('')

  const handleDateChange = (event) => {
    setSearchDate(event.target.value)
    setCurrentPage(0) // Reinicia la página actual al cambiar el término de búsqueda
  }

  const handleDepartamentoNameChange = (event) => {
    setSearchDepartamentoName(event.target.value)
    setSearchMedicoName('') // Reinicia la selección de médicos al cambiar el departamento
    setCurrentPage(0) // Reinicia la página actual al cambiar el término de búsqueda
  }

  const handleMedicoNameChange = (event) => {
    setSearchMedicoName(event.target.value)
    setCurrentPage(0) // Reinicia la página actual al cambiar el término de búsqueda
  }

  const getDepartamentoIdByName = (name) => {
    const departamento = departamentos.find((d) => d.nombre === name)
    return departamento ? departamento.id : ''
  }

  const getDepartamentoNameById = (id) => {
    const departamento = departamentos.find((d) => d.id === id)
    return departamento ? departamento.nombre : ''
  }

  const getMedicoIdByName = (name) => {
    const medico = medicos.find((m) => `${m.nombres} ${m.apellidos}` === name)
    return medico ? medico.id : ''
  }

  const getMedicoNameById = (id) => {
    const medico = medicos.find((m) => m.id === id)
    return medico ? `${medico.nombres} ${medico.apellidos}` : ''
  }

  const filteredMedicos = medicos.filter((medico) => {
    const departamentoId = getDepartamentoIdByName(searchDepartamentoName)
    return !departamentoId || medico.departamentoId === departamentoId
  })

  const filteredCitasPacientes = citasPacientes.flatMap((paciente) =>
    paciente.citasSolicitadas
      .filter((cita) => {
        // const citaPacienteDate = new Date(cita.fecha_cita).toISOString().split('T')[0]
        const citaPacienteDate = momentDate(cita.fecha_cita, 'YYYY-MM-DD')
        const departamentoId = getDepartamentoIdByName(searchDepartamentoName)
        const medicoId = getMedicoIdByName(searchMedicoName)
        return (
          (!searchDate || citaPacienteDate === searchDate) &&
          (!searchDepartamentoName || cita.departamentoId === departamentoId) &&
          (!searchMedicoName || cita.perfilId === medicoId)
        )
      })
      .map((cita) => ({
        ...cita,
        nombres: paciente.nombres,
        apellidos: paciente.apellidos,
        cedula: paciente.cedula,
        telefono: paciente.telefono,
        correo: paciente.correo,
        departamentoName: getDepartamentoNameById(cita.departamentoId),
        medicoName: getMedicoNameById(cita.perfilId) // Obteniendo el nombre del doctor basado en cita.medicoId
      }))
  )

  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCita, setSelectedCita] = useState(null)

  const handleShowEditModal = (cita) => {
    setSelectedCita(cita)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedCita(null)
  }

  const displayUsers = filteredCitasPacientes
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((citaPaciente) => (
      <tr key={citaPaciente.id}>
        <td>
          {citaPaciente.nombres} {citaPaciente.apellidos}
        </td>
        <td>{citaPaciente.cedula}</td>
        <td>{new Date(citaPaciente.fecha_cita).toLocaleString()}</td>
        <td>{citaPaciente.departamentoName}</td>
        <td>{citaPaciente.medicoName}</td>

        <td className="text-end">
          <div className="btn-group btn-group-sm" role="group" aria-label="Button group name">
            <Can permission="citas.edit">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleShowEditModal(citaPaciente)}
              >
                <FontAwesomeIcon icon={faUserPen} className="fs-5" />
              </button>
            </Can>
            <Can permission="citas.delete">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => openModalDeleteCita(citaPaciente.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
              </button>
            </Can>
          </div>
        </td>
      </tr>
    ))

  const pageCount = Math.ceil(filteredCitasPacientes.length / usersPerPage)

  const changePage = ({ selected }) => {
    setCurrentPage(selected)
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
      <CitasPacientesContext.Provider value={{ citasPacientes, setCitasPaciente }}>
        {departamentos && medicos && (
          <>
            <ModalCrearCita
              show={showModal}
              handleClose={handleCloseModal}
              fetchCitasPacientes={fetchCitasPacientes}
              departamentos={departamentos}
              medicos={medicos}
              handleShowToast={handleShowToast} // Asegúrate de pasar esta prop
            />
            {selectedCita && (
              <ModalEditCita
                show={showEditModal}
                handleClose={handleCloseEditModal}
                fetchCitasPacientes={fetchCitasPacientes}
                departamentos={departamentos}
                medicos={medicos}
                citaSelected={selectedCita}
                handleShowToast={handleShowToast} // Asegúrate de pasar esta prop
              />
            )}
          </>
        )}

        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title fs-3">Citas</h5>
            <Can permission="citas.create">
              <div className="text-end">
                <button type="button" className="btn btn-primary" onClick={handleShowModal}>
                  Nueva Cita
                </button>
              </div>
            </Can>
            <div className="d-flex flex-wrap justify-content-around mb-4">
              <div className="col form-floating mb-3 mt-3 me-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Buscar"
                  aria-label="Buscar"
                  value={searchDate}
                  onChange={handleDateChange}
                />
                <label htmlFor="floatingInput">Fecha Citas</label>
              </div>

              <div className="col form-floating mb-3 mt-3 me-3">
                <select
                  className="form-control"
                  id="floatingDepartamentoName"
                  aria-label="Buscar por Nombre de Departamento"
                  value={searchDepartamentoName}
                  onChange={handleDepartamentoNameChange}
                >
                  <option value="">Seleccione un Departamento</option>
                  {departamentos.map((departamento) => (
                    <option key={departamento.id} value={departamento.nombre}>
                      {departamento.nombre}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingDepartamentoName">Nombre del Departamento</label>
              </div>

              <div className="col form-floating mb-3 mt-3">
                <select
                  className="form-control"
                  id="floatingMedicoName"
                  aria-label="Buscar por Nombre de Doctor"
                  value={searchMedicoName}
                  onChange={handleMedicoNameChange}
                >
                  <option value="">Seleccione un Doctor</option>
                  {filteredMedicos.map((medico) => (
                    <option key={medico.id} value={`${medico.nombres} ${medico.apellidos}`}>
                      {medico.nombres} {medico.apellidos}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingMedicoName">Nombre del Doctor</label>
              </div>
            </div>
            <div className="mt-5">
              <div className="container">
                <table className="table table-sm table-hover align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Paciente</th>
                      <th scope="col">Cedula</th>
                      <th scope="col">Fecha de Cita</th>
                      <th scope="col">Departamento</th>
                      <th scope="col">Medico</th>
                    </tr>
                  </thead>
                  <tbody>{displayUsers}</tbody>
                </table>

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
        </div>
        <div
          className="modal fade"
          id="modal-delete-cita"
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
                  Eliminar Cita
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {citaSelected && (
                  <>
                    <p>
                      Paciente: {citaSelected.paciente.nombres} {citaSelected.paciente.apellidos}
                    </p>
                    <p>Fecha de Cita: {new Date(citaSelected.fecha_cita).toLocaleString()}</p>
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
                  onClick={() => closeModalDeleteCita()}
                  id="liveToastBtn"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
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
      </CitasPacientesContext.Provider>
    </Dash>
  )
}

export { CitasPacientesContext }
