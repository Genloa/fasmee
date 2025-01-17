import { ipcMain } from 'electron'
import { Perfil, PerfilOnArticulo } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getRetirosArticulo', async (event, id) => {
  try {
    const retiros = await PerfilOnArticulo.findAll({
      where: {
        articuloId: id
      },
      include: [
        {
          model: Perfil,
          as: 'perfil'
        }
      ]
    })

    const articuloSerializables = retiros.map((retiro) => retiro.toJSON())
    return articuloSerializables
  } catch (error) {
    console.error('Error retiros:', error)
    throw error
  }
})
