import { Ente } from '../schema'

async function enteSeeder() {
  await Ente.bulkCreate([{ nombre: 'MPPE' }, { nombre: 'FASMEE' }])
}

export default enteSeeder
