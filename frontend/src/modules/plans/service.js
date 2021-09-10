import { api } from "../../services/api";

const planService = {
  getAllPlans: () => api.get('/plans'),

  getPlan: (id) => api.get(`/plan/${id}`),
  
  create: (plan) => api.post('/plan', plan),

  edit: (id, updates) => api.patch(`/plan/${id}`, updates),

  delete: (id) => api.delete(`/plan/${id}`)
}

export default planService