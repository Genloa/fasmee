import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Perfil, PerfilMedico, PerfilOnBeneficiario } from '../../../singletons/database/schema'

ipcMain.handle('updatePaciente', async (event, { id, data }) => {
  const t = await db.getConnection().transaction()

  try {
    await Perfil.update(
      {
        nombres: data.nombres,
        apellidos: data.apellidos,
        fecha_nacimiento: new Date(data.fechaNacimiento),
        tipo_cedula: data.tipoCedula,
        cedula: data.cedula,
        correo: data.correo,
        telefono: data.telefono,
        enteId: data.enteId
      },
      {
        where: { id }
      },
      { transaction: t }
    )

    await PerfilMedico.upsert(
      {
        perfilId: id,
        patologias: data.patologias,
        medicamentos: data.medicamentos,
        alergias: data.alergias,
        cirugias: data.cirugias,
        peso: data.peso,
        altura: data.altura
      },
      {
        where: { perfilId: id },
        returning: true,
        transaction: t
      }
    )

    const perfil = await Perfil.findOne(
      {
        where: { id },
        include: [
          {
            model: PerfilMedico,
            as: 'perfilMedico'
          },
          {
            model: Perfil,
            as: 'beneficiarios'
          }
        ]
      },
      { transaction: t }
    )

    if (data.trabajadorId != null && data.enteId == null) {
      await PerfilOnBeneficiario.destroy({ where: { beneficiarioId: id } }, { transaction: t })
      await PerfilOnBeneficiario.create(
        {
          perfilId: data.trabajadorId,
          beneficiarioId: perfil.id
        },
        { transaction: t }
      )
    }

    const response = {
      ...perfil.toJSON(),
      perfilMedico: perfil.perfilMedico.toJSON() || {},
      beneficiarios: perfil.beneficiarios.map((beneficiario) => beneficiario.toJSON()) || []
    }

    await t.commit()

    return response
  } catch (error) {
    await t.rollback()
    console.error('Error updating paciente:', error)
  }
})
