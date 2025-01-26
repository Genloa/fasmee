import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { nutricionSchema } from '../validations/nutricionSchema'

function FormNutricion({ handleClose, onSubmit }) {
  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(nutricionSchema)
  })

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }
  const onSubmitForm = (data) => {
    onSubmit(data, reset) // Pasar reset como callback
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <input
              type="number"
              id="peso"
              className={getInputClassName('peso')}
              placeholder="Peso"
              aria-label="peso"
              step="0.01"
              min="0.1"
              {...register('peso', { valueAsNumber: true })}
            />
            <label className="z-0" htmlFor="peso">
              Peso (kg)
            </label>
            {errors.peso?.message && <div className="invalid-feedback">{errors.peso?.message}</div>}
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="tension"
              className={getInputClassName('tension')}
              placeholder="tension"
              aria-label="tension"
              {...register('tension')}
            />
            <label className="z-0" htmlFor="tension">
              Tension
            </label>
            {errors.tension?.message && (
              <div className="invalid-feedback">{errors.tension?.message}</div>
            )}
          </div>
        </div>

        <div className="col">
          <div className="form-floating">
            <input
              type="number"
              id="cadera"
              className={getInputClassName('cadera')}
              placeholder="cadera"
              aria-label="cadera"
              step="0.01"
              min="0.1"
              {...register('cadera', { valueAsNumber: true })}
            />
            <label className="z-0" htmlFor="cadera">
              Medidas Cadera (Cm)
            </label>
            {errors.cadera?.message && (
              <div className="invalid-feedback">{errors.cadera?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <input
              type="number"
              id="cintura"
              className={getInputClassName('cintura')}
              placeholder="cintura"
              aria-label="cintura"
              step="0.01"
              min="0.1"
              {...register('cintura', { valueAsNumber: true })}
            />
            <label className="z-0" htmlFor="cintura">
              Medidas Cintura (Cm)
            </label>
            {errors.cintura?.message && (
              <div className="invalid-feedback">{errors.cintura?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="number"
              id="brazos"
              className={getInputClassName('brazos')}
              placeholder="brazos"
              aria-label="brazos"
              step="0.01"
              min="0.1"
              {...register('brazos', { valueAsNumber: true })}
            />
            <label className="z-0" htmlFor="brazos">
              Medidas Brazos (Cm)
            </label>
            {errors.brazos?.message && (
              <div className="invalid-feedback">{errors.brazos?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="number"
              id="piernas"
              className={getInputClassName('piernas')}
              placeholder="piernas"
              aria-label="piernas"
              step="0.01"
              min="0.1"
              {...register('piernas', { valueAsNumber: true })}
            />
            <label className="z-0" htmlFor="piernas">
              Medidas Piernas (Cm)
            </label>
            {errors.piernas?.message && (
              <div className="invalid-feedback">{errors.piernas?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <textarea
              id="diagnostico"
              className={getInputClassName('diagnostico')}
              placeholder="diagnostico de la consulta"
              aria-label="diagnostico"
              {...register('diagnostico')}
            />
            <label className="z-0" htmlFor="diagnostico">
              Detalles de la consulta
            </label>
            {errors.diagnostico?.message && (
              <div className="invalid-feedback">{errors.diagnostico?.message}</div>
            )}
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={handleClose}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  )
}

FormNutricion.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormNutricion
