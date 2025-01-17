import PropTypes from 'prop-types'
import FormArticulo from '../../../forms/FormArticulo'

export default function ModalCargar({
  show,
  handleClose,
  articulo,
  fetchInventario,
  handleShowToast
}) {
  const handleSubmit = async (data, resetForm) => {
    try {
      console.log(data)
      const articuloActualizado = await window.api.cargarArticulo(data.cantidad, articulo)
      console.log('Cita creada:', articuloActualizado)
      if (articuloActualizado) {
        fetchInventario()
        handleShowToast('Carga agregada correctamente')
        handleClose(true)
        resetForm() // Resetear el formulario después de crear la cita
      } else {
        handleShowToast('No se pudo agregar la carga')
      }
    } catch (error) {
      console.error('Error creando la cita:', error)
    }
  }

  const defaultValues = {
    nombre: articulo?.nombre,
    cantidad: 0,
    almacenId: articulo?.almacenId
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
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title" id="modalTitleId">
                Cargar articulo {articulo.nombre}
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
              <FormArticulo
                onSubmit={handleSubmit}
                defaultValues={defaultValues}
                handleClose={handleClose}
                hideNombre={true} // Ocultar el campo nombre
              />
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  )
}

ModalCargar.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  articulo: PropTypes.object.isRequired,
  fetchInventario: PropTypes.func.isRequired,
  handleShowToast: PropTypes.func.isRequired
}
