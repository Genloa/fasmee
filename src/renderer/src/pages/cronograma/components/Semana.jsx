import propTypes from 'prop-types'

function Semana({ medico, changeTurno }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {[...Array(7)].map((_, i) => {
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
          <div
            key={i}
            onClick={() => changeTurno(horario?.id)}
            className={`flex-grow-1 text-center text-white px-2 mx-1 py-2 rounded ${color}`}
            style={{ width: '90px' }}
          >
            {turno}
          </div>
        )
      })}
    </div>
  )
}

Semana.propTypes = {
  medico: propTypes.object.isRequired,
  changeTurno: propTypes.func.isRequired
}

export default Semana
