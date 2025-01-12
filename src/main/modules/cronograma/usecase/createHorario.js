import { ipcMain } from 'electron'
import { Horarios } from '../../../singletons/database/schema'
import momentDate from '../../../utils/momentDate'

ipcMain.handle('createHorario', async (event, data) => {
  try {
    let horario

    if (data.mode === 'singleDay') {
      horario = await Horarios.create({
        perfilId: data.perfilId,
        dia: data.dia,
        turno: data.turno,
        fecha: momentDate(data.fecha)
      })
    }
    if (data.mode === 'allDays') {
      for (let i = 0; i < 7; i++) {
        horario[i] = await Horarios.create({
          perfilId: data.perfilId,
          dia: i,
          turno: data.turno,
          fecha: data.fecha
        })
      }
    }

    if (!horario) throw new Error('Error al crear horario')

    return true
  } catch (error) {
    console.error(error)
    throw error
  }
})
