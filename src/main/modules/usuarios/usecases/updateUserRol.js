import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Perfil, Rol, RolOnPerfil, Usuario } from '../../../singletons/database/schema'

ipcMain.handle('updateUserRol', async (event, { perfilId, rolId }) => {
  const t = await db.getConnection().transaction()

  try {
    if (!perfilId || !rolId) {
      throw new Error('perfilId o rolId no pueden ser nulos.')
    }

    await RolOnPerfil.destroy({
      where: {
        perfilId: perfilId
      }
    })

    // Crear la relación entre el perfil y el rol
    await RolOnPerfil.create(
      {
        rolId: rolId,
        perfilId: perfilId
      },
      { transaction: t }
    )

    // Buscar el perfil y sus asociaciones
    const perfil = await Perfil.findOne(
      {
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
      },
      { transaction: t }
    )

    await t.commit()

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
    await t.rollback()
    console.error('Error creando el rol del usuario:', error.message)
    throw error
  }
})
