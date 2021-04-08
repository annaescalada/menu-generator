import { api } from './api'

const recipesService = {
    getAllRecipes: () => api.get('/recipes'),

    create: (recipe) => api.post('/recipe', recipe),

    edit: (id, updates) => api.patch(`/recipe/${id}`, updates),

    delete: (id) => api.delete(`/recipe/${id}`)
}

export default recipesService