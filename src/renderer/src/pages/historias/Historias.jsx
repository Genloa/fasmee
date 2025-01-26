import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Dash from '../../components/layouts/Dash'

import momentDate, { formatDateWithMoment } from '../../../../main/utils/momentDate'
import Can from '../../helpers/can'
import ModalVerHistoria from './components/ModalVerHistoria'

const HistoriasPacientesContext = createContext({
  historiasPacientes: [],
  setHistoriasPacientes: () => {}
})

export default function Historias() {
  const [departamentos, setDepartamentos] = useState([])
  const [historiasPacientes, setHistoriasPacientes] = useState([])
  const [medicos, setMedicos] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [showViewModal, setShowViewModal] = useState(false)

  const [selectedHistoria, setSelectedHistoria] = useState(null)

  const handleShowViewModal = (historia) => {
    setSelectedHistoria(historia)
    setShowViewModal(true)
  }

  const handleCloseViewModal = () => {
    setShowViewModal(false)
    setSelectedHistoria(null)
  }

  useEffect(() => {
    fetchHistoriasPacientes()
    fetchDepartamentos()
    fetchMedicos()
    fetchPacientes()
  }, [])

  const fetchHistoriasPacientes = async () => {
    try {
      const fetchedHistoriasPacientes = await window.api.getHistoriasPacientes()
      setHistoriasPacientes(fetchedHistoriasPacientes)
    } catch (error) {
      console.error('Error fetching historias pacientes:', error)
    }
  }

  const fetchDepartamentos = async () => {
    try {
      const fetchedDepartamentos = await window.api.getDepartamentos()
      // Filtrar departamentos
      const excludedIds = [12, 13, 14]
      const departamentosFil = fetchedDepartamentos.filter((d) => !excludedIds.includes(d.id))

      setDepartamentos(departamentosFil)
    } catch (error) {
      console.error('Error fetching departamentos:', error)
    }
  }

  const fetchMedicos = async () => {
    try {
      const fetchedMedicos = await window.api.getMedicos()
      setMedicos(fetchedMedicos)
    } catch (error) {
      console.error('Error fetching Medicos:', error)
    }
  }

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      setPacientes(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching Pacientes:', error)
    }
  }

  const [currentPage, setCurrentPage] = useState(0)
  const usersPerPage = 10
  const pagesVisited = currentPage * usersPerPage

  const [searchDate, setSearchDate] = useState(() => {
    return momentDate(new Date(), 'YYYY-MM-DD')
  })

  const [searchDepartamentoName, setSearchDepartamentoName] = useState('')
  const [searchMedicoName, setSearchMedicoName] = useState('')
  const [searchPacienteName /*, setSearchPacienteName*/] = useState('')
  const [searchCedula, setSearchCedula] = useState('')

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

  /*  const handlePacienteNameChange = (event) => {
    setSearchPacienteName(event.target.value)
    setCurrentPage(0) // Reinicia la página actual al cambiar el término de búsqueda
  }*/

  const handleCedulaChange = (event) => {
    setSearchCedula(event.target.value)
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

  const getPacienteIdByName = (name) => {
    const paciente = pacientes.find((p) => `${p.nombres} ${p.apellidos}` === name)
    return paciente ? paciente.id : ''
  }

  /* const getPacienteNameById = (id) => {
    const paciente = pacientes.find((p) => p.id === id)
    return paciente ? `${paciente.nombres} ${paciente.apellidos}` : ''
  }*/

  const filteredMedicos = medicos.filter((medico) => {
    const departamentoId = getDepartamentoIdByName(searchDepartamentoName)
    return !departamentoId || medico.departamentoId === departamentoId
  })

  const filteredHistoriasPacientes = historiasPacientes.flatMap((paciente) =>
    paciente.historialMedico
      .filter((historia) => {
        const historiaPacienteDate = formatDateWithMoment(historia.fecha_atencion)
        const departamentoId = getDepartamentoIdByName(searchDepartamentoName)
        const medicoId = getMedicoIdByName(searchMedicoName)
        const pacienteId = getPacienteIdByName(searchPacienteName)

        return (
          (!searchDate || historiaPacienteDate === searchDate) &&
          (!searchDepartamentoName || historia.departamentoId === departamentoId) &&
          (!searchMedicoName || historia.perfilId === medicoId) &&
          (!searchPacienteName || historia.pacienteId === pacienteId) &&
          (!searchCedula || paciente.cedula.includes(searchCedula))
        )
      })
      .map((historia) => ({
        ...historia,
        nombres: paciente.nombres,
        apellidos: paciente.apellidos,
        cedula: paciente.cedula,
        telefono: paciente.telefono,
        correo: paciente.correo,
        departamentoName: getDepartamentoNameById(historia.departamentoId),
        medicoName: getMedicoNameById(historia.perfilId),
        foto: paciente.profilePhotoPath,
        fecha_nacimiento: paciente.fecha_nacimiento
      }))
  )

  const displayUsers = filteredHistoriasPacientes
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((historiaPaciente) => (
      <tr key={historiaPaciente.id}>
        <td>
          {historiaPaciente.nombres} {historiaPaciente.apellidos}
        </td>
        <td>{historiaPaciente.cedula}</td>
        <td>{new Date(historiaPaciente.fecha_atencion).toLocaleString()}</td>
        <td>{historiaPaciente.departamentoName}</td>
        <td>{historiaPaciente.medicoName}</td>
        <td>{historiaPaciente.pacienteName}</td>
        <td className="text-end">
          <Can permission="historias.show">
            <div className="btn-group btn-group-sm" role="group" aria-label="Button group name">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleShowViewModal(historiaPaciente)}
              >
                <FontAwesomeIcon icon={faEye} className="fs-5" />
              </button>
            </div>
          </Can>
        </td>
      </tr>
    ))

  const pageCount = Math.ceil(filteredHistoriasPacientes.length / usersPerPage)

  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <Dash>
      <HistoriasPacientesContext.Provider value={{ historiasPacientes, setHistoriasPacientes }}>
        {showViewModal && selectedHistoria && (
          <ModalVerHistoria
            show={showViewModal}
            handleClose={handleCloseViewModal}
            historiaPaciente={selectedHistoria}
          />
        )}

        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title fs-3">Historias</h5>
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
                <label htmlFor="floatingInput">Fecha Historias</label>
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
                  <option value="">Seleccione Personal Médico</option>
                  {filteredMedicos.map((medico) => (
                    <option key={medico.id} value={`${medico.nombres} ${medico.apellidos}`}>
                      {medico.nombres} {medico.apellidos}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingMedicoName">Nombre del Personal</label>
              </div>
              <div className="col form-floating mb-3 mt-3 ms-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingCedula"
                  placeholder="Buscar por Cédula"
                  aria-label="Buscar por Cédula"
                  value={searchCedula}
                  onChange={handleCedulaChange}
                />
                <label htmlFor="floatingCedula">Cédula del Paciente</label>
              </div>
            </div>
            <div className="mt-5">
              <div className="container">
                <table className="table table-sm table-hover align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Paciente</th>
                      <th scope="col">Cedula</th>
                      <th scope="col">Fecha de Historia</th>
                      <th scope="col">Departamento</th>
                      <th scope="col">Personal Médico</th>
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
      </HistoriasPacientesContext.Provider>
    </Dash>
  )
}

export { HistoriasPacientesContext }
