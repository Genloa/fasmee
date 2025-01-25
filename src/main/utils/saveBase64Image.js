import superFs from '@supercharge/fs'

async function saveBase64Image(base64String, path) {
  // Esto elimina el prefijo del tipo de archivo si existe
  const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, '')

  try {
    await superFs.writeFile(path, base64Data, { encoding: 'base64' })
  } catch (error) {
    console.error('Error guardando la imagen:', error)
  }
}

export default saveBase64Image
