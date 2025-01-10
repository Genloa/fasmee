import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import FormNutricion from '../../../forms/FormNutricion'

export default function ModalConsulta({ show, handleClose, pacienteId, usuario, handleShowToast }) {
  const [paciente, setPaciente] = useState([])
  const [mostrarTarjeta, setMostrarTarjeta] = useState(true)
  const [departamentoNombre, setDepartamentoNombre] = useState('')

  useEffect(() => {
    fetchPaciente()
    fetchDepartamentos()
  }, [usuario.departamentoId])

  const fetchPaciente = async () => {
    try {
      const fetchedPaciente = await window.api.getPerfilPaciente(pacienteId)
      setPaciente(fetchedPaciente)
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

  const onSubmit = async (data, resetForm) => {
    try {
      console.log(data)
      const consulta = await window.api.createHistoria(data, pacienteId, usuario)
      if (consulta) {
        handleShowToast('Consulta guardada correctamente')
        handleClose(true)
        resetForm()
      } else {
        handleShowToast('No se pudo guardar consulta')
      }
    } catch (error) {
      console.error('Error creando guardando la consulta:', error)
    }
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-consulta-nutricion"
        tabIndex="-1"
        aria-labelledby="modal-consulta-nutricion-label"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-consulta-nutricion-label">
                Consulta {departamentoNombre}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <button
                className="btn btn-primary mb-3"
                onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
              >
                {mostrarTarjeta ? 'Ocultar' : 'Mostrar'} Información Paciente
              </button>
              {mostrarTarjeta && (
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={paciente.profilePhotoPath}
                        className="img-fluid rounded-start"
                        alt="Foto del paciente"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {paciente.nombres?.toUpperCase()} {paciente.apellidos?.toUpperCase()}
                        </h5>
                        <div className="row">
                          <div className="col-md-6">
                            <p className="card-text">
                              Edad: {calcularEdad(paciente?.fecha_nacimiento)}
                            </p>
                            <p className="card-text">Género: {paciente?.genero}</p>
                            <p className="card-text">Telefono: {paciente?.telefono}</p>
                            <p className="card-text">Altura: {paciente.perfilMedico?.altura}</p>
                            <p className="card-text">Peso: {paciente.perfilMedico?.peso}</p>
                          </div>
                          <div className="col-md-6">
                            <p className="card-text">Alergias: {paciente.perfilMedico?.alergias}</p>
                            <p className="card-text">
                              Patologias: {paciente.perfilMedico?.patologias}
                            </p>
                            <p className="card-text">Cirugias: {paciente.perfilMedico?.cirugias}</p>
                            <p className="card-text">
                              Medicamentos: {paciente.perfilMedico?.medicamentos}
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
                  pacienteId={pacienteId}
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

ModalConsulta.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  pacienteId: PropTypes.number.isRequired,
  usuario: PropTypes.object.isRequired,
  handleShowToast: PropTypes.func.isRequired
}
