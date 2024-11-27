import { ipcMain } from 'electron'
import { Perfil, PerfilMedico } from '../../../singletons/database/schema'

ipcMain.handle('createPaciente', async (event, data) => {
  try {
    const paciente = await Perfil.create({
      data: {
        nombres: data.nombres,
        apellidos: data.apellidos,
        fecha_nacimiento: new Date(data.fechaNacimiento),
        tipo_cedula: data.tipoCedula,
        cedula: data.cedula,
        correo: data.correo,
        telefono: data.extension + '-' + data.telefono,
        ente_id: data.enteId
      }
    })

    const perfilMedico = await PerfilMedico.create({
      data: {
        Perfil_id: paciente.id,
        patologias: paciente.patologias,
        medicamentos: paciente.medicamentos,
        alergias: paciente.alergias,
        cirugias: paciente.cirugias,
        peso: paciente.peso,
        altura: paciente.altura
      }
    })
    return { paciente, perfilMedico }
  } catch (error) {
    console.error('Error creating paciente and perfil:', error)
  }
})
