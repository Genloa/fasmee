import { faTrashCan, faUserPen, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, Toast } from 'bootstrap'
import { createContext, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Dash from '../../components/layouts/Dash'
import { userSchema } from '../../validations/userSchema'
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
const UsuariosContext = createContext({ usuarios: [], setUsuarios: () => {} })

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [showToast, setShowToast] = useState(false)

  const modalCrearUserRef = document.getElementById('modal-create-usuario')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(userSchema)
  })

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  function openModalCrearUser() {
    let modal = new Modal(modalCrearUserRef)
    modal.show()
  }

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToastCrear')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  const onSubmit = async (data) => {
    setShowToast(false)
    let usuario = await window.api.createUsuario(data)
    if (usuario) {
      setUsuarios([...usuarios, usuario])
      setToastMessage('Usuario creado correctamente')
      const modal = Modal.getInstance(modalCrearUserRef)
      modal.hide()
    } else {
      setToastMessage('No se pudo crear el usuario')
    }
    setShowToast(true)
    reset()
  }

  return (
    <Dash>
      <UsuariosContext.Provider value={{ usuarios, setUsuarios }}>
        {/* Modal Create User */}
        <div
          className="modal fade"
          id="modal-create-usuario"
          tabIndex="-1"
          aria-labelledby="modal-create-usuario-label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="modal-create-usuario-label">
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
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="phone"
                          className={getInputClassName('telefono')}
                          aria-label="Telefono"
                          placeholder="Telefono"
                          aria-describedby="basic-addon1"
                          {...register('telefono')}
                        />
                        <label htmlFor="floatingPassword">Telefono</label>
                        {errors.telefono?.message && (
                          <div className="invalid-feedback">{errors.telefono?.message}</div>
                        )}
                      </div>
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
                  {' '}
                  Cancelar{' '}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  form="form-create-user"
                  id="liveToastBtnCrear"
                >
                  Guardar Usuario{' '}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card */}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openModalCrearUser()}
                >
                  Crear Usuario
                </button>
              </div>
              <TableUsers />
            </div>
          </div>
        </div>

        {/* Toast */}
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
      </UsuariosContext.Provider>
    </Dash>
  )
}

function TableUsers() {
  const { usuarios, setUsuarios } = useContext(UsuariosContext)
  const [usuarioSelected, setUsuarioSelected] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [roles, setRoles] = useState([])
  const [selectedRol, setSelectedRol] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(userSchema),
    defaultValues: {
      nombres: '',
      apellidos: '',
      tipoCedula: 'V',
      cedula: '',
      username: '',
      password: '',
      confirmtPassword: '',
      fechaNacimiento: '',
      telefono: '',
      correo: ''
    }
  })

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const modalEditUserRef = document.getElementById('modal-edit-user')
  const modalDeleteUserRef = document.getElementById('modal-delete-user')
  const modalRolUserRef = document.getElementById('modal-rol-user')
  const fetchUsers = async () => {
    const fetchedUsers = await window.api.getUsuarios()
    setUsuarios(fetchedUsers)
    setUsuarioSelected(fetchedUsers[0])
    console.log(fetchedUsers)
  }

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  function openModalEditUser(id) {
    let user = usuarios.find((user) => user.id === id)
    setUsuarioSelected(user)
    let modal = new Modal(modalEditUserRef)
    modal.show()

    reset({
      mode: 'onChange',
      nombres: user.perfil?.nombres || '',
      apellidos: user.perfil?.apellidos || '',
      tipoCedula: user.perfil?.tipo_cedula || 'V',
      cedula: user.perfil?.cedula || '',
      username: user?.username || '',
      password: user?.password || '',
      confirmtPassword: user?.password || '',
      fechaNacimiento: user.perfil?.fecha_nacimiento
        ? new Date(user.perfil.fecha_nacimiento).toISOString().split('T')[0]
        : '',
      telefono: user.perfil?.telefono || '',
      correo: user.perfil?.correo || ''
    })
  }

  function closeModalEditUser() {
    const modal = Modal.getInstance(modalEditUserRef)
    modal.hide()
  }

  function openModalDeleteUser(id) {
    let user = usuarios.find((user) => user.id === id)
    setUsuarioSelected(user)
    let modal = new Modal(modalDeleteUserRef)
    modal.show()
  }

  async function closeModalDeleteUser() {
    try {
      // Eliminar el usuario
      await window.api.deleteUsuario(usuarioSelected.id)

      // Actualizar el estado de usuarios
      setUsuarios(usuarios.filter((user) => user.id !== usuarioSelected.id))

      setToastMessage('Usuario eliminado correctamente')

      // Cerrar el modal
      const modal = Modal.getInstance(modalDeleteUserRef)
      modal.hide()

      // Mostrar el toast
      const toastElement = document.getElementById('liveToast')
      const toast = new Toast(toastElement)
      toast.show()
    } catch (error) {
      console.error('Error al eliminar el usuario:', error)
      // Aquí podrías mostrar un toast de error si lo deseas
    }
  }

  const onSubmit = async (data) => {
    let usuario = await window.api.updateUsuario(usuarioSelected.id, data)
    setUsuarios((prevUsuarios) => prevUsuarios.map((u) => (u.id === usuario.id ? usuario : u)))
    closeModalEditUser()
    setToastMessage('Usuario actualizado correctamente')

    const toastElement = document.getElementById('liveToast')
    const toast = new Toast(toastElement)
    toast.show()
  }

  const handleSelectChange = (event) => {
    setSelectedRol(Number(event.target.value))
  }

  const fetchRoles = async () => {
    const fetchedRoles = await window.api.getRoles()
    setRoles(fetchedRoles)
    console.log(fetchedRoles)
  }
  function openModalRolUser(id) {
    let user = usuarios.find((user) => user.id === id)
    setUsuarioSelected(user)
    let modal = new Modal(modalRolUserRef)
    modal.show()
  }
  const onSubmitRol = async () => {
    try {
      if (!usuarioSelected) {
        throw new Error('Usuario no seleccionados.')
      }

      if (!selectedRol) {
        throw new Error('Rol no seleccionado.')
      }

      const usuario = await window.api.updateUserRol(usuarioSelected.perfil.id, selectedRol)
      console.log(usuario)
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((u) =>
          u.id === usuario.id
            ? {
                ...u,
                perfil: {
                  ...u.perfil,
                  ...usuario.perfil, // Combina el perfil existente con el actualizado, incluyendo roles
                  roles: usuario.perfil.roles // Asegúrate de que los roles se asignen correctamente
                }
              }
            : u
        )
      )
      console.log('todos los usuarios', usuarios)

      setToastMessage('Rol asignado correctamente')

      const modal = Modal.getInstance(modalRolUserRef)
      modal.hide()
      const toastElement = document.getElementById('liveToast')
      const toast = new Toast(toastElement)
      toast.show()
    } catch (error) {
      console.error('Error asignando el rol al usuario:', error)
    }
  }

  return (
    <div
      className="scrollspy-example bg-light-tertiary rounded-2"
      style={{ maxHeight: '300px', overflowY: 'auto' }}
    >
      {/* Modals */}
      <div
        className="modal fade"
        id="modal-rol-user"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="modalTitleId">
                Asignar Rol Usuario {usuarioSelected?.perfil.nombres}{' '}
                {usuarioSelected?.perfil.apellidos}
              </h5>
            </div>
            <div className="modal-body">
              <form className="row g-3" id="form-create-user">
                <div className="row mt-4">
                  <div className="col">
                    <select
                      className="form-select flex-grow-0 bg-light"
                      aria-label="Rol Usuario"
                      value={selectedRol}
                      onChange={handleSelectChange}
                    >
                      {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                          {rol.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                type="button"
                onClick={onSubmitRol}
                className="btn btn-primary"
                form="form-update-user"
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      </div>

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
        <div className="modal-dialog modal-dialog-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="modalTitleId">
                Editar Usuario {usuarioSelected?.perfil.nombres} {usuarioSelected?.perfil.apellidos}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} className="row g-3" id="form-update-user">
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
                      className={`form-select flex-grow-0 bg-light ${errors.tipoCedula ? 'is-invalid' : ''}`}
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
              <button type="submit" className="btn btn-primary" form="form-update-user">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

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
            <div className="modal-body">{usuarioSelected?.perfil.nombres}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => closeModalDeleteUser()}
                id="liveToastBtn"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table table-sm table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Nombre y Apellido</th>
            <th scope="col">Usuario</th>
            <th scope="col">Roles</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>
                {user.perfil.nombres} {user.perfil.apellidos}
              </td>
              <td>{user.username}</td>
              <td>{user.perfil.roles.map((rol) => rol.nombre).join(', ')}</td>
              <td className="text-end">
                <button
                  type="button"
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => openModalRolUser(user.id)}
                >
                  <FontAwesomeIcon icon={faUsersGear} className="fs-5" />
                </button>
                <div className="btn-group btn-group-sm" role="group" aria-label="Button group name">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => openModalEditUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => openModalDeleteUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
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
    </div>
  )
}

export default Usuarios
