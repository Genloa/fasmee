import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()

ipcMain.handle('deleteUsuario', async (dato) => {
  const deleteUsuario = await prisma.usuario.delete({
    where: {
     id: dato,
    }
  })

  await prisma.perfil.delete({
    where: {
        usuario_id: deleteUsuario.id,
       }
  })
})