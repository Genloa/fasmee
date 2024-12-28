import hashPassword from '../../../utils/hashPassword'
import { Usuario } from '../schema'

async function userSeeder() {
  try {
    let password = await hashPassword('admin')

    Usuario.bulkCreate([
      {
        username: 'admin',
        password: password,
        perfil: {
          nombres: 'Admin',
          apellidos: 'Admin',
          fecha_nacimiento: new Date('1998-11-20'),
          tipo_cedula: 'V',
          cedula: '12345678',
          correo: 'admin@proyecto.com',
          telefono: '04121234567',
          enteId: 1
        }
      }
    ])
  } catch (error) {
    console.error(error)
  }
}

export default userSeeder
