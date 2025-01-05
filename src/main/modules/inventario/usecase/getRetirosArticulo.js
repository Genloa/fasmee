import { ipcMain } from 'electron'
import { Perfil, PerfilOnArticulo } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getRetirosArticulo', async (event, id) => {
  try {
    const retiros = await PerfilOnArticulo.findAll(
      {
        include: [
          {
            model: Perfil,
            as: 'perfil'
          }
        ]
      },
      {
        where: {
          articuloId: id
        }
      }
    )

    const articuloSerializables = retiros.map((retiro) => retiro.toJSON())
    return articuloSerializables
  } catch (error) {
    console.error('Error retiros:', error)
    throw error
  }
})
