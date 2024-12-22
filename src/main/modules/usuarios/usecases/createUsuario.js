import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Departamento, Perfil, Rol, Usuario } from '../../../singletons/database/schema'
import hashPassword from '../../../utils/hashPassword'

ipcMain.handle('createUsuario', async (event, data) => {
  const t = await db.getConnection().transaction()

  try {
    data.password = await hashPassword(data.password)

    const usuario = await Usuario.create(
      {
        username: data.username,
        password: data.password,
        perfil: {
          nombres: data.nombres,
          apellidos: data.apellidos,
          fecha_nacimiento: new Date(data.fechaNacimiento),
          tipo_cedula: data.tipoCedula,
          cedula: data.cedula,
          correo: data.correo,
          telefono: data.telefono,
          enteId: 1,
          departamentoId: data.departamentoId
        }
      },
      {
        include: [{ model: Perfil, as: 'perfil' }]
      },
      { transaction: t }
    )

    const perfil = await Perfil.findOne(
      {
        where: { id: usuario.perfil.id },
        include: [
          {
            model: Usuario,
            as: 'usuario'
          },
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

    await t.commit()

    return {
      ...perfil.usuario.toJSON(),
      perfil: {
        ...perfil.toJSON(),
        roles: perfil.roles.map((rol) => rol.toJSON()),
        departamento: perfil.departamento.toJSON()
      }
    }
  } catch (error) {
    await t.rollback()
    console.error('Error creating usuario:', error)
    throw error
  }
})
