import { useEffect, useState } from 'react'
import Dash from '../../components/layouts/Dash'

const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

function Cronograma() {
  const [medicos, setMedicos] = useState([])
  const [mesSelected, setMesSelected] = useState(0)

  const fetchMedicos = async () => {
    let medicosAux = await window.api.getMedicos()
    setMedicos(medicosAux)
  }

  useEffect(() => {
    fetchMedicos()
    setMesSelected(new Date().getMonth())
  }, [])

  const changeTurno = async (horarioId) => {
    if (await window.api.changeTurno(horarioId)) {
      fetchMedicos()
    }
  }

  return (
    <Dash>
      <h1>Cronograma</h1>

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
          onChange={(e) => setMesSelected(e.target.value)}
        >
          {meses.map((mes, index) => (
            <option key={index} value={index} selected={index === mesSelected}>
              {mes}
            </option>
          ))}
        </select>

        <select className="form-select form-select-lg" name="" id="">
          <option selected>Seleccione una semana</option>
          <option value="">Semana 1</option>
          <option value="">Semana 2</option>
          <option value="">Semana 3</option>
          <option value="">Semana 4</option>
        </select>

        <select className="form-select" name="" id="">
          <option selected>Seleciona un departamento</option>
          <option value="">New Delhi</option>
          <option value="">Istanbul</option>
          <option value="">Jakarta</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Doctor
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
            </tr>
          </thead>
          <tbody>
            {medicos.map((medico) => (
              <tr key={medico.id}>
                {console.log(medico)}
                <td scope="row">
                  {medico.nombres} {medico.apellidos}
                </td>
                {[...Array(5)].map((_, i) => {
                  const day = i
                  const horario = medico.horarios.find((horario) => horario.dia === day)

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
                      onClick={() => changeTurno(horario?.id)}
                      className={`${color}`}
                      style={{ width: '90px' }}
                    >
                      <div className="text-center text-white mx-2">{turno}</div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dash>
  )
}

export default Cronograma
