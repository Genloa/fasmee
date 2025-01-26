import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { ginecologiaPriSchema } from '../validations/ginecologiaSchema'

function FormGinecologiaPri({ handleClose, onSubmit }) {
  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(ginecologiaPriSchema)
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
              type="date"
              id="fechaPeriodo"
              className={getInputClassName('fechaPeriodo')}
              placeholder="fechaPeriodo"
              aria-label="fechaPeriodo"
              {...register('fechaPeriodo')}
            />
            <label className="z-0" htmlFor="periodo">
              Ultimo Periodo:
            </label>
            {errors.fechaPeriodo?.message && (
              <div className="invalid-feedback">{errors.fechaPeriodo?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="number"
              id="ciclo"
              className={getInputClassName('ciclo')}
              placeholder="ciclo"
              aria-label="ciclo"
              step="1"
              min="1"
              {...register('ciclo', { valueAsNumber: true })}
            />
            <label className="z-0" htmlFor="ciclo">
              Ciclo Mestrual:
            </label>
            {errors.ciclo?.message && (
              <div className="invalid-feedback">{errors.ciclo?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="citologia"
              className={getInputClassName('citologia')}
              placeholder="citologia"
              aria-label="citologia"
              {...register('citologia')}
            />
            <label className="z-0" htmlFor="citologia">
              Detalles Ultima Citología:
            </label>
            {errors.citologia?.message && (
              <div className="invalid-feedback">{errors.citologia?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="mamografia"
              className={getInputClassName('mamografia')}
              placeholder="mamografia"
              aria-label="mamografia"
              {...register('mamografia')}
            />
            <label className="z-0" htmlFor="mamografia">
              Detalles Ultima Mamografía:
            </label>
            {errors.mamografia?.message && (
              <div className="invalid-feedback">{errors.mamografia?.message}</div>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <textarea
              id="embarazos"
              className={getInputClassName('embarazos')}
              placeholder="Detalles de embarazos"
              aria-label="embarazos"
              {...register('embarazos')}
            />
            <label className="z-0" htmlFor="embarazos">
              Antecedentes de Embarazos:
            </label>
            {errors.embarazos?.message && (
              <div className="invalid-feedback">{errors.embarazos?.message}</div>
            )}
          </div>
        </div>
      </div>
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
            <label htmlFor="infeccion">Presencia de Infección:</label>
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

FormGinecologiaPri.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormGinecologiaPri
