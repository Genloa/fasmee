import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

// imagenes
import { NavLink } from 'react-router-dom'
import doctors from '../../assets/img/doctors.svg'
import fasmeeIcon from '../../assets/img/fasmee-icon.png'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()

    let message = await window.api.login(username, password)

    if (!message.error) {
      let user = message.user
      await login({ user })
      setShowAlert(false)
    }

    setMessage(message.message)
    setShowAlert(true)
  }

  return (
    <div className="vh-100 bg-primary flex-column  justify-content-center aling-item-center">
      <div className="pt-4">
        <img src={fasmeeIcon} className="rounded mx-auto d-block" alt="" />
      </div>
      <div className="container flex-fill">
        <div className="row">
          <div className="col">
            <img src={doctors} width="80%" alt="" />
          </div>

          <div className="col order-5" width="100%">
            <form onSubmit={handleLogin} className="pt-3">
              <div className="mb-3">
                <label htmlFor="usuario" className=" text-white form-label ">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control focus-ring focus-ring-light "
                  id="usuario"
                  aria-describedby="usuarioHelp"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div id="usuarioHelp" className="form-text text-white">
                  Primera letra de nombre y apellido.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-white">
                  Contraseña
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control focus-ring focus-ring-light "
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {showAlert && (
                <div className="alert alert-danger p-1" role="alert">
                  {message}
                </div>
              )}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label text-white" htmlFor="exampleCheck1">
                  Mostrar contraseña.
                </label>
              </div>
              <button type="submit" className="btn btn-danger">
                Ingresar
              </button>
              <NavLink to="/home" className="btn btn-primary">
                Home
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
