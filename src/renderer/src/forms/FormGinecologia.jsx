import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { baseginecologiaSchema } from '../validations/ginecologiaSchema'

function FormGinecologia({ handleClose, onSubmit }) {
  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(baseginecologiaSchema)
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
            <textarea
              id="eco"
              className={getInputClassName('eco')}
              placeholder="Detalles de Eco"
              aria-label="eco"
              {...register('eco')}
            />
            <label htmlFor="eco">Detalles de Eco: </label>
            {errors.eco?.message && <div className="invalid-feedback">{errors.eco?.message}</div>}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="infeccion"
              className={getInputClassName('infeccion')}
              placeholder="infeccion"
              aria-label="infeccion"
              {...register('infeccion')}
            />
            <label htmlFor="Presencia de Infección:"></label>
            {errors.infeccion?.message && (
              <div className="invalid-feedback">{errors.infeccion?.message}</div>
            )}
          </div>
        </div>

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
              id="diagnostico"
              className={getInputClassName('diagnostico')}
              placeholder="diagnostico de la consulta"
              aria-label="diagnostico"
              {...register('diagnostico')}
            />
            <label htmlFor="diagnostico">Detalles de la consulta</label>
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

FormGinecologia.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormGinecologia
