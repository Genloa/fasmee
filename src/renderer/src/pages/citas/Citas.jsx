import Dash from '../../components/layouts/Dash'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

function Citas() {
  const [departamentos, setDepartamentos] = useState([])
  const [citasPacientes, setCitasPaciente] = useState([])

  useEffect(() => {
    fetchCitasPacientes()
    fetchDepartamentos()
  }, [])

  const fetchCitasPacientes = async () => {
    try {
      const fetchedCitasPacientes = await window.api.getCitasPacientes()
      setCitasPaciente(fetchedCitasPacientes)
      console.log('Citas pacientes:', fetchedCitasPacientes)
    } catch (error) {
      console.error('Error fetching citas pacientes:', error)
    }
  }

  const fetchDepartamentos = async () => {
    const fetchedDepartamentos = await window.api.getDepartamentos()
    setDepartamentos(fetchedDepartamentos)
    console.log('Departamentos:', fetchedDepartamentos)
  }

  const [currentPage, setCurrentPage] = useState(0)
  const usersPerPage = 10
  const pagesVisited = currentPage * usersPerPage

  const [searchDate, setSearchDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0] // Formato YYYY-MM-DD
  })

  const [searchDepartamentoName, setSearchDepartamentoName] = useState('')

  const handleDateChange = (event) => {
    setSearchDate(event.target.value)
    setCurrentPage(0) // Reinicia la página actual al cambiar el término de búsqueda
  }

  const handleDepartamentoNameChange = (event) => {
    setSearchDepartamentoName(event.target.value)
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

  const filteredCitasPacientes = citasPacientes.flatMap((paciente) =>
    paciente.citasSolicitadas
      .filter((cita) => {
        const citaPacienteDate = new Date(cita.fecha_cita).toISOString().split('T')[0]
        const departamentoId = getDepartamentoIdByName(searchDepartamentoName)
        return (
          citaPacienteDate === searchDate &&
          (!departamentoId || cita.departamentoId === departamentoId)
        )
      })
      .map((cita) => ({
        ...cita,
        nombres: paciente.nombres,
        apellidos: paciente.apellidos,
        cedula: paciente.cedula,
        telefono: paciente.telefono,
        correo: paciente.correo,
        departamentoName: getDepartamentoNameById(cita.departamentoId) // Obteniendo el nombre del departamento basado en cita.departamentoId
      }))
  )

  const displayUsers = filteredCitasPacientes
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((citaPaciente) => (
      <div className="col" key={citaPaciente.id}>
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
              {citaPaciente.nombres} {citaPaciente.apellidos}
            </h5>
            <p className="card-text">Cédula: {citaPaciente.cedula}</p>
            <p className="card-text">Teléfono: {citaPaciente.telefono}</p>
            <p className="card-text">Correo: {citaPaciente.correo}</p>
            <p className="card-text">
              Fecha de la cita: {new Date(citaPaciente.fecha_cita).toLocaleString()}
            </p>
            <p className="card-text">Departamento: {citaPaciente.departamentoName}</p>
            <div>
              <div
                className="btn-group btn-group-sm mt-2"
                role="group"
                aria-label="Button group name"
              >
                <button
                  type="button"
                  className="btn btn-danger"
                  // onClick={() => openModalDeleteCita(citaPaciente.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))

  const pageCount = Math.ceil(filteredCitasPacientes.length / usersPerPage)

  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <>
      <Dash>
        <div className="container">
          <div className="form-floating mb-3 mt-3">
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

          <div className="form-floating mb-3 mt-3">
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
      </Dash>
    </>
  )
}
export default Citas
