import { api } from './api'

const sharedService = {
  getEnums: () => api.get('/enums'), 
}

export default sharedService