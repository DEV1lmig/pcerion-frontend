import { z } from 'zod'
import validator from 'validator'

export const RegisterSchema = z.object({
  first_name: z.string().min(2, { message: 'Nombre debe de ser minimo 2 caracteres' }),
  last_name: z.string().min(2, { message: 'Apellido debe ser de minimo 2 caracteres' }),
  email: z.string().email({ message: 'El correo es invalido' }),
  password: z.string().refine(validator.isStrongPassword, { message: 'La contraseña es muy debil' }),
  phone: z.string().refine(validator.isMobilePhone, { message: 'Numero de telefono invalido' }),
})