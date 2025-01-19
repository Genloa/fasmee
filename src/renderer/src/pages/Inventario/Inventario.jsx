import {
  faClipboard,
  faPersonChalkboard,
  faTrashCan,
  faTruckRampBox
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Toast } from 'bootstrap'
import { createContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Dash from '../../components/layouts/Dash'
import Can from '../../helpers/can'
import ModalCargar from './components/ModalCargar'
import ModalCrearAlmacen from './components/ModalCrearAlmacen'
import ModalCrearArticulo from './components/ModalCrearArticulo'
import ModalEliminar from './components/ModalEliminar'
import ModalHistorial from './components/ModalHistorial'
import ModalRetirar from './components/ModalRetirar'

const InventarioContext = createContext({ inventario: [], setInventario: () => {} })

export default function Inventario() {
  const [inventario, setInventario] = useState([])
  const [articulos, setArticulos] = useState([])
  const [almacenes, setAlmacenes] = useState([])

  const [searchArticuloName, setSearchArticuloName] = useState('')
  const [searchAlmacenName, setSearchAlmacenName] = useState('')
  const [searchAlmacenDescription, setSearchAlmacenDescription] = useState('')

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
  const handleCloseModalAlmacen = () => {
    setShowModalAlmacen(false)
    fetchAlmacenes() // Actualizar almacenes después de cerrar el modal
  }

  const [showModalHistorial, setShowModalHistorial] = useState(false)
  const handleShowModalHistorial = (articulo) => {
    setSelectedArticulo(articulo)
    setShowModalHistorial(true)
  }
  const handleCloseModalHistorial = () => {
    setShowModalHistorial(false)
    setSelectedArticulo(null)
  }

  const [showModalCargar, setShowModalCargar] = useState(false)
  const handleShowModalCargar = (data) => {
    setSelectedArticulo(data)
    setShowModalCargar(true)
  }
  const handleCloseModalCargar = () => {
    setShowModalCargar(false)
    setSelectedArticulo(null)
  }

  const [showModalRetirar, setShowModalRetirar] = useState(false)
  const handleShowModalRetirar = (articulo) => {
    setSelectedArticulo(articulo)
    setShowModalRetirar(true)
  }
  const handleCloseModalRetirar = () => {
    setShowModalRetirar(false)
    setSelectedArticulo(null)
  }

  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const handleShowModalEliminar = (articulo) => {
    setSelectedArticulo(articulo)
    setShowModalEliminar(true)
  }
  const handleCloseModalEliminar = () => {
    setShowModalEliminar(false)
    setSelectedArticulo(null)
  }

  const [selectedArticulo, setSelectedArticulo] = useState(null)

  useEffect(() => {
    fetchInventario()
    fetchArticulos()
    fetchAlmacenes()
  }, [])

  const fetchInventario = async () => {
    try {
      const fetchedInventario = await window.api.getArticulosAlmacen()
      setInventario(fetchedInventario)
    } catch (error) {
      console.error('Error fetching Inventario:', error)
    }
  }

  const fetchArticulos = async () => {
    try {
      const fetchedArticulos = await window.api.getArticulos()
      setArticulos(fetchedArticulos)
    } catch (error) {
      console.error('Error fetching Articulos:', error)
    }
  }

  const fetchAlmacenes = async () => {
    try {
      const fetchedAlmacenes = await window.api.getAlmacenes()
      setAlmacenes(fetchedAlmacenes)
    } catch (error) {
      console.error('Error fetching Almacenes:', error)
    }
  }

  const handleArticuloNameChange = (event) => {
    setSearchArticuloName(event.target.value)
  }

  const handleAlmacenNameChange = (event) => {
    const [name, description] = event.target.value.split(' - ')
    setSearchAlmacenName(name)
    setSearchAlmacenDescription(description || '')
  }

  const getArticuloIdByName = (name) => {
    const articulo = articulos.find((a) => a.nombre === name)
    return articulo ? articulo.id : ''
  }

  const getAlmacenIdByName = (name, description) => {
    const almacen = almacenes.find((a) => a.cubiculo === name && a.descripcion === description)
    return almacen ? almacen.id : ''
  }

  const filteredInventario = inventario.filter((item) => {
    const articuloId = getArticuloIdByName(searchArticuloName)
    const almacenId = getAlmacenIdByName(searchAlmacenName, searchAlmacenDescription)
    return (
      (!searchArticuloName || item.id === articuloId) &&
      (!searchAlmacenName || item.almacenId === almacenId)
    )
  })

  const displayItems = filteredInventario
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => (
      <tr key={`${item.id}-${item.almacenId}`}>
        <td>{item.nombre}</td>
        <td>{item.cantidad}</td>
        <td>{item.almacen?.cubiculo}</td>
        <td>{item.almacen?.descripcion}</td>
        <td className="text-end">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Can permission="inventarios.moveHistory">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleShowModalHistorial(item)}
                  >
                    <FontAwesomeIcon icon={faClipboard} className="fs-5" />
                    <span className="fs-6 d-none ms-3 d-sm-inline">Historial</span>
                  </button>
                </li>
              </Can>
              <li className="dropdown-divider"></li>
              <Can permission="inventarios.cargarInventario">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleShowModalCargar(item)}
                  >
                    <FontAwesomeIcon icon={faTruckRampBox} className="fs-5" />
                    <span className="fs-6 d-none ms-3 d-sm-inline">Cargar</span>
                  </button>
                </li>
              </Can>
              <Can permission="inventarios.descargarInventario">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleShowModalRetirar(item)}
                  >
                    <FontAwesomeIcon icon={faPersonChalkboard} className="fs-5" />
                    <span className="fs-6 d-none ms-3 d-sm-inline">Retirar</span>
                  </button>
                </li>
              </Can>
              <Can permission="inventarios.deleteProduct">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleShowModalEliminar(item)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="fs-5 me-2" />
                    <span className="fs-6 d-none ms-3 d-sm-inline">Eliminar</span>
                  </button>
                </li>
              </Can>
            </ul>
          </div>
        </td>
      </tr>
    ))

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
            fetchAlmacenes={fetchAlmacenes} // Pasar fetchAlmacenes como prop
            handleShowToast={handleShowToast}
          />
          {selectedArticulo && (
            <>
              <ModalHistorial
                show={showModalHistorial}
                handleClose={handleCloseModalHistorial}
                articulo={selectedArticulo}
              />
              <ModalCargar
                show={showModalCargar}
                handleClose={handleCloseModalCargar}
                articulo={selectedArticulo}
                fetchInventario={fetchInventario}
                handleShowToast={handleShowToast}
              />
              <ModalRetirar
                show={showModalRetirar}
                handleClose={handleCloseModalRetirar}
                articulo={selectedArticulo}
                fetchInventario={fetchInventario}
                handleShowToast={handleShowToast}
              />
              <ModalEliminar
                show={showModalEliminar}
                handleClose={handleCloseModalEliminar}
                articulo={selectedArticulo}
                fetchInventario={fetchInventario}
                handleShowToast={handleShowToast}
              />
            </>
          )}
          <div className="card border-white">
            <div className="card-body">
              <h5 className="card-title fs-3">Inventario</h5>
              <div className="text-end">
                <Can permission="inventarios.create">
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={handleShowModalAlmacen}
                  >
                    Nuevo Almacén
                  </button>
                </Can>
                <Can permission="inventarios.createProduct">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleShowModalArticulo}
                  >
                    Nuevo Artículo
                  </button>
                </Can>
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
                    value={`${searchAlmacenName} - ${searchAlmacenDescription}`}
                    onChange={handleAlmacenNameChange}
                  >
                    <option value="">Seleccione un Almacén</option>
                    {almacenes.map((almacen) => (
                      <option
                        key={almacen.id}
                        value={`${almacen.cubiculo} - ${almacen.descripcion}`}
                      >
                        {almacen.cubiculo} - {almacen.descripcion}
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
                        <th scope="col">Cubiculo</th>
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
