import { ipcMain } from 'electron'
import { Perfil, ColaPacientes } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createColaPacientes', async (event, data) => {
  try {
    const cola = await ColaPacientes.create({
      perfilId: data.medicoId,
      departamentoId: data.departamentoId,
      pacienteId: data.pacienteId
    })

    console.log('Cola creada:------------', cola)

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
