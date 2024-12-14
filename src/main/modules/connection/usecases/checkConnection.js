import { ipcMain } from 'electron'

import database from '../../../singletons/database/database'

ipcMain.handle('checkConnection', async () => {
  let credentials = await database.getCredentials()

  console.log(credentials)
  // let connection = database.getConnection(credentials)

  // if (connection && (await database.testConnection(connection))) {
  //   database.syncModels()
  //   return true
  // }

  return false
})
