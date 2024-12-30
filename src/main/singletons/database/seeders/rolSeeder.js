import { Rol } from '../schema'

async function rolSeeder() {
  try {
    await Rol.bulkCreate([
      { nombre: 'Administrador(a)' },
      { nombre: 'Doctor(a)' },
      { nombre: 'Enfermero(a)' },
      { nombre: 'Administrativo(a)' }
    ])
  } catch (error) {
    console.error(error)
  }
}

export default rolSeeder
