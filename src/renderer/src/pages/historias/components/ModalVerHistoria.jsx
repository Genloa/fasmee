import moment from 'moment-timezone'
import PropTypes from 'prop-types'

export default function ModalVerHistoria({ show, handleClose, historiaPaciente }) {
  console.log(historiaPaciente)
  const calcularEdad = (fechaNacimiento) => {
    let edad = moment().diff(fechaNacimiento, 'years')

    return edad
  }

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY')
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
                {historiaPaciente.departamentoName}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body m-2">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="text-center border-bottom border-secondary-subtle ">
                        <img
                          src={historiaPaciente.foto}
                          className="img-fluid rounded"
                          alt="Foto del historiaPaciente"
                        />
                      </div>
                      <h5 className="card-title mt-3 text-center">
                        {historiaPaciente.nombres?.toUpperCase()}{' '}
                        {historiaPaciente.apellidos?.toUpperCase()}
                      </h5>
                      <div className="row mt-2  border-top pt-2">
                        <div className="col-md-6 border-end">
                          <p className="card-text">
                            <b> Cédula:</b> {historiaPaciente.cedula}
                          </p>
                          <p className="card-text border-top pt-1">
                            {' '}
                            <b>Telefono: </b> {historiaPaciente.telefono}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="card-text">
                            <b>Edad: </b>
                            {calcularEdad(historiaPaciente?.fecha_nacimiento)}
                          </p>
                          <p className="card-text border-top pt-1">
                            {' '}
                            <b>Correo: </b>
                            {historiaPaciente.correo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="h4 pb-2 mb-4 text-danger border-bottom border-danger">
                    Datos de Consulta
                  </div>
                  <div className="row">
                    <div className="col">
                      {' '}
                      <p>Departamento: {historiaPaciente.departamentoName} </p>
                    </div>
                    <div className="col">
                      <p>Medico: {historiaPaciente.medicoName}</p>
                    </div>
                    <div className="col">
                      <p>Fecha: {formatDate(historiaPaciente.fecha_atencion)}</p>
                    </div>
                  </div>
                  <div className="h5 pb-2 mt-4 mb-4 text-danger border-bottom border-danger">
                    Diagnósticos
                  </div>
                  {historiaPaciente.departamentoId === 4 && (
                    <div className="row border-bottom">
                      <div className="col">
                        {' '}
                        <p>Peso: {historiaPaciente.peso_paciente} </p>
                      </div>
                      <div className="col">
                        <p>Cadera: {historiaPaciente.medida_cadera}</p>
                      </div>
                      <div className="col">
                        <p>Cintura: {historiaPaciente.medida_cintura}</p>
                      </div>
                    </div>
                  )}
                  <div className="row border-bottom">
                    {historiaPaciente.departamentoId !== 4 &&
                      historiaPaciente.departamentoId !== 9 &&
                      historiaPaciente.departamentoId !== 10 &&
                      historiaPaciente.departamentoId !== 15 &&
                      Object.entries(historiaPaciente.formulario).map(([key, value]) => (
                        <div className="col-md-4" key={key}>
                          <p>
                            <b>{capitalizeFirstLetter(key)}:</b> {value}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div>
                    <h5 className="mt-4">Detalles:</h5>
                    <p>{historiaPaciente.diagnostico}</p>
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
