import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()

    let user = await window.api.login(username, password)

    if (user !== null && username === user.username && password === user.password) {
      // Replace with actual authentication logic
      await login({ username })
      setShowAlert(false);
    } else {
      setShowAlert(true);

    }
  }

  return (
    <div className="vh-100 bg-primary flex-column  justify-content-center aling-item-center">
      <div className='pt-4'>
        <img src="././src/img/icon.png" className="rounded mx-auto d-block" alt="" />
      </div>
      <div className="container flex-fill">
        <div className="row ">
          <div className="col">
            <img src="././src/img/imglogin.svg" width="80%" alt="" />
          </div>
          
          <div className="col order-5" width="100%">
            <form onSubmit={handleLogin} className='pt-3'>
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
                      Usuario o Contraseña invalidos
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
