import { z } from 'zod'

export const articuloSchema = z.object({
  nombre: z
    .string()
    .min(3, {
      message: 'Ingresa el nombre del articulo (mínimo 3 caracteres)'
    })
    .max(200, {
      message: 'Este campo debe tener un máximo de 200 caracteres'
    }),
  cantidad: z
    .number()
    .positive()
    .min(1, { message: 'El cantidad debe ser mayor que 1' })
    .max(500, { message: 'El cantidad debe ser menor que 500' }),
  almacenId: z.number().min(1, { message: 'Almacen es requerido' })
})
