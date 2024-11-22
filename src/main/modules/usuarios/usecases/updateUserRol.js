import { ipcMain } from 'electron'
import { RolOnPerfil } from '../../../singletons/database/schema'

ipcMain.handle('updateUserRol', async (event, { perfilId, rolId }) => {
  try {
    if (!perfilId || !rolId) {
      throw new Error('idUsuario o idRol no pueden ser nulos.')
    }

    const rolUsuario = await RolOnPerfil.create({
      rolId: rolId,
      perfilId: perfilId
    })

    console.log(rolUsuario)

    // Convertir el objeto a JSON para asegurarte de que sea serializable
    const roleSerializable = rolUsuario.toJSON()
    console.log(roleSerializable)

    return roleSerializable
  } catch (error) {
    console.error('Error creando el rol del usuario:', error)
    throw error
  }
})
