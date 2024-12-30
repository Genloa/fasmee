import { ipcMain } from 'electron'
import { Almacen, Articulo } from '../../../singletons/database/schema'

ipcMain.handle('getArticulosAlmacenes', async () => {
  try {
    const Articulos = await Articulo.findAll({
      include: [
        {
          model: Almacen,
          as: 'almacenes'
        }
      ]
    })
    return Articulos.map((articulo) => articulo.toJSON())
  } catch (error) {
    console.error(error)
    throw error
  }
})
