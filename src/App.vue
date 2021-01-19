<template>
  <div id="app">
    <navBar></navBar>
      <router-view
      :cart="cart"
      :cartQty="cartQty"
      :carTotal="carTotal"
      @delete="deleteItem"
      @add="addItem"
      ></router-view>
  </div>
</template>

<script>
import navBar from './components/navBar.vue';
import Price from './components/Price.vue';

export default {
  name: 'App',
  data: function(){
    return{
      cart:[]
    }
  },
  state: {
   localStorage: []
  },
  components: {
    navBar
  },
  computed:{
      cartQty: function(){
        let qty = 0;
        for (let key in this.cart){
          qty = qty + this.cart[key].qty;
        }
        return qty;
      },
      carTotal: function(){
        let sum = 0;
        for (let key in this.cart){
          // console.log(this.cart);
          sum = sum+(this.cart[key].product.retailPrice * this.cart[key].qty);
        }
        return sum;
      }
  },
  methods:{
    addItem: function(product){
      var whichProduct;

      var existing = this.cart.filter(function(item, index){
        if (item.product.name == product.name){
          whichProduct = index;
          return true;
        }else{
          return false;
        }
      });
      if (existing.length){
        this.cart[whichProduct].qty++;
      }else{
        this.cart.push({product: product, qty: 1});
      }
      if(localStorage.getItem('cart')){
        localStorage.removeItem(this.cart);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    deleteItem: function(id){
      if(this.cart[id].qty>1){
        this.cart[id].qty--;
        localStorage.removeItem(this.cart);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }else{
        this.cart.splice(id, 1);
        localStorage.removeItem(this.cart);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    setCart: function(){
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  },
 created: function(){
   if(localStorage.getItem('cart')){
     this.setCart()
   }  
 }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade-enter-active, .fade-leave-active{
  transition: all 1s ease-in-out;
}
</style>
