import { ipcMain } from 'electron'
import { Departamento, Horarios, Perfil, Rol } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getParamedicos', async () => {
  try {
    const paramedicos = await Perfil.findAll({
      include: [
        {
          model: Rol, // Incluye el modelo Rol
          as: 'roles', // Alias de la asociación
          where: {
            id: 5
          }
        },
        {
          model: Departamento,
          as: 'departamento'
        },
        {
          model: Horarios,
          as: 'horarios'
        }
      ]
    })

    const paramedicosSerializables = paramedicos.map((paramedico) => paramedico.toJSON())
    return paramedicosSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
