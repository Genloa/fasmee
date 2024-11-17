import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'

const prisma = new PrismaClient()

ipcMain.handle('createPaciente', async (event, data) => {
  try {
    const paciente = await prisma.perfil.create({
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

    const PerfilMedico = await prisma.perfilMedico.create({
      data: {
        Perfil_id: paciente.id,
        patologias: paciente.patologias,
        alergias: paciente.alergias,
        cirugias: paciente.cirugias
        // ,peso: paciente.peso, altura: paciente.altura
      }
    })
    return { paciente, PerfilMedico }
  } catch (error) {
    console.error('Error creating paciente and perfil:', error)
  }
})
