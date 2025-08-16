<template>
    <base-modal
      :show="show"
      :title="title"
      @close="onClose"
      max-width="500px"
    >
      <template #content>
        <p>{{ message }}</p>
      </template>
  
      <template #actions>
        <v-btn text @click="onClose">{{ cancelText }}</v-btn>
        <v-btn :color="confirmColor" text @click="onConfirm">{{ confirmText }}</v-btn>
      </template>
    </base-modal>
  </template>
  
  <script>
  import BaseModal from './BaseModal.vue';
  
  export default {
    name: 'ConfirmModal',
    components: { BaseModal },
    props: {
      show: { type: Boolean, required: true },
      title: { type: String, default: 'Confirmar Ação' },
      message: { type: String, required: true },
      confirmText: { type: String, default: 'Confirmar' },
      cancelText: { type: String, default: 'Cancelar' },
      confirmColor: { type: String, default: 'primary' },
    },
    methods: {
      onClose() {
        this.$emit('close');
      },
      onConfirm() {
        this.$emit('confirm');
      },
    },
  };
  </script>