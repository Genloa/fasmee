import { ipcMain } from 'electron'
import { Perfil, Cita } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios
import { Op } from 'sequelize'

ipcMain.handle('getCitaPacientesMedico', async (event, { medicoId, departamentoId }) => {
  try {
    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
      999
    )

    const citaPacientes = await Perfil.findAll({
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

    const pacientesSerializables = citaPacientes.map((citaPaciente) => citaPaciente.toJSON())
    return pacientesSerializables
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
})
