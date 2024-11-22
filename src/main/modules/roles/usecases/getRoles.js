import { ipcMain } from 'electron'
import { Rol } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getRoles', async () => {
  try {
    const roles = await Rol.findAll()
    const RolSerializables = roles.map((rol) => rol.toJSON())
    console.log(RolSerializables)
    return RolSerializables
  } catch (error) {
    console.error('Error fetching roles:', error)
    throw error
  }
})
