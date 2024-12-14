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

  getConnection() {
    if (!this.connection) {
      let postgre = this.getCredentials()

      if (!postgre) {
        Logger.info('No se encontraron las credenciales de la base de datos.')
        return null
      }

      this.connect(
        postgre.database,
        postgre.username,
        postgre.password,
        postgre.host,
        postgre.port,
        postgre.schema
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
      await this.connection.sync({ alter: false })
      Logger.info('All models were synchronized successfully.')
    } catch (error) {
      Logger.error('Unable to sync models:', error)
    }
  }

  getCredentials() {
    let data = file.read()
    return data?.postgre
  }

  disconnect() {
    this.connection = null
  }
}

const db = new Database()

export default db
