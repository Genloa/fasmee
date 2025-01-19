import { ipcMain } from 'electron'
import { ArticuloIngresado } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getIngresosArticulo', async (event, id) => {
  try {
    const ingresos = await ArticuloIngresado.findAll({
      where: {
        articuloId: id
      }
    })

    const articuloSerializables = ingresos.map((ingreso) => ingreso.toJSON())
    return articuloSerializables
  } catch (error) {
    console.error('Error ingresos:', error)
    throw error
  }
})
