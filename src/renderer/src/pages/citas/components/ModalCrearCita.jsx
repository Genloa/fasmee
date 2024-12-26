import { Toast } from 'bootstrap'
import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormCita from '../../../forms/FormCita'
import { CitasPacientesContext } from '../Citas'

function ModalCrearCita({ show, handleClose, fetchCitasPacientes, departamentos, medicos }) {
  const { citasPacientes, setCitasPaciente } = useContext(CitasPacientesContext) // Desestructurar el contexto correctamente
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  // HOOK

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToastCrear')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  // FORM VALIDATION
  const defaultValues = {
    fechaCita: '',
    pacienteId: 0,
    departamentoId: 0,
    medicoId: 0
  }

  const onSubmitCita = async (data, resetForm) => {
    try {
      console.log(data)
      const disponibilidadCita = await window.api.validateCita(data)
      if (disponibilidadCita) {
        const nuevaCita = await window.api.createCita(data)
        console.log('Cita creada:', nuevaCita)
        if (nuevaCita) {
          setCitasPaciente([...citasPacientes, nuevaCita])
          fetchCitasPacientes()
          setToastMessage('Cita creada correctamente')
          setShowToast(true)
          handleClose(true)
          resetForm() // Resetear el formulario después de crear la cita
          setAlertMessage('') // Ocultar el mensaje de alerta
        } else {
          setToastMessage('No se pudo Crear Cita')
        }
      } else {
        setAlertMessage('No hay disponibilidad para la fecha seleccionada.')
      }
    } catch (error) {
      console.error('Error creando la cita:', error)
    }
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-create-trabajador"
        tabIndex="-1"
        aria-labelledby="modal-create-paciente-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-paciente-label">
                Crear Cita
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
                defaultValues={defaultValues}
                departamentos={departamentos}
                medicos={medicos} // Cambiar medico a medicos
                mode="create"
                handleClose={handleClose}
                clearAlert={() => setAlertMessage('')} // Pasar la función para limpiar el mensaje de alerta
              />
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastCrear"
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
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </>
  )
}

ModalCrearCita.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchCitasPacientes: PropTypes.func.isRequired,
  departamentos: PropTypes.array.isRequired,
  medicos: PropTypes.array.isRequired
}

export default ModalCrearCita
