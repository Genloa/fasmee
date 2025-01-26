import { ipcMain } from 'electron'
import { Historia, Perfil, Archivo } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getHistoriasPacientes', async () => {
  try {
    const perfiles = await Perfil.findAll({
      include: [
        {
          model: Historia,
          as: 'historialMedico',
          include: [
            {
              model: Archivo,
              as: 'archivos'
            }
          ]
        }
      ]
    })

    return perfiles.map((perfil) => perfil.toJSON())
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
