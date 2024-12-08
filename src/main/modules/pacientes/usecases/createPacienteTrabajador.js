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
        telefono: data.telefono,
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

    const beneficiarios = await Perfil.findAll({
      where: { id: paciente.id },
      include: [
        {
          model: Perfil,
          as: 'beneficiarios' // Alias de la asociación
        }
      ]
    })

    const trabajador = {
      ...paciente.toJSON(),
      perfilMedico: { ...perfilMedico.toJSON() },
      beneficiarios: beneficiarios.map((beneficiario) => beneficiario.toJSON()) // Transforma la relación en un array serializables
    }

    return trabajador
  } catch (error) {
    console.error('Error creating paciente and perfil:', error)
  }
})
