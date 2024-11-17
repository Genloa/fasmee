import { ipcMain } from 'electron'
import { Usuario } from '../../../singletons/database/schema'

ipcMain.handle('getUsuarios', async () => {
  return await Usuario.findAll({
    include: [
      {
        association: Usuario.Perfil
      }
    ]
  })
})
