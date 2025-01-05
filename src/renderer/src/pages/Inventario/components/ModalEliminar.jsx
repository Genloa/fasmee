import PropTypes from 'prop-types'

export default function ModalEliminar({
  show,
  handleClose,
  articulo,
  fetchInventario,
  handleShowToast
}) {
  const handleDelete = async () => {
    try {
      const articuloActualizado = await window.api.deleteArticulo(articulo.id)
      console.log('Articulo actualizado:', articuloActualizado)
      if (articuloActualizado) {
        fetchInventario()
        handleShowToast('Articulo eliminado correctamente')
        handleClose(true)
      } else {
        handleShowToast('No se pudoe eliminar el articulo')
      }
    } catch (error) {
      console.error('Error eliminando:', error)
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
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="modalTitleId">
                Eliminar {articulo.nombre}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Se elminara tambien el Historial</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalEliminar.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  articuloId: PropTypes.number.isRequired,
  articulo: PropTypes.object.isRequired,
  fetchInventario: PropTypes.func.isRequired,
  handleShowToast: PropTypes.func.isRequired
}
