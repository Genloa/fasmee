import { ipcMain } from 'electron'
import file from '../../../services/fileService'
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
    await database.syncModels()
    await file.updated({ postgre: data })
    return true
  }

  return false
})
