import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Cita, Perfil } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios
import momentDate from '../../../utils/momentDate'

ipcMain.handle('createCita', async (event, data) => {
  const t = await db.getConnection().transaction()

  try {
    const cita = await Cita.create(
      {
        fecha_solicitud: new Date(),
        fecha_cita: momentDate(data.fechaCita),
        estado: 'Pendiente',
        perfilId: data.medicoId,
        pacienteId: data.pacienteId,
        departamentoId: data.departamentoId
      },
      { transaction: t }
    )

    const perfil = await Perfil.findOne(
      {
        include: [
          {
            model: Cita,
            as: 'citasSolicitadas' // Alias de la asociación
          }
        ],
        where: {
          id: cita.pacienteId
        }
      },
      { transaction: t }
    )

    const perfilSerializado = perfil.toJSON()

    await t.commit()

    return perfilSerializado
  } catch (error) {
    await t.rollback()
    console.error('Error creating cita:', error)
    throw error
  }
})
