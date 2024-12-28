import { ipcMain } from 'electron'
import enteSeeder from '../../../singletons/database/seeders/enteSeeder'
import userSeeder from '../../../singletons/database/seeders/userSeeder'

ipcMain.handle('runSeeders', async () => {
  try {
    await enteSeeder()
    await userSeeder()
  } catch (error) {
    console.error(error)
  }
})
