import apiClient from '@/client/api.client'
import { make } from 'vuex-pathify'
import { Dispatch } from 'vuex'

const state = {
  roles: [],
  error: '',
  loading: false,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions('roles'),
  loadRoles: async ({ dispatch }: { dispatch: Dispatch }): Promise<void> => {
    const data = await apiClient.getAllRoles()
    dispatch('setRoles', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
