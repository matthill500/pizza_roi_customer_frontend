<template>
  <nav class="navbar navbar-light fixed-top">
    <div class="navbar-text ml-auto d-flex">
      <div class="dropdown ml-2" >
      <button class="btn btn-success btn-sm dropdown-toggle" id="cartDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <span class="badge badge-pill badge-light">{{cartQty}}</span>
         <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
          <price :value="Number(carTotal)"></price>
      </button>

      <div class="dropdown-menu dropdown-menu-right"
      aria-labelledby="cartDropdown">
        <div v-for="(item, index) in cart" :key="index">
          <div class="dropdown-item-text text-nowrap text-right">
            <span class="badge badge-pill badge-warning align-text-top mr-1">{{item.qty}}</span>
            {{item.product.name}}
            <b><price :value="Number(item.qty * item.product.retailPrice)"></price></b>
            <a href="#" @click.stop="$parent.$emit('delete', index)" class="badge badge-danger text-white">-</a>
          </div>
        </div>
          <router-link class="btn btn-sm btn-outline-info text-dark float-right mr-4" to="/checkout">Checkout</router-link>
            <router-link to="/logout" class="nav-item nav-link btn btn-sm btn-primary text-light float-right mr-4" style=" width:77px; padding:5px;">Logout</router-link>
      </div>
    </div>
  </div>
  </nav>
</template>

<script>
import Price from "./Price.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default{
  name: "navBar",
  props: ["cart", "cartQty", "carTotal"],
  components:{
    FontAwesomeIcon,
    Price
  },
  methods:{

  }
}
</script>
