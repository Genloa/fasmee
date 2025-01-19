import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import {
  faBookMedical,
  faBoxesStacked,
  faCalendarCheck,
  faClipboardUser,
  faHandHoldingMedical,
  faHospitalUser,
  faHouse,
  faUser,
  faUserDoctor,
  faUserShield
} from '@fortawesome/free-solid-svg-icons'

import '../../assets/css/dash.css'

// imagenes
import { Toast } from 'bootstrap'
import fasmeeIcon from '../../assets/img/fasmee-icon.png'
import expandImg from '../../assets/img/menu-alt-left-regular.png'
import collapseImg from '../../assets/img/menu-regular.png'
import Can from '../../helpers/can'
import { useAuth } from '../../hooks/useAuth'
import ModalEditarUsuario from '../../pages/usuarios/components/ModalEditarUsuario'

function Dash({ children }) {
  const { session } = useAuth()

  return (
    <>
      <Navbar user={session.user} />
      <Sidebar>{children}</Sidebar>
    </>
  )
}

Dash.propTypes = {
  children: PropTypes.node.isRequired
}

function Navbar({ user }) {
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToaste')
      if (toastEl) {
        const toast = new Toast(toastEl)
        toast.show()
        // Restablecer el estado showToast a false después de que el toast se haya mostrado
        const timeout = setTimeout(() => {
          setShowToast(false)
        }, 3000) // Ajusta el tiempo según sea necesario

        return () => clearTimeout(timeout)
      }
    }
  }, [showToast])

  const handleShowToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
  }

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {user && (
        <ModalEditarUsuario
          show={showModal}
          usuarioSelected={user}
          handleClose={handleCloseModal}
          handleShowToast={handleShowToast} // Asegúrate de pasar esta prop
        />
      )}
      <nav className="navbar navbar-expand-lg navbar-light bg-white m-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={fasmeeIcon}
              alt="Logo"
              height="90"
              width="auto"
              className="d-inline-block align-text-top "
            />
          </a>
          <div className="d-flex flex-grow-1 justify-content-between align-items-center">
            <form className="d-flex flex-grow-1 mx-4" role="search"></form>
            <div className="dropdown ">
              <button
                className="btn btn-outline-body dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.perfil?.nombres} {user.perfil?.apellidos}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li>
                  <a className="dropdown-item" onClick={handleShowModal}>
                    Perfil
                  </a>
                </li>
                <li>
                  <a onClick={() => handleLogout()} className="dropdown-item">
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToaste"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notificación</strong>
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
    </>
  )
}

Navbar.propTypes = {
  user: PropTypes.object
}

function Sidebar({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className="container-fluid ">
      <div className="row flex-nowrap ">
        <div
          className={`bg-primary col-auto col-md-${isCollapsed ? '1' : '3'} col-lg-${isCollapsed ? '1' : '3'} min-vh-100 borde-content`}
        >
          <div className="bg-primary p-2 borde-content">
            <div className="d-flex justify-content-between align-items-center">
              <button onClick={toggleSidebar} className="btn btn-light btn-sm mt-5">
                <img
                  src={isCollapsed ? collapseImg : expandImg}
                  alt={isCollapsed ? 'Expand' : 'Collapse'}
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <ul className="nav nav-pills flex-column mt-5">
              <li className="nav-item">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `nav-link text-white text-decoration-none ${isActive ? 'active  bg-danger' : ''}`
                  }
                >
                  <FontAwesomeIcon icon={faHouse} className="fs-5" />
                  {!isCollapsed && <span className="fs-5 d-none ms-3 d-sm-inline">Home</span>}
                </NavLink>
              </li>
              <Can permission="usuarios.index">
                <li className="nav-item">
                  <NavLink
                    to="/dash/users"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active  bg-danger' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faUser} className="fs-5" />
                    {!isCollapsed && <span className="fs-5 d-none ms-3 d-sm-inline">Usuarios</span>}
                  </NavLink>
                </li>
              </Can>
              <Can permission="pacientes.index">
                <li className="nav-item">
                  <NavLink
                    to="/dash/pacientes"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active  bg-danger' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faHospitalUser} className="fs-5" />
                    {!isCollapsed && (
                      <span className="fs-5 d-none ms-3 d-sm-inline">Pacientes</span>
                    )}
                  </NavLink>
                </li>
              </Can>
              <Can permission="citas.index">
                <li className="nav-item disabled">
                  <NavLink
                    to="/dash/citas"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active bg-danger ' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faCalendarCheck} className="fs-5" />
                    {!isCollapsed && <span className="fs-5 d-none ms-3 d-sm-inline">Citas</span>}
                  </NavLink>
                </li>
              </Can>
              <Can permission="cronogramas.index">
                <li className="nav-item disabled">
                  <NavLink
                    to="/dash/cronograma"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active bg-danger' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faUserShield} className="fs-5" />
                    {!isCollapsed && (
                      <span className="fs-5 d-none ms-3 d-sm-inline">Cronograma de Guardias</span>
                    )}
                  </NavLink>
                </li>
              </Can>
              <Can permission="colas.index">
                <li className="nav-item disabled">
                  <NavLink
                    to="/dash/ColaPacientes"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active bg-danger' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faClipboardUser} className="fs-5" />
                    {!isCollapsed && (
                      <span className="fs-5 d-none ms-3 d-sm-inline">Cola Pacientes</span>
                    )}
                  </NavLink>
                </li>
              </Can>
              <Can permission="atender.index">
                <li className="nav-item disabled">
                  <NavLink
                    to="/dash/atenderPaciente"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active bg-danger' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faUserDoctor} className="fs-5" />
                    {!isCollapsed && (
                      <span className="fs-5 d-none ms-3 d-sm-inline">Atender Paciente</span>
                    )}
                  </NavLink>
                </li>
              </Can>
              <Can permission="servicios.index">
                <li className="nav-item disabled">
                  <NavLink
                    to="/dash/servicios"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active bg-danger' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faHandHoldingMedical} className="fs-5" />
                    {!isCollapsed && (
                      <span className="fs-5 d-none ms-3 d-sm-inline">Servicios</span>
                    )}
                  </NavLink>
                </li>
              </Can>
              <Can permission="historias.index">
                <li className="nav-item disabled">
                  <NavLink
                    to="/dash/historias"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active bg-danger' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faBookMedical} className="fs-5" />
                    {!isCollapsed && (
                      <span className="fs-5 d-none ms-3 d-sm-inline">Historias</span>
                    )}
                  </NavLink>
                </li>
              </Can>
              <Can permission="inventarios.index">
                <li className="nav-item disabled">
                  <NavLink
                    to="/dash/inventario"
                    className={({ isActive }) =>
                      `nav-link text-white text-decoration-none ${isActive ? 'active bg-danger' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faBoxesStacked} className="fs-5" />
                    {!isCollapsed && (
                      <span className="fs-5 d-none ms-3 d-sm-inline">Inventario</span>
                    )}
                  </NavLink>
                </li>
              </Can>
            </ul>
          </div>
        </div>
        <div className={`col p-3 ${isCollapsed ? 'col-md-11 col-lg-11' : 'col-md-9 col-lg-9'}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired
}

export default Dash
