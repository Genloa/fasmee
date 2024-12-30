import { useEffect, useState } from 'react'
import Dash from '../../components/layouts/Dash'
import Semana from './components/Semana'

function Cronograma() {
  const [medicos, setMedicos] = useState([])

  const fetchMedicos = async () => {
    let medicosAux = await window.api.getMedicos()
    setMedicos(medicosAux)
  }

  useEffect(() => {
    fetchMedicos()
  }, [])

  const changeTurno = async (horarioId) => {
    console.log(horarioId)
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
        <select className="form-select form-select-lg" name="" id="">
          <option selected>Seleccione un mes</option>
          <option value="">Enero</option>
          <option value="">Febrero</option>
          <option value="">Marzo</option>
          <option value="">Abril</option>
          <option value="">Mayo</option>
          <option value="">Junio</option>
          <option value="">Julio</option>
          <option value="">Agosto</option>
          <option value="">Septiembre</option>
          <option value="">Octubre</option>
          <option value="">Noviembre</option>
          <option value="">Diciembre</option>
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
              <th scope="col">Doctor</th>
              <th scope="col">Semana</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((medico) => (
              <tr key={medico.id}>
                {console.log(medico)}
                <td scope="row">
                  {medico.nombres} {medico.apellidos}
                </td>
                <td>
                  <Semana medico={medico} changeTurno={changeTurno} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dash>
  )
}

export default Cronograma
