<template>
  <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/products" class="navbar-brand">Pizza ROI</router-link>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <li v-if="!loggedIn"><router-link to="/login" class="nav-item nav-link">Login</router-link></li>
        <li v-if="!loggedIn"><router-link to="/register" class="nav-item nav-link">Register</router-link></li>
        <li v-if="loggedIn"><router-link to="/logout" class="nav-item nav-link">Logout</router-link></li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed :{
    loggedIn(){
      return this.$store.getters.loggedIn
    }
  }
}
</script>


<style>

</style>
