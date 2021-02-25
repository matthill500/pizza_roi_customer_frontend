<template>
  <span>
    <div class="cardContainer">
      <div ref="card" class="cardElement">
      </div>
      <div v-if="intent">
        <br />
          <p v-if='error'>{{error}}</p>
          <button v-on:click="purchase" id="submit" class="bx--btn bx--btn--lg bx--btn--primary">Purchase</button>
        <br />
      </div>


    </div>
  </span>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  let style = {
    base: {
      border: '1px solid #D8D8D8',
      borderRadius: '4px',
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4"
      },
    },

    invalid: {
      // All of the error styles go inside of here.
      color: "#9e2146"
    }

  };
  let stripe = window.Stripe('pk_test_51HZJRJHGnwn9QTtgoNljmC0qa2lraxKcoQzLBmQgTa2QtQocjW9rCdlWMzvhnLqXevwa0wfJOr9QT3QXrdbHmjb2005YVkhduP'),
    elements = stripe.elements(),
    card = undefined;

  export default {
    props: [
      'cart',
      'carTotal',
      'shopId'
  ],
    data() {
      return {
        error: null,
        intent: null,
        token: null
      }
    },
    components: {

    },
    computed:{
      ...mapGetters({
       user: 'user'
     })
    },
    methods: {
      purchase(){
        stripe.handleCardSetup(
          this.intent.client_secret,
          card,
          {
            payment_method_data:{
              billing_details: { name: `${this.user.first_name} ${this.user.last_name}`}
            }
          }
        ).then(result => {
          if(result.error){
            this.error = result.error.message
            return
          }else if(result.setupIntent.status !== "succeeded"){
            console.log('error!', result)
            return
          }
      
          this.error = null;
          this.token = result.setupIntent.payment_method
          console.log(JSON.stringify(this.cart));
          axios.post('/orders',{
            price: this.carTotal,
            shop_id:  1,
            customer_id: this.user.customer_id,
            token: this.token,
            user_id: this.user.user_id,
            cart: this.cart,
            status: 'confirmed'
          })
            .then(response => {
              if(response.data.status !== 'success') {
                this.error = result.error.message
                return
              }else if(response.data.status === 'success'){
                axios.post('/IdealStock',{
                  cart: this.cart
                })
                .then(response => {
                 console.log(response);
                  })
              }
              this.$router.push({
                path: '/success'
              })
              localStorage.removeItem('cart');
              this.cart = null;
            })
        })
      }
    },
    mounted() {
      axios.get('/user/setup-intent/'+parseInt(this.user.user_id))
        .then(response => {
          if(response.data.status !== 'success') {
             console.log('error!', response.data)
            return
          }
          this.intent = response.data.intent
          card = elements.create('card', style);
          card.mount(this.$refs.card);
        })
    },
    beforeDestroy() {
      card.destroy(this.$refs.card)
      card = null
    },
    
  }
</script>

<style scoped>

  .cardElement {
    display: block;
    margin: 24px auto 10px auto;
    max-width: 408px;
    padding: 10px 14px;
    box-shadow:
      rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border-radius: 4px;
    background: white
  }
</style>
