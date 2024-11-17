import { z } from 'zod'
const tipo = ['V', 'E']
const extns = ['0416', '0426', '0424', '0414', '0412']
export const pacienteSchema = z.object({
  nombres: z
    .string()
    .min(3, {
      message: 'Ingresa tus nombres'
    })
    .max(200, {
      message: 'Este campo tiene que tener un maximo de 200 caracteres'
    }),
  apellidos: z
    .string()
    .min(3, {
      message: 'Ingresa tus apellidos maximo 3 caracteres'
    })
    .max(200, {
      message: 'Este campo tiene que tener un maximo de 200 caracteres'
    }),
  tipoCedula: z.enum(tipo, {
    errorMap: () => ({ message: 'Please select a plan' })
  }),
  cedula: z.string().min(6, {
    message: 'Debe colocar su cedula'
  }),
  fechaNacimiento: z.string().min(1, { message: 'Ingresa tu fecha de nacimiento' }).date(),
  correo: z.string().email({
    message: 'Correo invalido'
  }),
  extension: z.enum(extns, {
    errorMap: () => ({ message: 'selecione la extension' })
  }),
  telefono: z
    .string()
    .min(7, {
      message: 'Minimo 7 caracteres'
    })
    .max(7, {
      message: 'Maximo 7 caracteres'
    })
})