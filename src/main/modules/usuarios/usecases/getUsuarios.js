import { ipcMain } from 'electron'
import { Usuario, Perfil, Rol, Departamento } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getUsuarios', async () => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        {
          model: Perfil, // Incluye el modelo asociado
          as: 'perfil', // Alias de la asociación (asegúrate de que coincida con el alias definido en tu asociación)
          include: [
            {
              model: Rol, // Incluye el modelo Rol
              as: 'roles' // Alias de la asociación
            },
            {
              model: Departamento,
              as: 'departamentos'
            }
          ]
        }
      ]
    })

    const usuariosSerializables = usuarios.map((usuario) => usuario.toJSON())
    return usuariosSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
