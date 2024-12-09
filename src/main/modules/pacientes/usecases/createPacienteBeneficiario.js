import { ipcMain } from 'electron'
import { Perfil, PerfilMedico, PerfilOnBeneficiario } from '../../../singletons/database/schema'

ipcMain.handle('createPacienteBeneficiario', async (event, data) => {
  try {
    const pacienteBeneficiario = await Perfil.create({
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_nacimiento: new Date(data.fechaNacimiento),
      tipo_cedula: data.tipoCedula,
      cedula: data.cedula,
      correo: data.correo,
      telefono: data.telefono,
      ente_id: data.enteId
    })

    const perfilMedico = await PerfilMedico.create({
      perfilId: pacienteBeneficiario.id,
      patologias: data.patologias,
      medicamentos: data.medicamentos,
      alergias: data.alergias,
      cirugias: data.cirugias,
      peso: data.peso,
      altura: data.altura
    })

    const perfilOnBeneficiario = await PerfilOnBeneficiario.create({
      perfilId: data.trabajadorId,
      beneficiarioId: pacienteBeneficiario.id
    })

    const beneficiario = {
      ...pacienteBeneficiario.toJSON(),
      perfilMedico: { ...perfilMedico.toJSON() },
      perfilId: perfilOnBeneficiario.perfilId
    }

    return beneficiario
  } catch (error) {
    console.error('Error creating paciente and perfil:', error)
  }
})
