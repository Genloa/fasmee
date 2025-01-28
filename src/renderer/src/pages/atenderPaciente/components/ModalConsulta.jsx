import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import pacienteImg from '../../../assets/img/paciente.jpg'
import FormConsultaGeneral from '../../../forms/FormConsultaGeneral'
import FormGinecologia from '../../../forms/FormGinecologia'
import FormGinecologiaPrenatal from '../../../forms/FormGinecologiaPrenatal'
import FormGinecologiaPri from '../../../forms/FormGinecologiaPri'
import FormNutricion from '../../../forms/FormNutricion'
import FormPediatria from '../../../forms/FormPediatria'
import FormPsiquiatria from '../../../forms/FormPsiquiatria'

export default function ModalConsulta({ show, handleClose, pacienteId, usuario, handleShowToast }) {
  const [paciente, setPaciente] = useState([])
  const [mostrarTarjeta, setMostrarTarjeta] = useState(true)
  const [departamentoNombre, setDepartamentoNombre] = useState('')
  const [selectedConsulta, setSelectedConsulta] = useState('')

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

  const handleConsultaChange = (event) => {
    setSelectedConsulta(event.target.value)
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
              {usuario.departamentoId === 5 && (
                <div className="col form-floating mb-3 mt-3">
                  <select
                    className="form-control"
                    id="floatingConsultaType"
                    aria-label="Seleccione Tipo de Consulta"
                    value={selectedConsulta}
                    onChange={handleConsultaChange}
                  >
                    <option value="">Seleccione Tipo de Consulta</option>
                    <option value="primera_vez">Primera vez</option>
                    <option value="control_regular">Control regular</option>
                    <option value="prenatal">Prenatal</option>
                  </select>
                  <label className="z-0" htmlFor="floatingConsultaType">
                    Tipo de Consulta
                  </label>
                </div>
              )}
              {mostrarTarjeta && (
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={paciente.profilePhotoPath ?? pacienteImg}
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
              {usuario.departamentoId === 4 && (
                <FormNutricion handleClose={handleClose} onSubmit={onSubmit} />
              )}

              {selectedConsulta === 'primera_vez' && (
                <FormGinecologiaPri handleClose={handleClose} onSubmit={onSubmit} />
              )}
              {selectedConsulta === 'control_regular' && (
                <FormGinecologia handleClose={handleClose} onSubmit={onSubmit} />
              )}
              {selectedConsulta === 'prenatal' && (
                <FormGinecologiaPrenatal handleClose={handleClose} onSubmit={onSubmit} />
              )}

              {usuario.departamentoId === 6 && (
                <FormPediatria handleClose={handleClose} onSubmit={onSubmit} />
              )}

              {usuario.departamentoId === 11 && (
                <FormPsiquiatria handleClose={handleClose} onSubmit={onSubmit} />
              )}

              {usuario.departamentoId === 1 && (
                <FormConsultaGeneral handleClose={handleClose} onSubmit={onSubmit} />
              )}

              {usuario.departamentoId === 2 && (
                <FormConsultaGeneral handleClose={handleClose} onSubmit={onSubmit} />
              )}

              {usuario.departamentoId === 7 && (
                <FormConsultaGeneral handleClose={handleClose} onSubmit={onSubmit} />
              )}

              {usuario.departamentoId === 8 && (
                <FormConsultaGeneral handleClose={handleClose} onSubmit={onSubmit} />
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
