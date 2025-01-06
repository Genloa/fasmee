import { z } from 'zod'

export const ambulanciaSchema = z.object({
  pacienteId: z.number().min(1, { message: 'Paciente es requerido' }),
  fechaUso: z
    .string()
    .min(1, { message: 'Ingresa la fecha que realizo el servicio' }).date(),
  detalles: z.string().min(10, { message: 'ingrese detalles de Resultados' })
})
