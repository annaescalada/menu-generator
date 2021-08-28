import { api } from '../../services/api'

const menuService = {
  getAllMenus: () => api.get('/menus'),

  getMenu: (id) => api.get(`/menu/${id}`),
  
  create: (menu) => api.post('/menu', menu),

  edit: (id, updates) => api.patch(`/menu/${id}`, updates),

  delete: (id) => api.delete(`/menu/${id}`)
}

export default menuService