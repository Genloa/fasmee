import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import FormNutricion from '../../../forms/FormNutricion'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

export default function ModalEmergencia({ show, handleClose, usuario, handleShowToast }) {
  const { control, reset } = useForm()
  const [pacientes, setPacientes] = useState([])
  const [mostrarTarjeta, setMostrarTarjeta] = useState(true)
  const [departamentoNombre, setDepartamentoNombre] = useState('')
  const [selectedPaciente, setSelectedPaciente] = useState(null)

  useEffect(() => {
    fetchPacientes()
    fetchDepartamentos()
  }, [usuario.departamentoId])

  const fetchPacientes = async () => {
    try {
      const fetchedPacientes = await window.api.getPacientes()
      console.log(fetchedPacientes)
      setPacientes(fetchedPacientes)
      console.log('Pacientes:', fetchedPacientes)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }

  const fetchDepartamentos = async () => {
    try {
      const fetchedDepartamentos = await window.api.getDepartamentos()
      const departamento = fetchedDepartamentos.find((dep) => dep.id === usuario.departamentoId)
      if (departamento) {
        setDepartamentoNombre(departamento.nombre)
      }
    } catch (error) {
      console.error('Error fetching departamentos:', error)
    }
  }

  const pacienteOptions = pacientes.map((paciente) => ({
    value: paciente.id,
    label: paciente.cedula
  }))

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const consulta = await window.api.createHistoria(data, selectedPaciente.id, usuario)
      if (consulta) {
        handleShowToast('Consulta guardada correctamente')
        handleClose(true)
        reset()
      } else {
        handleShowToast('No se pudo guardar consulta')
      }
    } catch (error) {
      console.error('Error creando guardando la consulta:', error)
    }
  }

  const handlePacienteChange = (selectedOption) => {
    const pacienteId = selectedOption ? selectedOption.value : null
    const paciente = pacientes.find((p) => p.id === pacienteId)
    setSelectedPaciente(paciente || null)
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-emergencia"
        tabIndex="-1"
        aria-labelledby="modal-emergencia-label"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-emergencia-label">
                Emergencia {departamentoNombre}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <div className="col mb-4">
                <Controller
                  name="pacienteId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        options={pacienteOptions}
                        placeholder="Buscar Paciente"
                        isClearable
                        value={
                          pacienteOptions.find((option) => option.value === field.value) || null
                        }
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption) // Guardar solo el ID o null si no hay selección
                          handlePacienteChange(selectedOption) // Actualizar el paciente seleccionado
                        }}
                      />
                    </div>
                  )}
                />
              </div>
              {selectedPaciente && (
                <button
                  className="btn btn-primary mb-3"
                  onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
                >
                  {mostrarTarjeta ? 'Ocultar' : 'Mostrar'} Información Paciente
                </button>
              )}
              {mostrarTarjeta && selectedPaciente && (
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={selectedPaciente.profilePhotoPath}
                        className="img-fluid rounded-start"
                        alt="Foto del paciente"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {selectedPaciente.nombres?.toUpperCase()}{' '}
                          {selectedPaciente.apellidos?.toUpperCase()}
                        </h5>
                        <div className="row">
                          <div className="col-md-6">
                            <p className="card-text">
                              Edad: {calcularEdad(selectedPaciente?.fecha_nacimiento)}
                            </p>
                            <p className="card-text">Género: {selectedPaciente?.genero}</p>
                            <p className="card-text">Telefono: {selectedPaciente?.telefono}</p>
                            <p className="card-text">
                              Altura: {selectedPaciente.perfilMedico?.altura}
                            </p>
                            <p className="card-text">Peso: {selectedPaciente.perfilMedico?.peso}</p>
                          </div>
                          <div className="col-md-6">
                            <p className="card-text">
                              Alergias: {selectedPaciente.perfilMedico?.alergias}
                            </p>
                            <p className="card-text">
                              Patologias: {selectedPaciente.perfilMedico?.patologias}
                            </p>
                            <p className="card-text">
                              Cirugias: {selectedPaciente.perfilMedico?.cirugias}
                            </p>
                            <p className="card-text">
                              Medicamentos: {selectedPaciente.perfilMedico?.medicamentos}
                            </p>
                            <p>Antecedentes Familiares: Diabetes, Hipertension</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {usuario.departamentoId === 4 ? (
                <FormNutricion
                  pacienteId={selectedPaciente?.id}
                  usuario={usuario}
                  handleClose={handleClose}
                  handleShowToast={handleShowToast}
                  onSubmit={onSubmit}
                />
              ) : (
                'nada'
              )}
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalEmergencia.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  usuario: PropTypes.object.isRequired,
  handleShowToast: PropTypes.func.isRequired
}
