import { z } from 'zod'

export const nutricionSchema = z.object({
  peso: z.number().positive().min(1, { message: 'El cantidad debe ser mayor que 1' }),
  cadera: z.number().positive().min(0.1, { message: 'La cadera debe ser mayor que 0.1 cm' }),
  cintura: z.number().positive().min(0.1, { message: 'La cintura debe ser mayor que 0.1 cm' }),
  brazos: z.number().positive().min(0.1, { message: 'La brazos debe ser mayor que 0.1 cm' }),
  piernas: z.number().positive().min(0.1, { message: 'La piernas debe ser mayor que 0.1 cm' }),
  detalles: z.string().optional()
})
