import { ipcMain } from 'electron'
import { Articulo, PerfilOnArticulo } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('retirarArticulo', async (event, { dataR, data }) => {
  try {
    await PerfilOnArticulo.create({
      articuloId: data.id,
      perfilId: dataR.medicoId,
      cantidad: dataR.cantidad,
      fecha_retiro: new Date()
    })

    const articulo = await Articulo.update(
      {
        cantidad: data.cantidad - dataR.cantidad
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

    const articuloSerializables = articuloActualizado.toJSON()
    return articuloSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
