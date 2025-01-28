import { faker } from '@faker-js/faker'
import hashPassword from '../../../utils/hashPassword'
import momentDate from '../../../utils/momentDate'
import {
  Departamento,
  Ente,
  Perfil,
  PerfilMedico,
  PerfilOnBeneficiario,
  Rol,
  RolOnPerfil,
  Usuario
} from '../schema'

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

async function othersUsersSeeder() {
  const entes = await Ente.findAll()

  for (let i = 0; i < 500; i++) {
    let perfil = await Perfil.create(
      {
        nombres: faker.person.firstName(),
        apellidos: faker.person.lastName(),
        fecha_nacimiento: momentDate(faker.date.past(50, new Date(2000, 0, 1))),
        tipo_cedula: 'V',
        cedula: faker.number.int(1000000, 99999999),
        correo: faker.internet.email(),
        telefono: '0' + faker.number.int(100000000, 999999999),
        enteId: entes[between(0, entes.length)].id,
        perfilMedico: {
          patologias: 'a',
          medicamentos: 'b',
          alergias: 'c',
          cirugias: 'd',
          peso: 'e',
          altura: 'f'
        }
      },
      {
        include: [
          {
            model: PerfilMedico,
            as: 'perfilMedico'
          }
        ]
      }
    )

    let b1 = await Perfil.create(
      {
        nombres: faker.person.firstName(),
        apellidos: faker.person.lastName(),
        fecha_nacimiento: momentDate(faker.date.past(50, new Date(2000, 0, 1))),
        tipo_cedula: 'V',
        cedula: faker.number.int(1000000, 99999999),
        correo: faker.internet.email(),
        telefono: '0' + faker.number.int(100000000, 999999999),
        perfilMedico: {
          patologias: 'a',
          medicamentos: 'b',
          alergias: 'c',
          cirugias: 'd',
          peso: 'e',
          altura: 'f'
        }
      },
      {
        include: [
          {
            model: PerfilMedico,
            as: 'perfilMedico'
          }
        ]
      }
    )

    let b2 = await Perfil.create(
      {
        nombres: faker.person.firstName(),
        apellidos: faker.person.lastName(),
        fecha_nacimiento: momentDate(faker.date.past(50, new Date(2000, 0, 1))),
        tipo_cedula: 'V',
        cedula: faker.number.int(1000000, 99999999),
        correo: faker.internet.email(),
        telefono: '0' + faker.number.int(100000000, 999999999),
        perfilMedico: {
          patologias: 'a',
          medicamentos: 'b',
          alergias: 'c',
          cirugias: 'd',
          peso: 'e',
          altura: 'f'
        }
      },
      {
        include: [
          {
            model: PerfilMedico,
            as: 'perfilMedico'
          }
        ]
      }
    )

    PerfilOnBeneficiario.create({ perfilId: perfil.id, beneficiarioId: b1.id })
    PerfilOnBeneficiario.create({ perfilId: perfil.id, beneficiarioId: b2.id })
  }
}

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

    await othersUsersSeeder()
  } catch (error) {
    console.error(error)
  }
}

export default userSeeder
