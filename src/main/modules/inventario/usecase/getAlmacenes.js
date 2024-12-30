import { ipcMain } from 'electron'
import { Almacen } from '../../../singletons/database/schema'

ipcMain.handle('getAlmacenes', async () => {
  try {
    const almacenes = await Almacen.findAll()
    return almacenes.map((almacen) => almacen.toJSON())
  } catch (error) {
    console.error(error)
    throw error
  }
})
