import { ipcMain } from 'electron'
import { Usuario } from '../../../singletons/database/schema'
import comparePassword from '../../../utils/comparePassword'

ipcMain.handle('login', async (event, { username, password }) => {
  let message = {
    error: false,
    message: '',
    user: null
  }

  const user = await Usuario.findOne({
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

  message.user = user
  return message
})
