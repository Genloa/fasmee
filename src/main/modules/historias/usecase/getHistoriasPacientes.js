import { ipcMain } from 'electron'
import { Perfil,  Historia } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getHistoriasPacientes', async () => {
  try {
    const historiasPacientes = await Perfil.findAll({
      include: [
        {
          model: Historia,
          as: 'historialMedico' // Alias de la asociación
        }
      ]
    })

    const pacientesSerializables = historiasPacientes.map((historiaPaciente) => historiaPaciente.toJSON())
    return pacientesSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
