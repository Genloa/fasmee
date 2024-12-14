import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'

import file from './services/fileService'
file.init()

function createWindow() {
  // Crear la ventana del navegador.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.maximize()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR para el renderizador basado en electron-vite cli.
  // Cargar la URL remota para desarrollo o el archivo html local para producción.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Este método se llamará cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs solo se pueden usar después de que ocurra este evento.
app.whenReady().then(() => {
  // Establecer el id del modelo de usuario de la aplicación para Windows
  electronApp.setAppUserModelId('com.electron')

  // Abrir o cerrar DevTools por defecto con F12 en desarrollo
  // e ignorar CommandOrControl + R en producción.
  // ver https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Salir cuando todas las ventanas estén cerradas, excepto en macOS. Allí, es común
// que las aplicaciones y su barra de menú permanezcan activas hasta que el usuario salga
// explícitamente con Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// En este archivo puedes incluir el resto del código específico del proceso principal de tu aplicación.
// También puedes ponerlos en archivos separados y requerirlos aquí.

// Módulos

import './modules/auth/auth'
import './modules/connection/connection'
import './modules/entes/entes'
import './modules/pacientes/pacientes'
import './modules/roles/roles'
import './modules/usuarios/usuarios'
