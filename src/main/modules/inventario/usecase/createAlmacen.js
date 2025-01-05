import { ipcMain } from 'electron'
import { Almacen } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createAlmacen', async (event, data) => {
  try {
    const almacen = await Almacen.create({
      cubiculo: data.cubiculo,
      descripcion: data.descripcion
    })
    const almacenSerializables = almacen.toJSON()
    return almacenSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
