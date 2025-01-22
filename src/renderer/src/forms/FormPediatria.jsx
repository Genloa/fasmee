import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { pediatriaSchema } from '../validations/pediatriaSchema'

function FormPediatria({ handleClose, onSubmit }) {
  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(pediatriaSchema)
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
              type="number"
              id="altura"
              className={getInputClassName('altura')}
              placeholder="altura"
              aria-label="altura"
              step="0.01"
              min="0.1"
              {...register('altura', { valueAsNumber: true })}
            />
            <label className="z-0" htmlFor="altura">
              Medidas altura (Cm)
            </label>
            {errors.altura?.message && (
              <div className="invalid-feedback">{errors.altura?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="motivo"
              className={getInputClassName('motivo')}
              placeholder="motivo"
              aria-label="motivo"
              {...register('motivo')}
            />
            <label className="z-0" htmlFor="motivo">
              Motivo de Consulta:
            </label>
            {errors.motivo?.message && (
              <div className="invalid-feedback">{errors.motivo?.message}</div>
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
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <textarea
              id="tratamiento"
              className={getInputClassName('tratamiento')}
              placeholder="tratamiento de la consulta"
              aria-label="tratamiento"
              {...register('tratamiento')}
            />
            <label className="z-0" htmlFor="tratamiento">
              Tratamiento:{' '}
            </label>
            {errors.tratamiento?.message && (
              <div className="invalid-feedback">{errors.tratamiento?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <textarea
              id="examenes"
              className={getInputClassName('examenes')}
              placeholder="examenes de la consulta"
              aria-label="examenes"
              {...register('examenes')}
            />
            <label htmlFor="examenes">Examenes Complementarios: </label>
            {errors.examenes?.message && (
              <div className="invalid-feedback">{errors.examenes?.message}</div>
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

FormPediatria.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormPediatria
