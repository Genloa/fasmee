import { ipcMain } from 'electron'
import { col, fn, Op } from 'sequelize'
import { Historia } from '../../../singletons/database/schema'
import momentDate from '../../../utils/momentDate'

ipcMain.handle('cargarResultados', async (event, args) => {
  try {
    let historia = await Historia.findOne({
      where: {
        perfilId: args.perfilId,
        pacienteId: args.pacienteId,
        departamentoId: args.departamentoId,
        [Op.and]: [fn('DATE', col('fecha_atencion')), momentDate(args.fechaAtencion, 'YYYY-MM-DD')]
      }
    })

    console.log('historia:', historia)
  } catch (error) {
    console.error('Error fetching resultados:', error)
    throw error
  }
})
