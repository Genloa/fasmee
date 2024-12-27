import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import FormPaciente from '../../../forms/FormPaciente'
import { pacienteSchema } from '../../../validations/pacienteSchema'

function ModalCreatePaciente({ handleTipoPaciente, handleCloseModalCreatePaciente }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombres: '',
      apellidos: '',
      tipoCedula: 'V',
      cedula: '',
      fechaNacimiento: '',
      telefono: '',
      correo: '',
      enteId: null,
      trabajadorId: null,
      patologias: '',
      alergias: '',
      cirugias: '',
      medicamentos: '',
      peso: 0.0,
      altura: 0.0
    },
    resolver: zodResolver(pacienteSchema)
  })

  const onSubmit = async (data) => {
    try {
      await window.api.createPaciente(data)
      reset()
      handleCloseModalCreatePaciente('Paciente creado correctamente')
    } catch (error) {
      console.error('Error creating paciente:', error)
    }
  }

  return (
    <div
      className="modal fade"
      id="modal-create-paciente"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitleId">
              Crear paciente ({handleTipoPaciente == 'T' ? 'Trabajador' : 'Beneficiario'})
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="form-create-paciente" onSubmit={handleSubmit(onSubmit)}>
              <FormPaciente
                register={register}
                control={control}
                setValue={setValue}
                dirtyFields={dirtyFields}
                errors={errors}
                tipoPaciente={handleTipoPaciente}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" form="form-create-paciente">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ModalCreatePaciente.propTypes = {
  handleTipoPaciente: PropTypes.string.isRequired,
  handleCloseModalCreatePaciente: PropTypes.func.isRequired
}

export default ModalCreatePaciente
