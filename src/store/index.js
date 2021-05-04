import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // URLapi: 'http://mystore.test/api/',
    URLapi: 'https://nameless-savannah-27479.herokuapp.com/api/',
    axiosConfig: {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  methods: {
    
  },
})
