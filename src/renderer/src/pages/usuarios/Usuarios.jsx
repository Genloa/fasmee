import { faTrashCan, faUserPen, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from 'bootstrap'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import Dash from '../../components/layouts/Dash'
import { userSchema } from '../../validations/userSchema'
function Usuarios() {
  return (
    <>
      <Dash>
        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title">Usuarios</h5>
            <div className="form-floating mb-3 mt-5">
              <input
                type="search"
                className="form-control"
                id="floatingInput"
                placeholder="Buscar"
                aria-label="Buscar"
              />
              <label htmlFor="floatingInput">Buscar Usuario</label>
            </div>
            <div className="mt-5">
              <div className="text-end mb-3">
                <ModalCreate />
              </div>
              <TableUsers />
            </div>
          </div>
        </div>
      </Dash>
    </>
  )
}

function ModalCreate() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: zodResolver(userSchema)
  })

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const handleCloseAndNavigate = () => {
    return <Navigate to="/dash/users" replace={true} />
  }

  const onSubmit = async (data) => {
    try {
      let usuario = await window.api.createUsuario(data)
      console.log(usuario)
      reset()

      // Cerrar el modal actual
      const currentModal = Modal.getInstance(document.getElementById('exampleModal'))
      currentModal.hide()

      // Abrir el nuevo modal
      const successModal = new Modal(document.getElementById('exampleModal2'))
      successModal.show()
    } catch (error) {
      console.error('Error al crear usuario:', error)
    }
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Crear Usuario
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crear Usuario
              </h1>
              <button
                type="submit"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body m-2">
              <form onSubmit={handleSubmit(onSubmit)} className="row g-3" id="form-create-user">
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="text"
                        id="nombres"
                        className={getInputClassName('nombres')}
                        placeholder="Nombres"
                        aria-label="nombres"
                        {...register('nombres')}
                      />
                      <label htmlFor="nombres">Nombres</label>
                      {errors.nombres?.message && (
                        <div className="invalid-feedback">{errors.nombres?.message}</div>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="text"
                        className={getInputClassName('apellidos')}
                        placeholder="apellidos"
                        aria-label="apellidos"
                        {...register('apellidos')}
                      />
                      <label htmlFor="apellidos">Apellidos</label>
                      {errors.apellidos?.message && (
                        <div className="invalid-feedback">{errors.apellidos?.message}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="input-group  col">
                    <select
                      className={`form-select flex-grow-0 bg-light ${errors.tipocedula ? 'is-invalid' : ''}`}
                      style={{ width: '60px' }}
                      aria-label="Tipo de documento"
                      {...register('tipoCedula')}
                    >
                      <option value="V">V</option>
                      <option value="E">E</option>
                    </select>
                    <input
                      type="text"
                      id="cedula"
                      className={getInputClassName('cedula')}
                      placeholder="Cedula"
                      aria-label="Cedula"
                      aria-describedby="basic-addon1"
                      {...register('cedula')}
                    />
                    {errors.cedula?.message && (
                      <div className="invalid-feedback">{errors.cedula?.message}</div>
                    )}
                  </div>

                  <div className="col">
                    <input
                      type="text"
                      id="username"
                      className={getInputClassName('username')}
                      placeholder="Nombre de Usuario"
                      aria-label="Username"
                      {...register('username')}
                    />
                    {errors.username?.message && (
                      <div className="invalid-feedback">{errors.username?.message}</div>
                    )}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="floatingPassword"
                        className={` ${getInputClassName('password')}`}
                        placeholder="password"
                        {...register('password')}
                      />
                      <label htmlFor="floatingPassword">Contraseña</label>

                      {errors.password?.message && (
                        <div className="invalid-feedback">{errors.password?.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="floatingPassword"
                        className={getInputClassName('confirmtPassword')}
                        placeholder="password"
                        {...register('confirmtPassword')}
                      />
                      <label htmlFor="floatingPassword">Confirmar contraseña</label>
                      {errors.confirmtPassword?.message && (
                        <div className="invalid-feedback">{errors.confirmtPassword?.message}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className=" col ">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="form-check-label ms-2" htmlFor="exampleCheck1">
                      Mostrar contraseña.
                    </label>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="date"
                        className={getInputClassName('fechaNacimiento')}
                        id="floatingDate"
                        placeholder="fechaNacimiento"
                        {...register('fechaNacimiento')}
                      />
                      <label htmlFor="floatingDate"> fecha de nacimiento</label>
                      {errors.fechaNacimiento?.message && (
                        <div className="invalid-feedback">{errors.fechaNacimiento?.message}</div>
                      )}
                    </div>
                  </div>
                  <div className="input-group  col">
                    <select
                      className={`form-select flex-grow-0 bg-light ${errors.extension ? 'is-invalid' : ''}`}
                      style={{ width: '90px' }}
                      aria-label="Tipo de documento"
                      {...register('extension')}
                    >
                      <option value="0416">0416</option>
                      <option value="0426">0426</option>
                      <option value="0424">0424</option>
                      <option value="0414">0414</option>
                      <option value="0412">0412</option>
                    </select>
                    <input
                      type="phone"
                      className={getInputClassName('telefono')}
                      aria-label="Telefono"
                      aria-describedby="basic-addon1"
                      {...register('telefono')}
                    />
                    {errors.telefono?.message && (
                      <div className="invalid-feedback">{errors.telefono?.message}</div>
                    )}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="email"
                        className={getInputClassName('correo')}
                        id="correo"
                        placeholder="correo"
                        {...register('correo')}
                      />
                      <label htmlFor="correo">Correo</label>
                      {errors.correo?.message && (
                        <div className="invalid-feedback">{errors.correo?.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-target="#exampleModal2"
                form="form-create-user"
              >
                Guardar Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal2"
        aria-hidden="true"
        aria-labelledby="exampleModal2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Usuario Creado
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-center">El Usuario fue creado correctamente.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleCloseAndNavigate}
                className="btn btn-primary"
                data-bs-toggle="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TableUsers() {
  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState(null)

  const fetchUsers = async () => {
    const fetchedUsers = await window.api.getUsuarios()
    setUsers(fetchedUsers)
    setUserSelected(fetchedUsers[0])
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  function handleEditUser(id) {
    let user = users.find((user) => user.id === id)
    setUserSelected(user)
    let modal = new Modal(document.getElementById('modal-edit-user'))
    modal.show()
  }

  function handleDeleteUser(id) {
    let user = users.find((user) => user.id === id)
    setUserSelected(user)
    let modal = new Modal(document.getElementById('modal-delete-user'))
    modal.show()
  }

  return (
    <div
      className="scrollspy-example bg-light-tertiary rounded-2"
      style={{ maxHeight: '300px', overflowY: 'auto' }}
    >
      {/* Modals */}

      {userSelected && (
        <div
          className="modal fade"
          id="modal-edit-user"
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
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="modalTitleId">
                  Editar Usuario
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{userSelected.Perfil.nombres}</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {userSelected && (
        <div
          className="modal fade"
          id="modal-delete-user"
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
                  Eliminar usuario
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{userSelected.Perfil.nombres}</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="table table-sm table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Nombre y Apellido</th>
            <th scope="col">Usuario</th>
            <th scope="col">Rol</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.Perfil.nombres} {user.Perfil.apellidos}
              </td>
              <td>{user.username}</td>
              <td>ROL</td>
              <td className="text-end">
                <button type="button" className="btn btn-sm btn-primary me-2">
                  <FontAwesomeIcon icon={faUsersGear} className="fs-5" />
                </button>
                <div className="btn-group btn-group-sm" role="group" aria-label="Button group name">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Usuarios
