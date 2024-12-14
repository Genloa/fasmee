import { ipcMain } from 'electron'
import database from '../../../singletons/database/database'

import file from '../../../services/fileService'

ipcMain.handle('checkConnection', async () => {
  // Check if the file exists and initialize it
  await file.init()

  // Check if the connection is valid
  let connection = database.getConnection()
  if (connection && (await database.testConnection(connection))) {
    database.syncModels()
    return true
  }

  return false
})
