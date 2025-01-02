import propTypes from 'prop-types'
import Webcam from 'react-webcam'

function ModalTakePhoto({ paciente, handleCloseModalTakePhoto }) {
  const videoConstraints = {
    // width: 1280,
    // height: 720,
    facingMode: 'user'
  }

  const savePhoto = async (photo) => {
    try {
      await window.api.createPhoto(paciente?.id, photo)
      handleCloseModalTakePhoto('Foto tomada correctamente')
    } catch (error) {
      console.error('Error taking photo:', error)
    }
  }

  return (
    <div
      className="modal fade"
      id="modal-take-photo"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog" style={{ maxWidth: '80%' }} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitleId">
              Tomar foto al paciente {paciente?.nombres} {paciente?.apellidos}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Webcam
              audio={false}
              // height={720}
              // width={1280}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => savePhoto(getScreenshot())}
                >
                  Capturar foto
                </button>
              )}
            </Webcam>
          </div>
        </div>
      </div>
    </div>
  )
}

ModalTakePhoto.propTypes = {
  paciente: propTypes.object.isRequired,
  handleCloseModalTakePhoto: propTypes.func.isRequired
}

export default ModalTakePhoto
