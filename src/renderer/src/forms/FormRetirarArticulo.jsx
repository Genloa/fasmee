import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { retirarArticuloSchema } from '../validations/retirarArticuloSchema'
import { useEffect, useState } from 'react'

function FormRetirarArticulo({ onSubmit, defaultValues, handleClose }) {
  const [medicos, setMedicos] = useState([])

  useEffect(() => {
    fetchMedicos()
  }, [])

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
    resolver: zodResolver(retirarArticuloSchema)
  })

  const getSelectClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return ''
    }
    return `${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const onSubmitForm = (data) => {
    onSubmit(data, reset) // Pasar reset como callback
  }

  const fetchMedicos = async () => {
    try {
      const fetchedMedicos = await window.api.getMedicos()
      setMedicos(fetchedMedicos)
      console.log('Medicos:', fetchedMedicos)
    } catch (error) {
      console.error('Error fetching Medicos:', error)
    }
  }

  const medicoOptions = medicos.map((medico) => ({
    value: medico.id,
    label: `${medico.nombres} ${medico.apellidos}`
  }))

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type="number"
              id="cantidad"
              className={getInputClassName('cantidad')}
              placeholder="cantidad"
              aria-label="cantidad"
              step="1"
              min="1"
              max="500"
              {...register('cantidad', { valueAsNumber: true })}
            />
            <label htmlFor="cantidad">Cantidad</label>
            {errors.cantidad?.message && (
              <div className="invalid-feedback">{errors.cantidad?.message}</div>
            )}
          </div>
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
          Guardar
        </button>
      </div>
    </form>
  )
}

FormRetirarArticulo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    cantidad: PropTypes.number.isRequired
  }).isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormRetirarArticulo
