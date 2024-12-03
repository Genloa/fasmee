import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  // Casos de uso para la conexion
  checkConnection: () => ipcRenderer.invoke('checkConnection'),
  testConnection: (data) => ipcRenderer.invoke('testConnection', data),

  // Casos de uso para la authentication
  login: (username, password) => ipcRenderer.invoke('login', { username, password }),

  // Casos de uso para usuarios
  getUsuarios: () => ipcRenderer.invoke('getUsuarios'),
  createUsuario: (data) => ipcRenderer.invoke('createUsuario', data),
  updateUsuario: (id, data) => ipcRenderer.invoke('updateUsuario', { id, data }),
  deleteUsuario: (id) => ipcRenderer.invoke('deleteUsuario', id),
  updateUserRol: (perfilId, rolId) => ipcRenderer.invoke('updateUserRol', { perfilId, rolId }),
  // Casos de uso para pacientes
  createPaciente: (data) => ipcRenderer.invoke('createPaciente', data),
  deletePaciente: (id) => ipcRenderer.invoke('deletePaciente', id),

  // Casos de uso para Roles
  getRoles: () => ipcRenderer.invoke('getRoles'),

  // Casos de uso para Entes
  getEntes: () => ipcRenderer.invoke('getEntes')
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
