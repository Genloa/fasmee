import { ipcMain } from 'electron'

import database from '../../../singletons/database/database'

ipcMain.handle('checkConnection', async () => {
  let connection = await database.getConnection()
  if (connection && (await database.testConnection(connection))) {
    database.syncModels()
    return true
  }

  return false
})
