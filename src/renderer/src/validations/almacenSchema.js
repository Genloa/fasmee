import { z } from 'zod'

export const almacenSchema = z.object({
  cubiculo: z
    .string()
    .min(3, {
      message: 'Ingresa el cubiculo  (mínimo 3 caracteres)'
    })
    .max(200, {
      message: 'Este campo debe tener un máximo de 200 caracteres'
    }),
  descripcion: z
    .string()
    .min(3, {
      message: 'Ingresa la descripcion del almacen (mínimo 3 caracteres)'
    })
    .max(200, {
      message: 'Este campo debe tener un máximo de 200 caracteres'
    })
})
