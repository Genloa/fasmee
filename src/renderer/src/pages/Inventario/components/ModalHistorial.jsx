import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

export default function ModalHistorial({ show, handleClose, articulo }) {
  const [ingresosArticulo, setIngresosArticulo] = useState([])
  const [retirosArticulo, setRetirosArticulo] = useState([])

  const [searchStartDate, setSearchStartDate] = useState('')
  const [searchEndDate, setSearchEndDate] = useState('')
  const [searchPerfilName, setSearchPerfilName] = useState('')

  const [currentPageIngresos, setCurrentPageIngresos] = useState(0)
  const [currentPageRetiros, setCurrentPageRetiros] = useState(0)
  const usersPerPage = 5

  const handleStartDateChange = (event) => {
    setSearchStartDate(event.target.value)
  }

  const handleEndDateChange = (event) => {
    setSearchEndDate(event.target.value)
  }

  const handlePerfilNameChange = (event) => {
    setSearchPerfilName(event.target.value)
  }

  useEffect(() => {
    fetchIngresos()
    fetchRetiros()
  }, [])

  const fetchIngresos = async () => {
    try {
      const fetchedIngresos = await window.api.getIngresosArticulo(articulo.id)
      setIngresosArticulo(fetchedIngresos)
    } catch (error) {
      console.error('Error fetching ingresos:', error)
    }
  }

  const fetchRetiros = async () => {
    try {
      const fetchedRetiros = await window.api.getRetirosArticulo(articulo.id)
      setRetirosArticulo(fetchedRetiros)
    } catch (error) {
      console.error('Error fetching ingresos:', error)
    }
  }
  const filteredIngresos = ingresosArticulo.filter((ingreso) => {
    const ingresoDate = new Date(ingreso.fecha_ingreso).toISOString().split('T')[0]
    return (
      (!searchStartDate || ingresoDate >= searchStartDate) &&
      (!searchEndDate || ingresoDate <= searchEndDate)
    )
  })

  const filteredRetiros = retirosArticulo.filter((retiro) => {
    const retiroDate = new Date(retiro.fecha_retiro).toISOString().split('T')[0]
    const perfilName = `${retiro.perfil.nombres} ${retiro.perfil.apellidos}`.toLowerCase()
    return (
      (!searchStartDate || retiroDate >= searchStartDate) &&
      (!searchEndDate || retiroDate <= searchEndDate) &&
      (!searchPerfilName || perfilName.includes(searchPerfilName.toLowerCase()))
    )
  })

  const pagesVisitedIngresos = currentPageIngresos * usersPerPage
  const pagesVisitedRetiros = currentPageRetiros * usersPerPage

  const pageCountIngresos = Math.ceil(filteredIngresos.length / usersPerPage)
  const pageCountRetiros = Math.ceil(filteredRetiros.length / usersPerPage)

  const changePageIngresos = ({ selected }) => {
    setCurrentPageIngresos(selected)
  }

  const changePageRetiros = ({ selected }) => {
    setCurrentPageRetiros(selected)
  }

  return (
    <>
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        id="modal-delete-paciente"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Historial de {articulo.nombre}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="ingresos-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#ingresos"
                    type="button"
                    role="tab"
                    aria-controls="ingresos"
                    aria-selected="true"
                  >
                    Ingresos
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="retiros-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#retiros"
                    type="button"
                    role="tab"
                    aria-controls="retiros"
                    aria-selected="false"
                  >
                    Retiros
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="ingresos"
                  role="tabpanel"
                  aria-labelledby="ingresos-tab"
                >
                  <div className="d-flex flex-wrap justify-content-around mb-4">
                    <div className="col form-floating mb-3 mt-3 me-3">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingStartDate"
                        placeholder="Fecha Desde"
                        aria-label="Fecha Desde"
                        value={searchStartDate}
                        onChange={handleStartDateChange}
                      />
                      <label htmlFor="floatingStartDate">Fecha Desde</label>
                    </div>
                    <div className="col form-floating mb-3 mt-3 me-3">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingEndDate"
                        placeholder="Fecha Hasta"
                        aria-label="Fecha Hasta"
                        value={searchEndDate}
                        onChange={handleEndDateChange}
                      />
                      <label htmlFor="floatingEndDate">Fecha Hasta</label>
                    </div>
                  </div>
                  <table className="table table-sm table-hover align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Fecha de Ingreso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIngresos
                        .slice(pagesVisitedIngresos, pagesVisitedIngresos + usersPerPage)
                        .map((ingreso) => (
                          <tr key={ingreso.id}>
                            <td>{ingreso.cantidad}</td>
                            <td>{new Date(ingreso.fecha_ingreso).toLocaleString()}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    pageCount={pageCountIngresos}
                    onPageChange={changePageIngresos}
                    containerClassName={'pagination'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    disabledClassName={'disabled'}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="retiros"
                  role="tabpanel"
                  aria-labelledby="retiros-tab"
                >
                  <div className="d-flex flex-wrap justify-content-around mb-4">
                    <div className="col form-floating mb-3 mt-3 me-3">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingStartDate"
                        placeholder="Fecha Desde"
                        aria-label="Fecha Desde"
                        value={searchStartDate}
                        onChange={handleStartDateChange}
                      />
                      <label htmlFor="floatingStartDate">Fecha Desde</label>
                    </div>
                    <div className="col form-floating mb-3 mt-3 me-3">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingEndDate"
                        placeholder="Fecha Hasta"
                        aria-label="Fecha Hasta"
                        value={searchEndDate}
                        onChange={handleEndDateChange}
                      />
                      <label htmlFor="floatingEndDate">Fecha Hasta</label>
                    </div>
                    <div className="col form-floating mb-3 mt-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingPerfilName"
                        placeholder="Buscar por Nombre"
                        aria-label="Buscar por Nombre"
                        value={searchPerfilName}
                        onChange={handlePerfilNameChange}
                      />
                      <label htmlFor="floatingPerfilName">Buscar por trabajador</label>
                    </div>
                  </div>
                  <table className="table table-sm table-hover align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Fecha de Retiro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRetiros
                        .slice(pagesVisitedRetiros, pagesVisitedRetiros + usersPerPage)
                        .map((retiro) => (
                          <tr key={retiro.id}>
                            <td>{retiro.perfil.nombres}</td>
                            <td>{retiro.perfil.apellidos}</td>
                            <td>{retiro.cantidad}</td>
                            <td>{new Date(retiro.fecha_retiro).toLocaleString()}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    pageCount={pageCountRetiros}
                    onPageChange={changePageRetiros}
                    containerClassName={'pagination'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    disabledClassName={'disabled'}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalHistorial.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  articulo: PropTypes.object.isRequired
}
