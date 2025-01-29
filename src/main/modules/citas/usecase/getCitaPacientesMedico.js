import { ipcMain } from 'electron'
import { Perfil, Cita } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios
import { Op } from 'sequelize'
import moment from 'moment-timezone'

ipcMain.handle('getCitaPacientesMedico', async (event, { medicoId, departamentoId }) => {
  try {
    const today = moment().tz('America/Caracas').toDate()
    const startOfToday = moment(today).startOf('day').toDate()
    const endOfToday = moment(today).endOf('day').toDate()

    const perfiles = await Perfil.findAll({
      include: [
        {
          model: Cita,
          as: 'citasSolicitadas',
          where: {
            perfilId: medicoId,
            departamentoId: departamentoId,
            fecha_cita: {
              [Op.between]: [startOfToday, endOfToday]
            }
          }
        }
      ]
    })

    console.log('perfiles:', perfiles)

    const pacientesSerializables = perfiles.map((citaPaciente) => citaPaciente.toJSON())
    return pacientesSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
