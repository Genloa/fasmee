import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()

ipcMain.handle('createUsuario', async (event, data) => {
  const usuario = await prisma.usuario.create({
    data: {
      username: data.username,
      password: data.password,
      Perfil: {
        create: {
          nombres: data.nombres,
          apellidos: data.apellidos,
          fecha_nacimiento: new Date(data.fechaNacimiento),
          tipo_cedula: data.tipoCedula,
          cedula: data.cedula,
          correo: data.correo,
          telefono: data.extension + '-' + data.telefono,
          ente_id: 1
        }
      }
    },
    include: {
      Perfil: true
    }
  })

  return usuario
})
