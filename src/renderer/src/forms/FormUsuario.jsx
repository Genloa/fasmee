import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { resolveSchema } from '../validations/userSchema'

function FormUsuario({ onSubmit, defaultValues, mode, handleClose, isEdit }) {
  const [showPassword, setShowPassword] = useState(false)

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
    resolver: zodResolver(resolveSchema(mode))
  })

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

  useEffect(() => {
    fetchDepartamentos()
  }, [])
  const [departamentos, setDepartamentos] = useState([])

  const fetchDepartamentos = async () => {
    const fetchedDepartamentos = await window.api.getDepartamentos()
    setDepartamentos(fetchedDepartamentos)
  }

  const departamentoOptions = departamentos.map((departamento) => ({
    value: departamento.id,
    label: departamento.nombre
  }))

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmitForm)}>
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
      </div>
      <div className="row mt-4">
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

        <div className="col">
          <input
            type="text"
            id="username"
            className={getInputClassName('username')}
            placeholder="Nombre de Usuario"
            aria-label="Username"
            {...register('username')}
            disabled={isEdit} // Añadir esta línea
          />
          {errors.username?.message && (
            <div className="invalid-feedback">{errors.username?.message}</div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="form-floating ">
            <input
              type={showPassword ? 'text' : 'password'}
              id="floatingPassword"
              className={` ${getInputClassName('password')}`}
              placeholder="password"
              {...register('password')}
            />
            <label htmlFor="floatingPassword">Contraseña</label>

            {errors.password?.message && (
              <div className="invalid-feedback">{errors.password?.message}</div>
            )}
          </div>
        </div>

        <div className="col">
          <div className="form-floating ">
            <input
              type={showPassword ? 'text' : 'password'}
              id="floatingPassword"
              className={getInputClassName('confirmtPassword')}
              placeholder="password"
              {...register('confirmtPassword')}
            />
            <label htmlFor="floatingPassword">Confirmar contraseña</label>
            {errors.confirmtPassword?.message && (
              <div className="invalid-feedback">{errors.confirmtPassword?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className=" col ">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label ms-2" htmlFor="exampleCheck1">
            Mostrar contraseña.
          </label>
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
      </div>
      <div className="row mt-4">
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
                    trigger('departamentoId') // Validar en tiempo real
                  }}
                  isDisabled={isEdit} // Añadir esta línea
                />
                {errors.departamentoId && (
                  <div className="invalid-feedback d-block">{errors.departamentoId.message}</div>
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

FormUsuario.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  handleClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool // Añadir esta línea
}

export default FormUsuario
