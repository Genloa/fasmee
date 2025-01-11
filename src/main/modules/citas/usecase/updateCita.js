import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Cita, Perfil } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('updateCita', async (event, { id, data }) => {
  const t = await db.getConnection().transaction()

  try {
    const cita = await Cita.findOne(
      {
        where: { id: id }
      },
      { transaction: t }
    )

    if (!cita) {
      throw new Error('Cita not found')
    }

    await cita.update(
      {
        fecha_cita: new Date(data.fechaCita),
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
    console.error('Error updating cita:', error)
    throw error
  }
})
