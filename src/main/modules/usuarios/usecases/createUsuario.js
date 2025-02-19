import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import {
  Departamento,
  Ente,
  Perfil,
  PerfilMedico,
  Rol,
  Usuario
} from '../../../singletons/database/schema'
import hashPassword from '../../../utils/hashPassword'
import momentDate from '../../../utils/momentDate'

ipcMain.handle('createUsuario', async (event, data) => {
  const t = await db.getConnection().transaction()

  const ente = await Ente.findOne({ where: { nombre: 'FASMEE' } }, { transaction: t })

  try {
    data.password = await hashPassword(data.password)

    const usuario = await Usuario.create(
      {
        username: data.username,
        password: data.password,
        perfil: {
          nombres: data.nombres,
          apellidos: data.apellidos,
          fecha_nacimiento: momentDate(data.fechaNacimiento),
          tipo_cedula: data.tipoCedula,
          cedula: data.cedula,
          correo: data.correo,
          telefono: data.telefono,
          enteId: ente.id,
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

    await PerfilMedico.create(
      {
        perfilId: perfil.id,
        patologias: null,
        medicamentos: null,
        alergias: null,
        cirugias: null,
        peso: null,
        altura: null
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
