import { Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import FormAlmacen from '../../../forms/FormAlmacen'

function ModalCrearAlmacen({ show, handleClose, fetchAlmacenes, handleShowToast }) {
  const [toastMessage] = useState('')
  const [showToast] = useState(false)

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
    cubiculo: '',
    descripcion: ''
  }

  const onSubmitAlmacen = async (data, resetForm) => {
    try {
      const nuevoAlmacen = await window.api.createAlmacen(data)
      if (nuevoAlmacen) {
        fetchAlmacenes() // Actualizar la lista de almacenes
        handleShowToast('Almacen creado correctamente')
        handleClose(true)
        resetForm() // Resetear el formulario después de crear la cita
      } else {
        handleShowToast('No se pudo Crear el Almacen')
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
        aria-labelledby="modal-create-almacen-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-almacen-label">
                Crear almacen
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
              <FormAlmacen
                onSubmit={onSubmitAlmacen}
                defaultValues={defaultValues}
                mode="create"
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
ModalCrearAlmacen.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchAlmacenes: PropTypes.func.isRequired,
  handleShowToast: PropTypes.func.isRequired
}

export default ModalCrearAlmacen
