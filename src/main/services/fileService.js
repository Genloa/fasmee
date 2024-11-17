import superFs from '@supercharge/fs'
import Logger from 'electron-Logger'
import path from 'path'

class FileService {
  constructor() {
    this.filepath = path.join(process.env.APPDATA, 'fasmee', 'AUTH_DATA_FILE.json')

    this.model = {
      postgre: null,
      login: null
    }
  }

  async init() {
    if (await superFs.notExists(this.filepath)) {
      await this.writeToFile(this.model)
      Logger.info('Archivo de configuracion iniciado')
    }
  }

  async read() {
    try {
      let content = await superFs.content(this.filepath)
      return JSON.parse(content)
    } catch (error) {
      Logger.error(error)
    }
  }

  async updated(data) {
    await this.writeToFile(data)
    Logger.info('Archivo actualizado')
  }

  async reset() {
    await this.updated(this.model)
  }

  async writeToFile(data) {
    try {
      await superFs.writeFile(this.filepath, JSON.stringify(data))
    } catch (err) {
      Logger.error(err)
      throw err
    }
  }
}

const file = new FileService()

export default file
