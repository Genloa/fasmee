import { Modal } from 'bootstrap'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import Dash from '../../components/layouts/Dash'
import ModalGestionHorario from './components/ModalGestionHorario'
import { meses } from './utils/constants'

function Cronograma() {
  const [medicos, setMedicos] = useState([])
  const [medicoSelected, setMedicoSelected] = useState(null)

  const [departamentos, setDepartamentos] = useState([])
  const [departamentoSelected, setDepartamentoSelected] = useState(null)

  const [mesSelected, setMesSelected] = useState(0)
  const [semanaSelected, setSemanaSelected] = useState(0)
  const [fechaSelected, setFechaSelected] = useState(null)
  const [diaSelected, setDiaSelected] = useState(0)

  const fetchMedicos = async () => {
    let medicosAux = await window.api.getMedicos()
    setMedicos(medicosAux)
  }

  const fetchDepartamentos = async () => {
    let departamentos = await window.api.getDepartamentos()
    setDepartamentos(departamentos)
  }

  useEffect(() => {
    fetchMedicos()
    fetchDepartamentos()

    setMesSelected(new Date().getMonth())
    setSemanaSelected(optenerSemanaActual())
  }, [])

  function onSetMesSelected(mes) {
    setMesSelected(mes)
    setSemanaSelected(0)
  }

  function onSetSemanaSelected(semana) {
    setSemanaSelected(semana)
  }

  // const changeTurno = async (horarioId) => {
  //   if (await window.api.changeTurno(horarioId)) {
  //     fetchMedicos()
  //   }
  // }

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

  const openModalCreatePaciente = (medico, fecha, dia) => {
    setMedicoSelected(medico)
    setFechaSelected(fecha)
    setDiaSelected(dia)
    new Modal(document.getElementById('modal-gestionar-horario')).show()
  }

  const closeModalCreatePaciente = (message) => {
    console.log(message)
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
          name=""
          id=""
          aria-describedby="helpId"
          placeholder="Buscar medico"
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
          <option selected>Seleciona un departamento</option>
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
                Doctor
              </th>
              <th className="text-center" scope="col">
                Domingo
              </th>
              <th className="text-center" scope="col">
                Lunes
              </th>
              <th className="text-center" scope="col">
                Martes
              </th>
              <th className="text-center" scope="col">
                Miércoles
              </th>
              <th className="text-center" scope="col">
                Jueves
              </th>
              <th className="text-center" scope="col">
                Viernes
              </th>
              <th className="text-center" scope="col">
                Sábado
              </th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((medico) => (
              <tr key={medico.id}>
                <td scope="row">
                  {medico.nombres} {medico.apellidos}
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
                      <td
                        key={i}
                        onClick={() => openModalCreatePaciente(medico, fecha, i)}
                        className={color}
                        style={{ width: '90px' }}
                      >
                        <div className="text-center mx-2">{turno}</div>
                      </td>
                    )
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dash>
  )
}

export default Cronograma
