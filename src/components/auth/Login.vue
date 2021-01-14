<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">

      <div class="form-control mb-more">
        <label for="email">Username/Email</label>
        <input type="email" name="email" id="email" class="login-input" v-model="email">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">
          Login
        </button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login(){
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
       this.$router.push('/products');
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
