import { ipcMain } from 'electron'
import { Cita } from '../../../singletons/database/schema'

ipcMain.handle('deleteCita', async (event, id) => {
  try {
    // Encuentra la cita
    const cita = await Cita.findOne({
      where: { id: id }
    })

    if (!cita) {
      throw new Error('Cita no encontrada.')
    }

    // Elimina la cita
    await Cita.destroy({
      where: { id: id }
    })

    // Envía un mensaje de éxito
    return {
      message: 'Cita eliminada correctamente.'
    }
  } catch (error) {
    // Maneja el error y envía un mensaje de error
    console.error('Error al eliminar perfil y sus relaciones:', error)
    return {
      message: 'Ocurrió un error al eliminar el perfil y sus relaciones.',
      error: error.message
    }
  }
})
