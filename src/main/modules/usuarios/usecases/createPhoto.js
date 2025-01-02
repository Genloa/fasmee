import superFs from '@supercharge/fs'
import { ipcMain } from 'electron'
import path from 'path'
import { Perfil } from '../../../singletons/database/schema'

async function saveBase64Image(base64String, path) {
  // Esto elimina el prefijo del tipo de archivo si existe
  const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, '')

  try {
    await superFs.writeFile(path, base64Data, { encoding: 'base64' })
    console.log('Imagen guardada exitosamente')
  } catch (error) {
    console.error('Error guardando la imagen:', error)
  }
}

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
