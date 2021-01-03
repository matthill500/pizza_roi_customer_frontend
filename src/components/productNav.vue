<template>
  <nav class="navbar navbar-default">
      <div class="container row-12">
        <div class="col-4 float-left block">
          <a href="#pizzas"><h3>Pizzas</h3></a>
        </div>
        <div class="col-4 float-left block">
          <a href="#" v-scroll-to="'#sides'"><h3>Sides</h3></a>
       </div>
       <div class="col-4 float-left block">
         <a href="#deals"><h3>Deals</h3></a>
      </div>
      </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
a{
  color:black;
  text-decoration: none;
}
a:hover{
 color:white;
  }

.block{
border:0.5px solid black;
background-color:white;
}

.block {
    pointer-events: none;
}
.block > a {
    pointer-events: auto;
}
.block:hover {
    background: #8b0000;
    color:white;
}

</style>
