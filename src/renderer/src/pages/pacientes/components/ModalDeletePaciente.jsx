import PropTypes from 'prop-types'

export default function ModalDeletePaciente({ paciente, handleCloseModalDeletePaciente }) {
  const deletePaciente = async () => {
    try {
      await window.api.deletePaciente(paciente.id)
      handleCloseModalDeletePaciente('Paciente eliminado')
    } catch (error) {
      console.error('Error deleting paciente:', error)
    }
  }

  return (
    <div
      className="modal fade"
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
              Eliminar paciente
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              ¿Está seguro de eliminar al paciente {paciente?.nombres} {paciente?.apellidos}?
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={() => deletePaciente()}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ModalDeletePaciente.propTypes = {
  paciente: PropTypes.object.isRequired,
  handleCloseModalDeletePaciente: PropTypes.func.isRequired
}
