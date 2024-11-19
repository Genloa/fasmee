import Logger from 'electron-log'
import { Sequelize } from 'sequelize'

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
      // let data = await file.read()
      // if (data.postgre) {
      //   this.connect(
      //     data.postgre.database,
      //     data.postgre.username,
      //     data.postgre.password,
      //     data.postgre.host,
      //     data.postgre.port,
      //     data.postgre.schema
      //   )
      // }

      this.connect('fasmee1', 'postgres', '27598704.Con', 'localhost', '5432', 'public')
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

  disconnect() {
    this.connection = null
  }
}

const db = new Database()

export default db
