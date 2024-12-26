import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { beneficiarioSchema } from '../validations/beneficiarioSchema'

function FormPacienteBeneficiario({
  onSubmit,
  defaultValues,
  trabajadorOptions,
  mode,
  handleClose
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(beneficiarioSchema)
  })

  useEffect(() => {
    if (defaultValues && typeof defaultValues.trabajadorId === 'number') {
      const defaultTrabajador = trabajadorOptions.find(
        (option) => option.value === defaultValues.trabajadorId
      )
      if (defaultTrabajador) {
        setValue('trabajador', defaultTrabajador) // Establecer el valor por defecto para react-select
      }
    }
  }, [defaultValues, trabajadorOptions, setValue])

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="row mt-4">
        <h6 className="text-center text-body-secondary">Informacion General</h6>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type="text"
              id="nombres"
              className={getInputClassName('nombres')}
              placeholder="Nombres"
              aria-label="nombres"
              {...register('nombres')}
            />
            <label htmlFor="nombres">Nombres</label>
            {errors.nombres?.message && (
              <div className="invalid-feedback">{errors.nombres?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating ">
            <input
              type="text"
              className={getInputClassName('apellidos')}
              placeholder="apellidos"
              aria-label="apellidos"
              {...register('apellidos')}
            />
            <label htmlFor="apellidos">Apellidos</label>
            {errors.apellidos?.message && (
              <div className="invalid-feedback">{errors.apellidos?.message}</div>
            )}
          </div>
        </div>
        <div className="input-group  col">
          <select
            className={`form-select flex-grow-0 bg-light ${errors.tipocedula ? 'is-invalid' : ''}`}
            style={{ width: '60px' }}
            aria-label="Tipo de documento"
            {...register('tipoCedula')}
          >
            <option value="V">V</option>
            <option value="E">E</option>
          </select>
          <input
            type="text"
            id="cedula"
            className={getInputClassName('cedula')}
            placeholder="Cedula"
            aria-label="Cedula"
            aria-describedby="basic-addon1"
            {...register('cedula')}
          />
          {errors.cedula?.message && (
            <div className="invalid-feedback">{errors.cedula?.message}</div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type="date"
              className={getInputClassName('fechaNacimiento')}
              id="floatingDate"
              placeholder="fechaNacimiento"
              {...register('fechaNacimiento')}
            />
            <label htmlFor="floatingDate"> fecha de nacimiento</label>
            {errors.fechaNacimiento?.message && (
              <div className="invalid-feedback">{errors.fechaNacimiento?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating ">
            <input
              type="phone"
              className={getInputClassName('telefono')}
              aria-label="Telefono"
              placeholder="Telefono"
              aria-describedby="basic-addon1"
              {...register('telefono')}
            />
            <label htmlFor="floatingPassword">Telefono</label>
            {errors.telefono?.message && (
              <div className="invalid-feedback">{errors.telefono?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating ">
            <input
              type="email"
              className={getInputClassName('correo')}
              id="correo"
              placeholder="correo"
              {...register('correo')}
            />
            <label htmlFor="correo">Correo</label>
            {errors.correo?.message && (
              <div className="invalid-feedback">{errors.correo?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <Controller
            name="trabajador"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={trabajadorOptions}
                  placeholder="Buscar Trabajador"
                  isClearable
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                    setValue('trabajadorId', selectedOption ? selectedOption.value : null) // Registrar el valor
                  }}
                />
                {errors.trabajador && (
                  <div className="invalid-feedback d-block">{errors.trabajador.message}</div>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="row mt-4">
        <h6 className="text-center text-body-secondary">Informacion Medica</h6>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type="text"
              id="patologias"
              className={getInputClassName('patologias')}
              placeholder="patologias"
              aria-label="patologias"
              {...register('patologias')}
            />
            <label htmlFor="patologias">Patologias</label>
            {errors.patologias?.message && (
              <div className="invalid-feedback">{errors.patologias?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating ">
            <input
              type="text"
              id="alergias"
              className={getInputClassName('alergias')}
              placeholder="alergias"
              aria-label="alergias"
              {...register('alergias')}
            />
            <label htmlFor="alergias">Alergias</label>
            {errors.alergias?.message && (
              <div className="invalid-feedback">{errors.alergias?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type="text"
              id="cirugias"
              className={getInputClassName('cirugias')}
              placeholder="cirugias"
              aria-label="cirugias"
              {...register('cirugias')}
            />
            <label htmlFor="cirugias">Cirugias</label>
            {errors.cirugias?.message && (
              <div className="invalid-feedback">{errors.cirugias?.message}</div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating ">
            <input
              type="text"
              id="medicamentos"
              className={getInputClassName('medicamentos')}
              placeholder="medicamentos"
              aria-label="medicamentos"
              {...register('medicamentos')}
            />
            <label htmlFor="medicamentos">Medicamentos</label>
            {errors.medicamentos?.message && (
              <div className="invalid-feedback">{errors.medicamentos?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type="number"
              id="peso"
              className={getInputClassName('peso')}
              placeholder="peso"
              aria-label="peso"
              step="0.01"
              min="0.1"
              max="500"
              {...register('peso', { valueAsNumber: true })}
            />
            <label htmlFor="peso">Peso</label>
            {errors.peso?.message && <div className="invalid-feedback">{errors.peso?.message}</div>}
          </div>
        </div>
        <div className="col">
          <div className="form-floating ">
            <input
              type="number"
              id="altura"
              className={getInputClassName('altura')}
              placeholder="altura"
              aria-label="altura"
              step="0.01"
              min="1.1"
              max="3"
              {...register('altura', { valueAsNumber: true })}
            />
            <label htmlFor="altura">Altura</label>
            {errors.altura?.message && (
              <div className="invalid-feedback">{errors.altura?.message}</div>
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
          {mode === 'edit' ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

FormPacienteBeneficiario.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    nombres: PropTypes.string,
    apellidos: PropTypes.string,
    tipoCedula: PropTypes.string,
    cedula: PropTypes.string,
    fechaNacimiento: PropTypes.string,
    telefono: PropTypes.string,
    correo: PropTypes.string,
    trabajadorId: PropTypes.number.isRequired,
    patologias: PropTypes.string,
    alergias: PropTypes.string,
    cirugias: PropTypes.string,
    medicamentos: PropTypes.string,
    peso: PropTypes.number,
    altura: PropTypes.number
  }).isRequired,
  trabajadorOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  handleClose: PropTypes.func.isRequired
}

export default FormPacienteBeneficiario
