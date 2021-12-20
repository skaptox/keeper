import apiClient from '@/client/api.client'
import { make } from 'vuex-pathify'
import { Dispatch, Commit } from 'vuex'
import { Role } from '@/models'
import Vue from 'vue'

interface State {
  roles: Role[]
  error: string
  loading: boolean
}

const state: State = {
  roles: [],
  error: '',
  loading: false,
}

const getters = {
  getRole:
    (state: State) =>
    (id: number): Role | undefined => {
      return state.roles.find((role) => role.id === id)
    },
}

const actions = {
  ...make.actions('roles'),
  loadRoles: async ({ dispatch }: { dispatch: Dispatch }): Promise<void> => {
    const data = await apiClient.getAllRoles()
    dispatch('setRoles', data)
  },

  addRole: async (
    { commit }: { commit: Commit },
    role: Role
  ): Promise<void> => {
    const data = await apiClient.addRole(role)
    commit('addRole', data)
  },

  deleteRole: async (
    { commit }: { commit: Commit },
    id: number
  ): Promise<void> => {
    await apiClient.deleteRole(id)
    commit('deleteRole', id)
  },

  updateRole: async (
    { commit }: { commit: Commit },
    role: Role
  ): Promise<void> => {
    const updateRole = await apiClient.updateRole(role)
    commit('updateRole', updateRole)
  },
}

const mutations = {
  ...make.mutations(state),
  addRole(state: State, role: Role): void {
    state.roles.unshift(role)
  },
  deleteRole(state: State, id: number): void {
    state.roles = state.roles.filter((role) => role.id !== id)
  },
  updateRole(state: State, updatedRole: Role): void {
    const index = state.roles.findIndex((role) => role.id === updatedRole.id)
    if (index !== -1) {
      Vue.set(state.roles, index, updatedRole)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
