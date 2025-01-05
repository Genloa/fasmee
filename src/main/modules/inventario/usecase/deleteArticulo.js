import { ipcMain } from 'electron'
import { Articulo } from '../../../singletons/database/schema'

ipcMain.handle('deleteArticulo', async (event, id) => {
  try {
    // Encuentra la articulo
    const articulo = await Articulo.findOne({
      where: { id: id }
    })

    if (!articulo) {
      throw new Error('articulo no encontrada.')
    }

    await Articulo.destroy({
      where: { id: id }
    })

    // Envía un mensaje de éxito
    return {
      message: 'Articulo eliminado correctamente.'
    }
  } catch (error) {
    // Maneja el error y envía un mensaje de error
    console.error('Error al eliminar articulo y sus relaciones:', error)
    return {
      message: 'Ocurrió un error al eliminar el articulo y sus relaciones.',
      error: error.message
    }
  }
})
