import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  // Casos de uso para la authentication
  login: (username, password) => ipcRenderer.invoke('login', { username, password }),

  // Casos de uso para CRUD de usuarios
  getUsuarios: () => ipcRenderer.invoke('getUsuarios'),
  createUsuario: (data) => ipcRenderer.invoke('createUsuario', data),
  updateUsuario: (data) => ipcRenderer.invoke('updateUsuario', data),
  deleteUsuario: (id) => ipcRenderer.invoke('deleteUsuario', id),
  // Casos de uso para pacientes
  createPaciente: (data) => ipcRenderer.invoke('createPaciente', data),
  // Casos de uso para Roles
  getRoles: () => ipcRenderer.invoke('getRoles')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
