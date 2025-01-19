import { Permiso, Rol, RolOnPermiso } from '../schema'

async function rolSeeder() {
  try {
    await Rol.bulkCreate([
      { nombre: 'Administrador(a)' },
      { nombre: 'Doctor(a)' },
      { nombre: 'Enfermero(a)' },
      { nombre: 'Administrativo(a)' },
      { nombre: 'Paramédico' }
    ])

    let admin = await Rol.findOne({ where: { nombre: 'Administrador(a)' } })

    let adminPermissions = [
      'usuarios.index',
      'usuarios.create',
      'usuarios.edit',
      'usuarios.delete',
      'usuarios.changeRole',
      'pacientes.index',
      'pacientes.create',
      'pacientes.edit',
      'pacientes.delete',
      'pacientes.takePhoto',
      'citas.index',
      'citas.create',
      'citas.edit',
      'citas.delete',
      'cronogramas.index',
      'cronogramas.create',
      'colas.index',
      'colas.add',
      'colas.remove',
      'atender.index',
      'atender.atender',
      'atender.emergencia',
      'servicios.index',
      'servicios.subirResultados',
      'servicios.activarUsoAmbulacia',
      'historias.index',
      'historias.show',
      'inventarios.index',
      'inventarios.create',
      'inventarios.edit',
      'inventarios.delete',
      'inventarios.createProduct',
      'inventarios.editProduct',
      'inventarios.deleteProduct',
      'inventarios.moveHistory',
      'inventarios.cargarInventario',
      'inventarios.descargarInventario'
    ]

    for (let permiso of adminPermissions) {
      let permisoModel = await Permiso.findOne({ where: { nombre: permiso } })
      await RolOnPermiso.create({ rolId: admin.id, permisoId: permisoModel.id })
    }

    // let doctor = await Rol.findOne({ where: { nombre: 'Doctor(a)' } })
    // let enfermero = await Rol.findOne({ where: { nombre: 'Enfermero(a)' } })
    // let administrativo = await Rol.findOne({ where: { nombre: 'Administrativo(a)' } })
  } catch (error) {
    console.error(error)
  }
}

export default rolSeeder
