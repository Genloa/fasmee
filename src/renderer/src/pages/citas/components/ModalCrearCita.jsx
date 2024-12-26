import { Toast } from 'bootstrap'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormCita from '../forms/FormCita'

function ModalCrearCita({ show, handleClose, fetchCitasPacientes, departamentos, medicos }) {
  //  const [citasPacientes, setCitasPaciente] = useState([])
  //const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

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

  const onSubmitCita = async (data) => {
    console.log(data)
    fetchCitasPacientes()
    setShowToast(true)
    handleClose(true)
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
              <FormCita
                onSubmit={onSubmitCita}
                defaultValues={defaultValues}
                departamentos={departamentos}
                medico={medicos}
                mode="create"
                handleClose={handleClose}
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
          <div className="toast-body"></div>
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
