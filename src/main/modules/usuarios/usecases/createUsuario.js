import { ipcMain } from 'electron'
import { Usuario } from '../../../singletons/database/schema'
import hashPassword from '../../../utils/hashPassword'

ipcMain.handle('createUsuario', async (event, data) => {
  // Cifrando la contraseña
  data.password = await hashPassword(data.password)

  const usuario = await Usuario.create(
    {
      username: data.username,
      password: data.password,
      Perfil: {
        nombres: data.nombres,
        apellidos: data.apellidos,
        fecha_nacimiento: new Date(data.fechaNacimiento),
        tipo_cedula: data.tipoCedula,
        cedula: data.cedula,
        correo: data.correo,
        telefono: data.extension + '-' + data.telefono,
        enteId: 1
      }
    },
    {
      include: [
        {
          association: Usuario.Perfil
        }
      ]
    }
  )

  return usuario
})
