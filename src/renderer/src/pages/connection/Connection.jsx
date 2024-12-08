import { zodResolver } from '@hookform/resolvers/zod'
import { Toast } from 'bootstrap'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import connectionSchema from '../../validations/connectionSchema'

const Connection = () => {
  const [toastMessage, setToastMessage] = useState('')

  const [showToast, setShowToast] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      username: 'postgres',
      password: '27598704.Con',
      database: 'fasmee1',
      host: 'localhost',
      port: '5432',
      schema: 'public'
    }
  })

  // async function checkConnection() {
  //   let result = await window.api.checkConnection()
  //   if (result) {
  //     Navigate('/home')
  //   }
  // }

  // checkConnection()

  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById('liveToast')
      const toast = new Toast(toastEl)
      toast.show()
    }
  }, [showToast])

  const onSubmit = async (data) => {
    setShowToast(false)
    let success = await window.api.testConnection(data)
    if (success) {
      setToastMessage('Conexión exitosa')
    } else {
      setToastMessage('No se pudo conectar a la base de datos')
    }
    setShowToast(true)
  }

  return (
    <div className="container">
      <h1 className="text-center">Te damos la bienvenida</h1>
      <h4>Por favor ingresa las credenciales de tu base de datos Postgre SLQ</h4>
      <img src="../../assets/img/imglogin.svg" alt="" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row row-cols-2">
          <div className="col">
            <label className="form-label">Base de datos</label>
            <input
              type="text"
              className={`form-control ${errors.database ? 'is-invalid' : ''}`}
              placeholder="Nombre de la base de datos"
              {...register('database')}
            />
            <small className="text-danger">{errors.database?.message}</small>
          </div>
          <div className="col">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Nombre de usuario"
              {...register('username')}
            />
            <small className="text-danger">{errors.username?.message}</small>
          </div>

          <div className="col">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Contraseña"
              {...register('password')}
            />
            <small className="text-danger">{errors.password?.message}</small>
          </div>

          <div className="col">
            <label className="form-label">Host</label>
            <input
              type="text"
              className={`form-control ${errors.host ? 'is-invalid' : ''}`}
              placeholder="Host"
              {...register('host')}
            />
            <small className="text-danger">{errors.host?.message}</small>
          </div>

          <div className="col">
            <label className="form-label">Puerto</label>
            <input
              type="number"
              className={`form-control ${errors.port ? 'is-invalid' : ''}`}
              placeholder="Puerto"
              {...register('port')}
            />
            <small className="text-danger">{errors.port?.message}</small>
          </div>

          <div className="col">
            <label className="form-label">Esquema</label>
            <input
              type="text"
              className={`form-control ${errors.schema ? 'is-invalid' : ''}`}
              placeholder="Esquema"
              {...register('schema')}
            />
            <small className="text-danger">{errors.schema?.message}</small>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Conectar
        </button>
      </form>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Fasmee</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </div>
  )
}

export default Connection
