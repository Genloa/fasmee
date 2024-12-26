import { ipcMain } from 'electron'
import { Cita } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('validateCita', async (event, data) => {
  try {
    const citas = await Cita.findAll({
      where: {
        perfilId: data.medicoId,
        fecha_cita: new Date(data.fechaCita)
      }
    })

    if (citas.length >= 6) {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.error('Error validating cita:', error)
    throw error
  }
})
