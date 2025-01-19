import { ipcMain } from 'electron'
import { Horarios } from '../../../singletons/database/schema'

const turnos = ['M', 'T', 'C']

ipcMain.handle('changeTurno', async (event, horarioId) => {
  try {
    let horario = await Horarios.findByPk(horarioId)
    if (!horario) throw new Error('Horario no encontrado')

    // Cambiar al siguiente turno que tenga el horario, si es el ultimo turno, cambiar al primero
    let index = turnos.indexOf(horario.turno)
    if (index === -1) throw new Error(`Turno no encontrado`)

    index = (index + 1) % turnos.length
    horario.turno = turnos[index]

    await horario.save()
    return true
  } catch (error) {
    console.error(error)
    throw error
  }
})
