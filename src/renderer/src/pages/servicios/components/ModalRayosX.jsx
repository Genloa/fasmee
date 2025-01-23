import { Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import FormServicio from '../../../forms/FormServicio'

export default function ModalRayosX({ show, handleClose, departamentoNombre, usuario }) {
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
    fechaMuestra: '',
    detalles: ''
  }

  const onSubmit = async (data) => {
    try {
      const response = await window.api.cargarResultados(data)
      // console.log('response:', response)
      // handleShowToast('Servicio creado exitosamente')
      // resetForm()
    } catch (error) {
      console.error('Error creando servicio:', error)
      // handleShowToast('Error creando servicio')
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
                Registro Resultados {departamentoNombre}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <FormServicio
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

ModalRayosX.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  departamentoNombre: PropTypes.string.isRequired,
  usuario: PropTypes.object.isRequired
}
