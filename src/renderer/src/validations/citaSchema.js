import { z } from 'zod'

export const citaSchema = z.object({
  fechaCita: z.string().min(1, { message: 'Ingresa la fecha de cita' }).date(),
  pacienteId: z.number().min(1, { message: 'Paciente es requerido' })
})
