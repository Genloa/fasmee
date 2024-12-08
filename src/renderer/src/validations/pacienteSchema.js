import { z } from 'zod'
const tipo = ['V', 'E']
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
  telefono: z.string().min(11, {
    message: 'Minimo 11 caracteres'
  }),
  correo: z.string().email({
    message: 'Correo invalido'
  }),
  trabajadorId: z.number().min(1, { message: 'Trabajador es requerido' }),
  patologias: z.string().nullable(),
  alergias: z.string().nullable(),
  cirugias: z.string().nullable(),
  medicamentos: z.string().nullable(),
  peso: z
    .number()
    .positive()
    .min(0.1, 'Peso debe ser mayor que 0.1')
    .max(500, 'Peso debe ser menor que 500'),
  altura: z
    .number()
    .positive()
    .min(0.1, 'Altura debe ser mayor que 0.1')
    .max(3, 'Altura debe ser menor que 3')
})
