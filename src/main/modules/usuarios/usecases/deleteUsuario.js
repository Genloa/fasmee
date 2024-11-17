import { ipcMain } from 'electron'
import { Usuario } from '../../../singletons/database/schema'

ipcMain.handle('deleteUsuario', async (event, id) => {
  await Usuario.destroy({ where: { id: id } })
})
