<template>
  <div>
    <the-header />

    <h1>The Secure</h1>

    <button type="button" @click="simpleTest">Simple test - Look at the console</button>
  </div>
</template>
<script>
import TheHeader from '../components/TheHeader.vue';

export default {
  components: {
    TheHeader
  },

  methods : {
    // This is a simple test to check if authenticated api call works
    async simpleTest() {
      try {
        let result = await this.$store.dispatch('laravel/user');
        console.log(result);
      }
      catch (e) { console.log(e) } // In case something get wrong.
    },

 }
}
</script>
