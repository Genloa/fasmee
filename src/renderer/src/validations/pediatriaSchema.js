import { z } from 'zod'

export const pediatriaSchema = z.object({
  peso: z
    .number()
    .positive()
    .min(0.1, { message: 'El peso debe ser mayor que 0.1 kg' })
    .max(500, { message: 'El peso debe ser menor que 500 kg' }),
  altura: z
    .number()
    .positive()
    .min(0.1, { message: 'La altura debe ser mayor que 0.1 m' })
    .max(3, { message: 'La altura debe ser menor que 3 m' }),
  motivo: z.string().min(10, {
    message: 'Ingresar motivo de consulta'
  }),
  tratamiento: z.string().optional(),
  diagnostico: z.string().min(10, {
    message: 'Ingresar detalles de consulta'
  }),
  examenes: z.string().min(10, {
    message: 'Ingresar detalles de Examenes'
  })
})
