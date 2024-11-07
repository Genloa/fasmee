import Dash from '../../components/layouts/Dash'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '../../validations/userSchema'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashCan, faUserGear, faUserPen, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
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
   return(<Navigate to="/dash/users" replace={true} />)
  };


  const onSubmit = async (data) => {
    try {
      let usuario = await window.api.createUsuario(data)
      console.log(usuario)
      reset()

      
      // Cerrar el modal actual
      const currentModal = Modal.getInstance(document.getElementById('exampleModal'));
      currentModal.hide();
      
      // Abrir el nuevo modal
      const successModal = new Modal(document.getElementById('exampleModal2'));
      successModal.show();
    } catch (error) {
      console.error("Error al crear usuario:", error);

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
              <button type="submit" className="btn btn-primary"  data-bs-target="#exampleModal2"  form="form-create-user">
                Guardar Usuario
              </button>
            </div>
          </div>
        </div>
  
        
      </div>
      <div class="modal fade" id="exampleModal2" aria-hidden="true" aria-labelledby="exampleModal2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Usuario Creado</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-center">El Usuario fue creado correctamente.</p>
            </div>
            <div class="modal-footer">
              <button type="button" onClick={handleCloseAndNavigate} class="btn btn-primary" data-bs-toggle="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function TableUsers() {
  const [users, setUsers] = useState([])
 
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await window.api.getUsuarios()
      setUsers(users)
      console.log(users)
    }
    fetchUsers()
  }, [])

  const onDelete = async (dato) => {
    console.log(dato)
       const usuario = await window.api.deleteUsuario(dato)
  
      alert('Se ha eliminado el usuario')
    
  }


  return (
    <div
      className="scrollspy-example bg-light-tertiary p-3 rounded-2"
      style={{ maxHeight: '300px', overflowY: 'auto' }}
    >
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre y Apellido</th>
            <th scope="col">Usuario</th>
            <th scope="col">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.Perfil.nombres} {user.Perfil.apellidos}
              </td>
              <td>{user.username}</td>
              <td></td>
              <td> 
                <div className='d-flex flex-row mb-3s'>
                <div class="p-2">
                <a href="" 
                  data-bs-toggle="modal"
                  data-bs-target="#editarUsuarioModal" >
                    <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                  </a> 
                  </div>
                  <div class="p-2">
                  <a href="" 
                  data-bs-toggle="modal"
                  data-bs-target="#rolUsuarioModal" >
                    <FontAwesomeIcon icon={faUsersGear} className="fs-5" />
                  </a> 
                  </div>
                  <div class="p-2">
                  <a href="" 
                  data-bs-toggle="modal"
                  data-bs-target={`#eliminarUsuarioModal-${user.id}`}> 
                    <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
                  </a> 
                  <div class="modal fade" tabindex="-1"  id={`eliminarUsuarioModal-${user.id}`}>
                        <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Eliminar Usuario</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <p>Seguro que quiero eliminar el usuario {user.Perfil.nombres} {user.Perfil.apellidos}</p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" onClick={() => onDelete(user.id)} class="btn btn-primary">Eliminar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="editarUsuarioModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar Usuario
              </h1>
            </div>
         </div>
        </div>
     </div>
     <div
        className="modal fade"
        id="rolUsuarioModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Rol Usuario
              </h1>
            </div>
         </div>
        </div>
     </div>
    
     

    </div>
  )
}


function editarUsuarioModal(){
  
}

export default Usuarios
