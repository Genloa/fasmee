import { ipcMain } from 'electron'
import { Departamento } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('getDepartamentos', async () => {
  try {
    const departamentos = await Departamento.findAll()
    const departamentosSerializables = departamentos.map((departamento) => departamento.toJSON())
    console.log(departamentosSerializables)
    return departamentosSerializables
  } catch (error) {
    console.error('Error fetching departamento:', error)
    throw error
  }
})
