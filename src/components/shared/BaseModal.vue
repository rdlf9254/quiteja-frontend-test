<template>
    <v-dialog
      :value="show"
      @click:outside="onClose"
      @keydown.esc="onClose"
      :max-width="maxWidth"
      persistent
    >
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>
  
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="actions"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'BaseModal',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      maxWidth: {
        type: String,
        default: '600px',
      },
    },
    methods: {
      onClose() {
        this.$emit('close');
      },
    },
  };
  </script>