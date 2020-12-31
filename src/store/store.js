import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export const store = new Vuex.Store({
  state:{
    token: localStorage.getItem('token') || null
  },
  getters:{
    loggedIn(state){
      return state.token !== null
    }
  },
  mutations:{
    retrieveToken(state, token){
      state.token = token
    },
    destroyToken(state){
      state.token = null
    }
  },
  actions:{
    register(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
        })
          .then(response => {
            resolve(response)
            // console.log(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    login(context, credentials){
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.token
            localStorage.setItem('token', token)
            context.commit('retrieveToken', token)
            resolve(response)
            // console.log(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    logout(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.token

      if(context.getters.loggedIn){
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              resolve(response)
              // console.log(response)
            })
            .catch(error => {
              localStorage.removeItem('token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    }
  }
})
