<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <the-toastr />
    </v-main>
  </v-app>
</template>

<script>
import TheToastr from '@/components/shared/TheToastr.vue';

export default {
  components: {
    TheToastr,
  },
  mounted() {
    console.log(this.$vuetify);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
