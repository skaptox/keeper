import User from './User'

export default interface Role {
  id: number
  name: string
  type: string
  description: string
  editable: boolean
  active: boolean
  users: User[]
  created_on: string
  modified_on: string
}
