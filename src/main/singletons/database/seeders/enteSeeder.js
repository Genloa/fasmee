import { Ente } from '../schema'

async function enteSeeder() {
  try {
    await Ente.bulkCreate([{ nombre: 'MPPE' }, { nombre: 'FASMEE' }])
  } catch (error) {
    console.error(error)
  }
}

export default enteSeeder
