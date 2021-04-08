import { api } from './api'

const patientService = {
  getAllPatients: () => api.get('/patients'),

  getPatient: (id) => api.get(`/patient/${id}`),
  
  create: (patient) => api.post('/patient', patient),

  edit: (id, updates) => api.patch(`/patient/${id}`, updates),

  delete: (id) => api.delete(`/patient/${id}`),

  createCheck: (check) => api.post('/patient/check', check),

  editCheck: (id, updates) => api.patch(`/patient/check/${id}`, updates),

  deleteCheck: (id) => api.delete(`/patient/check/${id}`),
}

export default patientService