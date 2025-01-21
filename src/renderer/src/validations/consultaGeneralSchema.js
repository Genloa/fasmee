import { z } from 'zod'

export const consultaGeneralSchema = z.object({
  motivo: z.string().min(10, {
    message: 'Ingresar motivo de consulta'
  }),
  tension: z.string().optional(),
  tratamiento: z.string().optional(),
  diagnostico: z.string().min(10, {
    message: 'Ingresar detalles de consulta'
  })
})
