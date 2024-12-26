import { Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import FormPacienteBeneficiario from '../../../forms/FormPacienteBeneficiario'
import { PacientesContext } from '../Pacientes'

function ModalEditBeneficiario({ show, handleClose, fetchPacientes, pacienteSelected }) {
  const { setPacientes } = useContext(PacientesContext)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const [trabajadores, setTrabajadores] = useState([])

  // HOOK

  useEffect(() => {
    fetchTrabajadores()
  }, [])

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToastCrear')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  const trabajadorOptions = trabajadores.map((trabajador) => ({
    value: trabajador.id,
    label: trabajador.cedula
  }))

  // FETCH
  const fetchTrabajadores = async () => {
    const fetchedTrabajadores = await window.api.getTrabajadores()
    setTrabajadores(fetchedTrabajadores)
  }

  const findTrabajadorIdByBeneficiarioId = (trabajadores, beneficiarioId) => {
    for (const trabajador of trabajadores) {
      if (trabajador.beneficiarios && Array.isArray(trabajador.beneficiarios)) {
        const beneficiario = trabajador.beneficiarios.find((b) => b.id === beneficiarioId)
        if (beneficiario) {
          return trabajador.id
        }
      }
    }
    return null // Return null if beneficiarioId is not found
  }

  // FORM VALIDATION colocar algo que me traiga el trabajador id puede ser con el trabajador.beneficiarios.id
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
    trabajadorId: findTrabajadorIdByBeneficiarioId(trabajadores, pacienteSelected.id) || 0,
    patologias: pacienteSelected.perfilMedico.patologias,
    alergias: pacienteSelected.perfilMedico.alergias,
    cirugias: pacienteSelected.perfilMedico.cirugias,
    medicamentos: pacienteSelected.perfilMedico.medicamentos,
    peso: pacienteSelected.perfilMedico.peso,
    altura: pacienteSelected.perfilMedico.altura
  }

  const onSubmitBeneficiario = async (data) => {
    let beneficiario = await window.api.updatePacienteBeneficiario(data, pacienteSelected.id)

    fetchPacientes()
    if (beneficiario) {
      setPacientes((prevPacientes) =>
        prevPacientes.map((p) => (p.id === beneficiario.id ? beneficiario : p))
      )
      setToastMessage('Beneficiario creado correctamente')
    } else {
      setToastMessage('No se pudo crear el usuario')
    }

    setShowToast(true)
    handleClose(true)
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-create-trabajador"
        tabIndex="-1"
        aria-labelledby="modal-create-paciente-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-paciente-label">
                Editar Paciente Beneficiario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <FormPacienteBeneficiario
                onSubmit={onSubmitBeneficiario}
                defaultValues={defaultValues}
                trabajadorOptions={trabajadorOptions}
                mode="edit"
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToastCrear"
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

ModalEditBeneficiario.propTypes = {
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

export default ModalEditBeneficiario
