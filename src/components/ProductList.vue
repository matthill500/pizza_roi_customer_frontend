<template>
  <div class="container">
    <h2 style="padding:10px;">Pizzas</h2>
      <div id="pizzas" class="h-100 d-inline-block" style="margin-left:50px">
           <div class="card float-left" style="margin-left:25px; margin-top:25px; width: 18rem;" v-for="(item) in pizzas" :key="item.id">
            <img class="card-img-top" :src="'http://127.0.0.1:8000/'+ item.image" :alt="item.name">
            <div class="card-body">
              <h5 class="card-title">{{item.name}}</h5>
              <p class="card-text">{{item.size}}</p>
              <price :value="Number(item.retailPrice)">
             </price>
                <button class="btn btn-info" style="margin-left:8px;" @click="$parent.$emit('add', item)">+</button>
            </div>
          </div>
        </div>

        <h2 style="padding:10px;">Sides</h2>
        <div class="h-100 d-inline-block" id="sides" style="margin-left:50px">
             <div class="card float-left" style="margin-left:25px; margin-top:25px; width: 18rem;" v-for="(item) in sides" :key="item.id">
              <img class="card-img-top" :src="'http://127.0.0.1:8000/'+ item.image" :alt="item.name">
              <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>
                <price :value="Number(item.retailPrice)">
               </price>
                  <button class="btn btn-info" style="margin-left:8px;" @click="$parent.$emit('add', item)">+</button>
              </div>
            </div>
          </div>

          <h2 style="padding:10px;">Deals</h2>
          <div class="h-100 d-inline-block" id="deals" style="margin-left:50px">
               <div class="card float-left" style="margin-left:25px; margin-top:25px; width: 18rem;" v-for="(item) in deals" :key="item.id">
                <img class="card-img-top" :src="'http://127.0.0.1:8000/'+ item.image" :alt="item.name">
                <div class="card-body">
                  <h5 class="card-title">{{item.name}}</h5>
                  <price :value="Number(item.retailPrice)">
                 </price>
                  <button class="btn btn-info" style="margin-left:8px;" @click="$parent.$emit('add', item)">+</button>
              </div>
            </div>
  </div>
</div>
</template>

<script>
import Price from './Price.vue';

export default{
  name: 'productList',
  components: {Price},
  props: ["pizzas", "sides", "deals"]
}
</script>
