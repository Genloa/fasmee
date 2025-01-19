import { ipcMain } from 'electron'
import { Articulo, ArticuloIngresado } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('cargarArticulo', async (event, { cantidad, data }) => {
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
    await ArticuloIngresado.create({
      articuloId: articulo,
      cantidad: cantidad,
      fecha_ingreso: new Date()
    })

    const articuloActualizado = await Articulo.findOne(
      {},
      {
        where: {
          id: articulo
        }
      }
    )

    const articuloSerializables = articuloActualizado.toJSON()
    return articuloSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
