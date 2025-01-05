import { ipcMain } from 'electron'
import { Almacen, Articulo, ArticuloIngresado } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createArticulo', async (event, data) => {
  try {
    const articulo = await Articulo.create({
      nombre: data.nombre,
      cantidad: data.cantidad,
      almacenId: data.almacenId,
      fecha_ingreso: new Date(),
      include: [
        {
          model: Almacen,
          as: 'almacen'
        }
      ]
    })
    await ArticuloIngresado.create({
      articuloId: articulo.id,
      cantidad: data.cantidad,
      fecha_ingreso: new Date()
    })

    const articuloSerializables = articulo.toJSON()
    return articuloSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
