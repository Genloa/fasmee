import { ipcMain } from 'electron'
import { Op } from 'sequelize'
import { Perfil } from '../../../singletons/database/schema'

ipcMain.handle('getTrabajadores', async () => {
  try {
    const perfiles = await Perfil.findAll({
      where: {
        enteId: {
          [Op.ne]: null // Busca perfiles donde enteId no es nulo
        }
      }
    })

    const result = perfiles.map((perfil) => perfil.toJSON())
    return result
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
