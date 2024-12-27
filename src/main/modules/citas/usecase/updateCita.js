import { ipcMain } from 'electron'
import { Cita, Perfil } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('updateCita', async (event, { id, data }) => {
  try {
    console.log('Updating cita:----------------', id, data)
    const cita = await Cita.findByPk(id)
    if (!cita) {
      throw new Error('Cita not found')
    }

    await cita.update({
      fecha_cita: new Date(data.fechaCita),
      perfilId: data.medicoId,
      pacienteId: data.pacienteId,
      departamentoId: data.departamentoId
    })

    const citasPaciente = await Perfil.findOne({
      include: [
        {
          model: Cita,
          as: 'citasSolicitadas' // Alias de la asociación
        }
      ],
      where: {
        id: cita.pacienteId
      }
    })
    const pacientesSerializables = citasPaciente.toJSON()
    return pacientesSerializables
  } catch (error) {
    console.error('Error updating cita:', error)
    throw error
  }
})
