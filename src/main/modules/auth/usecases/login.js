import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()

ipcMain.handle('login', async (event, { username, password }) => {
  const user = await prisma.usuario.findFirst({
    where: {
      username,
      password
    }
  })

  return user
})
