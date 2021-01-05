import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export const store = new Vuex.Store({
  state:{
    token: localStorage.getItem('token') || null,
    pizzas: [],
      first_name: null,
      last_name: null,
      id: null
  },
  getters:{
    loggedIn(state){
       return state.token !== null
    },
    user(state){
      return {
        first_name: state.first_name,
        last_name: state.last_name,
        id: state.id,
      }
    }
  },
  mutations:{
    retrieveToken(state, data){
      state.token = data.token
      state.first_name = data.first_name
      state.last_name = data.last_name
      state.id = data.id
    },
    setUser(state, user){
      // console.log(user, 'test');
      state.first_name = user.first_name
      state.last_name = user.last_name
      state.id = user.id
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
    getUser(context, token){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      return new Promise((resolve, reject) => {
        axios.get('/user')
          .then(response => {
            // console.log(response);
            // const token = response.data.token
            // localStorage.setItem('token', token)
            context.commit('setUser', response.data.user)
            // resolve(true)
            // console.log(response)
          })
          .catch(error => {
            console.log(error)
            // reject(false)
          })
          .finally(() => {
            resolve(true)
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
            context.commit('retrieveToken', response.data)
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
    },
    getDeal(context, id){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.token
      if(context.getters.loggedIn){
        return new Promise((resolve, reject) => {
          axios.get('/deals')
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    getPizzas(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.token

      if(context.getters.loggedIn){
        return new Promise((resolve, reject) => {
          axios.get('/pizzas')
            .then(response => {
              resolve(response)
              // console.log(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    getSides(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.token

      if(context.getters.loggedIn){
        return new Promise((resolve, reject) => {
          axios.get('/sides')
            .then(response => {
              resolve(response)
              // console.log(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    }
  }
})
