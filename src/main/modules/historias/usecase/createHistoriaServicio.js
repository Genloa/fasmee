import { ipcMain } from 'electron'
import { ColaPacientes, Historia } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createHistoriaServicio', async (event, data) => {
  try {
    console.clear()
    console.log('datos-----------------', data)

    const HistoriaPaciente = await Historia.create({
      perfilId: data.usuarioId,
      pacienteId: data.pacienteId,
      departamentoId: data.departamentoId,
      fecha_atencion: new Date()
    })

    await ColaPacientes.destroy({
      where: {
        pacienteId: data.pacienteId
      }
    })

    const pacientesSerializables = HistoriaPaciente.toJSON()
    return pacientesSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
