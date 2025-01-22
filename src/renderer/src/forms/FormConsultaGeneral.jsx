import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import PropTypes from 'prop-types'
import { consultaGeneralSchema } from '../validations/consultaGeneralSchema'

function FormConsultaGeneral({ handleClose, onSubmit }) {
  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(consultaGeneralSchema)
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
            <label className="z-0" htmlFor="motivo">
              Motivo de Consulta:
            </label>
            {errors.motivo?.message && (
              <div className="invalid-feedback">{errors.motivo?.message}</div>
            )}
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
              Tension:{' '}
            </label>
            {errors.tension?.message && (
              <div className="invalid-feedback">{errors.tension?.message}</div>
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
              Detalles de la consulta:{' '}
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

FormConsultaGeneral.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormConsultaGeneral
