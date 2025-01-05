import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import FormCita from '../../../forms/FormCita'
import { CitasPacientesContext } from '../Citas'

function ModalEditCita({
  show,
  handleClose,
  fetchCitasPacientes,
  departamentos,
  medicos,
  citaSelected,
  handleShowToast
}) {
  const { setCitasPaciente } = useContext(CitasPacientesContext)
  const [alertMessage, setAlertMessage] = useState('')

  const onSubmitCita = async (data, resetForm) => {
    try {
      const disponibilidadCita = await window.api.validateCita(data)

      if (disponibilidadCita) {
        console.log(data)
        console.log(citaSelected.id)
        const updatedCita = await window.api.updateCita(citaSelected.id, data)
        console.log('Cita actualizada:', updatedCita)
        if (updatedCita) {
          setCitasPaciente((prevCitas) =>
            prevCitas.map((paciente) =>
              paciente.id === updatedCita.pacienteId
                ? {
                    ...paciente,
                    citasSolicitadas: paciente.citasSolicitadas.map((cita) =>
                      cita.id === updatedCita.id ? updatedCita : cita
                    )
                  }
                : paciente
            )
          )
          fetchCitasPacientes()
          handleShowToast('Cita actualizada correctamente')
          handleClose(true)
          resetForm()
          setAlertMessage('')
        } else {
          handleShowToast('No se pudo actualizar la cita')
        }
      } else {
        setAlertMessage('No hay disponibilidad para la fecha seleccionada.')
      }
    } catch (error) {
      console.error('Error actualizando la cita:', error)
    }
  }

  const defaultValue = {
    fechaCita: citaSelected.fecha_cita
      ? new Date(citaSelected.fecha_cita).toISOString().split('T')[0]
      : '',
    pacienteId: citaSelected.pacienteId || 0,
    departamentoId: citaSelected.departamentoId || 0,
    medicoId: citaSelected.perfilId || 0
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-edit-cita"
        tabIndex="-1"
        aria-labelledby="modal-edit-cita-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-edit-cita-label">
                Editar Cita
              </h1>
              <button
                type="submit"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              {alertMessage && (
                <div className="alert alert-danger" role="alert">
                  {alertMessage}
                </div>
              )}
              <FormCita
                onSubmit={onSubmitCita}
                defaultValues={defaultValue}
                departamentos={departamentos}
                medicos={medicos}
                mode="edit"
                handleClose={handleClose}
                clearAlert={() => setAlertMessage('')}
              />
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalEditCita.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchCitasPacientes: PropTypes.func.isRequired,
  departamentos: PropTypes.array.isRequired,
  medicos: PropTypes.array.isRequired,
  citaSelected: PropTypes.object.isRequired,
  handleShowToast: PropTypes.func.isRequired
}

export default ModalEditCita
