<template>
  <h5>You have Successfully logged out</h5>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('logout')
    .then(response => {
     this.$router.push('/home');
    })
  }
}
</script>


<style>

</style>
