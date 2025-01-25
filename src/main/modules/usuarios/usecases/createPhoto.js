import superFs from '@supercharge/fs'
import { ipcMain } from 'electron'
import path from 'path'
import { Perfil } from '../../../singletons/database/schema'
import saveBase64Image from '../../../utils/saveBase64Image'

ipcMain.handle('createPhoto', async (event, { perfilId, photoBase64 }) => {
  try {
    const perfil = await Perfil.findByPk(perfilId)

    let photoPath = path.join(process.env.APPDATA, 'fasmee', 'photos')

    if (await superFs.notExists(path)) {
      await superFs.mkdir(photoPath, { recursive: true })
    }

    let profilePhotoPath = path.join(photoPath, `${perfil.id}.jpeg`)

    perfil.profilePhotoPath = profilePhotoPath
    await perfil.save()

    saveBase64Image(photoBase64, profilePhotoPath)
  } catch (error) {
    console.error('Error creating photo:', error)
  }
})
