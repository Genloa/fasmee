import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { servicioSchema } from '../validations/servicioSchema'

function FormServicio({ onSubmit, defaultValues, handleClose }) {
  const [pacientes, setPacientes] = useState([])
  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, dirtyFields },
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(servicioSchema)
  })

  useEffect(() => {
    reset(defaultValues)
    fetchPacientes()
  }, [defaultValues, reset])

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      setPacientes(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const pacienteOptions = pacientes.map((paciente) => ({
    value: paciente.id,
    label: paciente.cedula
  }))

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="row mt-4">
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
                  value={pacienteOptions.find((option) => option.value === field.value) || null}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                    setValue('pacienteId', selectedOption ? selectedOption.value : null) // Registrar el valor
                    trigger('pacienteId') // Validar en tiempo real
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
        <div className="col">
          <div className="form-floating ">
            <input
              type="date"
              className={getInputClassName('fechaMuestra')}
              id="floatingDate"
              placeholder="fechaMuestra"
              {...register('fechaMuestra')}
            />
            <label className="z-0" htmlFor="floatingDate">
              fecha de realización
            </label>
            {errors.fechaMuestra?.message && (
              <div className="invalid-feedback">{errors.fechaMuestra?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <input
            type="file"
            className={getInputClassName('archivo')}
            id="archivo"
            placeholder="Subir archivo"
            {...register('archivo')}
          />
          {errors.archivo?.message && (
            <div className="invalid-feedback">{errors.archivo?.message}</div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating">
            <textarea
              id="detalles"
              className={getInputClassName('detalles')}
              placeholder="Detalles de la consulta"
              aria-label="detalles"
              {...register('detalles')}
            />
            <label htmlFor="detalles">Informe Resultado</label>
            {errors.detalles?.message && (
              <div className="invalid-feedback">{errors.detalles?.message}</div>
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

FormServicio.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormServicio
