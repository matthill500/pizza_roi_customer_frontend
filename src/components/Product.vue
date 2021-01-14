<template>
  <div>
    <productNav></productNav>
    <cartNav
    :cart="cart"
    :cartQty="cartQty"
    :carTotal="carTotal"
    ></cartNav>
    <productList :pizzas="pizzas" :deals="deals" :sides="sides"></productList>
  </div>
</template>

<script>
import cartNav from './cartNav.vue';
import productNav from './productNav.vue';

import ProductList from './ProductList.vue';

export default{
  name: 'products',
  data: function(){
    return{
      pizzas: null,
      sides: null,
      deals: null,
      shops: null
    }
  },
  props: [
    "cart",
    "cartQty",
    "carTotal"
  ],
  components: {
    cartNav,
    ProductList,
    productNav
  },
  created(){
    this.$store.dispatch('getPizzas')
    .then(response => {
      this.pizzas = response.data.data
    });
    this.$store.dispatch('getSides')
    .then(response => {
      this.sides = response.data.data
    });
    this.$store.dispatch('getDeal')
    .then(response => {
      this.deals = response.data.data
    });
    this.$store.dispatch('getShopEircodes')
    .then(response => {
      this.shops = response.data.data
    });
  },
}
</script>
