import Dash from '../../components/layouts/Dash'
import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { pacienteSchema } from '../../validations/pacienteSchema'
import { Modal } from 'bootstrap'
import { zodResolver } from '@hookform/resolvers/zod'

function Pacientes() {
  const modalCrearPacienteRef = document.getElementById('modal-create-paciente')
  const [usuarios, setUsuarios] = useState([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: zodResolver(pacienteSchema)
  })

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }

  function openModalCrearPaciente() {
    let modal = new Modal(modalCrearPacienteRef)
    modal.show()
  }

  const onSubmit = async (data) => {
    console.log(data)
    let paciente = await window.api.createPaciente(data)
    fetchUsers()
    console.log(paciente)
    reset()
    const modal = Modal.getInstance(modalCrearPacienteRef)
    modal.hide()
    // const toastElement = document.getElementById('liveToastCrear')
    //const toastcrear = new Toast(toastElement)
    //toastcrear.show()
  }
  const fetchUsers = async () => {
    try {
      const fetchedUsers = await window.api.getUsuarios()
      setUsuarios(fetchedUsers)
      console.log(fetchedUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <Dash>
        <div
          className="modal fade"
          id="modal-create-paciente"
          tabIndex="-1"
          aria-labelledby="modal-create-paciente-label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="modal-create-paciente-label">
                  Crear Paciente
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
                  {' '}
                  Cancelar{' '}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  form="form-create-paciente"
                  id="liveToastBtnCrear"
                >
                  Guardar Paciente{' '}
                </button>
              </div>
            </div>
          </div>
        </div>{' '}
        <div className="card border-white">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center ">
              <h5 className="card-title">Pacientes</h5>
              <button
                type="button"
                className="btn btn-primary "
                onClick={() => openModalCrearPaciente()}
              >
                Nuevo Paciente
              </button>
            </div>
            <div className="form-floating mb-3 mt-3">
              <input
                type="search"
                className="form-control"
                id="floatingInput"
                placeholder="Buscar"
                aria-label="Buscar"
              />
              <label htmlFor="floatingInput">Buscar Paciente</label>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
              {usuarios.map((user) => (
                <div className="col" key={user.id}>
                  <div className="card border-white text-center shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div className="text-center">
                      <img
                        src="../../src/img/paciente.jpg"
                        width="60%"
                        height="60%"
                        alt="Logo"
                        className="d-inline-block align-text-top rounded-circle mt-3"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {user.Perfil.nombres} {user.Perfil.apellidos}
                      </h5>
                      <p className="card-text">Trabajador {user.Perfil.ente.nombre}</p>
                      <p className="card-text">Rol</p>
                      <div>
                        <div
                          className="btn-group btn-group-sm"
                          role="group"
                          aria-label="Button group name"
                        >
                          <button
                            type="button"
                            className="btn btn-primary"
                            //onClick={() => openModalEditUser(user.id)}
                          >
                            <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            //onClick={() => openModalDeleteUser(user.id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dash>
    </>
  )
}

export default Pacientes
