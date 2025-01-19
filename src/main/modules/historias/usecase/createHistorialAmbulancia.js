import { ipcMain } from 'electron'
import { Historia } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createHistorialAmbulancia', async (event, data) => {
  try {
    console.clear()
    console.log('datos-----------------', data)

    const HistoriaPaciente = await Historia.create({
      perfilId: data.paramedicoId,
      pacienteId: data.pacienteId,
      departamentoId: 15,
      fecha_atencion: data.fechaUso,
      diagnostico: data.detalles
    })

    const pacientesSerializables = HistoriaPaciente.toJSON()
    return pacientesSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
