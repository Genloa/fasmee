import { faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Toast } from 'bootstrap'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import Dash from '../../components/layouts/Dash'
import Can from '../../helpers/can'
import ModalGestionHorario from './components/ModalGestionHorario'
import { dias, meses } from './utils/constants'

function Cronograma() {
  const [medicos, setMedicos] = useState([])
  const [departamentos, setDepartamentos] = useState([])

  // Selecteds
  const [medicoSelected, setMedicoSelected] = useState(null)
  const [departamentoSelected, setDepartamentoSelected] = useState(null)
  const [mesSelected, setMesSelected] = useState(0)
  const [semanaSelected, setSemanaSelected] = useState(0)
  const [fechaSelected, setFechaSelected] = useState(null)
  const [diaSelected, setDiaSelected] = useState(0)
  const [search, setSearch] = useState('')

  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  // Fetchs

  const fetchMedicos = async () => {
    let medicosAux = await window.api.getMedicos()
    setMedicos(medicosAux)
  }

  const fetchDepartamentos = async () => {
    let departamentos = await window.api.getDepartamentos()
    setDepartamentos(departamentos)
  }

  // useEffects

  useEffect(() => {
    fetchMedicos()
    fetchDepartamentos()

    setMesSelected(new Date().getMonth())
    setSemanaSelected(optenerSemanaActual())
  }, [])

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToast')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  // Functions

  function onSetMesSelected(mes) {
    setMesSelected(mes)
    setSemanaSelected(0)
  }

  function onSetSemanaSelected(semana) {
    setSemanaSelected(semana)
  }

  function obtenerNumeroDeSemanas(año, mes) {
    const inicioDelMes = moment([año, mes])
    const finDelMes = inicioDelMes.clone().endOf('month')

    const primerDiaSemana = inicioDelMes.startOf('week')
    const ultimoDiaSemana = finDelMes.endOf('week')

    return ultimoDiaSemana.diff(primerDiaSemana, 'weeks') + 1
  }

  function optenerSemanaActual() {
    const hoy = moment()
    const inicioDelMes = hoy.clone().startOf('month')

    return hoy.diff(inicioDelMes, 'weeks')
  }

  function obtenerRangoDeSemana(año, mes, semana) {
    const inicioDelMes = moment([año, mes])
    const inicioDeSemana = inicioDelMes.clone().startOf('week').add(semana, 'weeks')
    const finDeSemana = inicioDeSemana.clone().endOf('week')

    const fechas = []
    let diaActual = inicioDeSemana.clone()
    while (diaActual.isSameOrBefore(finDeSemana)) {
      fechas.push(diaActual.format('YYYY-MM-DD'))
      diaActual.add(1, 'day')
    }

    return fechas
  }

  // Consts

  const changeTurno = async (horarioId) => {
    if (await window.api.changeTurno(horarioId)) {
      fetchMedicos()
    }
  }

  const openModalCreatePaciente = (medico, fecha, dia) => {
    setMedicoSelected(medico)
    setFechaSelected(fecha)
    setDiaSelected(dia)
    new Modal(document.getElementById('modal-gestionar-horario')).show()
  }

  const closeModalCreatePaciente = (message) => {
    if (message) {
      setToastMessage(message)
      setShowToast(true)
      fetchMedicos()
    }
    Modal.getInstance(document.getElementById('modal-gestionar-horario')).hide()
  }

  return (
    <Dash>
      <h1>Cronograma</h1>

      <ModalGestionHorario
        medico={medicoSelected}
        fecha={fechaSelected}
        dia={diaSelected}
        handleCloseModalGestionHorario={closeModalCreatePaciente}
      />

      <div>
        <input
          type="search"
          className="form-control mb-3"
          aria-describedby="helpId"
          placeholder="Buscar medico"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="input-group input-group-sm mb-3">
        <select
          className="form-select form-select-lg"
          onChange={(e) => onSetMesSelected(e.target.value)}
        >
          {meses.map((mes, index) => (
            <option key={index} value={index} selected={index === mesSelected}>
              {mes}
            </option>
          ))}
        </select>

        <select
          className="form-select form-select-lg"
          onChange={(e) => onSetSemanaSelected(e.target.value)}
        >
          {Array.from(
            { length: obtenerNumeroDeSemanas(new Date().getFullYear(), mesSelected) },
            (_, i) => (
              <option key={i} value={i} selected={i === semanaSelected}>
                Semana {i + 1}
              </option>
            )
          )}
        </select>

        <select className="form-select" onChange={(e) => setDepartamentoSelected(e.target.value)}>
          <option value="" selected>
            Todos los departamentos
          </option>
          {departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.id}>
              {departamento.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-sm align-middle">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Personal medico
              </th>
              {obtenerRangoDeSemana(new Date().getFullYear(), mesSelected, semanaSelected).map(
                (fecha, i) => {
                  return (
                    <th key={i}>
                      {dias[i]} {moment(fecha).format('DD/MM')}
                    </th>
                  )
                }
              )}
            </tr>
          </thead>
          <tbody>
            {medicos
              .filter((medico) => {
                return (
                  medico.nombres.toLowerCase() +
                  ' ' +
                  medico.apellidos.toLowerCase()
                ).includes(search.toLowerCase())
              })
              .filter((medico) => {
                return medico.departamentoId == departamentoSelected || !departamentoSelected
              })
              .map((medico) => (
                <tr key={medico.id}>
                  <td scope="row">
                    <h6>
                      {medico.nombres} {medico.apellidos}
                    </h6>
                    <small>{medico.departamento.nombre}</small>
                  </td>

                  {obtenerRangoDeSemana(new Date().getFullYear(), mesSelected, semanaSelected).map(
                    (fecha, i) => {
                      const horario = medico.horarios.find((horario) => {
                        horario.fecha = moment(horario.fecha).format('YYYY-MM-DD')
                        return horario.fecha == fecha
                      })

                      let color = 'bg-light'
                      let turno = '-'
                      if (horario) {
                        switch (horario.turno) {
                          case 'M':
                            turno = 'Mañana'
                            color = 'bg-primary'
                            break
                          case 'T':
                            turno = 'Tarde'
                            color = 'bg-success'
                            break
                          case 'C':
                            turno = 'Completo'
                            color = 'bg-danger'
                            break
                        }
                      }
                      return (
                        <td key={i} className={color} style={{ width: '90px' }}>
                          {i !== 0 && i !== 6 ? (
                            <div className="d-flex justify-content-between text-white">
                              <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => changeTurno(horario.id)}
                              >
                                {turno}
                              </span>
                              <Can permission="cronogramas.create">
                                <span
                                  className="text-dark"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => openModalCreatePaciente(medico, fecha, i)}
                                >
                                  <FontAwesomeIcon icon={faNotesMedical} />
                                </span>
                              </Can>
                            </div>
                          ) : null}
                        </td>
                      )
                    }
                  )}
                </tr>
              ))}
          </tbody>
        </table>

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
      </div>
    </Dash>
  )
}

export default Cronograma
