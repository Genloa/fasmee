import { Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import FormColaPaciente from '../../../forms/FormColaPaciente'
import { ColaPacientesContext } from '../ColaPacientes'

function ModalCrearCola({
  show,
  handleClose,
  fetchColaPacientes,
  departamentos,
  medicos,
  handleShowToast
}) {
  const { ColaPacientes, setColaPacientes } = useContext(ColaPacientesContext) // Desestructurar el contexto correctamente

  const [showToast] = useState(false)
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
    pacienteId: 0,
    departamentoId: 0,
    medicoId: 0
  }

  const onSubmitCola = async (data, resetForm) => {
    try {
      const verificarCita = await window.api.getCitasPacientes()

      let citaValida = verificarCita.some(
        (paciente) =>
          paciente.id === data.pacienteId &&
          paciente.citasSolicitadas.some(
            (cita) =>
              cita.departamentoId === data.departamentoId &&
              ([1, 9, 10].includes(data.departamentoId) || cita.perfilId === data.medicoId) &&
              new Date(cita.fecha_cita).toLocaleDateString() === new Date().toLocaleDateString()
          )
      )
      if (citaValida || [1, 9, 10, 15].includes(data.departamentoId)) {
        const nuevaCola = await window.api.createColaPaciente({
          ...data,
          medicoId: [1, 9, 10, 15].includes(data.departamentoId) ? null : data.medicoId // Asignar null si el departamento es 1, 9, 10 o 15
        })
        if (nuevaCola) {
          setColaPacientes([...ColaPacientes, nuevaCola]) // Usar ColaPacientes en lugar de colaPacientes
          fetchColaPacientes()
          handleShowToast('Paciente Asignado a cola correctamente')
          handleClose(true)
          resetForm() // Resetear el formulario después de crear la cola
          setAlertMessage('') // Ocultar el mensaje de alerta
        } else {
          handleShowToast('No se pudo asignar paciente a cola')
        }
      } else {
        setAlertMessage(
          'El paciente no tiene cita válida para hoy en el departamento y con el médico especificado.'
        )
      }
    } catch (error) {
      console.error('Error creando cola:', error)
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
                Asignar Paciente a Cola
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
              <FormColaPaciente
                onSubmit={onSubmitCola}
                defaultValues={defaultValues}
                departamentos={departamentos}
                medicos={medicos}
                handleClose={handleClose}
                clearAlert={() => setAlertMessage('')} // Pasar la función para limpiar el mensaje de alerta
                mode="create" // Asegúrate de pasar la prop mode
              />
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}
ModalCrearCola.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchColaPacientes: PropTypes.func.isRequired,
  departamentos: PropTypes.array.isRequired,
  medicos: PropTypes.array.isRequired,
  handleShowToast: PropTypes.func.isRequired
}

export default ModalCrearCola
