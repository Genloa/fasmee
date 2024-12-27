import Dash from '../../components/layouts/Dash'
import { useState, useEffect, createContext } from 'react'
import { Toast } from 'bootstrap'
import ModalCrearCola from './components/ModalCrearCola'

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

  /*  const getDepartamentoNameById = (id) => {
    const departamento = departamentos.find((d) => d.id === id)
    return departamento ? departamento.nombre : ''
  }

  const getMedicoNameById = (id) => {
    const medico = medicos.find((m) => m.id === id)
    return medico ? `${medico.nombres} ${medico.apellidos}` : ''
  }
*/
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
      ).sort(
        (a, b) =>
          new Date(
            a.colasMedicos.find(
              (colaMedico) => colaMedico.departamentoId === departamento.id
            ).createdAt
          ) -
          new Date(
            b.colasMedicos.find(
              (colaMedico) => colaMedico.departamentoId === departamento.id
            ).createdAt
          )
      )

      const medicosPorDepartamento = medicos.filter(
        (medico) => medico.departamentoId === departamento.id
      )

      const medicosConPacientes = medicosPorDepartamento
        .map((medico) => ({
          medico,
          pacientes: pacientesPorDepartamento
            .filter((paciente) =>
              paciente.colasMedicos.some((colaMedico) => colaMedico.perfilId === medico.id)
            )
            .map((paciente, index) => ({ ...paciente, numero: index + 1 }))
        }))
        .filter(({ pacientes }) => pacientes.length > 0)

      const pacientesSinMedico = pacientesPorDepartamento
        .filter((paciente) =>
          paciente.colasMedicos.some(
            (colaMedico) =>
              colaMedico.departamentoId === departamento.id && colaMedico.perfilId === null
          )
        )
        .sort(
          (a, b) =>
            new Date(
              a.colasMedicos.find(
                (colaMedico) => colaMedico.departamentoId === departamento.id
              ).createdAt
            ) -
            new Date(
              b.colasMedicos.find(
                (colaMedico) => colaMedico.departamentoId === departamento.id
              ).createdAt
            )
        )
        .map((paciente, index) => ({ ...paciente, numero: index + 1 }))

      return {
        departamento,
        medicos:
          departamento.id === 1
            ? [{ medico: null, pacientes: pacientesSinMedico }]
            : medicosConPacientes
      }
    })
    .filter(({ medicos }) => medicos.length > 0)

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToast')
      const toast = new Toast(toastEl)
      toast.show()
      const timeout = setTimeout(() => {
        setShowToast(false)
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
            <h5 className="card-title">Cola Atencion Pacientes</h5>
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
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {groupedPacientes.map(({ departamento, medicos }) => (
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
                                : 'En la espera de Medico'}
                            </h6>
                            <ul className="list-group">
                              {pacientes.map((paciente) => (
                                <li key={paciente.id} className="list-group-item">
                                  {paciente.numero}. {paciente.nombres} {paciente.apellidos}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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
      </ColaPacientesContext.Provider>
    </Dash>
  )
}

export { ColaPacientesContext }
