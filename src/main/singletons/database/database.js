import Logger from 'electron-log'
import { Sequelize } from 'sequelize'

class database {
  constructor() {
    this.connection = null
  }

  getConnection() {
    if (!this.connection) {
      this.connect('fasmee', 'postgres', '27831884', 'localhost', '5433', 'public')
    }

    return this.connection
  }

  connect(database, username, password, host, port, schema) {
    this.connection = new Sequelize(database, username, password, {
      dialect: 'postgres',
      host: host,
      port: port,
      schema: schema
    })
  }

  async testConnection() {
    try {
      await this.connection.authenticate()
      Logger.info('La conexion a la base de datos fue exitosa.')
      return this.connection
    } catch (error) {
      Logger.error('No se pudo conectar a la base de datos:', error)
      return null
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

  disconnect() {
    this.connection = null
  }
}

export default new database()
