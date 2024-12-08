import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dropdown, Modal, Toast } from 'bootstrap'
import { createContext, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Dash from '../../components/layouts/Dash'
import { pacienteSchema } from '../../validations/pacienteSchema'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

const PacientesContext = createContext({ pacientes: [], setPacientes: () => {} })
function Pacientes() {
  const modalCrearTrabajadorRef = document.getElementById('modal-create-trabajador')
  const [pacientes, setPacientes] = useState([])

  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  // HOOK

  useEffect(() => {
    fetchPacientes()

    const dropdownMenus = document.querySelectorAll('.dropdown-toggle')
    dropdownMenus.forEach((dropdownMenu) => {
      new Dropdown(dropdownMenu)
    })
  }, [])

  // FETCH

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      setPacientes(fetchedPacientes)
      console.log(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  // FORM VALIDATION

  function openModalCrearTrabajador() {
    let modal = new Modal(modalCrearTrabajadorRef)
    modal.show()
  }

  return (
    <>
      <PacientesContext.Provider value={{ pacientes, setPacientes }}>
        <Dash>
          <div
            className="modal fade"
            id="modal-create-trabajador"
            tabIndex="-1"
            aria-labelledby="modal-create-paciente-label"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="modal-create-paciente-label">
                    Crear Paciente Trabajador
                  </h1>
                  <button
                    type="submit"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body m-2"></div>
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
          </div>

          <ModalCrearBeneficiario show={showModal} handleClose={handleCloseModal} />

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
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => openModalCrearTrabajador()}
                    >
                      Trabajador
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleShowModal}>
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
                {pacientes.map((paciente) => (
                  <div className="col" key={paciente.id}>
                    <div className="card border-white text-center shadow p-3 mb-5 bg-body-tertiary rounded">
                      <div className="text-center">
                        <img
                          src="../../src/assets/img/paciente.jpg"
                          width="60%"
                          height="60%"
                          alt="Logo"
                          className="d-inline-block align-text-top rounded-circle mt-3"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          {paciente.nombres} {paciente.apellidos}
                        </h5>

                        {paciente.enteId ? (
                          <div className="card-text">Trabajador</div>
                        ) : (
                          <div className="card-text">Beneficiario</div>
                        )}

                        <div>
                          <div
                            className="btn-group btn-group-sm mt-2"
                            role="group"
                            aria-label="Button group name"
                          >
                            <button
                              type="button"
                              className="btn btn-primary"
                              //onClick={() => openModalEditPaciente(paciente.id)}
                            >
                              <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              //onClick={() => openModalDeletePaciente(Paciente.id)}
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
        </Dash>{' '}
      </PacientesContext.Provider>
    </>
  )
}

function ModalCrearBeneficiario({ show, handleClose }) {
  const [pacientes, setPacientes] = useContext(PacientesContext)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const [trabajadores, setTrabajadores] = useState([])

  // HOOK

  useEffect(() => {
    fetchPacientes()
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

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      setPacientes(fetchedPacientes)
      console.log(fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  // FORM VALIDATION

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: zodResolver(pacienteSchema)
  })

  const onSubmitBeneficiario = async (data) => {
    console.log('enviando datos')

    let pacienteBeneficiario = await window.api.createPacienteBeneficiario(data)
    fetchPacientes()
    console.log(pacienteBeneficiario)
    if (pacienteBeneficiario) {
      setPacientes([...pacientes, pacienteBeneficiario])
      setToastMessage('Beneficiario creado correctamente')
    } else {
      setToastMessage('No se pudo crear el usuario')
    }
    setShowToast(true)
    handleClose(true)
    reset()
  }

  const getInputClassName = (fieldName) => {
    if (!dirtyFields[fieldName]) {
      return 'form-control'
    }
    return `form-control ${errors[fieldName] ? 'is-invalid' : 'is-valid'}`
  }
  return (
    <>
      <PacientesContext.Provider value={{ pacientes, setPacientes }}>
        <div
          className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
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
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body m-2">
                <form
                  onSubmit={handleSubmit(onSubmitBeneficiario)}
                  className="row g-3"
                  id="form-create-paciente-beneficiario"
                >
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
                    {' '}
                    <div className="col">
                      <Controller
                        name="trabajador"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <div>
                            <Select
                              {...field}
                              options={trabajadorOptions}
                              placeholder="Buscar Trabajador"
                              value={
                                trabajadorOptions.find((option) => option.value === field.value) ||
                                null
                              }
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption ? selectedOption.value : null) // Guardar solo el ID o null si no hay selección
                                setValue(
                                  'trabajadorId',
                                  selectedOption ? selectedOption.value : null
                                ) // Registrar el valor
                              }}
                            />
                            {errors.trabajador && (
                              <div className="invalid-feedback d-block">
                                {errors.trabajador.message}
                              </div>
                            )}
                          </div>
                        )}
                      />
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
                          type="number"
                          id="peso"
                          className={getInputClassName('peso')}
                          placeholder="peso"
                          aria-label="peso"
                          step="0.01"
                          min="0.1"
                          max="500"
                          {...register('peso', { valueAsNumber: true })}
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
                          type="number"
                          id="altura"
                          className={getInputClassName('altura')}
                          placeholder="altura"
                          aria-label="altura"
                          step="0.01"
                          min="1.1"
                          max="3"
                          {...register('altura', { valueAsNumber: true })}
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  {' '}
                  Cancelar{' '}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  form="form-create-paciente-beneficiario"
                  id="liveToastBtnCrear"
                >
                  Guardar Paciente{' '}
                </button>
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
      </PacientesContext.Provider>
    </>
  )
}

ModalCrearBeneficiario.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default Pacientes
