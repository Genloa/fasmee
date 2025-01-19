import { Permiso } from '../schema'

async function permisoSeeder() {
  let permisos = {
    usuarios: {
      index: 'Listar usuarios',
      create: 'Crear usuario',
      edit: 'Editar usuario',
      delete: 'Eliminar usuario',
      changeRole: 'Cambiar rol de usuario'
    },
    pacientes: {
      index: 'Listar pacientes',
      create: 'Crear paciente',
      edit: 'Editar paciente',
      delete: 'Eliminar paciente',
      takePhoto: 'Tomar foto de paciente'
    },
    citas: {
      index: 'Listar citas',
      create: 'Crear cita',
      edit: 'Editar cita',
      delete: 'Eliminar cita'
    },
    cronogramas: {
      index: 'Listar cronogramas',
      create: 'Crear cronograma'
    },
    colas: {
      index: 'Listar colas',
      add: 'Agregar a cola',
      remove: 'Quitar de cola'
    },
    atender: {
      index: 'Listar pacientes en espera',
      atender: 'Atender paciente',
      emergencia: 'Atender emergencia'
    },
    servicios: {
      index: 'Listar servicios',
      subirResultados: 'Subir resultados de servicio',
      activarUsoAmbulacia: 'Activar uso de ambulancia'
    },
    historias: {
      index: 'Listar historias clínicas',
      show: 'Mostrar historia clínica'
    },
    inventarios: {
      index: 'Listar inventarios',
      create: 'Crear almacen',
      edit: 'Editar almacen',
      delete: 'Eliminar almacen',
      createProduct: 'Crear producto',
      editProduct: 'Editar producto',
      deleteProduct: 'Eliminar producto',
      moveHistory: 'Historial de movimientos',
      cargarInventario: 'Cargar inventario',
      descargarInventario: 'Descargar inventario'
    }
  }

  let permisosDot = Object.keys(permisos).map((modulo) => {
    return Object.keys(permisos[modulo]).map((accion) => {
      return `${modulo}.${accion}`
    })
  })

  try {
    let permisos = permisosDot.flat().map((permiso) => {
      return { nombre: permiso }
    })

    await Permiso.bulkCreate(permisos)

    //
  } catch (error) {
    console.error(error)
  }
}

export default permisoSeeder
