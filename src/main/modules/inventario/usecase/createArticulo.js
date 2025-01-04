import { ipcMain } from 'electron'
import { Almacen, Articulo } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createArticulo', async (event, data) => {
  try {
    const articulo = await Articulo.create({
      nombre: data.nombre,
      cantidad: data.cantidad,
      almacenId: data.almacenId,
      include: [
        {
          model: Almacen,
          as: 'almacen'
        }
      ]
    })
    const articuloSerializables = articulo.toJSON()
    return articuloSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
