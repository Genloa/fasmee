import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { articuloSchema } from '../validations/articuloSchema'

function FormArticulo({ onSubmit, defaultValues, handleClose, hideNombre = false }) {
  const [almacenes, setAlmacenes] = useState([])

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
    resolver: zodResolver(articuloSchema)
  })

  useEffect(() => {
    fetchAlmacenes()
  }, [])

  const fetchAlmacenes = async () => {
    try {
      const fetchedAlmacenes = await window.api.getAlmacenes()
      setAlmacenes(fetchedAlmacenes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  const almacenOptions = almacenes.map((almacen) => ({
    value: almacen.id,
    label: `Cubiculo ${almacen.cubiculo} ${almacen.descripcion}`
  }))

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const onSubmitForm = (data) => {
    onSubmit(data, reset) // Pasar reset como callback
  }
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmitForm)}>
      {!hideNombre && (
        <div className="row mt-4">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                id="nombre"
                className={getInputClassName('nombre')}
                placeholder="Nombre"
                aria-label="nombre"
                {...register('nombre')}
              />
              <label htmlFor="nombres">Nombre Articulo</label>
              {errors.nombre?.message && (
                <div className="invalid-feedback">{errors.nombre?.message}</div>
              )}
            </div>
          </div>
        </div>
      )}
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
      {!hideNombre && (
        <div className="row mt-4">

          <div className="col">
            <Controller
              name="almacenId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <Select
                    {...field}
                    options={almacenOptions}
                    placeholder="Buscar Almacen"
                    isClearable
                    value={almacenOptions.find((option) => option.value === field.value) || null}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                      setValue('almacenId', selectedOption ? selectedOption.value : null) // Registrar el valor
                      trigger('almacenId') // Validar en tiempo real
                    }}
                  />
                  {errors.almacenId && (
                    <div className="invalid-feedback d-block">{errors.almacenId.message}</div>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      )}
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

FormArticulo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    nombre: PropTypes.string,
    cantidad: PropTypes.number.isRequired
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  hideNombre: PropTypes.bool.isRequired
}

export default FormArticulo
