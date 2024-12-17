import { ipcMain } from 'electron'
import enteSeeder from '../../../singletons/database/seeders/enteSeeder'
import userSeeder from '../../../singletons/database/seeders/userSeeder'

ipcMain.handle('runSeeders', async () => {
  await enteSeeder()
  await userSeeder()
})
