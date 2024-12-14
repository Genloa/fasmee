import { Toast } from 'bootstrap'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormPacienteTrabajador from '../../../forms/FormPacienteTrabajador'

function ModalCrearTrabajador({ show, handleClose, fetchPacientes, pacienteSelected }) {
  const [pacientes, setPacientes] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  const [showToastTrabajador, setShowToastTrabajador] = useState(false)
  const [entes, setEntes] = useState([])

  // HOOK

  useEffect(() => {
    fetchEntes()
  }, [])

  useEffect(() => {
    if (showToastTrabajador) {
      const toastdor = document.getElementById('liveToastCrearTrabajdor')
      const toast = new Toast(toastdor)
      toast.show()
    }
  }, [showToastTrabajador])

  const enteOptions = entes.map((ente) => ({
    value: ente.id,
    label: ente.nombre
  }))

  // FETCH
  const fetchEntes = async () => {
    try {
      const fetchedEntes = await window.api.getEntes()
      setEntes(fetchedEntes)
    } catch (error) {
      console.error('Error fetching entes:', error)
    }
  }

  // FORM VALIDATION
  const defaultValues = {
    nombres: pacienteSelected.nombres,
    apellidos: pacienteSelected.apellidos,
    tipoCedula: pacienteSelected.tipoCedula,
    cedula: pacienteSelected.cedula,
    fechaNacimiento: pacienteSelected.fechaNacimiento,
    telefono: pacienteSelected.telefono,
    correo: pacienteSelected.correo,
    enteId: pacienteSelected.enteId,
    patologias: pacienteSelected.patologias,
    alergias: pacienteSelected.alergias,
    cirugias: pacienteSelected.cirugias,
    medicamentos: pacienteSelected.medicamentos,
    peso: pacienteSelected.peso,
    altura: pacienteSelected.altura
  }

  const onSubmitTrabajador = async (data) => {
    let pacienteTrabajador = await window.api.createPacienteTrabajador(data)
    fetchPacientes()
    if (pacienteTrabajador) {
      setPacientes([...pacientes, pacienteTrabajador])
      setToastMessage('Trabajador creado correctamente')
      console.log(pacientes)
    } else {
      setToastMessage('No se pudo crear el usuario')
    }
    setShowToastTrabajador(true)
    handleClose(true)
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-create-trabajador"
        tabIndex="-1"
        aria-labelledby="modal-create-trabajador-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-trabajador-label">
                Crear Paciente Trabajador
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
              <FormPacienteTrabajador
                onSubmit={onSubmitTrabajador}
                defaultValues={defaultValues}
                enteOptions={enteOptions}
                mode="create"
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastCrearTrabajdor"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notificacion</strong>
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

ModalCrearTrabajador.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchPacientes: PropTypes.func.isRequired,
  pacienteSelected: PropTypes.shape({
    id: PropTypes.number,
    nombres: PropTypes.string,
    apellidos: PropTypes.string,
    tipoCedula: PropTypes.string,
    cedula: PropTypes.string,
    fechaNacimiento: PropTypes.string,
    telefono: PropTypes.string,
    correo: PropTypes.string,
    enteId: PropTypes.number.isRequired,
    patologias: PropTypes.string,
    alergias: PropTypes.string,
    cirugias: PropTypes.string,
    medicamentos: PropTypes.string,
    peso: PropTypes.number,
    altura: PropTypes.number
  }).isRequired
}

export default ModalCrearTrabajador
