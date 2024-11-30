<template>
  <div class="hello">
    <h1>Teste pratico QuiteJa</h1>
    <p>Para mais informações do teste, consulte o README.MD do projeto</p>
    <h2>Links importantes</h2>
    <ul class="d-flex align-center justify-center">
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>

      <li>
        <a
          href="https://vuetifyjs.com/en/getting-started/installation/"
          target="_blank"
          rel="noopener"
          >vuetify</a
        >
      </li>
    </ul>
    <v-btn color="primary" dark to="/usuarios">
      Ir para a página de usuários
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
