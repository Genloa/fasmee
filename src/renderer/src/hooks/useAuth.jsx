import PropTypes from 'prop-types'
import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useLocalStorage('session', null)
  const navigate = useNavigate()

  const login = async (data) => {
    setSession(data)
    navigate('/home')
  }

  const logout = () => {
    setSession(null)
    navigate('/', { replace: true })
  }

  const value = useMemo(
    () => ({
      session,
      login,
      logout
    }),
    [session]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useAuth = () => {
  return useContext(AuthContext)
}
