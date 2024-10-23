import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function Dash({ children }) {
  return (
    <>
      <h1>te damos la bievenida</h1>
      <nav>
        <h2>Dashboard</h2>
        <NavLink to="/dash/home">home</NavLink>
        <NavLink to="/dash/users">users</NavLink>
      </nav>
      {children}
    </>
  )
}

Dash.propTypes = {
  children: PropTypes.node
}

export default Dash
