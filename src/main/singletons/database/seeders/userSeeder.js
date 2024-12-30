import hashPassword from '../../../utils/hashPassword'
import momentDate from '../../../utils/momentDate'
import { Departamento, Ente, Perfil, Usuario } from '../schema'

async function userSeeder() {
  try {
    let password = await hashPassword('admin')

    const ente = await Ente.findOne({ where: { nombre: 'FASMEE' } })
    const departamento = await Departamento.findOne({ where: { nombre: 'Administrador' } })

    await Usuario.create(
      {
        username: 'admin',
        password: password,
        perfil: {
          nombres: 'Admin',
          apellidos: 'Admin',
          fecha_nacimiento: momentDate('1998-11-20'),
          tipo_cedula: 'V',
          cedula: '12345678',
          correo: 'admin@proyecto.com',
          telefono: '04121234567',
          enteId: ente.id,
          departamentoId: departamento.id
        }
      },
      {
        include: [{ model: Perfil, as: 'perfil' }]
      }
    )
  } catch (error) {
    console.error(error)
  }
}

export default userSeeder
