import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import '../../css/dash.css'

// ./

Dash.propTypes = {
  children: PropTypes.node.isRequired
}

function Dash({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar>{children}</Sidebar>
    </>
  )
}
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white m-2">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="../../src/img/icon.png"
            alt="Logo"
            height="90"
            width="auto"
            className="d-inline-block align-text-top "
          />
        </a>
        <div className="d-flex flex-grow-1 justify-content-between align-items-center">
          <form className="d-flex flex-grow-1 mx-4" role="search">
            <input
              className="form-control  bg-light focus-ring focus-ring-primary border-light  rounded-4 w-50"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
          </form>
          <div className="dropdown">
            <button
              className="btn btn-outline-body dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Usuario
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Perfil
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Configuración
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Cerrar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
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
                  src={
                    isCollapsed
                      ? '../../src/img/menu-regular.png'
                      : '../../src/img/menu-alt-left-regular.png'
                  }
                  alt={isCollapsed ? 'Expand' : 'Collapse'}
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <ul className="nav nav-pills flex-column mt-5">
              <li className="nav-item">
                <NavLink to="/" className="text-decoration-none">
                  <a href="#" className="nav-link text-white">
                    <img
                      src="../../src/img/home.png"
                      className="me-1"
                      alt=""
                      width="20"
                      height="20"
                    />
                    {!isCollapsed && <span className="fs-5 d-none ms-3 d-sm-inline">Home</span>}
                  </a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dash/users" className="text-decoration-none">
                  <a href="#" className="nav-link text-white">
                    <img
                      src="../../src/img/user.png"
                      className="me-1"
                      alt=""
                      width="20"
                      height="20"
                    />
                    {!isCollapsed && <span className="fs-5 d-none ms-3 d-sm-inline">Usuarios</span>}
                  </a>
                </NavLink>
              </li>
              <li className="nav-item disabled">
                <a href="#" className="nav-link text-white">
                  <img
                    src="../../src/img/history.png"
                    className="me-1"
                    alt=""
                    width="20"
                    height="20"
                  />
                  {!isCollapsed && <span className="fs-5 d-none ms-3 d-sm-inline">Historias</span>}
                </a>
              </li>
              <li className="nav-item disabled">
                <a href="#" className="nav-link text-white">
                  <img
                    src="../../src/img/home.png"
                    className="me-1"
                    alt=""
                    width="20"
                    height="20"
                  />
                  {!isCollapsed && <span className="fs-5 d-none ms-3 d-sm-inline">products</span>}
                </a>
              </li>
              <li className="nav-item disabled">
                <a href="#" className="nav-link text-white">
                  <img
                    src="../../src/img/home.png"
                    className="me-1"
                    alt=""
                    width="20"
                    height="20"
                  />
                  {!isCollapsed && <span className="fs-5 d-none ms-3 d-sm-inline">orders</span>}
                </a>
              </li>
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
export default Dash
