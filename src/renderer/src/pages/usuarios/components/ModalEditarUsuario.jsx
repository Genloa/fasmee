import { useContext } from 'react'
import PropTypes from 'prop-types'
import { UsuariosContext } from '../Usuarios'
import FormUsuario from '../../../forms/FormUsuario'

function ModalEditarUsuario({ show, handleClose, fetchUsers, usuarioSelected, handleShowToast }) {
  const { usuarios, setUsuarios } = useContext(UsuariosContext)

  // FORM VALIDATION
  const defaultValues = {
    nombres: usuarioSelected.perfil?.nombres || '',
    apellidos: usuarioSelected.perfil?.apellidos || '',
    tipoCedula: usuarioSelected.perfil?.tipo_cedula || 'V',
    cedula: usuarioSelected.perfil?.cedula || '',
    username: usuarioSelected?.username || '',
    password: usuarioSelected?.password || '',
    confirmtPassword: usuarioSelected?.password || '',
    fechaNacimiento: usuarioSelected.perfil?.fecha_nacimiento
      ? new Date(usuarioSelected.perfil.fecha_nacimiento).toISOString().split('T')[0]
      : '',
    telefono: usuarioSelected.perfil?.telefono || '',
    correo: usuarioSelected.perfil?.correo || '',
    departamentoId: usuarioSelected.perfil?.departamento.id || 0
  }

  const onSubmit = async (data, resetForm) => {
    try {
      let usuario = await window.api.updateUsuario(usuarioSelected.id, data)
      if (usuario) {
        handleClose(true)
        handleShowToast('Usuario editado correctamente')
        fetchUsers()
        resetForm() // Resetear el formulario después de crear la cita
        setUsuarios([...usuarios, usuario])
      } else {
        handleShowToast('No se pudo editar el usuario')
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
            <div className="modal-header bg-primary text-white">
              <h1 className="modal-title fs-5" id="modal-create-usuario-label">
                Editar Usuario {usuarioSelected?.perfil.nombres} {usuarioSelected?.perfil.apellidos}
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
                mode="edit"
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalEditarUsuario.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  usuarioSelected: PropTypes.object.isRequired,
  handleShowToast: PropTypes.func.isRequired
}

export default ModalEditarUsuario
