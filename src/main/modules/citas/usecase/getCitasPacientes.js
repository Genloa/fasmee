import { ipcMain } from 'electron'
import { Perfil, Cita } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getCitasPacientes', async () => {
  try {
    const citasPacientes = await Perfil.findAll({
      include: [
        {
          model: Cita,
          as: 'citasSolicitadas' // Alias de la asociación
        }
      ]
    })

    const pacientesSerializables = citasPacientes.map((citaPaciente) => citaPaciente.toJSON())
    return pacientesSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
