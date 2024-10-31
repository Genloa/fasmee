import Dash from '../../components/layouts/Dash'

function Usuarios() {
  return (
    <>
      <Dash>
        <div className="card border-white">
          <div className="card-body">
            <h5 className="card-title">Usuarios</h5>
            <div className="form-floating mb-3 mt-5">
              <input
                type="search"
                className="form-control"
                id="floatingInput"
                placeholder="Buscar"
                aria-label="Buscar"
              />
              <label htmlFor="floatingInput">Buscar Usuario</label>
            </div>
            <div className="mt-5">
              <div className="text-end mb-3">
                <ModalCreate />
              </div>
              <TableUsers />
            </div>
          </div>
        </div>
      </Dash>
    </>
  )
}

function ModalCreate() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Crear Usuario
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crear Usuario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body m-2">
              <form className="row g-3">
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="text"
                        className="form-control "
                        id="floatingInput"
                        placeholder="Nombres"
                        aria-label="nombres"
                      />
                      <label htmlFor="floatingInput">Nombres</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="text"
                        className="form-control "
                        id="floatingInput"
                        placeholder="Apellidos"
                        aria-label="apellidos"
                      />
                      <label htmlFor="floatingInput">Apellidos</label>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="input-group  col">
                    <select
                      className="form-select flex-grow-0 bg-light"
                      style={{ width: '60px' }}
                      aria-label="Tipo de documento"
                    >
                      <option selected>V</option>
                      <option value="E">E</option>
                    </select>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cedula"
                      aria-label="Cedula"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre de Usuario"
                      aria-label="Username"
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Contraseña"
                      />
                      <label htmlFor="floatingPassword"> Contraseña</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Contraseña"
                      />
                      <label htmlFor="floatingPassword">Confirmar Contraseña</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Guardar Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function TableUsers() {
  return (
    <div
      className="scrollspy-example bg-light-tertiary p-3 rounded-2"
      style={{ maxHeight: '300px', overflowY: 'auto' }}
    >
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Usuario</th>
            <th scope="col">Rol</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Genesis Delgado</th>
            <td>gdelgado</td>
            <td>Admin</td>
            <td className="text-primary">Activo</td>
          </tr>
          <tr>
            <th scope="row">David Alvarado</th>
            <td>dalvarado</td>
            <td>Usuario</td>
            <td className="text-primary">Activo</td>
          </tr>
          <tr>
            <th scope="row">Ana Martínez</th>
            <td>amartinez</td>
            <td>Usuario</td>
            <td className="text-primary">Activo</td>
          </tr>
          <tr>
            <th scope="row">Carlos Ruiz</th>
            <td>cruiz</td>
            <td>Admin</td>
            <td className="text-primary">Activo</td>
          </tr>
          <tr>
            <th scope="row">Laura Gómez</th>
            <td>lgomez</td>
            <td>Usuario</td>
            <td className="text-primary">Activo</td>
          </tr>
          <tr>
            <th scope="row">Ana Martínez</th>
            <td>amartinez</td>
            <td>Usuario</td>
            <td className="text-primary">Activo</td>
          </tr>
          <tr>
            <th scope="row">Carlos Ruiz</th>
            <td>cruiz</td>
            <td>Admin</td>
            <td className="text-primary">Activo</td>
          </tr>
          <tr>
            <th scope="row">Laura Gómez</th>
            <td>lgomez</td>
            <td>Usuario</td>
            <td className="text-primary">Activo</td>
          </tr>
          {/* Puedes agregar más filas aquí */}
        </tbody>
      </table>
    </div>
  )
}

export default Usuarios
