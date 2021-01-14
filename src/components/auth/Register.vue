<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="register">

      <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div> -->
    <div style="border:2px solid lightgrey;border-radius:10px; margin-bottom:1em;">
      <h3 style="padding:10px;">Personal Details</h3>
        <div class="form-group row">
          <label for="name" class="col-md-4 col-form-label text-md-right">First Name</label>
          <input type="text" name="first_name" id="first_name" class="login-input" v-model="first_name">
        </div>

        <div class="form-group row">
          <label for="name" class="col-md-4 col-form-label text-md-right">Last Name</label>
          <input type="text" name="last_name" id="last_name" class="login-input" v-model="last_name">
        </div>

        <div class="form-group row">
          <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
          <input type="text" name="email" id="email" class="login-input" v-model="email">
        </div>

        <div class="form-group row" style="">
          <label for="phone" class="col-md-4 col-form-label text-md-right">Phone Number</label>
          <input type="number" name="phone" id="phone" class="login-input" v-model="phone">
        </div>

        <div class="form-group row" style="margin-bottom:4em;">
          <label for="age" class="col-md-4 col-form-label text-md-right">Date of Birth</label>
          <input type="date" name="age" id="age" class="login-input" style="width:204px;" v-model="age">
        </div>

      </div>

      <div style="border:2px solid lightgrey;border-radius:10px; margin-bottom:1em;">
        <h3 style="padding:10px;">Address</h3>
        <div class="form-group row" style="margin-bottom:-1.5em; margin-left:10em;">
            <vue-google-autocomplete
                id="map"
                classname="form-control"
                placeholder="Address Search"
                v-on:placechanged="getAddressData"
                :country="'IE'"
                style="border:1px solid grey; width:58%; "
            >
            </vue-google-autocomplete>
         </div>
      
         <div class="form-group row">
              <label for="number" class="col-md-4 col-form-label text-md-right"> Home Number </label>
                  <input type="text" name="number" id="number" class="login-input"  v-model="number">
         </div>
    
         <div class="form-group row">
              <label for="roadOrStreet" class="col-md-4 col-form-label text-md-right"> Road or Street </label>
                  <input type="text" name="roadOrStreet" id="roadOrStreet" class="login-input"  v-model="roadOrStreet">
         </div>

         <div class="form-group row">
              <label for="area" class="col-md-4 col-form-label text-md-right"> Area </label>
                  <input type="text" name="area" id="area" class="login-input"  v-model="area">
         </div>

         <div class="form-group row">
              <label for="eircode" class="col-md-4 col-form-label text-md-right"> Eircode </label>
                  <input type="text" name="eircode" id="eircode" class="login-input"  v-model="eircode">
         </div>
      </div>

     <div style="border:2px solid lightgrey;border-radius:10px; margin-bottom:1em;">
          <h3 style="padding:10px;">Password</h3>
      <div class="form-group row mb-more">
        <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>
  </div>
      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>
    

    </form>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
     components: { VueGoogleAutocomplete },
  data(){
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      age: '',
      number: '',
      roadOrStreet: '',
      area: '',
      eircode: '',
      password: ''
    }
  },
  methods:{
    register(){
      this.$store.dispatch('register', {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        age: this.age,
        number: this.number,
        roadOrStreet: this.roadOrStreet,
        area: this.area,
        eircode: this.eircode,
        password: this.password
      })
      .then(response => {
       this.$router.push('/login');
      })
    },
    getAddressData: function (addressData, placeResultData, id) {
        this.number = addressData.street_number;
        this.roadOrStreet = addressData.route;
        this.area = addressData.locality;
        this.eircode = addressData.postal_code;
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
