import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  //
  runSeeders: () => ipcRenderer.invoke('runSeeders'),

  // Casos de uso para la conexion
  checkConnection: () => ipcRenderer.invoke('checkConnection'),
  reloadApp: () => ipcRenderer.invoke('reloadApp'),
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
  createPacienteTrabajador: (data) => ipcRenderer.invoke('createPacienteTrabajador', data),
  createPacienteBeneficiario: (data) => ipcRenderer.invoke('createPacienteBeneficiario', data),
  deletePaciente: (id) => ipcRenderer.invoke('deletePaciente', id),
  getPacientes: () => ipcRenderer.invoke('getPacientes'),
  getTrabajadores: () => ipcRenderer.invoke('getTrabajadores'),
  updatePacienteTrabajador: (id, data) =>
    ipcRenderer.invoke('updatePacienteTrabajador', { id, data }),
  updatePacienteBeneficiario: (id, data) =>
    ipcRenderer.invoke('updatePacienteBeneficiario', { id, data }),

  // Casos de uso para Roles
  getRoles: () => ipcRenderer.invoke('getRoles'),

  // Casos de uso para Entes
  getEntes: () => ipcRenderer.invoke('getEntes'),
  // Casos de uso para departamentos
  getDepartamentos: () => ipcRenderer.invoke('getDepartamentos'),

  // Casos de uso para Citas
  getCitasPacientes: () => ipcRenderer.invoke('getCitasPacientes')
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
