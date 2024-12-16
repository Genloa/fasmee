import { ipcMain } from 'electron'
import { Perfil, PerfilMedico } from '../../../singletons/database/schema'

ipcMain.handle('updatePacienteTrabajador', async (event, { id, data }) => {
  try {
    // Desestructura el resultado de Perfil.update
    const [filasAfectadasPerfil, [perfilActualizado]] = await Perfil.update(
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
        where: { id },
        returning: true // Esencial para obtener la instancia actualizada
      }
    )

    if (filasAfectadasPerfil === 0) {
      throw new Error('Perfil no encontrado.')
    }

    // Actualiza o crea el perfil médico
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
        where: { perfilId: id },
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

    // Construye el objeto de retorno con la estructura correcta
    const trabajador = {
      ...perfilActualizado.toJSON(), // Usa toJSON() en la instancia, no en el resultado del update
      perfilMedico: perfilMedicoActualizado.toJSON() // Incluye perfilMedico como objeto
    }
    console.log(trabajador, 'trabajador------------------')
    return trabajador
  } catch (error) {
    console.error('Error actualizando paciente:', error)
    throw error
  }
})
