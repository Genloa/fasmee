import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { dias } from '../utils/constants'

function ModalGestionHorario({ medico, fecha, dia, handleCloseModalGestionHorario }) {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      // Crear horario
      let resultado = window.api.createHorario({
        perfilId: medico.id,
        dia: dia,
        turno: data.turno,
        fecha: fecha,
        mode: data.daySelection
      })

      if (resultado) {
        handleCloseModalGestionHorario('Horario actualizado correctamente')
      }
    } catch (error) {
      console.error('Error updating horario:', error)
    }
  }

  return (
    <div
      className="modal fade"
      id="modal-gestionar-horario"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitleId">
              Gestión de horario de {medico?.nombres} {medico?.apellidos}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="form-gestion-horario" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="daySelection"
                      id="allDays"
                      value="allDays"
                      {...register('daySelection')}
                    />
                    <label className="form-check-label" htmlFor="allDays">
                      Todos los {dias[dia]} hasta el fin de este año
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="daySelection"
                      id="singleDay"
                      value="singleDay"
                      {...register('daySelection')}
                    />
                    <label className="form-check-label" htmlFor="singleDay">
                      Solo este día
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Turno
                </label>
                <select className="form-select form-select-lg" {...register('turno')}>
                  <option value="C">Completo</option>
                  <option value="M">Mañana</option>
                  <option value="T">Tarde</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" form="form-gestion-horario">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ModalGestionHorario.propTypes = {
  medico: PropTypes.object.isRequired,
  fecha: PropTypes.string.isRequired,
  dia: PropTypes.number.isRequired,
  handleCloseModalGestionHorario: PropTypes.func.isRequired
}

export default ModalGestionHorario
