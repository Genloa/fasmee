import { ipcMain } from 'electron'
import { Perfil, Rol, RolOnPerfil, Usuario } from '../../../singletons/database/schema'

ipcMain.handle('updateUserRol', async (event, { perfilId, rolId }) => {
  try {
    if (!perfilId || !rolId) {
      throw new Error('perfilId o rolId no pueden ser nulos.')
    }

    // Crear la relación entre el perfil y el rol
    await RolOnPerfil.create({
      rolId: rolId,
      perfilId: perfilId
    })

    // Buscar el perfil y sus asociaciones
    const perfil = await Perfil.findOne({
      where: { id: perfilId },
      include: [
        {
          model: Usuario,
          as: 'usuario'
        },
        {
          model: Rol,
          as: 'roles'
        }
      ]
    })

    // Verificar que el perfil fue encontrado
    if (!perfil) {
      throw new Error('Perfil no encontrado.')
    }

    // Crear el objeto usuario incluyendo perfil y roles
    const usuario = {
      ...perfil.usuario.toJSON(),
      perfil: {
        ...perfil.toJSON(),
        roles: perfil.roles.map((rol) => rol.toJSON())
      }
    }

    // Retornar el objeto usuario completo
    return usuario
  } catch (error) {
    console.error('Error creando el rol del usuario:', error.message)
    throw error
  }
})
