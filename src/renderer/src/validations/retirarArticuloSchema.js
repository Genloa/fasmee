import { z } from 'zod'

export const retirarArticuloSchema = z.object({
  cantidad: z
    .number()
    .positive()
    .min(1, { message: 'El cantidad debe ser mayor que 1' })
    .max(500, { message: 'El cantidad debe ser menor que 500' }),
  medicoId: z.number().min(1, { message: 'Medico es requerido' })
})
