import { Role } from '@/models'
import roles from './roles.mock.json'

class ApiClient {
  async getAllRoles(): Promise<Role[]> {
    return roles
  }
}

const apiClient = new ApiClient()

export default apiClient
