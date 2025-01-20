import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select'
import { servicioSchema } from '../validations/servicioSchema'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

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
      console.log('Pacientes:', fetchedPacientes)
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

  const onSubmitForm = (data) => {
    console.log(data)
    onSubmit(data, reset)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue('archivo', file.path)
      trigger('archivo')
    }
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="row mt-4">
        <div className="col">
          <Controller
            name="pacienteId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <Select
                  class="form-select"
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
              {...register('fechaMuestra', {
                onChange: (e) => {
                  setValue('fechaMuestra', e.target.value)
                  trigger('fechaMuestra') // Validar en tiempo real
                }
              })}
            />
            <label className="z-0" htmlFor="floatingDate">
              {' '}
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
            onChange={handleFileChange}
            {...register('archivo', {
              required: 'El archivo es requerido',
              validate: {
                size: (value) => value.size <= 1048576 || 'El archivo debe ser menor a 1MB'
              }
            })}
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
