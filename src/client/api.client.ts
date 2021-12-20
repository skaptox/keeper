import { Role } from '@/models'
import roles from './roles.mock.json'

class ApiClient {
  async getAllRoles(): Promise<Role[]> {
    return roles
  }
  async addRole(role: Role): Promise<Role> {
    return {
      ...role,
      id: Math.floor(Math.random() * 100),
      created_on: new Date().toISOString(),
      modified_on: new Date().toISOString(),
      users: [],
    }
  }

  async deleteRole(id: number): Promise<unknown> {
    console.log('deleteRole', id)
    return true
  }
  async updateRole(role: Role): Promise<Role> {
    return role
  }
}

const apiClient = new ApiClient()

export default apiClient
