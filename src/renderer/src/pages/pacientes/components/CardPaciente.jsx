import { faCameraRetro, faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import propTypes from 'prop-types'
import pacienteImg from '../../../assets/img/paciente.jpg'

export default function CardPaciente({
  paciente,
  handleOpenModalTakePhoto,
  handleOpenModalEditPaciente,
  handleOpenModalDeletePaciente
}) {
  return (
    <div className="card border-white text-center shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="card-body">
        <div className="text-center">
          <img
            src={paciente?.profilePhotoPath ?? pacienteImg}
            className="img-fluid rounded-circle"
          />
        </div>
        <h5 className="card-title">
          {paciente.nombres} {paciente.apellidos}
        </h5>
        {paciente.enteId ? (
          <div className="card-text">Trabajador</div>
        ) : (
          <div className="card-text">Beneficiario</div>
        )}
        <div className="btn-group btn-group-sm mt-2" role="group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleOpenModalTakePhoto(paciente)}
          >
            <FontAwesomeIcon icon={faCameraRetro} className="fs-5" />
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleOpenModalEditPaciente(paciente)}
          >
            <FontAwesomeIcon icon={faUserPen} className="fs-5" />
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleOpenModalDeletePaciente(paciente)}
          >
            <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

CardPaciente.propTypes = {
  paciente: propTypes.object.isRequired,
  handleOpenModalTakePhoto: propTypes.func.isRequired,
  handleOpenModalEditPaciente: propTypes.func.isRequired,
  handleOpenModalDeletePaciente: propTypes.func.isRequired
}
