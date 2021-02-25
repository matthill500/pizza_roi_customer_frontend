<template>
  <div class="container">
    <h1>Checkout</h1>
    <table class="table table-hover" v-if="cart.length">
      <caption class="text-right h3">
        <b>Total:</b>
        <price class="d-block text-success font-weight-light" :value="Number(carTotal)"></price>
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Item</th>
          <th scope="col" class="text-center">Qty</th>
          <th scope="col" class="text-right">Price</th>
          <th scope="col" class="text-right">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.product.id">
          <td class="text-center">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button @click="$emit('add', item.product)" class="btn btn-info">+</button>
              <button @click="$emit('delete', index)" class="btn btn-outline-info">-</button>
            </div>
          </td>
          <th scope="row">{{item.product.name}}</th>
          <td class="text-center">{{item.qty}}</td>
          <td class="text-right">{{Number(item.product.retailPrice)}}</td>
          <td class="text-right">{{Number(item.qty * item.product.retailPrice)}}</td>
        </tr>
      </tbody>
    </table>

<div v-if="locations && locations.length > 0">
  <div v-for="(item, index) in newShops" :key="index">    
     <p>{{item.name}} is {{item.distance.text}} away </p>
  </div>
</div>

    <place-order :cart="cart" :carTotal="carTotal" :shopId="shopId"></place-order>


    <router-link class="btn btn-sm btn-outline-info text-dark" style="margin-top:10px" to="/products">Keep Shopping</router-link>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios'
import Price from "./Price.vue";
import PlaceOrder from './placeOrder.vue'
import {mapGetters} from 'vuex'




export default{
  name: "checkout",
  props: ["cart", "carTotal"],  
  data: () => {
    return {
      locations: [],
      shopId: null,
      newShops: []
    }
  },
  components:{
    Price,
    PlaceOrder
  },
   computed:{
      ...mapGetters({
       shops: 'shops',
       user: 'user'
     })
  },
  methods:{
    calcDist() {
      let app = this;

      const shops = this.shops.shops;

      // console.log(shops);

      let customerEircode = this.user.userEircode+', Ireland';

      const eircodes = [];

      for(let i = 0; i<shops.length; i++){
          eircodes.push(shops[i].eircode);
        }

      const newEircodes = eircodes.map(eircode => eircode+', Ireland');

      var service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [customerEircode],
          destinations: newEircodes,
          travelMode: 'DRIVING'
        }, callback);

      function callback(response, status) {
       if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        var distances = response.rows;

        app.locations = distances[0].elements

        const arr = [];

        for(let i = 0; i<app.locations.length; i++){
          arr.push(app.locations[i].distance.value);
        }
        arr.sort(function(a, b){return a-b})

        const shortestDistance = arr[0];

        // console.log(shortestDistance);

        // console.log(app.locations);

        const newArr = _.merge(shops, app.locations);

        // console.log(newArr);

        app.newShops = newArr;

        let minDistance = Math.min.apply(Math, newArr.map(function(o) {  return o.distance.value; }))

        for(let i = 0; i<newArr.length; i++){
          if(newArr[i].distance.value === minDistance){
             app.shopId = shops[i].id;
            }
          }
        }
      }
    }
  },
  beforeMount() {
      // this.calcDist();
  }

}
</script>

<style>

</style>
