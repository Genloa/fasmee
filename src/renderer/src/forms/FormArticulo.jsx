import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { articuloSchema } from '../validations/articuloSchema'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

function FormArticulo({
    onSubmit,
    defaultValues,
    mode,
    handleClose,
    clearAlert
}) {
    const [inventario, setInventario] = useState([])
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
        resolver: zodResolver(articuloSchema)
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

    return (
        <form className="row g-3" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="row mt-4">
                <div className="col-6">
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
                <div className="row mt-4">
                </div>
                <div className="col-6">
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
                        {errors.cantidad?.message && <div className="invalid-feedback">{errors.cantidad?.message}</div>}
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

FormArticulo.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    defaultValues: PropTypes.shape({
        nombre: PropTypes.string,
        cantidad: PropTypes.number.isRequired,
    }).isRequired,
    mode: PropTypes.oneOf(['create', 'edit']).isRequired,
    handleClose: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired
}

export default FormArticulo
