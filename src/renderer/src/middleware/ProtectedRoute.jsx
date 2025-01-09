import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const { session } = useAuth()
  if (!session) {
    // user is not authenticated
    return <Navigate to="/login" />
  }
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}

export default ProtectedRoute
