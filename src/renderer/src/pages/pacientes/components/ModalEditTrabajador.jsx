import { Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import FormPacienteTrabajador from '../../../forms/FormPacienteTrabajador'
import { PacientesContext } from '../Pacientes'

function ModalEditTrabajador({ show, handleClose, fetchPacientes, pacienteSelected }) {
  const { setPacientes } = useContext(PacientesContext)
  const [toastMessage, setToastMessage] = useState('')
  const [showToastTrabajadorEdit, setShowToastTrabajadorEdit] = useState(false)
  const [entes, setEntes] = useState([])

  // HOOK

  useEffect(() => {
    fetchEntes()
  }, [])

  useEffect(() => {
    if (showToastTrabajadorEdit) {
      const toastEdit = document.getElementById('liveToastEditarTrabajador')
      const toast = new Toast(toastEdit)
      toast.show()
    }
  }, [showToastTrabajadorEdit])

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
    fechaNacimiento: pacienteSelected.fecha_nacimiento
      ? new Date(pacienteSelected.fecha_nacimiento).toISOString().split('T')[0]
      : '',
    telefono: pacienteSelected.telefono,
    correo: pacienteSelected.correo,
    enteId: pacienteSelected.enteId,
    patologias: pacienteSelected.perfilMedico?.patologias || '',
    alergias: pacienteSelected.perfilMedico?.alergias || '',
    cirugias: pacienteSelected.perfilMedico?.cirugias || '',
    medicamentos: pacienteSelected.perfilMedico?.medicamentos || '',
    peso: pacienteSelected.perfilMedico?.peso || 0.0,
    altura: pacienteSelected.perfilMedico?.altura || 0.0
  }

  const onSubmitTrabajador = async (data) => {
    let pacienteTrabajador = await window.api.updatePacienteTrabajador(pacienteSelected.id, data)
    fetchPacientes()
    if (pacienteTrabajador) {
      setPacientes((prevPacientes) =>
        prevPacientes.map((p) => (p.id === pacienteTrabajador.id ? pacienteTrabajador : p))
      )
      setToastMessage('Trabajador actualizado correctamente')
    } else {
      setToastMessage('No se pudo actualizar el trabajador')
    }
    setShowToastTrabajadorEdit(true)
    handleClose(true)
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-edit-trabajador"
        tabIndex="-1"
        aria-labelledby="modal-create-trabajador-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-trabajador-label">
                Editar Paciente Trabajador
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
                mode="edit"
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastEditarTrabajador"
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

ModalEditTrabajador.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchPacientes: PropTypes.func.isRequired,
  pacienteSelected: PropTypes.shape({
    id: PropTypes.number,
    nombres: PropTypes.string,
    apellidos: PropTypes.string,
    tipoCedula: PropTypes.string,
    cedula: PropTypes.string,
    fecha_nacimiento: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    telefono: PropTypes.string,
    correo: PropTypes.string,
    enteId: PropTypes.number.isRequired,
    perfilMedico: PropTypes.shape({
      patologias: PropTypes.string,
      alergias: PropTypes.string,
      cirugias: PropTypes.string,
      medicamentos: PropTypes.string,
      peso: PropTypes.number,
      altura: PropTypes.number
    })
  }).isRequired
}

export default ModalEditTrabajador
