<template>
    <base-modal :show="show" title="Editar Usuário" @close="onClose">
      <template #content>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Nome*"
                v-model="editableUser.firstName"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Sobrenome*"
                v-model="editableUser.lastName"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indica campo obrigatório</small>
      </template>
  
      <template #actions>
        <v-btn text @click="onClose">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="onSave">Salvar</v-btn>
      </template>
    </base-modal>
  </template>
  
  <script>
  import BaseModal from '@/components/shared/BaseModal.vue';
  
  export default {
    name: 'UserFormModal',
    components: { BaseModal },
    // O resto do <script> continua exatamente o mesmo da versão anterior
    // (props, data, watch, methods)
    props: {
      user: { type: Object, required: true },
      show: { type: Boolean, required: true },
    },
    data() {
      return { editableUser: {} };
    },
    watch: {
      user: {
        handler(newUser) { this.editableUser = { ...newUser }; },
        immediate: true,
      },
    },
    methods: {
      onClose() { this.$emit('close'); },
      onSave() { this.$emit('save', this.editableUser); },
    },
  };
  </script>