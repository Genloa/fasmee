import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()

ipcMain.on('login', async (event, { username, password }) => {
  const user = await prisma.usuario.findFirst({
    where: {
      username,
      password
    }
  })

  event.sender.send('login-reply', user)

  console.log(user)
})
