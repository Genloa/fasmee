import { z } from 'zod'

const tipo = ['V', 'E']

// const extns = ['0416', '0426', '0424', '0414', '0412']

export const userSchema = z
  .object({
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
    username: z.string().min(4, {
      message: 'Ingresa tu nombre de usuario'
    }),
    password: z.string().min(5, {
      message: 'La contraseña debe tener al menos 6 caracteres'
    }),
    confirmtPassword: z.string().min(5, {
      message: 'La contraseña debe tener al menos 6 caracteres'
    }),
    fechaNacimiento: z.string().min(1, { message: 'Ingresa tu fecha de nacimiento' }).date(),
    correo: z.string().email({
      message: 'Correo invalido'
    }),
    telefono: z
      .string()
      .min(11, {
        message: 'Minimo 11 caracteres'
      })
      .max(11, {
        message: 'Maximo 11 caracteres'
      })
  })
  .refine((data) => data.password === data.confirmtPassword, {
    message: 'Las contraseña no coinciden',
    path: ['confirmtPassword']
  })
