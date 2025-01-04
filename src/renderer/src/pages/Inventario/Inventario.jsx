import { createContext, useEffect, useState } from 'react'
import Dash from '../../components/layouts/Dash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonChalkboard, faTrashCan, faTruckRampBox } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate'
import ModalCrearArticulo from './components/ModalCrearArticulo'
import ModalCrearAlmacen from './components/ModalCrearAlamacen'
import { Toast } from 'bootstrap'

const InventarioContext = createContext({ inventario: [], setInventario: () => {} })
export default function Inventario() {
  const [inventario, setInventario] = useState([])
  const [articulos, setArticulos] = useState([])
  const [almacenes, setAlmacenes] = useState([])

  const [searchArticuloName, setSearchArticuloName] = useState('')
  const [searchAlmacenName, setSearchAlmacenName] = useState('')

  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10
  const pagesVisited = currentPage * itemsPerPage

  // Modal Crear Articulo
  const [showModalArticulo, setShowModalArticulo] = useState(false)
  const handleShowModalArticulo = () => setShowModalArticulo(true)
  const handleCloseModalArticulo = () => setShowModalArticulo(false)

  // Modal Crear Almacen
  const [showModalAlmacen, setShowModalAlmacen] = useState(false)
  const handleShowModalAlmacen = () => setShowModalAlmacen(true)
  const handleCloseModalAlmacen = () => setShowModalAlmacen(false)

  useEffect(() => {
    fetchInventario()
    fetchArticulos()
    fetchAlmacenes()
  }, [])

  const fetchInventario = async () => {
    try {
      const fetchedInventario = await window.api.getArticulosAlmacen()
      setInventario(fetchedInventario)
      console.log('Inventario:', inventario)
      console.log('Inventario:', fetchedInventario)
    } catch (error) {
      console.error('Error fetching Inventario:', error)
    }
  }

  const fetchArticulos = async () => {
    try {
      const fetchedArticulos = await window.api.getArticulos()
      setArticulos(fetchedArticulos)
      console.log('Articulos:', fetchedArticulos)
    } catch (error) {
      console.error('Error fetching Articulos:', error)
    }
  }

  const fetchAlmacenes = async () => {
    try {
      const fetchedAlmacenes = await window.api.getAlmacenes()
      setAlmacenes(fetchedAlmacenes)
      console.log('Almacenes:', fetchedAlmacenes)
    } catch (error) {
      console.error('Error fetching Almacenes:', error)
    }
  }

  const handleArticuloNameChange = (event) => {
    setSearchArticuloName(event.target.value)
  }

  const handleAlmacenNameChange = (event) => {
    setSearchAlmacenName(event.target.value)
  }

  const getArticuloIdByName = (name) => {
    const articulo = articulos.find((a) => a.nombre === name)
    return articulo ? articulo.id : ''
  }

  const getAlmacenIdByName = (name) => {
    const almacen = almacenes.find((a) => a.cubiculo === name)
    return almacen ? almacen.id : ''
  }

  const filteredInventario = inventario.filter((item) => {
    const articuloId = getArticuloIdByName(searchArticuloName)
    const almacenId = getAlmacenIdByName(searchAlmacenName)
    return (
      (!searchArticuloName || item.id === articuloId) &&
      (!searchAlmacenName || item.almacenes.some((almacen) => almacen.id === almacenId))
    )
  })

  const displayItems = filteredInventario
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) =>
      item.almacenes.map((almacen) => (
        <tr key={`${item.id}-${almacen.id}`}>
          <td>{item.nombre}</td>
          <td>{almacen.articulo_on_almacen.cantidad}</td>
          <td>{almacen.cubiculo}</td>
          <td>{almacen.descripcion}</td>
          <td className="text-end">
            <button type="button" className="btn btn-sm btn-primary me-2">
              <FontAwesomeIcon icon={faPersonChalkboard} className="fs-5" />
            </button>
            <div className="btn-group btn-group-sm" role="group" aria-label="Button group name">
              <button type="button" className="btn btn-success">
                <FontAwesomeIcon icon={faTruckRampBox} className="fs-5" />
              </button>
              <button type="button" className="btn btn-danger">
                <FontAwesomeIcon icon={faTrashCan} className="fs-5" />
              </button>
            </div>
          </td>
        </tr>
      ))
    )

  const pageCount = Math.ceil(filteredInventario.length / itemsPerPage)

  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const handleShowToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToast')
      const toast = new Toast(toastEl)
      toast.show()
      // Restablecer el estado showToast a false después de que el toast se haya mostrado
      const timeout = setTimeout(() => {
        setShowToast(false)
      }, 3000) // Ajusta el tiempo según sea necesario

      return () => clearTimeout(timeout)
    }
  }, [showToast])

  return (
    <>
      <Dash>
        <InventarioContext.Provider value={{ inventario, setInventario }}>
          <ModalCrearArticulo
            show={showModalArticulo}
            handleClose={handleCloseModalArticulo}
            fetchInventario={fetchInventario}
            fetchArticulos={fetchArticulos}
            handleShowToast={handleShowToast}
          />
          <ModalCrearAlmacen
            show={showModalAlmacen}
            handleClose={handleCloseModalAlmacen}
            fetchAlmacenes={fetchAlmacenes}
          />
          <div className="card border-white">
            <div className="card-body">
              <h5 className="card-title fs-3">Inventario</h5>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={handleShowModalAlmacen}
                >
                  Nuevo Almacén
                </button>
                <button type="button" className="btn btn-primary" onClick={handleShowModalArticulo}>
                  Nuevo Artículo
                </button>
              </div>
              <div className="d-flex flex-wrap justify-content-around mb-4">
                <div className="col form-floating mb-3 mt-3 me-3">
                  <select
                    className="form-control"
                    id="floatingArticuloName"
                    aria-label="Buscar por Nombre de Artículo"
                    value={searchArticuloName}
                    onChange={handleArticuloNameChange}
                  >
                    <option value="">Seleccione un Artículo</option>
                    {articulos.map((articulo) => (
                      <option key={articulo.id} value={articulo.nombre}>
                        {articulo.nombre}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingArticuloName">Nombre del Artículo</label>
                </div>

                <div className="col form-floating mb-3 mt-3">
                  <select
                    className="form-control"
                    id="floatingAlmacenName"
                    aria-label="Buscar por Nombre de Almacén"
                    value={searchAlmacenName}
                    onChange={handleAlmacenNameChange}
                  >
                    <option value="">Seleccione un Almacén</option>
                    {almacenes.map((almacen) => (
                      <option key={almacen.id} value={almacen.cubiculo}>
                        {almacen.cubiculo}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingAlmacenName">Nombre del Almacén</label>
                </div>
              </div>
              <div className="mt-5">
                <div className="container">
                  <table className="table table-sm table-hover align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Artículo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Almacén</th>
                        <th scope="col">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>{displayItems}</tbody>
                  </table>
                  <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    pageCount={pageCount}
                    onPageChange={changePage}
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
          </div>
          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div
              id="liveToast"
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
        </InventarioContext.Provider>
      </Dash>
    </>
  )
}

export { InventarioContext }
