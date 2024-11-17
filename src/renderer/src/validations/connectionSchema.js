import { z } from 'zod'

const connectionSchema = z.object({
  database: z.string().min(1, { message: 'Ingresa el nombre de la base de datos' }),

  username: z.string().min(1, { message: 'Ingresa el nombre de usuario' }),

  password: z.string().min(1, { message: 'Ingresa la contraseña' }),

  host: z.string().min(1, { message: 'Ingresa el host' }),

  port: z.string().min(1, { message: 'Ingresa el puerto' }),

  schema: z.string().min(1, { message: 'Ingresa el schema' })
})

export default connectionSchema
