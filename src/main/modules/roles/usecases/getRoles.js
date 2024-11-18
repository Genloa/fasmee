import { ipcMain } from 'electron'
import { Rol } from '../../../singletons/database/schema'

ipcMain.handle('getRoles', async () => {
  const roles = await Rol.findMany()
  return roles
})
