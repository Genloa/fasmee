import { ipcMain } from 'electron'
import { Perfil } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios
import { Op } from 'sequelize'
ipcMain.handle('getTrabajadores', async () => {
  try {
    const perfiles = await Perfil.findAll({
      where: {
        enteId: {
          [Op.ne]: null // Busca perfiles donde enteId no es nulo
        }
      }
    })
    const perfilTrabajadores = perfiles.map((perfil) => perfil.toJSON())

    return perfilTrabajadores
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
