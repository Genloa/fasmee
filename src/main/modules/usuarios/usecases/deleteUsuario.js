import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()

ipcMain.handle('deleteUsuario', async (event, dato) => {
  await prisma.usuario.delete({
    where: {
      id: dato
    }
  })
})
