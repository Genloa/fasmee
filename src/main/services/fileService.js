import superFs from '@supercharge/fs'
import Logger from 'electron-log'
import path from 'path'

class FileService {
  constructor() {
    this.filepath = path.join(process.env.APPDATA, 'fasmee', 'AUTH_DATA_FILE.json')
    this.model = { postgre: null }
  }

  async init() {
    try {
      if (await superFs.notExists(this.filepath)) {
        await this.writeToFile(this.model)
        Logger.info('Archivo de configuración iniciado')
      }
    } catch (error) {
      Logger.error('Error al iniciar el archivo de configuración:', error)
    }
  }

  read() {
    try {
      return superFs.readJSONSync(this.filepath)
    } catch (error) {
      Logger.error('Error al leer el archivo:', error)
    }
  }

  async update(data) {
    try {
      await this.writeToFile(data)
      Logger.info('Archivo actualizado')
    } catch (error) {
      Logger.error('Error al actualizar el archivo:', error)
    }
  }

  async reset() {
    await this.update(this.model)
  }

  async writeToFile(data) {
    try {
      await superFs.writeFile(this.filepath, JSON.stringify(data))
    } catch (error) {
      Logger.error('Error al escribir en el archivo:', error)
    }
  }
}

const file = new FileService()

export default file
