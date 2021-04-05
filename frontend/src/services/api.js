import axios from 'axios'

export const AUTHORIZATION = 'authorization'

export const api = axios.create({
  baseURL:  process.env.REACT_APP_BACKEND_DOMAIN,
})

export const authorize = (token) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
    localStorage.setItem(AUTHORIZATION, token)
  }
}

export const unauthorize = () => {
  delete api.defaults.headers.Authorization
  localStorage.removeItem(AUTHORIZATION)
}

authorize(localStorage.getItem(AUTHORIZATION))