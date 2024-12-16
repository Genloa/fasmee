import { ipcMain } from 'electron'
import { Perfil, PerfilMedico, PerfilOnBeneficiario } from '../../../singletons/database/schema'

ipcMain.handle('updatePacienteBeneficiario', async (event, { id, data }) => {
  try {
    const pacienteBeneficiario = await Perfil.update(
      {
        nombres: data.nombres,
        apellidos: data.apellidos,
        fecha_nacimiento: new Date(data.fechaNacimiento),
        tipo_cedula: data.tipoCedula,
        cedula: data.cedula,
        correo: data.correo,
        telefono: data.telefono,
        ente_id: data.enteId
      },
      {
        where: { id },
        returning: true
      }
    )
    let perfilMedicoActualizado

    const resultadoPerfilMedico = await PerfilMedico.update(
      {
        patologias: data.patologias,
        medicamentos: data.medicamentos,
        alergias: data.alergias,
        cirugias: data.cirugias,
        peso: data.peso,
        altura: data.altura
      },
      {
        where: { perfilId: pacienteBeneficiario.id },
        returning: true
      }
    )

    if (resultadoPerfilMedico[0] > 0) {
      perfilMedicoActualizado = resultadoPerfilMedico[1][0]
    } else {
      // Si no existe, crea un nuevo PerfilMedico
      perfilMedicoActualizado = await PerfilMedico.create({
        perfilId: id,
        patologias: data.patologias,
        medicamentos: data.medicamentos,
        alergias: data.alergias,
        cirugias: data.cirugias,
        peso: data.peso,
        altura: data.altura
      })
    }

    await PerfilOnBeneficiario.destroy({ where: { beneficiarioId: id } })

    const perfilOnBeneficiario = await PerfilOnBeneficiario.create({
      perfilId: data.trabajadorId,
      beneficiarioId: pacienteBeneficiario.id
    })

    const beneficiario = {
      ...pacienteBeneficiario.toJSON(),
      perfilMedico: { ...perfilMedicoActualizado.toJSON() },
      perfilId: perfilOnBeneficiario.perfilId
    }

    console.log(beneficiario, 'beneficiario------------------')
    return beneficiario
  } catch (error) {
    console.error('Error creating paciente and perfil:', error)
  }
})
