import { Toast } from 'bootstrap'
import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormCita from '../../../forms/FormCita'
import { CitasPacientesContext } from '../Citas'

function ModalEditCita({
  show,
  handleClose,
  fetchCitasPacientes,
  departamentos,
  medicos,
  citaSelected
}) {
  const { setCitasPaciente } = useContext(CitasPacientesContext)
  const [toastMessageEdit, setToastMessageEdit] = useState('')
  const [showToastEdit, setShowToastEdit] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    if (showToastEdit) {
      const toastEdit = document.getElementById('liveToastEdit')
      const toastedits = new Toast(toastEdit)
      toastedits.show()
    }
  }, [showToastEdit])

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
          setToastMessageEdit('Cita actualizada correctamente')
          setShowToastEdit(true)
          handleClose(true)
          resetForm()
          setAlertMessage('')
        } else {
          setToastMessageEdit('No se pudo actualizar la cita')
          setShowToastEdit(true)
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
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastEdit"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notificacion</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{toastMessageEdit}</div>
        </div>
      </div>
    </>
  )
}

ModalEditCita.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchCitasPacientes: PropTypes.func.isRequired,
  departamentos: PropTypes.array.isRequired,
  medicos: PropTypes.array.isRequired,
  citaSelected: PropTypes.object.isRequired
}

export default ModalEditCita
