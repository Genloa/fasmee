import { ipcMain } from 'electron'
import { Perfil, PerfilMedico } from '../../../singletons/database/schema'

ipcMain.handle('createPacienteTrabajador', async (event, data) => {
  try {
    const perfilTrabajador = await Perfil.create({
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_nacimiento: new Date(data.fechaNacimiento),
      tipo_cedula: data.tipoCedula,
      cedula: data.cedula,
      correo: data.correo,
      telefono: data.telefono,
      enteId: data.enteId
    })

    const perfilMedico = await PerfilMedico.create({
      perfilId: perfilTrabajador.id,
      patologias: data.patologias,
      medicamentos: data.medicamentos,
      alergias: data.alergias,
      cirugias: data.cirugias,
      peso: data.peso,
      altura: data.altura
    })

    const trabajador = {
      ...perfilTrabajador.toJSON(),
      perfilMedico: { ...perfilMedico.toJSON() },
      beneficiarios: []
    }

    return trabajador
  } catch (error) {
    console.error('Error creating paciente and perfil:', error)
  }
})
