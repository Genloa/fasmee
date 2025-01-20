import { Permiso, Rol, RolOnPermiso } from '../schema'

async function rolSeeder() {
  try {
    await Rol.bulkCreate([
      { nombre: 'Administrador(a)' },
      { nombre: 'Doctor(a)' },
      { nombre: 'Enfermero(a)' },
      { nombre: 'Administrativo(a)' },
      { nombre: 'Paramédico' },
      { nombre: 'Especialista' }
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

    let doctor = await Rol.findOne({ where: { nombre: 'Doctor(a)' } })
    let doctorPermissions = [
      'pacientes.index',
      'pacientes.edit',
      'pacientes.takePhoto',
      'citas.index',
      'citas.create',
      'citas.edit',
      'citas.delete',
      'cronogramas.index',
      'atender.index',
      'atender.atender',
      'atender.emergencia',
      'historias.index',
      'historias.show',
      'inventarios.index'
    ]

    for (let permiso of doctorPermissions) {
      let permisoModel = await Permiso.findOne({ where: { nombre: permiso } })
      await RolOnPermiso.create({ rolId: doctor.id, permisoId: permisoModel.id })
    }

    let enfermero = await Rol.findOne({ where: { nombre: 'Enfermero(a)' } })

    let enfermeroPermissions = [
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
      'colas.index',
      'colas.add',
      'colas.remove',
      'servicios.index',
      'servicios.activarUsoAmbulacia',
      'historias.index',
      'historias.show',
      'inventarios.index'
    ]

    for (let permiso of enfermeroPermissions) {
      let permisoModel = await Permiso.findOne({ where: { nombre: permiso } })
      await RolOnPermiso.create({ rolId: enfermero.id, permisoId: permisoModel.id })
    }
    let administrativo = await Rol.findOne({ where: { nombre: 'Administrativo(a)' } })

    let administrativoPermissions = [
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
      'servicios.index',
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

    for (let permiso of administrativoPermissions) {
      let permisoModel = await Permiso.findOne({ where: { nombre: permiso } })
      await RolOnPermiso.create({ rolId: administrativo.id, permisoId: permisoModel.id })
    }

    let especialista = await Rol.findOne({ where: { nombre: 'Especialista' } })

    let especialistaPermissions = [
      'pacientes.index',
      'cronogramas.index',
      'servicios.index',
      'servicios.subirResultados',
      'servicios.activarUsoAmbulacia',
      'historias.index',
      'historias.show'
    ]

    for (let permiso of especialistaPermissions) {
      let permisoModel = await Permiso.findOne({ where: { nombre: permiso } })
      await RolOnPermiso.create({ rolId: especialista.id, permisoId: permisoModel.id })
    }
  } catch (error) {
    console.error(error)
  }
}

export default rolSeeder
