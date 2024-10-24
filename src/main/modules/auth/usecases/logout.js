import { PrismaClient } from '@prisma/client'
import { ipcMain } from 'electron'
const prisma = new PrismaClient()

ipcMain.on('login', async (event) => {
  const ente = await prisma.ente.create({
    data: {
      nombre: 'Ente de Prueba'
    }
  })

  // await prisma.usuario.create({
  //   data: {
  //     nombres: 'David',
  //     apellidos: 'Alvarado',
  //     username: 'davidalvarado',
  //     password: '123456',
  //     fecha_nacimiento: Date.now(),
  //     tipo_cedula: 'V',
  //     cedula: '27598704',
  //     correo: 'davicii711@gmail.com',
  //     telefono: '0412-1234567',
  //     ente: {
  //       connect: {
  //         id: ente.id
  //       }
  //     }
  //   }
  // })

  // const users = await prisma.usuario.findMany({
  //   include: {
  //     ente: true
  //   }
  // })

  event.sender.send('get-entes-reply', ente)

  console.log(ente)
})
