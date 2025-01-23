import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { citaSchema } from '../validations/citaSchema'

function FormCita({
  onSubmit,
  defaultValues,
  departamentos,
  medicos,
  mode,
  handleClose,
  clearAlert
}) {
  const [pacientes, setPacientes] = useState([])
  const [filteredMedicos, setFilteredMedicos] = useState([])

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
    resolver: zodResolver(citaSchema)
  })

  useEffect(() => {
    fetchPacientes()
  }, [])

  useEffect(() => {
    if (defaultValues.departamentoId) {
      filterMedicos(defaultValues.departamentoId)
    }
  }, [defaultValues.departamentoId])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      setPacientes(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  const filterMedicos = (departamentoId) => {
    const filtered = medicos.filter((medico) => medico.departamentoId === departamentoId)
    setFilteredMedicos(filtered)
  }

  const pacienteOptions = pacientes.map((paciente) => ({
    value: paciente.id,
    label: paciente.cedula
  }))

  const medicoOptions = filteredMedicos.map((medico) => ({
    value: medico.id,
    label: `${medico.nombres} ${medico.apellidos}`
  }))

  const departamentoOptions = departamentos
    .filter((departamento) => ![1, 9, 10, 12, 13, 14, 15].includes(departamento.id))
    .map((departamento) => ({
      value: departamento.id,
      label: departamento.nombre
    }))

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const getSelectClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return ''
    }
    return `${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const onSubmitForm = (data) => {
    onSubmit(data, reset) // Pasar reset como callback
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type="date"
              className={getInputClassName('fechaCita')}
              id="floatingDate"
              placeholder="fechaCita"
              {...register('fechaCita', {
                onChange: (e) => {
                  setValue('fechaCita', e.target.value)
                  clearAlert() // Limpiar el mensaje de alerta al cambiar la fecha
                  trigger('fechaCita') // Validar en tiempo real
                }
              })}
            />
            <label htmlFor="floatingDate"> fecha de Cita</label>
            {errors.fechaCita?.message && (
              <div className="invalid-feedback">{errors.fechaCita?.message}</div>
            )}
          </div>
        </div>
      </div>
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
          <Controller
            name="departamentoId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={departamentoOptions}
                  placeholder="Buscar Departamento"
                  isClearable
                  className={getSelectClassName('departamentoId')}
                  value={departamentoOptions.find((option) => option.value === field.value) || null}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption)
                    setValue('departamentoId', selectedOption ? selectedOption.value : null)
                    filterMedicos(selectedOption ? selectedOption.value : null)
                    trigger('departamentoId') // Validar en tiempo real
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
                  className={getSelectClassName('medicoId')}
                  value={medicoOptions.find((option) => option.value === field.value) || null}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                    setValue('medicoId', selectedOption ? selectedOption.value : null) // Registrar el valor
                    trigger('medicoId') // Validar en tiempo real
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
          Cancelar
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
  handleClose: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired
}

export default FormCita
