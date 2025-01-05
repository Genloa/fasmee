import PropTypes from 'prop-types'

export default function ModalHistorial({ show, handleClose, articuloId }) {
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
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                {articuloId}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>..</p>
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
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalHistorial.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  articuloId: PropTypes.number.isRequired
}
