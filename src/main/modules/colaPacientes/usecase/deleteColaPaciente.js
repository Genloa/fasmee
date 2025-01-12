import { ipcMain } from 'electron'
import { ColaPacientes } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('deleteColaPaciente', async (event, id) => {
  try {
    console.log('id-----------', id)
    await ColaPacientes.destroy({
      where: {
        pacienteId: id
      }
    })

    return {
      message: 'Cita eliminada correctamente.'
    }
  } catch (error) {
    console.error('Error deleting paciente:', error)
    throw error
  }
})
