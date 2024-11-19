import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = () => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}

export default ProtectedRoute
