import { ipcMain } from 'electron'
import { Perfil, Usuario } from '../../../singletons/database/schema'

ipcMain.handle('deletePaciente', async (event, id) => {
  try {
    // Encuentra el perfil con sus beneficiarios
    const perfil = await Perfil.findOne({
      where: { id: id },
      include: [
        {
          model: Perfil,
          as: 'beneficiarios' // Alias de la asociación
        }
      ]
    })

    if (!perfil) {
      throw new Error('Perfil no encontrado.')
    }

    // Array para almacenar los IDs de los beneficiarios eliminados
    const beneficiariosEliminados = []

    // Elimina los beneficiarios del perfil y guarda sus IDs
    if (perfil.beneficiarios) {
      for (const beneficiario of perfil.beneficiarios) {
        await Perfil.destroy({ where: { id: beneficiario.id } })
        beneficiariosEliminados.push(beneficiario.id)
      }
    }

    // Elimina el perfil
    await Perfil.destroy({
      where: { id: id }
    })

    // Elimina el usuario asociado al perfil
    if (perfil.usuarioId) {
      await Usuario.destroy({ where: { id: perfil.usuarioId } })
    }

    // Envía un mensaje de éxito junto con los IDs de los beneficiarios eliminados
    return {
      beneficiariosEliminados
    }
  } catch (error) {
    // Maneja el error y envía un mensaje de error
    console.error('Error al eliminar perfil y sus relaciones:', error)
    return {
      message: 'Ocurrió un error al eliminar el perfil y sus relaciones.',
      error: error.message
    }
  }
})
