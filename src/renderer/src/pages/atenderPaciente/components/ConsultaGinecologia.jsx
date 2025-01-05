import PropTypes from 'prop-types'

export default function ConsultaGinecologia({ show, handleClose, pacienteId }) {
  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-consulta-nutricion"
        tabIndex="-1"
        aria-labelledby="modal-consulta-nutricion-label"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-consulta-nutricion-label">
                Consulta Ginecologia {pacienteId}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">{/* Contenido del modal */}</div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ConsultaGinecologia.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  pacienteId: PropTypes.number.isRequired
}
