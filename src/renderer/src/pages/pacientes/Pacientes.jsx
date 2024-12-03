import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dropdown, Modal } from 'bootstrap'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Dash from '../../components/layouts/Dash'
import { pacienteSchema } from '../../validations/pacienteSchema'

function Pacientes() {
  const modalCrearPacienteRef = document.getElementById('modal-create-paciente')
  const modalCrearBeneficiarioRef = document.getElementById('modal-create-beneficiario')
  const [usuarios, setUsuarios] = useState([])
  const [entes, setEntes] = useState([])

  // HOOK

  useEffect(() => {
    fetchUsers()
    fetchEntes()

    const dropdownMenus = document.querySelectorAll('.dropdown-toggle')
    dropdownMenus.forEach((dropdownMenu) => {
      new Dropdown(dropdownMenu)
    })
  }, [])

  // FETCH

  const fetchEntes = async () => {
    const fetchedEntes = await window.api.getEntes()
    setEntes(fetchedEntes)
    console.log(fetchedEntes)
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

  // FORM VALIDATION

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: zodResolver(pacienteSchema)
  })

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

  function openModalCrearBeneficiario() {
    let modal = new Modal(modalCrearBeneficiarioRef)
    modal.show()
  }

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
                    <h6 className="text-center text-body-secondary">Informacion General</h6>
                  </div>
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
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <select
                        className={`form-select flex-grow-0 bg-light ${errors.ente ? 'is-invalid' : ''}`}
                        aria-label="entes"
                        style={{ height: '100%' }}
                        {...register('ente')}
                      >
                        <option selected>Ente</option>
                        {entes.map((ente) => (
                          <option key={ente.id} value={ente.id}>
                            {ente.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
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
                  <div className="row mt-4">
                    <h6 className="text-center text-body-secondary">Informacion Medica</h6>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="patologias"
                          className={getInputClassName('patologias')}
                          placeholder="patologias"
                          aria-label="patologias"
                          {...register('patologias')}
                        />
                        <label htmlFor="patologias">Patologias</label>
                        {errors.patologias?.message && (
                          <div className="invalid-feedback">{errors.patologias?.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="alergias"
                          className={getInputClassName('alergias')}
                          placeholder="alergias"
                          aria-label="alergias"
                          {...register('alergias')}
                        />
                        <label htmlFor="alergias">Alergias</label>
                        {errors.alergias?.message && (
                          <div className="invalid-feedback">{errors.alergias?.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="cirugias"
                          className={getInputClassName('cirugias')}
                          placeholder="cirugias"
                          aria-label="cirugias"
                          {...register('cirugias')}
                        />
                        <label htmlFor="cirugias">Cirugias</label>
                        {errors.cirugias?.message && (
                          <div className="invalid-feedback">{errors.cirugias?.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="medicamentos"
                          className={getInputClassName('medicamentos')}
                          placeholder="medicamentos"
                          aria-label="medicamentos"
                          {...register('medicamentos')}
                        />
                        <label htmlFor="medicamentos">Medicamentos</label>
                        {errors.medicamentos?.message && (
                          <div className="invalid-feedback">{errors.medicamentos?.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="peso"
                          className={getInputClassName('peso')}
                          placeholder="peso"
                          aria-label="peso"
                          {...register('peso')}
                        />
                        <label htmlFor="peso">Peso</label>
                        {errors.peso?.message && (
                          <div className="invalid-feedback">{errors.peso?.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="altura"
                          className={getInputClassName('altura')}
                          placeholder="altura"
                          aria-label="altura"
                          {...register('altura')}
                        />
                        <label htmlFor="altura">Altura</label>
                        {errors.altura?.message && (
                          <div className="invalid-feedback">{errors.altura?.message}</div>
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
        <div
          className="modal fade"
          id="modal-create-beneficiario"
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
                ></button>
              </div>
              <div className="modal-body m-2">
                <form onSubmit={handleSubmit(onSubmit)} className="row g-3" id="form-create-user">
                  <div className="row mt-4">
                    <h6 className="text-center text-body-secondary">Informacion General</h6>
                  </div>
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
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <select
                        className={`form-select flex-grow-0 bg-light ${errors.ente ? 'is-invalid' : ''}`}
                        aria-label="entes"
                        style={{ height: '100%' }}
                        {...register('ente')}
                      >
                        <option selected>Ente</option>
                        {entes.map((ente) => (
                          <option key={ente.id} value={ente.id}>
                            {ente.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
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
                  <div className="row mt-4">
                    <h6 className="text-center text-body-secondary">Informacion Medica</h6>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="patologias"
                          className={getInputClassName('patologias')}
                          placeholder="patologias"
                          aria-label="patologias"
                          {...register('patologias')}
                        />
                        <label htmlFor="patologias">Patologias</label>
                        {errors.patologias?.message && (
                          <div className="invalid-feedback">{errors.patologias?.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="alergias"
                          className={getInputClassName('alergias')}
                          placeholder="alergias"
                          aria-label="alergias"
                          {...register('alergias')}
                        />
                        <label htmlFor="alergias">Alergias</label>
                        {errors.alergias?.message && (
                          <div className="invalid-feedback">{errors.alergias?.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="cirugias"
                          className={getInputClassName('cirugias')}
                          placeholder="cirugias"
                          aria-label="cirugias"
                          {...register('cirugias')}
                        />
                        <label htmlFor="cirugias">Cirugias</label>
                        {errors.cirugias?.message && (
                          <div className="invalid-feedback">{errors.cirugias?.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="medicamentos"
                          className={getInputClassName('medicamentos')}
                          placeholder="medicamentos"
                          aria-label="medicamentos"
                          {...register('medicamentos')}
                        />
                        <label htmlFor="medicamentos">Medicamentos</label>
                        {errors.medicamentos?.message && (
                          <div className="invalid-feedback">{errors.medicamentos?.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="peso"
                          className={getInputClassName('peso')}
                          placeholder="peso"
                          aria-label="peso"
                          {...register('peso')}
                        />
                        <label htmlFor="peso">Peso</label>
                        {errors.peso?.message && (
                          <div className="invalid-feedback">{errors.peso?.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating ">
                        <input
                          type="text"
                          id="altura"
                          className={getInputClassName('altura')}
                          placeholder="altura"
                          aria-label="altura"
                          {...register('altura')}
                        />
                        <label htmlFor="altura">Altura</label>
                        {errors.altura?.message && (
                          <div className="invalid-feedback">{errors.altura?.message}</div>
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
                className="btn btn-primary dropdown-toggle "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Nuevo Paciente
              </button>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => openModalCrearPaciente()}>
                    Trabajador
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => openModalCrearBeneficiario()}
                  >
                    Beneficiario
                  </a>
                </li>
              </ul>
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
                        {user.perfil?.nombres} {user.perfil?.apellidos}
                      </h5>
                      <p className="card-text">Trabajador</p>
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
