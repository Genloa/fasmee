import { Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import FormAmbulancia from '../../../forms/FormAmbulancia'

export default function ModalAmbulancia({ show, handleClose, handleShowToast }) {
  const [toastMessage] = useState('')
  const [showToast] = useState(false)

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToastCrear')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  const defaultValues = {
    pacienteId: 0,
    paramedicoId: 0,
    fechaUso: '',
    detalles: ''
  }

  const onSubmit = async (data, resetForm) => {
    try {
      const consulta = await window.api.createHistorialAmbulancia(data)
      if (consulta) {
        handleShowToast('Registro de ambulancia guardado correctamente')
        handleClose(true)
        resetForm()
      } else {
        handleShowToast('No se pudo guardar registo')
      }
    } catch (error) {
      console.error('Error creando registro:', error)
    }
  }
  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-consulta-nutricion"
        tabIndex="-1"
        aria-labelledby="modal-consulta-nutricion-label"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-consulta-nutricion-label">
                Registro Uso de Ambulancia
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <FormAmbulancia
                onSubmit={onSubmit}
                defaultValues={defaultValues}
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastCrear"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notificación</strong>
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

ModalAmbulancia.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShowToast: PropTypes.func.isRequired
}
