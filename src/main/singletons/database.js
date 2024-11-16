import { PrismaClient } from '@prisma/client'

class database {
  constructor() {
    this.connection = null
  }

  async getConnection() {
    if (!this.connection) {
      throw new Error('No connection established')
    }

    return this.connection
  }

  connect(database, username, password, host, port) {
    this.connection = new PrismaClient({
      datasources: {
        db: {
          url: `postgresql://${username}:${password}@${host}:${port}/${database}`
        }
      }
    })
  }

  disconnect() {
    this.connection = null
  }
}

export default new database()
