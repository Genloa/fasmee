import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Perfil, PerfilMedico, PerfilOnBeneficiario } from '../../../singletons/database/schema'

let sequelize = db.getConnection()

ipcMain.handle('createPacienteBeneficiario', async (event, data) => {
  const t = await sequelize.transaction()

  try {
    const pacienteBeneficiario = await Perfil.create(
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
      { transaction: t }
    )

    const perfilMedico = await PerfilMedico.create(
      {
        perfilId: pacienteBeneficiario.id,
        patologias: data.patologias,
        medicamentos: data.medicamentos,
        alergias: data.alergias,
        cirugias: data.cirugias,
        peso: data.peso,
        altura: data.altura
      },
      { transaction: t }
    )

    const perfilOnBeneficiario = await PerfilOnBeneficiario.create(
      {
        perfilId: data.trabajadorId,
        beneficiarioId: pacienteBeneficiario.id
      },
      { transaction: t }
    )

    await t.commit()

    const beneficiario = {
      ...pacienteBeneficiario.toJSON(),
      perfilMedico: { ...perfilMedico.toJSON() },
      perfilId: perfilOnBeneficiario.perfilId
    }

    return beneficiario
  } catch (error) {
    await t.rollback()
    console.error('Error creating paciente and perfil:', error)
  }
})
