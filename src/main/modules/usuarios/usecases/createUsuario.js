import { ipcMain } from 'electron'
import { Perfil, Usuario, Rol } from '../../../singletons/database/schema'
import hashPassword from '../../../utils/hashPassword'

ipcMain.handle('createUsuario', async (event, data) => {
  try {
    // Cifrando la contraseña
    data.password = await hashPassword(data.password)

    const usuario = await Usuario.create(
      {
        username: data.username,
        password: data.password,
        perfil: {
          nombres: data.nombres,
          apellidos: data.apellidos,
          fecha_nacimiento: new Date(data.fechaNacimiento),
          tipo_cedula: data.tipoCedula,
          cedula: data.cedula,
          correo: data.correo,
          telefono: data.telefono,
          enteId: 1
        }
      },
      {
        include: [
          {
            model: Perfil,
            as: 'perfil',
            include: [
              {
                model: Rol, // Incluye el modelo Rol
                as: 'roles' // Alias de la asociación
              }
            ]
          }
        ]
      }
    )

    console.log(usuario.toJSON())

    return usuario.toJSON()
  } catch (error) {
    console.error('Error creating usuario:', error)
    throw error
  }
})
