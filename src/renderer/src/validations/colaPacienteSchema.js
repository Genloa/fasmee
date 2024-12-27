import { z } from 'zod'

export const colaPacienteSchema = z.object({
  pacienteId: z.number().min(1, { message: 'Paciente es requerido' }),
  departamentoId: z.number().min(1, { message: 'Departamento es requerido' }),
  medicoId: z.number().optional().nullable()
})
