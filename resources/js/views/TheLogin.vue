<template>
  <div>
    <h1>The Login</h1>

    <p>
      {{ $t('generic.email') }} : <br>
      <input type="text" name="email" v-model="email">
    </p>

    <p>
      {{ $t('generic.password') }} : <br>
      <input type="password" name="password" v-model="password">
    </p>

    <p v-show="errorMessage">
      Oups: {{errorMessage}}
    </p>

    <button type="button" @click="login"> {{ $t('bt.login') }}</button>
    &nbsp;
    <router-link to="/secure">Try to go to Secure Page</router-link>

  </div>
</template>
<script>
export default {

  // BeforeRouteEnter is trigged every time the component is shown.
  // Very usefull to refresh data when user refresh the component.
  beforeRouteEnter (to, from, next) {
    next(async vm =>  {
      try {
        await vm.$store.dispatch('laravel/session') // Is user looged ?
        vm.$router.push({path: '/secure'});         // If no error has been thrown then it's a logged user.
      }
      catch (e) {} // Silence error
    })
  },

  data() {
    return {
      errorMessage : '',
      email    : 'lalmat@test.com',
      password : 'password',
    }
  },

  methods: {
    async login() {
      try {
        await this.$store.dispatch('laravel/login', {email: this.email, password: this.password}) // Login user with credentials
        this.$router.push('/secure');                                                             // If no error has been thrown then it's a logged user.
      }
      catch (e) {
        console.log(e);                                    // Dump error in console
        this.errorMessage = e.message;                     // Show error message
        setTimeout( () => {this.errorMessage = ''}, 3000); // Hide error message after 3sec.
      }
    },
  }
}
</script>
