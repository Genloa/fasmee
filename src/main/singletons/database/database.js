import Logger from 'electron-log'
import { Sequelize } from 'sequelize'
import file from '../../services/fileService'

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance
    }

    this.connection = null
    Database.instance = this
  }

  async getConnection() {
    if (!this.connection) {
      let credentials = await this.getCredentials()

      this.connect(
        credentials.database,
        credentials.username,
        credentials.password,
        credentials.host,
        credentials.port,
        credentials.schema
      )
    }

    return this.connection
  }

  connect(database, username, password, host, port, schema) {
    this.disconnect()
    this.connection = new Sequelize(database, username, password, {
      dialect: 'postgres',
      host: host,
      port: port,
      schema: schema
    })

    return this.connection
  }

  async testConnection(connection) {
    try {
      await connection.authenticate()
      Logger.info('La conexion a la base de datos fue exitosa.')
      return true
    } catch (error) {
      Logger.error('No se pudo conectar a la base de datos.')
      return false
    }
  }

  async syncModels() {
    try {
      import('./schema')
      await this.connection.sync({ alter: true })
      Logger.info('All models were synchronized successfully.')
    } catch (error) {
      Logger.error('Unable to sync models:', error)
    }
  }

  async getCredentials() {
    let data = await file.read()
    return data.postgre
  }

  disconnect() {
    this.connection = null
  }
}

const db = new Database()

export default db
