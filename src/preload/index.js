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
  getMedicos: () => ipcRenderer.invoke('getMedicos'),
  createPhoto: (perfilId, photoBase64) =>
    ipcRenderer.invoke('createPhoto', { perfilId, photoBase64 }),
  getParamedicos: () => ipcRenderer.invoke('getParamedicos'),

  // Casos de uso para pacientes
  getPacientes: () => ipcRenderer.invoke('getPacientes'),
  getTrabajadores: () => ipcRenderer.invoke('getTrabajadores'),
  createPaciente: (data) => ipcRenderer.invoke('createPaciente', data),
  updatePaciente: (id, data) => ipcRenderer.invoke('updatePaciente', { id, data }),
  deletePaciente: (id) => ipcRenderer.invoke('deletePaciente', id),
  getPerfilPaciente: (id) => ipcRenderer.invoke('getPerfilPaciente', id),

  // Casos de uso para Roles
  getRoles: () => ipcRenderer.invoke('getRoles'),

  // Casos de uso para Entes
  getEntes: () => ipcRenderer.invoke('getEntes'),

  // Casos de uso para departamentos
  getDepartamentos: () => ipcRenderer.invoke('getDepartamentos'),

  // Casos de uso para Citas
  getCitasPacientes: () => ipcRenderer.invoke('getCitasPacientes'),
  createCita: (data) => ipcRenderer.invoke('createCita', data),
  validateCita: (data) => ipcRenderer.invoke('validateCita', data),
  deleteCita: (id) => ipcRenderer.invoke('deleteCita', id),
  updateCita: (id, data) => ipcRenderer.invoke('updateCita', { id, data }),
  getCitaPacientesMedico: (medicoId, departamentoId) =>
    ipcRenderer.invoke('getCitaPacientesMedico', { medicoId, departamentoId }),

  // Casos de uso para colaPacientes
  getColaPacientes: () => ipcRenderer.invoke('getColaPacientes'),
  createColaPaciente: (data) => ipcRenderer.invoke('createColaPacientes', data),
  getColaPacientesMedico: (medicoId, departamentoId) =>
    ipcRenderer.invoke('getColaPacientesMedico', { medicoId, departamentoId }),
  deleteColaPaciente: (id) => ipcRenderer.invoke('deleteColaPaciente', id),

  // Casos de uso para cronograma
  changeTurno: (horarioId) => ipcRenderer.invoke('changeTurno', horarioId),
  createHorario: (data) => ipcRenderer.invoke('createHorario', data),

  // Casos de uso para servicios
  cargarResultados: (data) => ipcRenderer.invoke('cargarResultados', data),

  // Casos de uso para inventario
  getArticulosAlmacen: () => ipcRenderer.invoke('getArticulosAlmacen'),
  getAlmacenes: () => ipcRenderer.invoke('getAlmacenes'),
  getArticulos: () => ipcRenderer.invoke('getArticulos'),
  createArticulo: (data) => ipcRenderer.invoke('createArticulo', data),
  createAlmacen: (data) => ipcRenderer.invoke('createAlmacen', data),
  cargarArticulo: (cantidad, data) => ipcRenderer.invoke('cargarArticulo', { cantidad, data }),
  retirarArticulo: (dataR, data) => ipcRenderer.invoke('retirarArticulo', { dataR, data }),
  deleteArticulo: (id) => ipcRenderer.invoke('deleteArticulo', id),
  getIngresosArticulo: (id) => ipcRenderer.invoke('getIngresosArticulo', id),
  getRetirosArticulo: (id) => ipcRenderer.invoke('getRetirosArticulo', id),

  //Casos de Uso para historias
  getHistoriasPacientes: () => ipcRenderer.invoke('getHistoriasPacientes'),
  createHistoria: (data, id, usuario) =>
    ipcRenderer.invoke('createHistoria', { data, id, usuario }),
  createHistorialAmbulancia: (data) => ipcRenderer.invoke('createHistorialAmbulancia', data),
  createHistoriaServicio: (data) => ipcRenderer.invoke('createHistoriaServicio', data)
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
