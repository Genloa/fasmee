import { ipcMain } from 'electron'
import { Usuario, Perfil } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getUsuarios', async () => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        {
          model: Perfil, // Incluye el modelo asociado
          as: 'perfil' // Alias de la asociación (asegúrate de que coincida con el alias definido en tu asociación)
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
