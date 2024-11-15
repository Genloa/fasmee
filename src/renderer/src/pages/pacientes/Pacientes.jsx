import Dash from '../../components/layouts/Dash'
import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

function Pacientes() {
  const { usuarios, setUsuarios } = useState([])

  const fetchUsers = async () => {
    const fetchedUsers = await window.api.getUsuarios()
    setUsuarios(fetchedUsers)
    console.log(fetchUsers)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <Dash>
        {' '}
        <div className="card border-white">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center ">
              <h5 className="card-title">Pacientes</h5>
              <button
                type="button"
                className="btn btn-primary "
                //onClick={() => openModalCrearUser()}
              >
                Nuevo Paciente
              </button>
            </div>
            <div className="form-floating mb-3 mt-3">
              <input
                type="search"
                className="form-control"
                id="floatingInput"
                placeholder="Buscar"
                aria-label="Buscar"
              />
              <label htmlFor="floatingInput">Buscar Paciente</label>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-2">
              {usuarios.map((user) => (
                <div className="col" key={user.id}>
                  <div className="card border-white text-center shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div className="text-center">
                      <img
                        src="../../src/img/paciente.jpg"
                        width="60%"
                        height="60%"
                        alt="Logo"
                        className="d-inline-block align-text-top rounded-circle mt-3"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {user.Perfil.nombres} {user.Perfil.apellidos}
                      </h5>
                      <p className="card-text">Trabajador MPPE</p>
                      <div>
                        <div
                          className="btn-group btn-group-sm"
                          role="group"
                          aria-label="Button group name"
                        >
                          <button
                            type="button"
                            className="btn btn-primary"
                            //onClick={() => openModalEditUser(user.id)}
                          >
                            <FontAwesomeIcon icon={faUserPen} className="fs-5" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            //onClick={() => openModalDeleteUser(user.id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dash>
    </>
  )
}

export default Pacientes
