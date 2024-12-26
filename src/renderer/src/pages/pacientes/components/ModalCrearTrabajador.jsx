import { Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import FormPacienteTrabajador from '../../../forms/FormPacienteTrabajador'
import { PacientesContext } from '../Pacientes'

function ModalCrearTrabajador({ show, handleClose, fetchPacientes }) {
  const { pacientes, setPacientes } = useContext(PacientesContext)
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
    const fetchedEntes = await window.api.getEntes()
    setEntes(fetchedEntes)
  }

  // FORM VALIDATION
  const defaultValues = {
    nombres: '',
    apellidos: '',
    tipoCedula: 'V',
    cedula: '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
    enteId: 0,
    patologias: '',
    alergias: '',
    cirugias: '',
    medicamentos: '',
    peso: 0.0,
    altura: 0.0
  }

  const onSubmitTrabajador = async (data) => {
    let pacienteTrabajador = await window.api.createPacienteTrabajador(data)
    fetchPacientes()
    if (pacienteTrabajador) {
      setPacientes([...pacientes, pacienteTrabajador])
      setToastMessage('Trabajador creado correctamente')
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
  fetchPacientes: PropTypes.func.isRequired
}

export default ModalCrearTrabajador
