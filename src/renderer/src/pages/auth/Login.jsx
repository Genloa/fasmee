
function Login() {
  return < div className=" vh-100 bg-primary flex-column  justify-content-center aling-item-center" >
  <div >
  <img src="././src/img/icon.png" className="rounded mx-auto d-block"  alt="" />
  </div > 
   <div className="container flex-fill">
   <div className="row">
   <div class="col">
   <img src="././src/img/imglogin.svg" width="80%" alt="" />
    </div>
    <div class="col order-5"  width="100%">
    <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className=" text-white form-label ">Usuario</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label text-white">Contraseña</label>
            <input type="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label text-white" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-danger">Ingresar</button>
        </form>
    </div>

    </div>
   </div>
  </div>
}

export default Login
