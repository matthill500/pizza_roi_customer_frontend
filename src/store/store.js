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
      user_id: null,
      customer_id: null,
      shops: [],
      userEircode: null
  },
  getters:{
    loggedIn(state){
       return state.token !== null
    },
    user(state){
      return {
        first_name: state.first_name,
        last_name: state.last_name,
        user_id: state.user_id,
        customer_id: state.customer_id,
        userEircode: state.userEircode
      }
    },
    shops(state){
      return {
        shops: state.shops
      }
    }
  },
  mutations:{
    retrieveToken(state, data){
      state.token = data.token
      state.first_name = data.first_name
      state.last_name = data.last_name
      state.user_id = data.id
    },
    setUser(state, data){
      state.first_name = data.user.first_name
      state.last_name = data.user.last_name
      state.user_id = data.user.id
      state.customer_id = data.customer.id
      state.userEircode = data.customerAddress.eircode
    },
    setShops(state, shops){
      state.shops = shops
      // console.log(state.shopEircodes)
    },
    destroyToken(state){
      state.token = null
    }
  },
  actions:{
    getShopEircodes(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/shops')
          .then(response => {
            const shops = response.data.data
          //  console.log(shops);
            // const eircodes = shops.map(shop => (shop.eircode))
            // console.log(eircodes);
            context.commit('setShops', shops)
            resolve(response)
            // console.log(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    register(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          age: data.age,
          phone: data.phone,
          number: data.number,
          roadOrStreet: data.roadOrStreet,
          area: data.area,
          eircode: data.eircode,
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
            //  console.log(response.data);
            // const token = response.data.token
            // localStorage.setItem('token', token)
            context.commit('setUser', response.data)
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

      // if(context.getters.loggedIn){
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
      // }
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
