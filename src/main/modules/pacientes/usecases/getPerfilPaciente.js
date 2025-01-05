import { ipcMain } from 'electron'
import { Perfil, PerfilMedico } from '../../../singletons/database/schema'
ipcMain.handle('getPerfilPaciente', async (event, id) => {
  try {
    const paciente = await Perfil.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: PerfilMedico,
          as: 'perfilMedico'
        }
      ]
    })

    const pacientesSerializables = paciente.toJSON()

    return pacientesSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
