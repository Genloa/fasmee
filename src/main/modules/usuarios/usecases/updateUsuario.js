import { ipcMain } from 'electron'
import { Perfil, Usuario } from '../../../singletons/database/schema'
import hashPassword from '../../../utils/hashPassword'

ipcMain.handle('updateUsuario', async (event, { id, data }) => {
  data.password = await hashPassword(data.password)

  const usuario = await Usuario.findByPk(id)

  usuario.username = data.username
  usuario.password = data.password

  await usuario.save()

  const perfil = await Perfil.findOne({ where: { usuarioId: usuario.id } })

  perfil.nombres = data.nombres
  perfil.apellidos = data.apellidos
  perfil.fecha_nacimiento = new Date(data.fechaNacimiento)
  perfil.tipo_cedula = data.tipoCedula
  perfil.cedula = data.cedula
  perfil.correo = data.correo
  perfil.telefono = data.telefono

  await perfil.save()

  return {
    ...usuario.toJSON(),
    perfil: perfil.toJSON()
  }
})
