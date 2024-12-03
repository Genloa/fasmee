import { ipcMain } from 'electron'
import { Perfil } from '../../../singletons/database/schema'

ipcMain.handle('deletePaciente', async (event, id) => {
  await Perfil.destroy({ where: { usuarioId: id } })
})
