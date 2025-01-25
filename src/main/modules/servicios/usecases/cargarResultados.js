import superFs from '@supercharge/fs'
import { ipcMain } from 'electron'
import path from 'path'
import { Archivos, Historia } from '../../../singletons/database/schema'
import momentDate, { formatDateWithMoment } from '../../../utils/momentDate'
import saveBase64Image from '../../../utils/saveBase64Image'

ipcMain.handle('cargarResultados', async (event, args) => {
  try {
    let historias = await Historia.findAll({
      where: {
        perfilId: args.perfilId,
        pacienteId: args.pacienteId,
        departamentoId: args.departamentoId
      }
    })

    let historia = historias.find(
      (historia) =>
        formatDateWithMoment(historia.fecha_atencion) ===
        momentDate(args.fechaMuestra, 'YYYY-MM-DD')
    )

    if (!historia) {
      console.log('No se encontró historia con fecha de muestra:', args.fechaMuestra)
      return null
    }

    let archivoPath = path.join(process.env.APPDATA, 'fasmee', 'archivos')
    await superFs.mkdir(archivoPath, { recursive: true })

    let archivoBase64 = superFs.readFileSync(args.archivoPath, { encoding: 'base64' })

    let archivoPathFinal = path.join(archivoPath, `${historia.id}.jpeg`)

    await saveBase64Image(archivoBase64, archivoPathFinal)

    await Archivos.create({
      historiaId: historia.id,
      descripcion: args.detalles,
      path: archivoPathFinal
    })

    return historia
  } catch (error) {
    console.error('Error fetching resultados:', error)
    throw error
  }
})
