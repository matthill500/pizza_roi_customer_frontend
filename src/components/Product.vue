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
  props: [
    "pizzas",
    "sides",
    "deals",
    "maximum",
    "cart",
    "cartQty",
    "carTotal"
  ],
  components: {
    cartNav,
    ProductList,
    productNav
  }
}
</script>
