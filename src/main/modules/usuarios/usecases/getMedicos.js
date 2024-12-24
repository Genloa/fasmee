import { ipcMain } from 'electron'
import { Departamento, Perfil, Rol } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getMedicos', async () => {
  try {
    const medicos = await Perfil.findAll({
      include: [
        {
          model: Rol, // Incluye el modelo Rol
          as: 'roles', // Alias de la asociación
          where: {
            id: 2
          }
        },
        {
          model: Departamento,
          as: 'departamento'
        }
      ]
    })

    const medicosSerializables = medicos.map((medico) => medico.toJSON())
    return medicosSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
