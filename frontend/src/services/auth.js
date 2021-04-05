import { api } from './api'

const authService = {
  login: (user) => api.post('/users/login', user),

  logout: () => api.post('/users/logout'),

  me: () => api.get('/users/me'),
}

export default authService
