import { faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fondoHome from '../../assets/img/fondoHome.png'
import Dash from '../../components/layouts/Dash'
import { useAuth } from '../../hooks/useAuth'

function Home() {
  const { session } = useAuth()

  return (
    <Dash>
      <div className="card border-0 text-primary-emphasis">
        <div className="card-body ">
          <FontAwesomeIcon icon={faHouseCircleCheck} className="fs-4 me-3" />
          Te damos la Bienvenida: {session.user.perfil.nombres} {session.user.perfil.apellidos}
        </div>
      </div>
      <div className="container h-75">
        <div className="row align-items-center h-100">
          <div className="col-md-6 h-100 d-flex align-items-center">
            <p className="text-start text-primary-emphasis fs-1 h-100 d-flex align-items-center ms-3">
              Juntos, trabajaremos para brindar la mejor atención a nuestros pacientes.
            </p>
          </div>
          <div className="col-md-6 h-75">
            <img src={fondoHome} alt="fondoHome" className="img-fluid h-100" />
          </div>
        </div>
      </div>
    </Dash>
  )
}

export default Home
