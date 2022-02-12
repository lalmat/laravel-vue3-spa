<template>
  <div>
    <h2>The Header</h2>
    <ul>
      <li><router-link to="/secure">Secure</router-link></li>
      <li><router-link to="/admin">Admin</router-link></li>
    </ul>
    &nbsp;
    <button type="button" @click="logout"> {{ $t('bt.logout') }}</button>
    <hr />
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('laravel/logout');
        this.$router.push('/login');
      }
      catch (e) { console.log(e) }
    }
  }
}
</script>
