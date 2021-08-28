import { api } from '../../services/api'

const ingredientsService = {
  create: (ingredient) => api.post('/ingredient', ingredient),

  edit: (id, updates) => api.patch(`/ingredient/${id}`, updates),

  delete: (id) => api.delete(`/ingredient/${id}`),

  getAllIngredients: () => api.get('/ingredients'),
}

export default ingredientsService