import hashPassword from '../../../utils/hashPassword'
import momentDate from '../../../utils/momentDate'
import { Departamento, Ente, Perfil, PerfilMedico, Rol, RolOnPerfil, Usuario } from '../schema'

async function userSeeder() {
  try {
    let password = await hashPassword('admin')

    const ente = await Ente.findOne({ where: { nombre: 'FASMEE' } })
    const departamento = await Departamento.findOne({ where: { nombre: 'Administrador' } })
    const adminRole = await Rol.findOne({ where: { nombre: 'Administrador(a)' } })

    let usuario = await Usuario.create(
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
          departamentoId: departamento.id,
          perfilMedico: {
            patologias: null,
            medicamentos: null,
            alergias: null,
            cirugias: null,
            peso: null,
            altura: null
          }
        }
      },
      {
        include: [
          {
            model: Perfil,
            as: 'perfil',
            include: [
              {
                model: PerfilMedico,
                as: 'perfilMedico'
              }
            ]
          }
        ]
      }
    )

    await RolOnPerfil.create({ rolId: adminRole.id, perfilId: usuario.perfil.id })
  } catch (error) {
    console.error(error)
  }
}

export default userSeeder
