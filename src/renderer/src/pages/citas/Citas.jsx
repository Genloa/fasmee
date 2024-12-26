import { faTrashCan, faUserPen, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Dash from '../../components/layouts/Dash'

function Citas() {
  const [departamentos, setDepartamentos] = useState([])
  const [citasPacientes, setCitasPaciente] = useState([])
  const [medicos, setMedicos] = useState([])

  useEffect(() => {
    fetchCitasPacientes()
    fetchDepartamentos()
    fetchMedicos()
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
    // Filtrar departamentos
    const excludedIds = [12, 13, 14]
    const departamentosFil = fetchedDepartamentos.filter((d) => !excludedIds.includes(d.id))

    setDepartamentos(departamentosFil)
    console.log('Departamentos:', departamentosFil)
  }

  const fetchMedicos = async () => {
    try {
      const fetchedMedicos = await window.api.getMedicos()
      setMedicos(fetchedMedicos)
      console.log('Medicos:', fetchedMedicos)
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
    const medico = medicos.find((m) => m.nombres === name)
    return medico ? medico.id : ''
  }

  const getMedicoNameById = (id) => {
    const medico = medicos.find((m) => m.id === id)
    return medico ? medico.nombres : ''
  }

  const filteredCitasPacientes = citasPacientes.flatMap((paciente) =>
    paciente.citasSolicitadas
      .filter((cita) => {
        const citaPacienteDate = new Date(cita.fecha_cita).toISOString().split('T')[0]
        const departamentoId = getDepartamentoIdByName(searchDepartamentoName)
        const medicoId = getMedicoIdByName(searchMedicoName)
        return (
          (!searchDate || citaPacienteDate === searchDate) &&
          (!searchDepartamentoName || cita.departamentoId === departamentoId) &&
          (!searchMedicoName || cita.medicoId === medicoId)
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
        medicoName: getMedicoNameById(cita.medicoId) // Obteniendo el nombre del doctor basado en cita.medicoId
      }))
  )

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
          <button
            type="button"
            className="btn btn-sm btn-primary me-2"
            //onClick={() => openModalRolUser(user.id)}
          >
            <FontAwesomeIcon icon={faUsersGear} className="fs-5" />
          </button>
          <div className="btn-group btn-group-sm" role="group" aria-label="Button group name">
            <button
              type="button"
              className="btn btn-primary"
              // onClick={() => openModalEditUser(user.id)}
            >
              <FontAwesomeIcon icon={faUserPen} className="fs-5" />
            </button>
            <button
              type="button"
              className="btn btn-danger"
              // onClick={() => openModalDeleteUser(user.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
            </button>
          </div>
        </td>
      </tr>
    ))

  const pageCount = Math.ceil(filteredCitasPacientes.length / usersPerPage)

  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <>
      <Dash>
        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title">Citas</h5>
            <div className="text-end">
              <button
                type="button"
                className="btn btn-primary"
                //onClick={() => openModalCrearUser()}
              >
                Nueva Cita
              </button>
            </div>
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
                  <option value=""></option>
                  {medicos.map((medico) => (
                    <option key={medico.id} value={medico.nombres}>
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
      </Dash>
    </>
  )
}
export default Citas
