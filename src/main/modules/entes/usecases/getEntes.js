import { ipcMain } from 'electron'
import { Ente } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getEntes', async () => {
  try {
    const entes = await Ente.findAll()
    const entesSerializables = entes.map((ente) => ente.toJSON())
    console.log(entesSerializables)
    return entesSerializables
  } catch (error) {
    console.error('Error fetching entes:', error)
    throw error
  }
})
