import Dash from '../../components/layouts/Dash'
import { NavLink } from 'react-router-dom'
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
                <NavLink to="/dash/users/register" className="text-decoration-none">
                  <button type="button" className="btn btn-primary">
                    Crear Usuario
                  </button>
                </NavLink>
              </div>
              <TableUsers />
            </div>
          </div>
        </div>
      </Dash>
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
