import Logger from 'electron-log'
import { Sequelize } from 'sequelize'
import fileService from '../../services/fileService'

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
      const postgre = this.getCredentials()

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
      schema: schema,
      timezone: '-04:00'
    })

    return this.connection
  }

  async testConnection(connection) {
    try {
      await connection.authenticate()
      Logger.info('La conexión a la base de datos fue exitosa.')
      return true
    } catch (error) {
      Logger.error('No se pudo conectar a la base de datos:', error)
      return false
    }
  }

  async syncModels() {
    try {
      await import('./schema')
      await this.connection.sync({ alter: true })
      Logger.info('Todos los modelos fueron sincronizados exitosamente.')
    } catch (error) {
      Logger.error('No se pudieron sincronizar los modelos:', error)
    }
  }

  getCredentials() {
    const data = fileService.read()
    return data?.postgre
  }

  disconnect() {
    this.connection = null
  }
}

const db = new Database()

export default db
