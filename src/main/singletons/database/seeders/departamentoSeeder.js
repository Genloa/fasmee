import { Departamento } from '../schema'

async function departamentoSeeder() {
  try {
    await Departamento.bulkCreate([
      { nombre: 'Medicina General', cubiculo: '001' },
      { nombre: 'Medicina Interna', cubiculo: '002' },
      { nombre: 'Cardiología', cubiculo: '003' },
      { nombre: 'Nutrición', cubiculo: '004' },
      { nombre: 'Ginecología y Obstetricia', cubiculo: '005' },
      { nombre: 'Pediatría', cubiculo: '006' },
      { nombre: 'Traumatología', cubiculo: '007' },
      { nombre: 'Odontología', cubiculo: '008' },
      { nombre: 'Rayos X', cubiculo: '009' },
      { nombre: 'Laboratorios', cubiculo: '010' },
      { nombre: 'Psiquiatría', cubiculo: '011' },
      { nombre: 'Enfermeria', cubiculo: '012' },
      { nombre: 'Administración', cubiculo: '013' },
      { nombre: 'Administrador', cubiculo: '014' },
      { nombre: 'Ambulancias', cubiculo: '015' }
    ])
  } catch (error) {
    console.error(error)
  }
}

export default departamentoSeeder
