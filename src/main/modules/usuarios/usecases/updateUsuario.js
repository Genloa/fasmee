import { ipcMain } from 'electron'
import { Perfil, Usuario, Rol, DepartamentoOnPerfil } from '../../../singletons/database/schema'
import hashPassword from '../../../utils/hashPassword'

ipcMain.handle('updateUsuario', async (event, { id, data }) => {
  data.password = await hashPassword(data.password)

  const usuario = await Usuario.findByPk(id)

  usuario.username = data.username
  usuario.password = data.password

  await usuario.save()

  const perfil = await Perfil.findOne({
    where: { usuarioId: usuario.id },
    include: [
      {
        model: Rol,
        as: 'roles'
      }
    ]
  })

  if (!perfil) {
    throw new Error('Perfil no encontrado.')
  }

  perfil.nombres = data.nombres
  perfil.apellidos = data.apellidos
  perfil.fecha_nacimiento = new Date(data.fechaNacimiento)
  perfil.tipo_cedula = data.tipoCedula
  perfil.cedula = data.cedula
  perfil.correo = data.correo
  perfil.telefono = data.telefono
  await perfil.save()
  await DepartamentoOnPerfil.destroy({ where: { perfilId: perfil.id } })
  const departamento = await DepartamentoOnPerfil.create({
    departamentoId: data.departamentoId,
    perfilId: perfil.id
  })

  return {
    ...usuario.toJSON(),
    perfil: {
      ...perfil.toJSON(),
      roles: perfil.roles.map((rol) => rol.toJSON()),
      departamento: departamento.toJSON()
    }
  }
})
