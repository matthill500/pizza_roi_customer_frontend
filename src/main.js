import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

import { store } from './store/store'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import {library} from "@fortawesome/fontawesome-svg-core";
import "animate.css/animate.css";

import {
  faShoppingCart,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faDollarSign);

import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import Home from "./components/Home.vue";
import Product from "./components/Product.vue";
import Logout from "./components/auth/Logout.vue";
import Checkout from "./components/Checkout.vue";

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)

Vue.use(VueRouter);
Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  routes: [
  {
    path: "*",
    component: Home
  },
  {
    path: "/login",
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: "/register",
    component: Register,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: "/logout",
    component: Logout
  },
  {
    path: "/products",
    component: Product,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
    }
  }

 ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        path: '/products',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount('#app')
