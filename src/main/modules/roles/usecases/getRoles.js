import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()
ipcMain.handle('getRoles', async () => {
  const roles = await prisma.rol.findMany()
  return roles
})
