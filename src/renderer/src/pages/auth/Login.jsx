function Login() {
  const login = () => window.electron.ipcRenderer.send('login')

  return (
    <div className=" vh-100 bg-primary flex-column  justify-content-center aling-item-center">
      <div>
        <img src="././src/img/icon.png" className="rounded mx-auto d-block" alt="" />
      </div>
      <div className="container flex-fill">
        <div className="row">
          <div className="col">
            <img src="././src/img/imglogin.svg" width="80%" alt="" />
          </div>
          <div className="col order-5" width="100%">
            <form>
              <div className="mb-3">
                <label htmlFor="usuario" className=" text-white form-label ">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control focus-ring focus-ring-light "
                  id="usuario"
                  aria-describedby="usuarioHelp"
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
                  type="password"
                  className="form-control focus-ring focus-ring-light "
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label text-white" htmlFor="exampleCheck1">
                  Mostrar contraseña.
                </label>
              </div>
              <button type="submit" className="btn btn-danger" onClick={login}>
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
