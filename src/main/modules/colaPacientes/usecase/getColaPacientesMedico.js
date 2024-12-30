import { ipcMain } from 'electron'
import { Perfil, ColaPacientes } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getColaPacientesMedico', async (event, { medicoId, departamentoId }) => {
  try {
    const colaPacientes = await Perfil.findAll({
      include: [
        {
          model: ColaPacientes,
          as: 'colasMedicos', // Alias de la asociación
          where: {
            perfilId: medicoId,
            departamentoId: departamentoId
          }
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
