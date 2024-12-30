import { ipcMain } from 'electron'
import { Articulo } from '../../../singletons/database/schema'

ipcMain.handle('getArticulos', async () => {
  try {
    const articulos = await Articulo.findAll()
    return articulos.map((articulo) => articulo.toJSON())
  } catch (error) {
    console.error(error)
    throw error
  }
})
