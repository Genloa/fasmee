import { z } from 'zod'

export const citaSchema = z.object({
  fechaCita: z
    .string()
    .min(1, { message: 'Ingresa la fecha de cita' })
    .refine(
      (fechaCita) => {
        const today = new Date()
        const citaDate = new Date(fechaCita)
        return citaDate > today // Permitir solo fechas futuras
      },
      { message: 'La fecha de la cita debe ser mayor al día en curso' }
    ),
  pacienteId: z.number().min(1, { message: 'Paciente es requerido' }),
  departamentoId: z.number().min(1, { message: 'Departamento es requerido' }),
  medicoId: z.number().min(1, { message: 'Medico es requerido' })
})
