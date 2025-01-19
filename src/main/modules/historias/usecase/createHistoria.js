import { ipcMain } from 'electron'
import { ColaPacientes, Historia, PerfilMedico } from '../../../singletons/database/schema' // Asegúrate de importar todos los modelos necesarios

ipcMain.handle('createHistoria', async (event, { data, id, usuario }) => {
  try {
    console.clear()

    let f = {
      perfilId: usuario.id,
      pacienteId: id,
      departamentoId: usuario.departamentoId,
      fecha_atencion: new Date(),
      sintomas: data.sintomas,
      diagnostico: data.diagnostico,
      tratamiento: data.tratamiento,
      peso_paciente: data.peso,
      tension_paciente: data.tension,
      medida_cintura: data.cintura,
      medida_cadera: data.cadera
      // Añadir campos adicionales si es necesario
    }
    delete data.sintomas
    delete data.diagnostico
    delete data.tratamiento
    delete data.peso
    delete data.tension
    delete data.cintura
    delete data.cadera

    f.formulario = data

    const HistoriaPaciente = await Historia.create(f)
    if (f.peso_paciente) {
      await PerfilMedico.update({ peso: f.peso_paciente }, { where: { perfilId: id } })
    }
    await ColaPacientes.destroy({
      where: {
        pacienteId: id
      }
    })

    const pacientesSerializables = HistoriaPaciente.toJSON()
    return pacientesSerializables
  } catch (error) {
    console.error('Error creating cita:', error)
    throw error
  }
})
