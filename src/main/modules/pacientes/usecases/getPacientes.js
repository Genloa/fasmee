import { ipcMain } from 'electron'
import { Perfil, PerfilMedico } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getPacientes', async () => {
  try {
    const pacientes = await Perfil.findAll({
      include: [
        {
          model: PerfilMedico, // Incluye el modelo asociado
          as: 'perfilMedico' // Alias de la asociación (asegúrate de que coincida con el alias definido en tu asociación)
        },
        {
          model: Perfil,
          as: 'beneficiarios' // Alias de la asociación
        },
        {
          model: Perfil,
          as: 'trabajadores' // Alias de la asociación
        }
      ]
    })

    const pacientesSerializables = pacientes.map((paciente) => paciente.toJSON())

    return pacientesSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
