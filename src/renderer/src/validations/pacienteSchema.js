import { z } from 'zod'

const tiposCedula = ['V', 'E']

export const pacienteSchema = z.object({
  nombres: z
    .string()
    .min(3, {
      message: 'Ingresa tus nombres (mínimo 3 caracteres)'
    })
    .max(200, {
      message: 'Este campo debe tener un máximo de 200 caracteres'
    }),
  apellidos: z
    .string()
    .min(3, {
      message: 'Ingresa tus apellidos (mínimo 3 caracteres)'
    })
    .max(200, {
      message: 'Este campo debe tener un máximo de 200 caracteres'
    }),
  tipoCedula: z.enum(tiposCedula, {
    errorMap: () => ({ message: 'Por favor selecciona un tipo de cédula' })
  }),
  cedula: z.string().min(6, {
    message: 'Debe ingresar su cédula (mínimo 6 caracteres)'
  }),
  fechaNacimiento: z.string().min(1, { message: 'Ingresa tu fecha de nacimiento' }).date(),
  telefono: z.string().min(11, {
    message: 'Debe ingresar un número de teléfono válido (mínimo 11 caracteres)'
  }),
  correo: z.string().email({
    message: 'Correo electrónico inválido'
  }),
  enteId: z.number().optional().nullable(),
  trabajadorId: z.number().optional().nullable(),
  patologias: z.string().optional(),
  alergias: z.string().optional(),
  cirugias: z.string().optional(),
  medicamentos: z.string().optional(),
  peso: z
    .number()
    .positive()
    .min(0.1, { message: 'El peso debe ser mayor que 0.1 kg' })
    .max(500, { message: 'El peso debe ser menor que 500 kg' }),
  altura: z
    .number()
    .positive()
    .min(0.1, { message: 'La altura debe ser mayor que 0.1 m' })
    .max(3, { message: 'La altura debe ser menor que 3 m' })
})
