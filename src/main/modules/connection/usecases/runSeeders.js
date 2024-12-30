import { ipcMain } from 'electron'
import departamentoSeeder from '../../../singletons/database/seeders/departamentoSeeder'
import enteSeeder from '../../../singletons/database/seeders/enteSeeder'
import rolSeeder from '../../../singletons/database/seeders/rolSeeder'
import userSeeder from '../../../singletons/database/seeders/userSeeder'

ipcMain.handle('runSeeders', async () => {
  try {
    await enteSeeder()
    await rolSeeder()
    await departamentoSeeder()
    await userSeeder()
  } catch (error) {
    console.error(error)
    throw error
  }
})
