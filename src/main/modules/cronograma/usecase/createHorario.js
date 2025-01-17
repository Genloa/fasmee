import { ipcMain } from 'electron'
import moment from 'moment-timezone'
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
      let dayNumber = moment(data.fecha).day()

      let fecha = moment(data.fecha)
      let finDeAño = moment(data.fecha).endOf('year')

      while (fecha.isSameOrBefore(finDeAño)) {
        if (fecha.day() === dayNumber) {
          horario = await Horarios.create({
            perfilId: data.perfilId,
            dia: dayNumber,
            turno: data.turno,
            fecha: momentDate(fecha)
          })
        }
        fecha.add(1, 'day')
      }
    }

    if (!horario) throw new Error('Error al crear horario')

    return true
  } catch (error) {
    console.error(error)
    throw error
  }
})
