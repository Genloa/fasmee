import { zodResolver } from '@hookform/resolvers/zod'
import propTypes from 'prop-types'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormPaciente from '../../../forms/FormPaciente'
import { pacienteSchema } from '../../../validations/pacienteSchema'

export default function ModalEditPaciente({ paciente, handleCloseModalEditPaciente }) {
  console.log('ModalEditPaciente', paciente)
  const tipoPaciente = paciente?.enteId != null ? 'T' : 'B'

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombres: paciente?.nombres,
      apellidos: paciente?.apellidos,
      tipoCedula: paciente?.tipoCedula,
      cedula: paciente?.cedula,
      fechaNacimiento: paciente?.fecha_nacimiento
        ? new Date(paciente?.fecha_nacimiento).toISOString().split('T')[0]
        : '',
      telefono: paciente?.telefono,
      correo: paciente?.correo,
      enteId: paciente?.enteId,
      trabajadorId: paciente?.trabajadores[0]?.id,
      patologias: paciente?.perfilMedico.patologias,
      alergias: paciente?.perfilMedico.alergias,
      cirugias: paciente?.perfilMedico.cirugias,
      medicamentos: paciente?.perfilMedico.medicamentos,
      peso: paciente?.perfilMedico.peso,
      altura: paciente?.perfilMedico.altura
    },
    resolver: zodResolver(pacienteSchema)
  })

  useEffect(() => {
    let values = {
      nombres: paciente?.nombres,
      apellidos: paciente?.apellidos,
      tipoCedula: paciente?.tipoCedula,
      cedula: paciente?.cedula,
      fechaNacimiento: paciente?.fecha_nacimiento
        ? new Date(paciente?.fecha_nacimiento).toISOString().split('T')[0]
        : '',
      telefono: paciente?.telefono,
      correo: paciente?.correo,
      enteId: paciente?.enteId,
      trabajadorId: paciente?.trabajadorId,
      patologias: paciente?.perfilMedico.patologias,
      alergias: paciente?.perfilMedico.alergias,
      cirugias: paciente?.perfilMedico.cirugias,
      medicamentos: paciente?.perfilMedico.medicamentos,
      peso: paciente?.perfilMedico.peso,
      altura: paciente?.perfilMedico.altura
    }
    reset(values)
    setValue('trabajadorId', paciente?.trabajadores[0]?.id)
    setValue('enteId', paciente?.enteId)
  }, [paciente])

  const onSubmit = async (data) => {
    try {
      await window.api.updatePaciente(paciente.id, data)
      handleCloseModalEditPaciente('Paciente actualizado correctamente')
    } catch (error) {
      console.error('Error updating paciente:', error)
    }
  }

  return (
    <div
      className="modal fade"
      id="modal-edit-paciente"
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
              Editar paciente {paciente?.nombres} {paciente?.apellidos}{' '}
              {tipoPaciente == 'T' ? 'Trabajador' : 'Beneficiario'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="form-edit-paciente" onSubmit={handleSubmit(onSubmit)}>
              <FormPaciente
                register={register}
                control={control}
                setValue={setValue}
                dirtyFields={dirtyFields}
                errors={errors}
                tipoPaciente={tipoPaciente}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" form="form-edit-paciente">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ModalEditPaciente.propTypes = {
  paciente: propTypes.object,
  handleCloseModalEditPaciente: propTypes.func.isRequired
}
