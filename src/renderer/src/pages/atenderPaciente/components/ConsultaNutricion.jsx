import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function ConsultaNutricion({ show, handleClose, pacienteId }) {
  const [paciente, setPaciente] = useState([])

  useEffect(() => {
    fetchPaciente()
  }, [])
  console.log('pacienteId', pacienteId)
  const fetchPaciente = async () => {
    try {
      const fetchedPaciente = await window.api.getPerfilPaciente(pacienteId)
      console.log('Paciente:', fetchedPaciente)

      setPaciente(fetchedPaciente)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
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
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modal-consulta-nutricion-label">
                Consulta Nutrición {paciente.nombres}
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
                      src={paciente.foto}
                      className="img-fluid rounded-start"
                      alt="Foto del paciente"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        {paciente.nombres} {paciente.apellidos}
                      </h5>
                      <p className="card-text">Edad: {paciente.edad}</p>
                      <p className="card-text">Género: {paciente.genero}</p>
                      <p className="card-text">Correo: {paciente.correo}</p>
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

ConsultaNutricion.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  pacienteId: PropTypes.number.isRequired
}
