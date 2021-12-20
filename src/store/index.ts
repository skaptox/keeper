import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import roles from './roles'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [pathify.plugin], // activate plugin
  modules: {
    roles,
  },
})
