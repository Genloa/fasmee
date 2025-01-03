import { Toast } from 'bootstrap'
import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormArticulo from '../../../forms/FormArticulo'
import { InventarioContext } from '../Inventario'

function ModalCrearArticulo({
  show,
  handleClose,
  fetchArticulos,
  handleShowToast
}) {
  const { inventario, setInventario } = useContext(InventarioContext) // Desestructurar el contexto correctamente
  const [toastMessage] = useState('')
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
    nombre: '',
    cantidad: 0,
  }

  const onSubmitArticulo = async (data, resetForm) => {
    try {
      console.log(data)
      
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
                Crear Articulo
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
              <FormArticulo
                onSubmit={onSubmitArticulo}
                defaultValues={defaultValues}
                mode="create"
                handleClose={handleClose}
                clearAlert={() => setAlertMessage('')} // Pasar la función para limpiar el mensaje de alerta
              />
            </div>
          </div>
        </div>
      </div>{' '}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        {' '}
        <div
          id="liveToastCrear"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {' '}
          <div className="toast-header">
            {' '}
            <strong className="me-auto">Notificación</strong>{' '}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>{' '}
          </div>{' '}
          <div className="toast-body">{toastMessage}</div>{' '}
        </div>{' '}
      </div>{' '}
    </>
  )
}
ModalCrearArticulo.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchArticulos: PropTypes.func.isRequired,
  handleShowToast: PropTypes.func.isRequired
}

export default ModalCrearArticulo
