import { ipcMain } from 'electron'
import database from '../../../singletons/database/database'

ipcMain.handle('testConnection', async (event, data) => {
  let connection = database.connect(
    data.database,
    data.username,
    data.password,
    data.host,
    data.port
  )

  if (await database.testConnection(connection)) {
    database.syncModels()
    return true
  }

  return false
})
