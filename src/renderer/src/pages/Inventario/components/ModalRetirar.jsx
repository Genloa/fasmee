import PropTypes from 'prop-types'
import FormRetirarArticulo from '../../../forms/FormRetirarArticulo'

export default function ModalRetirar({
  show,
  handleClose,
  articulo,
  fetchInventario,
  handleShowToast
}) {
  const handleSubmit = async (data, resetForm) => {
    try {
      console.log(data)
      const articuloActualizado = await window.api.retirarArticulo(data, articulo)
      console.log('Articulo actualizado:', articuloActualizado)
      if (articuloActualizado) {
        fetchInventario()
        handleShowToast('Retiro realizado correctamente')
        handleClose(true)
        resetForm() // Resetear el formulario después de crear la cita
      } else {
        handleShowToast('No se pudo realizar el retiro')
      }
    } catch (error) {
      console.error('Error retirando el articulo:', error)
    }
  }
  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-delete-paciente"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="modalTitleId">
                Retirar articulo {articulo.nombre}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <FormRetirarArticulo
                onSubmit={handleSubmit}
                defaultValues={{ cantidad: 0 }}
                handleClose={handleClose}
              />
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalRetirar.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  articulo: PropTypes.object.isRequired,
  fetchInventario: PropTypes.func.isRequired,
  handleShowToast: PropTypes.func.isRequired
}
