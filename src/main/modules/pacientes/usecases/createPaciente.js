import { ipcMain } from 'electron'
import db from '../../../singletons/database/database'
import { Perfil, PerfilMedico, PerfilOnBeneficiario } from '../../../singletons/database/schema'

ipcMain.handle('createPaciente', async (event, data) => {
  const t = await db.getConnection().transaction()

  try {
    let perfil = await Perfil.create(
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
      { transaction: t }
    )

    await PerfilMedico.create(
      {
        patologias: data.patologias,
        medicamentos: data.medicamentos,
        alergias: data.alergias,
        cirugias: data.cirugias,
        peso: data.peso,
        altura: data.altura,
        perfilId: perfil.id
      },
      { transaction: t }
    )

    if (data.trabajadorId != null) {
      await PerfilOnBeneficiario.create(
        {
          perfilId: data.trabajadorId,
          beneficiarioId: perfil.id
        },
        { transaction: t }
      )
    }

    perfil = await Perfil.findOne({
      where: { id: perfil.id },
      include: [
        {
          model: PerfilMedico,
          as: 'perfilMedico'
        },
        {
          model: Perfil,
          as: 'beneficiarios'
        }
      ],
      transaction: t
    })

    const paciente = {
      ...perfil.toJSON(),
      perfilMedico: perfil.perfilMedico.toJSON() || {},
      beneficiarios: perfil.beneficiarios.map((beneficiario) => beneficiario.toJSON()) || []
    }

    await t.commit()

    return paciente
  } catch (error) {
    await t.rollback()
    console.error('Error creating paciente:', error)
  }
})
