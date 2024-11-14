import Dash from '../../components/layouts/Dash'

function Pacientes() {
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
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
              <div className="col">
                <div className="card border-primary">
                  <img
                    src="../../src/img/paciente.jpg"
                    alt="Logo"
                    height="90"
                    width="auto"
                    className="d-inline-block align-text-top "
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title 1</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border-primary">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border-primary">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border-primary">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dash>
    </>
  )
}

export default Pacientes
