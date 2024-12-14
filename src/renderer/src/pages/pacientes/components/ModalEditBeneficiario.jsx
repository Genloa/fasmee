import { Toast } from 'bootstrap'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormPacienteBeneficiario from '../../../forms/FormPacienteBeneficiario'

function ModalEditBeneficiario({ show, handleClose, fetchPacientes, pacienteSelected }) {
  const [pacientes, setPacientes] = useState([])
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

  // FORM VALIDATION colocar algo que me traiga el trabajador id puede ser con el trabajador.beneficiarios.id
  const defaultValues = {
    nombres: pacienteSelected?.nombres,
    apellidos: pacienteSelected?.apellidos,
    tipoCedula: pacienteSelected?.tipoCedula,
    cedula: pacienteSelected?.cedula,
    fechaNacimiento: pacienteSelected?.fechaNacimiento,
    telefono: pacienteSelected?.telefono,
    correo: pacienteSelected?.correo,
    trabajadorId: 105,
    patologias: pacienteSelected?.patologias,
    alergias: pacienteSelected?.alergias,
    cirugias: pacienteSelected?.cirugias,
    medicamentos: pacienteSelected?.medicamentos,
    peso: pacienteSelected?.peso,
    altura: pacienteSelected?.altura
  }

  const findBeneficiarioInObjects = (dataArray, beneficiarioId) => {
    for (const obj of dataArray) {
      const beneficiario = obj.beneficiarios.find((b) => b.id === beneficiarioId)
      if (beneficiario) {
        return obj.id
      }
    }
    return null // Devuelve null si no se encuentra el beneficiario en ningún objeto
  }

  // Uso de la función
  const objetoId = findBeneficiarioInObjects(pacientes, pacienteSelected.id)
  console.log(objetoId)
  const onSubmitBeneficiario = async (data) => {
    console.log(pacientes)
    let pacienteBeneficiario = await window.api.createPacienteBeneficiario(data)
    fetchPacientes()
    if (pacienteBeneficiario) {
      setPacientes([...pacientes, pacienteBeneficiario])
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
                Crear Paciente Beneficiario
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
    fechaNacimiento: PropTypes.string,
    telefono: PropTypes.string,
    correo: PropTypes.string,
    trabajadorId: PropTypes.number.isRequired,
    patologias: PropTypes.string,
    alergias: PropTypes.string,
    cirugias: PropTypes.string,
    medicamentos: PropTypes.string,
    peso: PropTypes.number,
    altura: PropTypes.number
  }).isRequired
}
