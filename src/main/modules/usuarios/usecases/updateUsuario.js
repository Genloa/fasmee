import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Departamento, Perfil, Rol, Usuario } from '../../../singletons/database/schema'
import hashPassword from '../../../utils/hashPassword'

ipcMain.handle('updateUsuario', async (event, { id, data }) => {
  const t = await db.getConnection().transaction()

  try {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      throw new Error('Usuario no encontrado.')
    }

    if (data.password) {
      data.password = await hashPassword(data.password)
    } else {
      data.password = usuario.password // Mantener la contraseña actual si el campo está vacío
    }

    await usuario.update(
      {
        username: data.username,
        password: data.password
      },
      { transaction: t }
    )

    const perfil = await Perfil.findOne(
      {
        where: { usuarioId: usuario.id },
        include: [
          {
            model: Rol,
            as: 'roles'
          },
          {
            model: Departamento,
            as: 'departamento'
          }
        ]
      },
      { transaction: t }
    )

    if (!perfil) {
      throw new Error('Perfil no encontrado.')
    }

    await perfil.update(
      {
        nombres: data.nombres,
        apellidos: data.apellidos,
        fecha_nacimiento: new Date(data.fechaNacimiento),
        tipo_cedula: data.tipoCedula,
        cedula: data.cedula,
        correo: data.correo,
        telefono: data.telefono,
        departamentoId: data.departamentoId
      },
      { transaction: t }
    )

    await t.commit()

    return {
      ...usuario.toJSON(),
      perfil: {
        ...perfil.toJSON(),
        roles: perfil.roles.map((rol) => rol.toJSON()),
        departamento: perfil.departamento.toJSON()
      }
    }
  } catch (error) {
    console.error('Error en updateUsuario:', error)
    throw error
  }
})
