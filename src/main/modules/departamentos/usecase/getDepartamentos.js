import { ipcMain } from 'electron'
import { Departamento } from '../../../singletons/database/schema'

ipcMain.handle('getDepartamentos', async () => {
  try {
    const departamentos = await Departamento.findAll()
    return departamentos.map((departamento) => departamento.toJSON())
  } catch (error) {
    console.error(error)
    throw error
  }
})
