import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()

ipcMain.handle('updateUsuario', async (event, data) => {
  const updateUsuario = await prisma.usuario.update({
    where: {
      id: data.id
    },
    data: {
      username: data.username,
      password: data.password,
      Perfil: {
        update: {
          nombres: data.nombres,
          apellidos: data.apellidos,
          fecha_nacimiento: new Date(data.fechaNacimiento),
          tipo_cedula: data.tipoCedula,
          cedula: data.cedula,
          correo: data.correo,
          telefono: data.telefono
        }
      }
    },
    include: {
      Perfil: true
    }
  })

  return updateUsuario
})
