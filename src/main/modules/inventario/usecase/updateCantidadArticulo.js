import { ipcMain } from 'electron'
import { Articulo } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('updateCantidadArticulo', async (event, { cantidad, data }) => {
  try {
    const articulo = await Articulo.update(
      {
        cantidad: data.cantidad + cantidad,
        fecha_ingreso: new Date()
      },
      {
        where: {
          id: data.id
        }
      }
    )

    const articuloActualizado = await Articulo.findOne(
      {},
      {
        where: {
          id: articulo
        }
      }
    )

    console.log('Articulo actualizado:----------------', articulo)
    const articuloSerializables = articuloActualizado.toJSON()
    return articuloSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
