import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

function FormPaciente({ register, control, setValue, dirtyFields, errors, tipoPaciente }) {
  const [entes, setEntes] = useState([])
  const [trabajadores, setTrabajadores] = useState([])

  const fetchEntes = async () => {
    try {
      const fetchedEntes = await window.api.getEntes()
      setEntes(fetchedEntes)
    } catch (error) {
      console.error('Error fetching entes:', error)
    }
  }

  const fetchTrabajadores = async () => {
    try {
      const fetchedTrabajadores = await window.api.getTrabajadores()
      setTrabajadores(fetchedTrabajadores)
    } catch (error) {
      console.error('Error fetching trabajadores:', error)
    }
  }

  useEffect(() => {
    fetchEntes()
    fetchTrabajadores()
  }, [])

  const enteOptions = entes.map((ente) => ({
    value: ente.id,
    label: ente.nombre
  }))

  const trabajadorOptions = trabajadores.map((trabajador) => ({
    value: trabajador.id,
    label: trabajador.cedula
  }))

  // Utils
  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  return (
    <div className="row g-3">
      <div className="col-6">
        <div className="form-floating">
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
      <div className="col-6">
        <div className="form-floating">
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
      <div className="col-12">
        <div className="input-group">
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
      <div className="col-4">
        <div className="form-floating">
          <input
            type="date"
            className={getInputClassName('fechaNacimiento')}
            id="floatingDate"
            placeholder="fechaNacimiento"
            {...register('fechaNacimiento')}
          />
          <label htmlFor="floatingDate">Fecha de nacimiento</label>
          {errors.fechaNacimiento?.message && (
            <div className="invalid-feedback">{errors.fechaNacimiento?.message}</div>
          )}
        </div>
      </div>
      <div className="col-4">
        <div className="form-floating">
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
      <div className="col-4">
        <div className="form-floating">
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

      {tipoPaciente === 'T' && (
        <div className="col-12">
          <Controller
            control={control}
            name="enteId"
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={enteOptions}
                  placeholder="Seleccionar Ente"
                  isClearable
                  value={enteOptions.find((option) => option.value === field.value)}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption)
                    setValue('enteId', selectedOption ? selectedOption.value : null)
                  }}
                />
                {errors.enteId && (
                  <div className="invalid-feedback d-block">{errors.enteId.message}</div>
                )}
              </div>
            )}
          />
        </div>
      )}

      {tipoPaciente === 'B' && (
        <div className="col-12">
          <Controller
            name="trabajadorId"
            control={control}
            render={({ field }) => (
              <div>
                <Select
                  {...field}
                  options={trabajadorOptions}
                  placeholder="Buscar Trabajador"
                  isClearable
                  value={trabajadorOptions.find((option) => option.value === field.value)}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption)
                    setValue('trabajadorId', selectedOption ? selectedOption.value : null)
                  }}
                />
                {errors.trabajadorId && (
                  <div className="invalid-feedback d-block">{errors.trabajadorId.message}</div>
                )}
              </div>
            )}
          />
        </div>
      )}
      <h6 className="text-center text-body-secondary">Informacion Medica</h6>
      <div className="col-6">
        <div className="form-floating">
          <input
            type="text"
            id="patologias"
            className={getInputClassName('patologias')}
            placeholder="patologias"
            aria-label="patologias"
            {...register('patologias')}
          />
          <label className="z-0" htmlFor="patologias">
            Patologias
          </label>
          {errors.patologias?.message && (
            <div className="invalid-feedback">{errors.patologias?.message}</div>
          )}
        </div>
      </div>
      <div className="col-6">
        <div className="form-floating">
          <input
            type="text"
            id="alergias"
            className={getInputClassName('alergias')}
            placeholder="alergias"
            aria-label="alergias"
            {...register('alergias')}
          />
          <label className="z-0" htmlFor="alergias">
            Alergias
          </label>
          {errors.alergias?.message && (
            <div className="invalid-feedback">{errors.alergias?.message}</div>
          )}
        </div>
      </div>
      <div className="col-6">
        <div className="form-floating">
          <input
            type="text"
            id="cirugias"
            className={getInputClassName('cirugias')}
            placeholder="cirugias"
            aria-label="cirugias"
            {...register('cirugias')}
          />
          <label className="z-0" htmlFor="cirugias">
            Cirugias
          </label>
          {errors.cirugias?.message && (
            <div className="invalid-feedback">{errors.cirugias?.message}</div>
          )}
        </div>
      </div>
      <div className="col-6">
        <div className="form-floating">
          <input
            type="text"
            id="medicamentos"
            className={getInputClassName('medicamentos')}
            placeholder="medicamentos"
            aria-label="medicamentos"
            {...register('medicamentos')}
          />
          <label className="z-0" htmlFor="medicamentos">
            Medicamentos
          </label>
          {errors.medicamentos?.message && (
            <div className="invalid-feedback">{errors.medicamentos?.message}</div>
          )}
        </div>
      </div>
      <div className="col-6">
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
          <label className="z-0" htmlFor="peso">
            Peso
          </label>
          {errors.peso?.message && <div className="invalid-feedback">{errors.peso?.message}</div>}
        </div>
      </div>
      <div className="col-6">
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
          <label className="z-0" htmlFor="altura">
            Altura
          </label>
          {errors.altura?.message && (
            <div className="invalid-feedback">{errors.altura?.message}</div>
          )}
        </div>
      </div>
    </div>
  )
}

FormPaciente.propTypes = {
  register: PropTypes.func,
  control: PropTypes.object,
  setValue: PropTypes.func,
  dirtyFields: PropTypes.object,
  errors: PropTypes.object,
  tipoPaciente: PropTypes.string
}

export default FormPaciente
