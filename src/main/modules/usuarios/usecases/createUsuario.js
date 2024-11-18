import { ipcMain } from 'electron'
import { Usuario, Perfil } from '../../../singletons/database/schema'
import hashPassword from '../../../utils/hashPassword'

ipcMain.handle('createUsuario', async (event, data) => {
  try {
    // Cifrando la contraseña
    data.password = await hashPassword(data.password)

    // Creación del usuario junto con el perfil
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
          telefono: data.extension + '-' + data.telefono,
          enteId: 1
        }
      },
      {
        include: [
          {
            model: Perfil,
            as: 'perfil' // Asegúrate de que el alias coincide con la asociación
          }
        ]
      }
    )

    return usuario.toJSON
  } catch (error) {
    console.error('Error creating usuario:', error)
    throw error
  }
})
