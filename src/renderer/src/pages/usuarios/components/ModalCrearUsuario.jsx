import { useContext } from 'react'
import PropTypes from 'prop-types'
import { UsuariosContext } from '../Usuarios'
import FormUsuario from '../../../forms/FormUsuario'

function ModalCrearUsuario({ show, handleClose, fetchUsers, handleShowToast }) {
  const { usuarios, setUsuarios } = useContext(UsuariosContext)

  // FORM VALIDATION
  const defaultValues = {
    nombres: '',
    apellidos: '',
    tipoCedula: 'V',
    cedula: '',
    username: '',
    password: '',
    confirmtPassword: '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
    departamentoId: 0
  }

  const onSubmit = async (data, resetForm) => {
    try {
      let usuario = await window.api.createUsuario(data)
      if (usuario) {
        handleClose(true)
        handleShowToast('Usuario creado correctamente')
        fetchUsers() // Llamar a fetchUsers después de crear el usuario
        resetForm() // Resetear el formulario después de crear el usuario
        setUsuarios([...usuarios, usuario])
      } else {
        handleShowToast('No se pudo crear el usuario')
      }
    } catch (error) {
      console.error('Error creando la usuario:', error)
    }
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show' : ''}`}
        id="modal-create-usuario"
        tabIndex="-1"
        aria-labelledby="modal-create-usuario-label"
        aria-hidden={!show}
        style={{ display: show ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-create-usuario-label">
                Crear Usuario
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
              <FormUsuario
                onSubmit={onSubmit}
                defaultValues={defaultValues}
                mode="create"
                handleClose={handleClose}
                isEdit={false} // Añadir esta línea
              />
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalCrearUsuario.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  handleShowToast: PropTypes.func.isRequired
}

export default ModalCrearUsuario
