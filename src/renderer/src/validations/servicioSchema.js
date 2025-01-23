import { z } from 'zod'

const MAX_TAMANO = 5 * 1024 * 1024 // 5MB
const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'application/pdf']

export const servicioSchema = z.object({
  pacienteId: z.number().min(1, { message: 'Paciente es requerido' }),
  fechaMuestra: z.string().min(1, { message: 'Ingresa la fecha que realizo el servicio' }).date(),
  detalles: z.string().min(10, { message: 'ingrese detalles de Resultados' }),
  archivo: z
    .any()
    .refine((files) => files?.length === 1, 'Debes seleccionar un archivo')
    .refine((files) => TIPOS_PERMITIDOS.includes(files[0]?.type), 'Tipo de archivo no soportado')
    .refine((files) => files[0]?.size <= MAX_TAMANO, 'El tamaño del archivo no debe exceder 5MB')
})
