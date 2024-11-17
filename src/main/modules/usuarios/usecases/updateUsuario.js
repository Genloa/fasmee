import { ipcMain } from 'electron'
import { Usuario } from '../../../singletons/database/schema'

ipcMain.handle('updateUsuario', async (event, data) => {
  const usuario = await Usuario.findByPk(data.id, {
    include: [
      {
        association: Usuario.Perfil
      }
    ]
  })

  usuario.username = data.username
  usuario.password = data.password
  usuario.Perfil.nombres = data.nombres
  usuario.Perfil.apellidos = data.apellidos
  usuario.Perfil.fecha_nacimiento = new Date(data.fechaNacimiento)
  usuario.Perfil.tipo_cedula = data.tipoCedula
  usuario.Perfil.cedula = data.cedula
  usuario.Perfil.correo = data.correo
  usuario.Perfil.telefono = data.telefono

  await usuario.save()

  return usuario
})
