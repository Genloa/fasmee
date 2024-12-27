import { ipcMain } from 'electron'
import { Perfil, ColaPacientes } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getColaPacientes', async () => {
  try {
    const colaPacientes = await Perfil.findAll({
      include: [
        {
          model: ColaPacientes,
          as: 'colasMedicos' // Alias de la asociación
        }
      ]
    })

    const pacientesSerializables = colaPacientes.map((colaPaciente) => colaPaciente.toJSON())
    return pacientesSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
