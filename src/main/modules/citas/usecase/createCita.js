import { ipcMain } from 'electron'
import { Cita, Perfil } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createCita', async (event, data) => {
  try {
    const cita = await Cita.create({
      fecha_solicitud: new Date(),
      fecha_cita: new Date(data.fechaCita),
      estado: 'Pendiente',
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
    console.error('Error creating cita:', error)
    throw error
  }
})
