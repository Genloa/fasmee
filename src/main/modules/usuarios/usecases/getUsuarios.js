import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()
ipcMain.handle('getUsuarios', async () => {
  const users = await prisma.usuario.findMany({ include: { Perfil: true } })
  return users
})
