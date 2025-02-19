import { ipcMain } from 'electron'
import { Perfil, Permiso, Rol, Usuario } from '../../../singletons/database/schema'
import comparePassword from '../../../utils/comparePassword'

ipcMain.handle('login', async (event, { username, password }) => {
  let message = {
    error: false,
    message: '',
    user: null
  }

  const user = await Usuario.findOne({
    include: [
      {
        model: Perfil,
        as: 'perfil',
        include: [
          {
            model: Rol,
            as: 'roles',
            include: [
              {
                model: Permiso,
                as: 'permisos'
              }
            ]
          }
        ]
      }
    ],
    where: {
      username
    }
  })

  if (!user) {
    message.error = true
    message.message = 'Usuario no encontrado'

    return message
  }

  if (!(await comparePassword(password, user.password))) {
    message.error = true
    message.message = 'Contraseña incorrecta'

    return message
  }

  message.user = user.toJSON()
  return message
})
