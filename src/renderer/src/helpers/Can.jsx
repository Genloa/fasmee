import PropTypes from 'prop-types'
import { useAuth } from '../hooks/useAuth'

function Can({ children, permission }) {
  const { session } = useAuth()

  let userPermissions = session.user.perfil.roles[0].permisos

  if (userPermissions.find((permiso) => permiso.nombre === permission)) {
    return children
  }

  return null
}

Can.propTypes = {
  children: PropTypes.node,
  permission: PropTypes.string.isRequired
}

export default Can
