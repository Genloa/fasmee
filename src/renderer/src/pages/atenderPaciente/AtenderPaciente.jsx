import { NavLink } from 'react-router-dom'
import Dash from '../../components/layouts/Dash'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

export default function AtenderPaciente() {
  const [colaPacientes, setColaPacientes] = useState([])
  const [citaPacientes, setCitaPaciente] = useState([])

  const usuario = {
    nombre: 'heidy',
    apellidos: 'Sanchez',
    medicoId: 2,
    departamentoId: 4
  }
  useEffect(() => {
    fetchColaPacientes()
    fetchCitaPacientes()
  }, [])

  const fetchColaPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getColaPacientesMedico(
        usuario.medicoId,
        usuario.departamentoId
      )
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

  const fetchCitaPacientes = async () => {
    try {
      const fetchedCitaPacientes = await window.api.getCitaPacientesMedico(
        usuario.medicoId,
        usuario.departamentoId
      )
      setCitaPaciente(fetchedCitaPacientes)
      console.log('Citas pacientes:', fetchedCitaPacientes)
    } catch (error) {
      console.error('Error fetching citas pacientes:', error)
    }
  }

  return (
    <>
      <Dash>
        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title fs-3">Atender Pacientes</h5>
            <div className="text-end">
              <button type="button" className="btn btn-danger">
                Emergencia
              </button>
            </div>
            <div className="container mt-5">
              <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                  <div className="card mb-3 border-danger">
                    <div className="card-header">
                      <h5>Citas de Hoy</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <ul className="list-group">
                          {citaPacientes.map((paciente, index) => (
                            <li
                              key={paciente.id}
                              className="list-group-item text-danger d-flex justify-content-between align-items-center"
                            >
                              {index + 1}. {paciente.nombres} {paciente.apellidos}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card mb-3 border-primary">
                    <div className="card-header">
                      <div className="d-flex justify-content-between">
                        <h5>Cola Pacientes</h5>
                        <button
                          type="button"
                          className="btn  btn-sm  text-primary "
                          onClick={fetchColaPacientes}
                        >
                          <FontAwesomeIcon icon={faArrowsRotate} className="fs-5" />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <ul className="list-group">
                          {colaPacientes.map((paciente, index) => (
                            <li
                              key={paciente.id}
                              className="list-group-item text-primary d-flex justify-content-between align-items-center"
                              onClick={() => console.log(paciente)}
                            >
                              <span>
                                {index + 1}. {paciente.nombres} {paciente.apellidos}
                              </span>
                              <NavLink
                                to="/dash/ColaPacientes"
                                className={({ isActive }) =>
                                  `btn btn-primary btn-sm ${isActive ? 'active' : ''}`
                                }
                              >
                                Atender
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dash>
    </>
  )
}
