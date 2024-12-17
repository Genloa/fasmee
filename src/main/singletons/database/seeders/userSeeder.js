import hashPassword from '../../../utils/hashPassword'
import { Perfil, Usuario } from '../schema'

async function userSeeder() {
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
    },
    {
      include: [{ model: Perfil, as: 'perfil' }]
    }
  ])
}

export default userSeeder
