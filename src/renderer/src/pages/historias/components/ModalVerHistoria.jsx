import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'


export default function ModalVerHistoria({ show, handleClose, historiaPaciente}) {

  const [departamentoNombre, setDepartamentoNombre] = useState('')

  useEffect(() => {

    fetchDepartamentos()
  }, [])


  const fetchDepartamentos = async () => {
    try {
      const fetchedDepartamentos = await window.api.getDepartamentos()
      const departamento = fetchedDepartamentos.find((dep) => dep.id === historiaPaciente.historialMedico.departamentoId)
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

                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={historiaPaciente.profilePhotoPath}
                        className="img-fluid rounded-start"
                        alt="Foto del historiaPaciente"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {historiaPaciente.nombres?.toUpperCase()} {historiaPaciente.apellidos?.toUpperCase()}
                        </h5>
                        <div className="row">
                          <div className="col-md-6">
                            <p className="card-text">
                              Edad: {calcularEdad(historiaPaciente?.fecha_nacimiento)}
                            </p>
                            <p className="card-text">Género: Femenino {historiaPaciente?.genero}</p>
                            <p className="card-text">Telefono: {historiaPaciente?.telefono}</p>
                            <p className="card-text">Altura: {historiaPaciente.perfilMedico?.altura}</p>
                            <p className="card-text">Peso: {historiaPaciente.perfilMedico?.peso}</p>
                          </div>
                          <div className="col-md-6">
                            <p className="card-text">Alergias: {historiaPaciente.perfilMedico?.alergias}</p>
                            <p className="card-text">
                              Patologias: {historiaPaciente.perfilMedico?.patologias}
                            </p>
                            <p className="card-text">Cirugias: {historiaPaciente.perfilMedico?.cirugias}</p>
                            <p className="card-text">
                              Medicamentos: {historiaPaciente.perfilMedico?.medicamentos}
                            </p>
                            <p>Antecedentes Familiares: Diabetes, Hipertension</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalVerHistoria.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  historiaPaciente: PropTypes.object.isRequired
}
