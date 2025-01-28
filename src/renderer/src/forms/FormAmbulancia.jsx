import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { ambulanciaSchema } from '../validations/ambulanciaSchema'

function FormAmbulancia({ onSubmit, defaultValues, handleClose }) {
  const [pacientes, setPacientes] = useState([])
  const [paramedicos, setParamedicos] = useState([])
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
    resolver: zodResolver(ambulanciaSchema)
  })

  useEffect(() => {
    reset(defaultValues)
    fetchPacientes()
    fetchParamedico()
  }, [defaultValues, reset])

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      setPacientes(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }
  const fetchParamedico = async () => {
    try {
      const fetchedParamedico = await window.api.getParamedicos()
      setParamedicos(fetchedParamedico)
    } catch (error) {
      console.error('Error fetching Paramedico:', error)
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

  const paramedicoOptions = paramedicos.map((paramedico) => ({
    value: paramedico.id,
    label: `${paramedico.nombres} ${paramedico.apellidos}`
  }))

  const onSubmitForm = (data) => {
    onSubmit(data, reset)
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
            name="paramedicoId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={paramedicoOptions}
                  placeholder="Buscar Paramedico"
                  isClearable
                  value={paramedicoOptions.find((option) => option.value === field.value) || null}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                    setValue('paramedicoId', selectedOption ? selectedOption.value : null) // Registrar el valor
                    trigger('paramedicoId') // Validar en tiempo real
                  }}
                />
                {errors.paramedicoId && (
                  <div className="invalid-feedback d-block">{errors.paramedicoId.message}</div>
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
              className={getInputClassName('fechaUso')}
              id="floatingDate"
              placeholder="fechaUso"
              {...register('fechaUso', {
                onChange: (e) => {
                  setValue('fechaUso', e.target.value)
                  trigger('fechaUso') // Validar en tiempo real
                }
              })}
            />
            <label className="z-0" htmlFor="floatingDate">
              fecha de Uso
            </label>
            {errors.fechaUso?.message && (
              <div className="invalid-feedback">{errors.fechaUso?.message}</div>
            )}
          </div>
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
            <label className="z-0" htmlFor="detalles">
              Detalles de Uso
            </label>
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

FormAmbulancia.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormAmbulancia
