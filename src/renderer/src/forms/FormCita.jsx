import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { beneficiarioSchema } from '../validations/beneficiarioSchema'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

function FormCita({ onSubmit, defaultValues, departamentos, medicos, mode, handleClose }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(citaSchema)
  })

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }
  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type="date"
              className={getInputClassName('fechaCita')}
              id="floatingDate"
              placeholder="fechaCita"
              {...register('fechaCita')}
            />
            <label htmlFor="floatingDate"> fecha de Cita</label>
            {errors.fechaCita?.message && (
              <div className="invalid-feedback">{errors.fechaCita?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        {' '}
        <div className="col">
          <Controller
            name="pacienteId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={pacienteOptions}
                  placeholder="Buscar Paciente"
                  isClearable
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                    setValue('pacienteId', selectedOption ? selectedOption.value : null) // Registrar el valor
                  }}
                />
                {errors.pacienteId && (
                  <div className="invalid-feedback d-block">{errors.pacienteId.message}</div>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="row mt-4">
        {' '}
        <div className="col">
          <Controller
            name="departamentoId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={departamentoOptions}
                  placeholder="Buscar Trabajador"
                  isClearable
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                    setValue('departamentoId', selectedOption ? selectedOption.value : null) // Registrar el valor
                  }}
                />
                {errors.departamentoId && (
                  <div className="invalid-feedback d-block">{errors.departamentoId.message}</div>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="row mt-4">
        {' '}
        <div className="col">
          <Controller
            name="medicoId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={medicoOptions}
                  placeholder="Buscar Medico"
                  isClearable
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                    setValue('medicoId', selectedOption ? selectedOption.value : null) // Registrar el valor
                  }}
                />
                {errors.medicoId && (
                  <div className="invalid-feedback d-block">{errors.medicoId.message}</div>
                )}
              </div>
            )}
          />
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

FormCita.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    fechaCita: PropTypes.string,
    pacienteId: PropTypes.number.isRequired,
    departamentoId: PropTypes.number.isRequired,
    medicoId: PropTypes.number.isRequired
  }).isRequired,
  departamentos: PropTypes.array.isRequired,
  medicos: PropTypes.array.isRequired,
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormCita
