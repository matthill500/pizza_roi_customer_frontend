<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="register">

      <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div> -->

      <div class="form-control">
        <label for="name">First Name</label>
        <input type="text" name="first_name" id="first_name" class="login-input" v-model="first_name">
      </div>

      <div class="form-control">
        <label for="name">Last Name</label>
        <input type="text" name="last_name" id="last_name" class="login-input" v-model="last_name">
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" class="login-input" v-model="email">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods:{
    register(){
      this.$store.dispatch('register', {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      })
      .then(response => {
       this.$router.push('/login');
      })
    }
  }
}
</script>


<style>
label{
  display: block;
  margin-bottom: 17px;
}
.login-heading {
  margin-bottom: 16px;
}
.form-control {
  margin-bottom: 39px;
  border:0px;
}
.mb-more {
  margin-bottom: 49px;
}
.login-form {
  max-width: 500px;
  margin: auto;
}

.btn-submit {
  margin-top:8px;
  width: 80%;
  padding: 6px 4px;
  font-size: 16px;
  font-weight: bold;
  background: #60BD4F;
  color: white;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: darken(#60BD4F, 10%);
  }

  &:disabled {
    background: lighten(#60BD4F, 25%);
    cursor: not-allowed;
  }

}

</style>
