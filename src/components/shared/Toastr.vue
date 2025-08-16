<template>
    <v-snackbar
      :value="show"
      :color="color"
      @input="hide"
      :timeout="3000"
      top
      right
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="hide"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    name: 'TheToastr',
    computed: {
      ...mapState('toastr', ['text', 'color', 'show']),
    },
    methods: {
      ...mapMutations('toastr', ['HIDE_TOASTR']),
      hide() {
        this.HIDE_TOASTR();
      },
    },
  };
  </script>