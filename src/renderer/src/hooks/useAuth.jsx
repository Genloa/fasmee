import PropTypes from 'prop-types'
import { createContext, useContext, useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data)
    navigate('/dash/users')
  }

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null)
    navigate('/', { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />
  }
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export const useAuth = () => {
  return useContext(AuthContext)
}
