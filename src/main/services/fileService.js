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
        Logger.info('Archivo de configuracion iniciado')
      }
    } catch (error) {
      Logger.error(error)
    }
  }

  read() {
    try {
      return superFs.readJSONSync(this.filepath)
    } catch (error) {
      Logger.error(error)
    }
  }

  async updated(data) {
    try {
      await this.writeToFile(data)
      Logger.info('Archivo actualizado')
    } catch (error) {
      Logger.error(error)
    }
  }

  async reset() {
    await this.updated(this.model)
  }

  async writeToFile(data) {
    try {
      await superFs.writeFile(this.filepath, JSON.stringify(data))
    } catch (err) {
      Logger.error(err)
    }
  }
}

const file = new FileService()

export default file
