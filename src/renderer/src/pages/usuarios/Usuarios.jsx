import Dash from '../../components/layouts/Dash'
import { useState } from 'react'
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
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [tipoCedula, setTipoCedula] = useState('')
  const [cedula, setCedula] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [correo, setCorreo] = useState('')
  /*   const [telefono, setTelefono] = useState('')
   */

  const handleCrearUsuario = async (e) => {
    console.log(e)
    alert('Usuario creado correctamente')
  }

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
              <form onSubmit={handleCrearUsuario} className="row g-3">
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="text"
                        className="form-control "
                        id="nombres"
                        placeholder="Nombres"
                        aria-label="nombres"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                      />
                      <label htmlFor="nombres">Nombres</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="text"
                        className="form-control"
                        id="apellidos"
                        placeholder="apellidos"
                        aria-label="apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                      />
                      <label htmlFor="apellidos">Apellidos</label>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="input-group  col">
                    <select
                      className="form-select flex-grow-0 bg-light"
                      style={{ width: '60px' }}
                      aria-label="Tipo de documento"
                      value={tipoCedula}
                      onChange={(e) => setTipoCedula(e.target.value)}
                    >
                      <option value="V">V</option>
                      <option value="E">E</option>
                    </select>
                    <input
                      type="text"
                      className="form-control"
                      id="cedula"
                      placeholder="Cedula"
                      aria-label="Cedula"
                      aria-describedby="basic-addon1"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                    />
                  </div>

                  <div className="col">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Nombre de Usuario"
                      aria-label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingDate"
                        placeholder="fechaNacimiento"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                      />
                      <label htmlFor="floatingDate"> fecha de nacimiento</label>
                    </div>
                  </div>
                  <div className="input-group  col">
                    <select
                      className="form-select flex-grow-0 bg-light"
                      style={{ width: '90px' }}
                      aria-label="Tipo de documento"
                    >
                      <option selected>0416</option>
                      <option value="1">0426</option>
                      <option value="2">0424</option>
                      <option value="3">0414</option>
                      <option value="4">0412</option>
                    </select>
                    <input
                      type="phone"
                      className="form-control"
                      aria-label="Telefono"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div className="form-floating ">
                      <input
                        type="email"
                        className="form-control"
                        id="correo"
                        placeholder="Contraseña"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                      <label htmlFor="correo">Correo</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">
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
