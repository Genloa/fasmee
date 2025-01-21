import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { psiquiatriaSchema } from '../validations/psiquiatriaSchema'

function FormPsiquiatria({ handleClose, onSubmit }) {
  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(psiquiatriaSchema)
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
              type="text"
              id="motivo"
              className={getInputClassName('motivo')}
              placeholder="motivo"
              aria-label="motivo"
              {...register('motivo')}
            />
            <label htmlFor="motivo">Motivo de Consulta:</label>
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
            <label htmlFor="diagnostico">Observaciones Generales: </label>
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
            <label htmlFor="tratamiento">Tratamiento: </label>
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
              id="recomendaciones"
              className={getInputClassName('recomendaciones')}
              placeholder="recomendaciones de la consulta"
              aria-label="recomendaciones"
              {...register('recomendaciones')}
            />
            <label htmlFor="recomendaciones">Recomendaciones: </label>
            {errors.recomendaciones?.message && (
              <div className="invalid-feedback">{errors.recomendaciones?.message}</div>
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

FormPsiquiatria.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormPsiquiatria
