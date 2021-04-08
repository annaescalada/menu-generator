import { api } from './api'

const ingredientsService = {
  getAllIngredients: () => api.get('/ingredients'),
  
  create: (ingredient) => api.post('/ingredient', ingredient),

  edit: (id, updates) => api.patch(`/ingredient/${id}`, updates),

  delete: (id) => api.delete(`/ingredient/${id}`)
}

export default ingredientsService