import { faTrashCan, faUserPen, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, Toast } from 'bootstrap'
import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'
import Dash from '../../components/layouts/Dash'
import Can from '../../helpers/Can'
import { resolveSchema } from '../../validations/userSchema'
import ModalCrearUsuario from './components/ModalCrearUsuario'

const UsuariosContext = createContext({ usuarios: [], setUsuarios: () => {} })

export default function Usuarios() {
  // Data
  const [usuarios, setUsuarios] = useState([])

  //modal crear
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToast')
      if (toastEl) {
        const toast = new Toast(toastEl)
        toast.show()
        // Restablecer el estado showToast a false después de que el toast se haya mostrado
        const timeout = setTimeout(() => {
          setShowToast(false)
        }, 3000) // Ajusta el tiempo según sea necesario

        return () => clearTimeout(timeout)
      }
    }
  }, [showToast])

  const fetchUsers = async () => {
    const fetchedUsers = await window.api.getUsuarios()
    setUsuarios(fetchedUsers)
  }

  const handleShowToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
  }

  return (
    <Dash>
      <UsuariosContext.Provider value={{ usuarios, setUsuarios }}>
        {/* Modales */}
        <ModalCrearUsuario
          show={showModal}
          handleClose={handleCloseModal}
          fetchUsers={fetchUsers}
          handleShowToast={handleShowToast} // Asegúrate de pasar esta prop
        />

        {/* Card */}
        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title fs-3">Usuarios</h5>

            <div className="mt-5">
              <div className="text-end mb-3">
                <Can permission="usuarios.create">
                  <button type="button" className="btn btn-primary" onClick={handleShowModal}>
                    Crear Usuario
                  </button>
                </Can>
              </div>
              <TableUsers handleShowToast={handleShowToast} />
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Notificación</strong>
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

export function TableUsers({ handleShowToast }) {
  // Usuarios
  const { usuarios, setUsuarios } = useContext(UsuariosContext)
  const [usuarioSelected, setUsuarioSelected] = useState(null)
  const [roles, setRoles] = useState([])
  const [selectedRol, setSelectedRol] = useState('')
  const [departamentos, setDepartamentos] = useState([])

  const [showPassword, setShowPassword] = useState(false)

  // Paginación
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const usersPerPage = 4

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(resolveSchema('edit')),
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
      correo: '',
      departamentoId: 0
    }
  })

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  const onSubmit = async (data) => {
    let usuario = await window.api.updateUsuario(usuarioSelected.id, data)
    setUsuarios((prevUsuarios) => prevUsuarios.map((u) => (u.id === usuario.id ? usuario : u)))
    fetchUsers()
    closeModalEditUser()
    handleShowToast('Usuario actualizado correctamente')
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
      setUsuarios((prevUsuarios) => prevUsuarios.map((u) => (u.id === usuario.id ? usuario : u)))
      fetchUsers()

      handleShowToast('Rol asignado correctamente')

      const modal = Modal.getInstance(modalRolUserRef)
      modal.hide()
    } catch (error) {
      console.error('Error asignando el rol al usuario:', error)
    }
  }

  // FETCH

  const fetchUsers = async () => {
    const fetchedUsers = await window.api.getUsuarios()
    setUsuarios(fetchedUsers)
    setUsuarioSelected(fetchedUsers[0])
  }

  const fetchRoles = async () => {
    const fetchedRoles = await window.api.getRoles()
    setRoles(fetchedRoles)
    setSelectedRol(fetchedRoles[0].id)
  }

  const fetchDepartamentos = async () => {
    const fetchedDepartamentos = await window.api.getDepartamentos()
    setDepartamentos(fetchedDepartamentos)
  }

  useEffect(() => {
    fetchUsers()
    fetchRoles()
    fetchDepartamentos()
  }, [])

  const departamentoOptions = departamentos.map((departamento) => ({
    value: departamento.id,
    label: departamento.nombre
  }))

  const modalEditUserRef = document.getElementById('modal-edit-user')

  const openModalEditUser = (id) => {
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
      password: '',
      confirmtPassword: '',
      fechaNacimiento: user.perfil?.fecha_nacimiento
        ? new Date(user.perfil.fecha_nacimiento).toISOString().split('T')[0]
        : '',
      telefono: user.perfil?.telefono || '',
      correo: user.perfil?.correo || '',
      departamentoId: user.perfil?.departamento.id || 0
    })
  }

  const closeModalEditUser = () => {
    const modal = Modal.getInstance(modalEditUserRef)
    modal.hide()
  }

  const modalDeleteUserRef = document.getElementById('modal-delete-user')

  const openModalDeleteUser = (id) => {
    let user = usuarios.find((user) => user.id === id)
    setUsuarioSelected(user)
    let modal = new Modal(modalDeleteUserRef)
    modal.show()
  }

  const closeModalDeleteUser = async () => {
    try {
      // Eliminar el usuario
      await window.api.deleteUsuario(usuarioSelected.id)

      // Actualizar el estado de usuarios
      setUsuarios(usuarios.filter((user) => user.id !== usuarioSelected.id))

      handleShowToast('Usuario eliminado correctamente')

      // Cerrar el modal
      const modal = Modal.getInstance(modalDeleteUserRef)
      modal.hide()
    } catch (error) {
      console.error('Error al eliminar el usuario:', error)
      // Aquí podrías mostrar un toast de error si lo deseas
    }
  }

  const modalRolUserRef = document.getElementById('modal-rol-user')

  const openModalRolUser = (id) => {
    let user = usuarios.find((user) => user.id === id)
    setUsuarioSelected(user)
    let modal = new Modal(modalRolUserRef)
    modal.show()
  }

  const handleSelectChange = (event) => {
    setSelectedRol(Number(event.target.value))
  }

  // Search

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(0) // Reinicia la página actual al cambiar el término de búsqueda
  }

  const filteredUsuarios = usuarios.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Paginación

  const pagesVisited = currentPage * usersPerPage
  const displayUsers = filteredUsuarios
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => (
      <tr key={user.id}>
        <td>
          {user.perfil.nombres} {user.perfil.apellidos}
        </td>
        <td>{user.username}</td>
        <td>{user.perfil.roles.map((rol) => rol.nombre).join(', ')}</td>
        <td className="text-end">
          <Can permission="usuarios.changeRole">
            <button
              type="button"
              className="btn btn-sm btn-primary me-2"
              onClick={() => openModalRolUser(user.id)}
            >
              <FontAwesomeIcon icon={faUsersGear} className="fs-5" />
            </button>
          </Can>
          <div className="btn-group btn-group-sm" role="group" aria-label="Button group name">
            <Can permission="usuarios.edit">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openModalEditUser(user.id)}
              >
                <FontAwesomeIcon icon={faUserPen} className="fs-5" />
              </button>
            </Can>
            <Can permission="usuarios.delete">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => openModalDeleteUser(user.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
              </button>
            </Can>
          </div>
        </td>
      </tr>
    ))
  const pageCount = Math.ceil(filteredUsuarios.length / usersPerPage)

  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div
      className="scrollspy-example bg-light-tertiary rounded-2"
      style={{ maxHeight: 'auto', overflowY: 'auto' }}
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
                Asignar Rol Usuario {usuarioSelected?.perfil.nombres}
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
                <div className="row mt-4">
                  <div className="col">
                    <Controller
                      name="departamentoId"
                      control={control}
                      defaultValue={usuarioSelected?.perfil?.departamento.id || 0}
                      render={({ field }) => (
                        <div>
                          <Select
                            {...field}
                            options={departamentoOptions}
                            placeholder="Buscar Departamento"
                            isClearable
                            value={
                              departamentoOptions.find((option) => option.value === field.value) ||
                              null
                            }
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption ? selectedOption.value : null) // Guardar solo el ID o null si no hay selección
                              setValue(
                                'departamentoId',
                                selectedOption ? selectedOption.value : null
                              ) // Registrar el valor
                            }}
                          />
                          {errors.departamentoId && (
                            <div className="invalid-feedback d-block">
                              {errors.departamentoId.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
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
      <div className="container">
        <div className="form-floating mb-3 mt-3">
          <input
            type="search"
            className="form-control"
            id="floatingInput"
            placeholder="Buscar"
            aria-label="Buscar"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <label htmlFor="floatingInput">Buscar Usuario</label>
        </div>

        <table className="table table-sm table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Nombre y Apellido</th>
              <th scope="col">Usuario</th>
              <th scope="col">Rol</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{displayUsers}</tbody>
        </table>

        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'pagination'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
        />
      </div>

      {/* Toast */}
    </div>
  )
}

TableUsers.propTypes = {
  handleShowToast: PropTypes.func.isRequired
}

export { UsuariosContext }
