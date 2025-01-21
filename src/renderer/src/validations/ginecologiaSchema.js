import { z } from 'zod'

export const baseginecologiaSchema = z.object({
  eco: z.string().min(10, {
    message: 'Ingresar detalles del eco'
  }),
  infeccion: z.string().min(5, {
    message: 'Si no hay Infección colocar ninguna'
  }),
  tratamiento: z.string().optional(),
  diagnostico: z.string().min(10, {
    message: 'Ingresar detalles de consulta'
  })
})

export const ginecologiaPriSchema = baseginecologiaSchema.extend({
  fechaPeriodo: z.string().min(1, { message: 'Ingresa del ultimo periodo' }).date(),
  ciclo: z.number().positive().min(1, { message: 'Ingresa el ciclo mestrual' }),
  citologia: z.string().min(10, {
    message: 'Ingresar detalles de ultima citología'
  }),
  mamografia: z.string().min(10, {
    message: 'Ingresar detalles de ultima mamografía'
  }),
  embarazos: z.string().optional()
})

export const ginecologiaPreSchema = baseginecologiaSchema.extend({
  gestacion: z.string().min(10, {
    message: 'Ingresar tiempo de Gestación'
  }),
  pesoBebe: z.number().positive().min(0.1, { message: 'ingresar peso del bebe' }),
  medidasBebe: z.string().min(10, {
    message: 'Ingresar medidas del bebe'
  })
})

/*
export const updateUserSchema = baseUserSchema
  .extend({
    password: z.string().optional(), // Permitir que el campo de contraseña esté vacío
    confirmtPassword: z.string().optional() // Permitir que el campo de confirmación de contraseña esté vacío
  })
  .refine((data) => data.password === data.confirmtPassword, {
    message: 'Las contraseña no coinciden',
    path: ['confirmtPassword']
  })

export const resolveSchema = (mode) => {
  if (mode === 'edit') {
    return updateUserSchema
  } else if (mode === 'create') {
    return createUserSchema
  }
  throw new Error('Invalid mode')
}

*/
