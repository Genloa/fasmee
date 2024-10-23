import { Navigate, NavLink } from "react-router-dom"

function Dash({ children }) {
  return (
    <>
   <div className="row">
          <div className="col">
            <img src="././src/img/icon.png" className=" bg-body mt-4 ms-5" alt="..." width="60%" height="50%" />
          </div>
        <div className="col-8 me-4">
            <nav className="navbar mt-4 me-5 rounded-4 ">
                        <div className="container-fluid col-9">
                          <form className="d-flex" role="search">
                            <input
                              className="form-control  bg-light focus-ring focus-ring-danger border-light  rounded-4 "
                              type="search"
                              placeholder="Buscar"
                              aria-label="Search"
                            />
                          </form>
                          </div>
                          <div class="dropdown col">
                  <button class="btn btn-body dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Usuario
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Perfil</a></li>
                    <li><a class="dropdown-item" href="#">Configuracion</a></li>
                    <li><a class="dropdown-item" href="#">Cerrar</a></li>
                  </ul>
                
              </div>
            </nav>
          </div>
      </div>
      <div className="container-fluid">
  <div className="row flex-nowrap">
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary rounded-top">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span className="fs-5 d-none d-sm-inline">Menu</span>
              </a>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <li className="nav-item">
                     <NavLink to="/"><a href="#" className="nav-link align-middle px-0 text-white">
                          <i className="fs-4 bi-house"></i><span className="ms-1 d-none d-sm-inline">Home</span>
                      </a></NavLink> 
                  </li>
                  <li>
                      <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                          <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline text-white">Dashboard</span> </a>
                      <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                          <li className="w-100">
                              <a href="#" className="nav-link px-0 text-white"> <span className="d-none d-sm-inline">Item</span> 1 </a>
                          </li>
                          <li>
                              <a href="#" className="nav-link px-0 text-white"> <span className="d-none d-sm-inline">Item</span> 2 </a>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <NavLink to="/dash/users">
                      <a className="nav-link px-0 align-middle text-white">
                          <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Usuario</span></a></NavLink>
                  </li>
                  
              </ul>
             
          </div>
      </div>
      <div className="col py-3">
          {children}
      </div>
  </div>
</div>
      
      
    </>
  )
}

export default Dash
