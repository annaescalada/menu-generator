import { api } from './api'

const ingredientsService = {
  create: (ingredient) => api.post('/ingredient', ingredient),

  getAllIngredients: () => api.get('/ingredients'),

  edit: (id, updates) => api.patch(`/ingredient/${id}`, updates),

  delete: (id) => api.delete(`/ingredient/${id}`)
}

export default ingredientsService