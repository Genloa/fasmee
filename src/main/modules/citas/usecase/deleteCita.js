import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Cita } from '../../../singletons/database/schema'

ipcMain.handle('deleteCita', async (event, id) => {
  const t = await db.getConnection().transaction()

  try {
    // Encuentra la cita
    const cita = await Cita.findOne(
      {
        where: { id: id }
      },
      { transaction: t }
    )

    if (!cita) {
      throw new Error('cita no encontrada.')
    }

    // Elimina la cita
    await Cita.destroy(
      {
        where: { id: id }
      },
      { transaction: t }
    )

    // Confirma la transacción
    await t.commit()

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
