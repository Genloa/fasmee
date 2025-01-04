import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import PropTypes from 'prop-types'
import { almacenSchema } from '../validations/almacenSchema'

function FormArticulo({ onSubmit, defaultValues, mode, handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(almacenSchema)
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
              id="cubiculo"
              className={getInputClassName('cubiculo')}
              placeholder="cubiculo"
              aria-label="cubiculo"
              {...register('cubiculo')}
            />
            <label htmlFor="cubiculo">Cubiculo</label>
            {errors.cubiculo?.message && (
              <div className="invalid-feedback">{errors.cubiculo?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="descripcion"
              className={getInputClassName('descripcion')}
              placeholder="descripcion"
              aria-label="descripcion"
              {...register('descripcion')}
            />
            <label htmlFor="descripcion">Descripcion Almacen</label>
            {errors.descripcion?.message && (
              <div className="invalid-feedback">{errors.descripcion?.message}</div>
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
          {' '}
          Cancelar{' '}
        </button>
        <button type="submit" className="btn btn-primary">
          {mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

FormArticulo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    cubiculo: PropTypes.string,
    descripcion: PropTypes.string
  }).isRequired,
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormArticulo
