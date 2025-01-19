import { ipcMain } from 'electron'
import { ColaPacientes, Perfil } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createColaPacientes', async (event, data) => {
  try {
    const cola = await ColaPacientes.create({
      perfilId: data.medicoId || null, // Permitir que perfilId sea null
      departamentoId: data.departamentoId,
      pacienteId: data.pacienteId
    })

    const colaPaciente = await Perfil.findOne({
      include: [
        {
          model: ColaPacientes,
          as: 'colasMedicos' // Alias de la asociación
        }
      ],
      where: {
        id: cola.pacienteId
      }
    })

    const pacientesSerializables = colaPaciente.toJSON()
    return pacientesSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
